/*****************************************************************************************************
 * @author Skomorox
 * @class Nephilim
 * Abstract: Class Nephilim
 *****************************************************************************************************
 */

import React, { Component } from 'react';
import Tween from '@tweenjs/tween.js';
import * as Three from 'three';
import * as Loaders from './Loaders';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { EffectComposer, Passes, Shaders } from './EffectComposer';
import { Decoration } from './Decoration/Decoration';
import { Controller } from './Controller';
import { Action } from './Action';
import { Motion } from './Motion';
import { NephilimProvider, getDeviceOrientation, withInterface } from './Helpers';
import '../css/styles.css';

export class Nephilim extends Component {
  
  /**
   * @function constructor
   * @param {Object} params
   * @param {Object} camera
   * @param {Object} glRenderer
   * @param {Object} cssRenderer
   * @param {Object} postProcessing
   * @param {String[]} loaders
   * @param {Boolean} isLayerRendering
   * @param {Boolean} isColorManagement
   * 
   * Init application
   * 1. Setup mouse, touch, global Scene and Camera
   * 2. Setup THREE.WebGLRenderer
   * 3. Setup THREE.Raycaster
   * 4. Setup THREE.AudioListener
   * 5. Setup Loaders
   * 6. Setup THREE.CSS3DRenderer
   * 7. Setup THREE.EffectComposer
   * 8. Inject this as manager in Decoration, Action, Motion, Controller classes
   */
  constructor(props) {

    super(props);

    const {
      camera, glRenderer, cssRenderer,
      postProcessing, isLayerRendering, isColorManagement
    } = withInterface(props);

    this.state = {
      deviceOrientation: getDeviceOrientation(),
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
    this.mouse = new Three.Vector2(-1, -1);
    this.touch = new Three.Vector2(-1, -1);
    this.visual = new Three.Scene();
    this.isLayerRendering = isLayerRendering;
    this.camera = new Three[camera.type](
      camera.fov, 1,
      camera.near,
      camera.far
    );

    if (glRenderer) {
      this.glRenderer = new Three.WebGLRenderer(glRenderer);
      this.glRenderer.setPixelRatio(window.devicePixelRatio);
      this.raycaster = new Three.Raycaster();
      this.audioListener = new Three.AudioListener();
      this.camera.add(this.audioListener);
      this.setLoadingManager();
      if (glRenderer.autoClear !== undefined) {
        this.glRenderer.autoClear = glRenderer.autoClear;
      }
      if (isColorManagement === false) {
        Three.ColorManagement.enabled = false;
        this.glRenderer.outputColorSpace = Three.LinearSRGBColorSpace;
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
    this.onResize();
  }

  render() {

    const { children } = this.props;
    const { loading, loaded, total, deviceOrientation } = this.state;

    return (
      <NephilimProvider value={{
        deviceOrientation,
        setPPEffects: this.setPPEffects,
        setLoader: this.setLoader,
        setVisualState: this.setVisualState,
        setMotion: this.setMotion,
        getAction: this.getAction,
        connectActions: this.connectActions,
        resetActions: this.resetActions,
        executeActionsSequence: this.executeActionsSequence,
        enablePostProcessing: this.enablePostProcessing,
        enableLayerRendering: this.enableLayerRendering,
        find: this.find,
        findAll: this.findAll,
        navigate: this.navigate,
        onUpdate: this.onUpdate,
        clearUpdateHandlers: this.clearUpdateHandlers,
        isSceneActive: this.isSceneActive
      }}>
        <div
          ref={c => this.container = c}
          className={'rtc-container'}
        >
          <div
            id={'portal'}
            className={'rtc-renderer-container'}
          />
          <div
            ref={c => this.glContainer = c}
            className={'rtc-renderer-container'}
          />
          <div
            ref={c => this.cssContainer = c}
            className={'rtc-renderer-container'}
          />
          {loading && (
            <div className={'rtc-loader-container'}>
              <div className={'rtc-loader-container rtc-gradient'}>
                {[...Array(7)].map((h, hi) => (
                  <div
                    key={hi}
                    className={`rtc-hexagon rtc-${hi === 0 ? 'center' : `side${hi}`}`}
                  >
                    <div className={'rtc-hp1'} />
                    <div className={'rtc-hp1 rtc-hp2'} />
                    <div className={'rtc-hp1 rtc-hp3'} />
                  </div>
                ))}
                <div className={'rtc-text-loader'}>
                  Loading resources ({loaded} of {total})
                </div>
              </div>
            </div>
          )}
        </div>
        {children}
      </NephilimProvider>
    );
  }

  /**
   * @function setEventListeners
   * Set window event listeners
   */
  setEventListeners = () => {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('resize', this.onResize);
    window.addEventListener('click', this.onClick);
  };

  /**
   * @function setInitialRoute
   * Check if there is any route and navigate.
   * Execute callback after navigation
   */
  setInitialRoute = () => {

    const { router } = withInterface(this.props);
    let sceneId = null;

    if (this.route) {
      const origin = `/${this.route.split('/')[1]}`;
      for (let r in router) {
        if (router[r] === origin || router[r].path === origin) {
          sceneId = r;
        }
      }
    } else if (this.activeScene) {
      sceneId = this.activeScene.id;
    }
    if (sceneId) {
      const callback = (router && router[sceneId].callback) ?
        () => router[sceneId].callback(this, this.route) :
        false;
      this.navigate(sceneId, { callback });
    }
  };

  /**
   * @function setPPEffects
   * @param {String[]} effects
   * Set post processing effects
   */
  setPPEffects = effects => {

    const { postProcessing } = withInterface(this.props);
    const { clientWidth, clientHeight } = this.container;
    let pp = postProcessing;

    if (!pp || !effects?.length) return false;

    this.isPPEnabled = true;
    this.composer.passes.length = 1;

    effects.forEach((e, ei) => {
      let ppEffect = null;
      if (e.includes('Shader')) {
        ppEffect = new Passes.ShaderPass(pp[e].src || Shaders[e]);
        if (pp[e].uniforms) {
          for (let u in pp[e].uniforms) {
            ppEffect.uniforms[u].value = pp[e].uniforms[u];
          }
        }
      } else {
        const Pass = pp[e].src || Passes[e];
        const params = [];
        if (pp[e].isScene) {
          params.push(this.visual);
        }
        if (pp[e].isCamera) {
          params.push(this.camera);
        }
        ppEffect = new Pass(...params, ...(pp[e].params || []));
      }
      ppEffect.renderToScreen = ei === effects.length - 1;
      this.composer.addPass(ppEffect);
    });
    this.composer.setSize(clientWidth, clientHeight);
  };

  /**
   * @function setLoadingManager
   * Init loading manager and add basic loaders
   */
  setLoadingManager = () => {
    this.loaders = {};
    this.loadingManager = new Three.LoadingManager();
    this.animationLoader = new Three.AnimationLoader(this.loadingManager);
    this.audioLoader = new Three.AudioLoader(this.loadingManager);
    this.textureLoader = new Three.TextureLoader(this.loadingManager);
    this.loadingManager.onProgress = (item, loaded, total) => this.setState({ loaded, total });
    this.loadingManager.onLoad = () => this.setState({ loading: false });
  };

  /**
   * @function setLoader
   * @param loader
   * Add custom loader
   */
  setLoader = l => {
    if (Loaders[l] && !this.loaders[l]) {
      this.loaders[l] = new Loaders[l](this.loadingManager);
    }
    return this.loaders[l];
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
   * @function resetActions
   * Stop actions execution
   */
  resetActions = () => Tween.removeAll();

  /**
   * @function execActionsSequence
   * @param {String[]} actionIds
   * @param {Object} params
   * Execute sequence of Actions
   */
  executeActionsSequence = (actionIds, params) => {
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
    Tween.update();
    this.onUpdateHandlers.forEach(handler => handler());
    requestAnimationFrame(this.update);
  };

  /**
   * @function updateLayout
   * Update Decorations layout
   */
  updateLayout = () => {
    if (this.children) {
      for (let c in this.children) {
        this.children[c].updateLayout();
      }
    }
  };

  /**
   * @function navigate
   * @param {String} id
   * @param {Object} params
   * Navigate to Scene by id
   */
  navigate = (id, params) => {

    const { router } = withInterface(this.props);
    const scene = this.find(id);

    if (scene) {
      const events = [
        'onMouseWheel', 'onMouseMove', 'onClick',
        'onKeyUp', 'onTouchMove', 'onTouchStart'
      ];
      for (let e = 0; e < events.length; e++) {
        window[events[e].toLowerCase()] = scene.props[events[e]] || null;
      }
      this.activeScene = scene;
    }
    if (router) {
      window.history.pushState({}, this.activeScene.id, router[id].path || router[id]);
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
   * @function onUpdate
   * @param {Function} handler
   * Add onUpdate handler
   */
  onUpdate = handler => this.onUpdateHandlers.push(handler);

  /**
   * @function clearUpdateHandlers
   * Clear onUpdate handlers
   */
  clearUpdateHandlers = () => this.onUpdateHandlers = [];

  /**
   * @function isSceneActive
   * @param {String} id
   * Check if Scene is currently active
   */
  isSceneActive = id => id === this.activeScene.id;

  /**
   * @function onMouseMove
   * Update Mouse position and find intersects
   */
  onMouseMove = ({ clientX, clientY }) => {

    const { offsetWidth, offsetHeight } = this.container;
    const { top, left } = this.container.getBoundingClientRect();
    this.mouse.x = ((clientX - left) / offsetWidth) * 2 - 1;
    this.mouse.y = - ((clientY - top) / offsetHeight) * 2 + 1;
    
    if (this.glRenderer) {
      if (this.onMouseStopTimeout) {
        clearTimeout(this.onMouseStopTimeout);
      }
      this.onMouseStopTimeout = setTimeout(() => {
        this.findIntersects();
        if (this.intersects.length) {
          const visual = this.intersects[0].object;
          if (visual.onMouseOver) visual.onMouseOver(visual);
        }
      }, 25);
    }
  };

  /**
   * @function onTouchMove
   * Update Touch position
   */
  onTouchMove = ({ changedTouches }) => {
    const { clientX, clientY } = changedTouches[0];
    const { offsetWidth, offsetHeight } = this.container;
    const { top, left } = this.container.getBoundingClientRect();
    this.touch.x = ((clientX - left) / offsetWidth) * 2 - 1;
    this.touch.y = - ((clientY - top) / offsetHeight) * 2 + 1;
  };

  /**
   * @function onResize
   * Update Renderer sizes and adjust Camera aspect ration according to new size
   */
  onResize = () => {
    if (this.onResizeTimeout) {
      clearTimeout(this.onResizeTimeout);
    }
    this.onResizeTimeout = setTimeout(() => {
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
      this.setState({ deviceOrientation: getDeviceOrientation() });
      this.updateLayout();
    }, 20);
  };

  /**
   * @function onClick
   * Click on visual object
   */
  onClick = () => {
    if (this.intersects.length) {
      const visual = this.intersects[0].object;
      if (visual.onClick) visual.onClick(visual);  
    }
  };

}
