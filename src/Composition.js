/*****************************************************************************************************
 * @author Skomorox
 * @class Composition
 * Abstract: Class Composition
 *****************************************************************************************************
 */

import React, { Component, Fragment } from 'react';
import * as Three from 'three';
import { CSS3DRenderer } from 'three-renderer-css3d';
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader';
import { EffectComposer } from './EffectComposer';
import { Decoration } from './Decoration/Decoration';
import { Controller } from './Controller';
import { Action } from './Action';
import { Motion } from './Motion';
import TWEEN from '@tweenjs/tween.js';
import config from './config';
import '../css/styles.css';
import loader from '../images/loader.gif';

export class Composition extends Component {
  
  /**
   * @function constructor
   * @param {Object} params
   * @param {Object} camera
   * @param {Object} glRenderer
   * @param {Object} cssRenderer
   * @param {Object} postProcessing
   * @param {Boolean} layerRendering
   * 
   * Init application
   * 1. Setup mouse, global Scene and Camera
   * 2. Setup THREE.WebGLRenderer
   * 3. Setup THREE.CSS3DRenderer
   * 4. Setup THREE.EffectComposer
   * 5. Inject this as manager in Decoration, Action, Motion, Controller classes
   */
  constructor({ camera, glRenderer, cssRenderer, postProcessing, layerRendering }) {

    super();
    this.state = {
      loading: true,
      loaded: 0,
      total: 0
    };
    this.children = {};
    this.actions = {};
    this.layers = {};
    this.intersects = [];
    this.isPPEnabled = false;
    this.isActionsEnabled = true;
    this.isLayerRendering = layerRendering || false;
    this.mouse = new Three.Vector2(-1, -1);
    this.visual = new Three.Scene();
    this.camera = new Three[`${this.capitalize(camera.type)}Camera`](
      camera.fov, 1,
      camera.near,
      camera.far
    );

    if (glRenderer) {
      this.glRenderer = new Three.WebGLRenderer(glRenderer);
      this.glRenderer.setPixelRatio(window.devicePixelRatio);
      this.raycaster = new Three.Raycaster();
      this.loadingManager = new Three.LoadingManager();
      this.textureLoader = new Three.TextureLoader(this.loadingManager);
      this.objLoader = new OBJLoader(this.loadingManager);
      this.mtlLoader = new MTLLoader(this.loadingManager);
      this.loadingManager.onProgress = (item, loaded, total) => this.setState({ loaded, total });
      this.loadingManager.onLoad = () => this.setState({ loading: false });
      if (glRenderer.autoClear !== undefined) {
        this.glRenderer.autoClear = glRenderer.autoClear;
      }
    } else {
      this.state.loading = false; 
    }

    if (cssRenderer) {
      this.cssRenderer = new CSS3DRenderer();
    }

    if (postProcessing) {
      this.composer = new EffectComposer(this.glRenderer);
      this.composer.addPass(new EffectComposer.RenderPass(this.visual, this.camera));
    }

    Decoration.prototype.manager = this;
    Controller.prototype.manager = this;
    Action.prototype.manager = this;
    Motion.prototype.manager = this;
  }

  componentDidMount() {
    if (this.glRenderer) {
      this.glContainer.appendChild(this.glRenderer.domElement);
      setTimeout(() => {
        if (!this.state.total) {
          this.setState({ loading: false });
        }
      }, 100);
    }
    if (this.cssRenderer) {
      this.cssContainer.appendChild(this.cssRenderer.domElement);
    }
    if (this.activeScene) {
      this.navigate(this.activeScene.id);
    }
    this.setEventListeners();
    this.update();
    this.resize();
  }

