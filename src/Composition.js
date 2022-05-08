/*****************************************************************************************************
 * @author Skomorox
 * @class Composition
 * Abstract: Class Composition
 *****************************************************************************************************
 */

import React, { Component, Fragment } from 'react';
import * as Three from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { EffectComposer, Passes, Shaders } from './EffectComposer';
import { Loaders } from './Loader';
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
   * @param {Boolean} isLayerRendering
   * 
   * Init application
   * 1. Setup mouse, global Scene and Camera
   * 2. Setup THREE.WebGLRenderer
   * 3. Setup THREE.CSS3DRenderer
   * 4. Setup THREE.EffectComposer
   * 5. Inject this as manager in Decoration, Action, Motion, Controller classes
   */
  constructor({ camera, glRenderer, cssRenderer, postProcessing, isLayerRendering }) {

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
    this.onUpdateHandlers = [];
    this.isPPEnabled = false;
    this.isActionsEnabled = true;
    this.isLayerRendering = isLayerRendering || false;
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
      this.audioListener = new Three.AudioListener();
      this.loadingManager = new Three.LoadingManager();
      this.animationLoader = new Three.AnimationLoader(this.loadingManager);
      this.audioLoader = new Three.AudioLoader(this.loadingManager);
      this.textureLoader = new Three.TextureLoader(this.loadingManager);
      this.loaders = {};
      this.loadingManager.onProgress = (item, loaded, total) => this.setState({ loaded, total });
      this.loadingManager.onLoad = () => this.setState({ loading: false });
      this.camera.add(this.audioListener);
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
      this.composer.addPass(new Passes.RenderPass(this.visual, this.camera));
    }

    if (window.location.pathname !== '/') {
      this.route = window.location.pathname;
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
    this.setEventListeners();
    this.setInitialRoute();
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
   * @function setInitialRoute
   * Check if there is any route and navigate.
   * Execute callback after navigation
   */
  setInitialRoute = () => {
    const { routes } = this.props;
    let sceneId = null;
    if (this.route) {
      const origin = `/${this.route.split('/')[1]}`;
      for (let r in routes) {
        if (routes[r] === origin || routes[r].path === origin) {
          sceneId = r;
        }
      }
    } else if (this.activeScene) {
      sceneId = this.activeScene.id;
    }
    if (sceneId) {
      const callback = (routes && routes[sceneId].callback) ?
        () => routes[sceneId].callback(this, this.route) :
        false;
      this.navigate(sceneId, { callback });
    }
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
      if (eff.includes('Shader')) {
        ppEffect = new Passes.ShaderPass(pp[eff].src || Shaders[eff]);
        if (pp[eff].uniforms) {
          for (let u in pp[eff].uniforms) {
            ppEffect.uniforms[u].value = pp[eff].uniforms[u];
          }
        }
      } else {
        const Pass = pp[eff].src || Passes[eff];
        const params = pp[eff].params || [];
        ppEffect = new Pass(...params);
      }
      ppEffect.renderToScreen = ei === effects.length - 1;
      this.composer.addPass(ppEffect);
    });
    this.composer.setSize(clientWidth, clientHeight);
  };

  /**
   * @function setLoaders
   * @param {String} type
   * Add resource loader by type
   */
  setLoaders = types => {
    types.forEach(t => {
      if (Loaders[`${t}Loader`] && !this.loaders[`${t}Loader`]) {
        this.loaders[`${t}Loader`] = new Loaders[`${t}Loader`](this.loadingManager);
      }
    });
  };

  /**
   * @function setVisualState
   * @param {String} id
   * @param {Object} motion
   * Set visual state by Decoration id
   */
  setVisualState = (id, state) => this.find(id).setVisualState(state);

  /**
   * @function setMotion
   * @param {String} id
   * @param {Object} motion
   * Set Motion by Decoration id
   */
  setMotion = (id, motion) => this.find(id).setMotion(motion);

  /**
   * @function getAction
   * @param {String} id
   * Get Action by id
   */
  getAction = id => this.actions[id];

  /**
   * @function onUpdate
   * @param {Function} handler
   * Add onUpdate handler
   */
  onUpdate = handler => this.onUpdateHandlers.push(handler);

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
    this.onUpdateHandlers.forEach(handler => handler());
    requestAnimationFrame(this.update);
  };

  /**
   * @function navigate
   * @param {String} id
   * @param {Object} params
   * Navigate to Scene by id
   */
  navigate = (id, params) => {

    const { routes } = this.props;
    const scene = this.find(id);

    if (scene) {
      const events = ['onMouseWheel', 'onMouseMove', 'onClick', 'onKeyUp'];
      for (let e = 0; e < events.length; e++) {
        window[events[e].toLowerCase()] = scene.props[events[e]] || null;
      }
      this.activeScene = scene;
    }
    if (routes) {
      window.history.pushState({}, this.activeScene.id, routes[id].path || routes[id]);
    }
    if (this.activeScene.ppEffects) {
      this.setPPEffects(this.activeScene.ppEffects);
    }
    this.actions[`${id}:Navigate`].begin({
      duration: this.activeScene.props.navigationDuration,
      ...params,
      enforce: true
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
   * @function findIntersects
   * @param {Object} params
   * @param {Number} clientX
   * @param {Number} clientY
   * In case isGLEvents are enabled for active Scene, get intersected objects
   */
  findIntersects = () => {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    if (this.activeScene) {
      if (this.activeScene.isGLEvents) {
        this.intersects = this.raycaster.intersectObjects(this.activeScene.visual.children, true);
      }
    } else {
      this.intersects = this.raycaster.intersectObjects(this.visual.children, true);
    }
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
   * @function enablePostProcessing
   * @param {Boolean} isEnabled
   * Enable / disable post processing
   */
  enablePostProcessing = isEnabled => this.isPPEnabled = isEnabled;

  /**
   * @function enableLayerRendering
   * @param {Boolean} isEnabled
   * Enable / disable layer by layer rendering
   */
  enableLayerRendering = isEnabled => this.isLayerRendering = isEnabled;

  /**
   * @function find
   * @param {String} id
   * Find Decoration by id
   */
  find = id => {
    for (let k in this.children) {
      const c = this.children[k].find(id);
      if (c) return c;
    }
  };

  /**
   * @function findAll
   * @param {String} id
   * Find Decorations containing given id part
   */
  findAll = id => {
    const all = [];
    for (let k in this.children) {
      this.children[k].findAll(id, all);
    }
    return all;
  };

  /**
   * @function isMobileDevice
   * Detect mobile device using navigator.userAgent
   */
  isMobileDevice = () => {
    const platforms = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];
    return platforms.some(p => navigator.userAgent.match(p));
  };

  /**
   * @function isMobileScreen
   * Check current client width
   */
  isMobileScreen = () => this.container.clientWidth <= config.MOBILE_SCREEN_WIDTH;

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