  render() {

    const { loading, loaded, total } = this.state;

    return (
      <Fragment>
        <div
          ref={c => this.container = c}
          className={'container'}
        >
          <div
            id={'portal'}
            className={'renderer-container'}
          />
          <div
            ref={c => this.glContainer = c}
            className={'renderer-container'}
          />
          <div
            ref={c => this.cssContainer = c}
            className={'renderer-container'}
          />
          {loading && (
            <div className={'loader-container'}>
              <div className={'loader-container gradient'}>
                <img
                  className={'loader'}
                  src={loader}
                  alt={'loader'}
                />
                <div className={'loader text-loader'}>
                  Loading resources ({loaded} of {total})
                </div>
              </div>
            </div>
          )}
        </div>
        {this.props.children}
      </Fragment>
    );
  }

  /**
   * @function setEventListeners
   * Set window event listeners
   * onMouseStop - intersectObjects should not be called each time
   * since this leads to critical decrease of performance
   */
  setEventListeners = () => {
    window.addEventListener('resize', this.resize);
    window.addEventListener('mousemove', ({ clientX, clientY }) => {

      const { offsetWidth, offsetHeight } = this.container;
      const { top, left } = this.container.getBoundingClientRect();
      this.mouse.x = ((clientX - left) / offsetWidth) * 2 - 1;
      this.mouse.y = - ((clientY - top) / offsetHeight) * 2 + 1;
      
      if (this.glRenderer) {
        if (this.onMouseStop) clearTimeout(this.onMouseStop);
        this.onMouseStop = setTimeout(() => {
          this.findIntersects();
          if (this.intersects.length) {
            const visual = this.intersects[0].object;
            if (visual.onMouseOver) visual.onMouseOver(visual);  
          }
        }, 25);
      }
    });
    window.addEventListener('click', () => {
      if (this.intersects.length) {
        const visual = this.intersects[0].object;
        if (visual.onClick) visual.onClick(visual);  
      }
    });
  };
  
  /**
   * @function resize
   * Update Renderer sizes and adjust Camera aspect ration according to new size
   */
  resize = () => {
    const { clientWidth, clientHeight } = this.container;
    if (this.glRenderer) {
      this.glRenderer.setSize(clientWidth, clientHeight);
    }
    if (this.cssRenderer) {
      this.cssRenderer.setSize(clientWidth, clientHeight);
    }
    if (this.isPPEnabled) {
      this.composer.setSize(clientWidth, clientHeight);
    }
    this.camera.aspect = clientWidth / clientHeight;
    this.camera.updateProjectionMatrix();
  };

  /**
   * @function update
   * 1. Update children
   * 2. In case post processing enabled, render composer or layer by layer
   * 3. In case post processing disabled, render WebGLRenderer
   * 4. Render CSS3DRenderer
   * 5. Update Tween
   */
  update = () => {
    for (let k in this.children) {
      this.children[k].update();
    }
    if (this.isPPEnabled) {
      if (this.isLayerRendering) {
        for (let l in this.layers) {
          this.camera.layers.set(this.layers[l]);
          this.composer.render();
        }
        this.glRenderer.clearDepth();
        this.camera.layers.set(0);
        this.glRenderer.render(this.visual, this.camera);
      } else {
        this.composer.render();
      }
    } else if (this.glRenderer) {
      this.glRenderer.render(this.visual, this.camera);
    }
    if (this.cssRenderer) {
      this.cssRenderer.render(this.visual, this.camera);
    }
    TWEEN.update();
    requestAnimationFrame(this.update);
  };

  /**
   * @function findIntersects
   * @param {Object} params
   * @param {Number} clientX
   * @param {Number} clientY
   * In case glEvents are enabled for active Scene, get intersected objects
   */
  findIntersects = () => {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    if (this.activeScene) {
      if (this.activeScene.glEvents) {
        this.intersects = this.raycaster.intersectObjects(this.activeScene.visual.children, true);
      }
    } else {
      this.intersects = this.raycaster.intersectObjects(this.visual.children, true);
    }
  };

  /**
   * @function navigate
   * @param {String} id
   * @param {Object} params
   * Navigate to Scene by id
   */
  navigate = (id, params) => {
    for (let k in this.children) {
      const scene = this.children[k].find(id);
      if (scene) {
        ['onMouseWheel', 'onMouseMove', 'onClick', 'onKeyUp'].forEach(e => {
          window[e.toLowerCase()] = scene.props[e] || null;
        });
        this.activeScene = scene;
      }
    }
    this.actions[`${id}:Navigate`].begin({
      duration: this.activeScene.props.navigationDuration,
      ...params,
      enforce: true
    });
  };

  /**
   * @function connectActions
   * @param {Decoration} decoration
   * @param {Object} actions
   * Link Actions object to given Decoration
   */
  connectActions = (decoration, actions) => {
    for (let a in actions) {
      if (!this.actions[a]) this.actions[a] = new Action();
      this.actions[a].addDecoration(decoration, actions[a]);
    }
  };

  /**
   * @function getAction
   * @param {String} id
   * Get Action by id
   */
  getAction = id => this.actions[id];

  /**
   * @function execActionsSequence
   * @param {String[]} actionIds
   * @param {Object} params
   * Execute sequence of Actions
   */
  execActionsSequence = (actionIds, params) => {
    this.actions[actionIds[0]].begin(this.buildActionsSequence(actionIds, 1, params));
  };

  /**
   * @function buildActionsSequence
   * @param {String[]} actionIds
   * @param {Number} index
   * @param {Object} params
   * Build Actions sequence
   */
  buildActionsSequence = (actionIds, index, params) => {
    const p = { ...params };
    if (actionIds[index]) {
      p.callback = () => this.actions[actionIds[index]].begin(params);
    }
    if (index < actionIds.length - 1) {
      params = this.buildActionsSequence(actionIds, index + 1, params);
    }
    return p;
  };

  /**
   * @function setPPEffects
   * @param {String[]} effects
   * Set post processing effects only for desktop
   */
  setPPEffects = effects => {

    const { clientWidth, clientHeight } = this.container;
    const pp = this.props.postProcessing;

    if (!pp || this.isMobileDevice()) return false;
    if (!effects || !effects.length) return false;

    this.isPPEnabled = true;
    this.composer.passes.length = 1;

    effects.forEach((eff, ei) => {
      let ppEffect = null;
      if (eff.indexOf('Shader') === -1) {
        const Pass = EffectComposer[`${eff}Pass`] || pp[eff].src;
        const params = pp[eff].params || [];
        ppEffect = new Pass(...params);
      } else {
        ppEffect = new EffectComposer.ShaderPass(pp[eff].src);
        if (pp[eff].uniforms) {
          for (let u in pp[eff].uniforms) {
            ppEffect.uniforms[u].value = pp[eff].uniforms[u];
          }
        }
      }
      ppEffect.renderToScreen = ei === effects.length - 1;
      this.composer.addPass(ppEffect);
    });
    this.composer.setSize(clientWidth, clientHeight);
  };

  /**
   * @function enablePostProcessing
   * @param {Boolean} enabled
   * Enable / disable post processing
   */
  enablePostProcessing = enabled => this.isPPEnabled = enabled;

  /**
   * @function enableLayerRendering
   * @param {Boolean} enabled
   * Enable / disable layer by layer rendering
   */
  enableLayerRendering = enabled => this.isLayerRendering = enabled;

  /**
   * @function isMobileScreen
   * Check current client width
   */
  isMobileScreen = () => {
    return this.container.clientWidth <= config.MOBILE_SCREEN_WIDTH;
  };
  
  /**
   * @function isMobileDevice
   * Detect mobile device using navigator.userAgent
   */
  isMobileDevice = () => {
    return navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i);
  };

  /**
   * @function isSceneActive
   * @param {String} id
   * Check if scene is currently active
   */
  isSceneActive = id => id === this.activeScene.id;
  
  /**
   * @function capitalize
   * @param {String} v
   * Capitalize string
   */
  capitalize = v => v.charAt(0).toUpperCase() + v.slice(1);
  
}
