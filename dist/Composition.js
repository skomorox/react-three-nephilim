"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Composition = void 0;

var _react = _interopRequireWildcard(require("react"));

var Three = _interopRequireWildcard(require("three"));

var _threeRendererCss3d = require("three-renderer-css3d");

var _threeObjMtlLoader = require("three-obj-mtl-loader");

var _EffectComposer = require("./EffectComposer/EffectComposer");

var _Decoration = require("./Decoration/Decoration");

var _Controller = require("./Controller");

var _Action = require("./Action");

var _Motion = require("./Motion");

var _tween = _interopRequireDefault(require("@tweenjs/tween.js"));

var _config = _interopRequireDefault(require("./config"));

require("../css/styles.css");

var _loader = _interopRequireDefault(require("../images/loader.gif"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Composition =
/*#__PURE__*/
function (_Component) {
  _inherits(Composition, _Component);

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
  function Composition(_ref) {
    var _this;

    var camera = _ref.camera,
        glRenderer = _ref.glRenderer,
        cssRenderer = _ref.cssRenderer,
        postProcessing = _ref.postProcessing,
        layerRendering = _ref.layerRendering;

    _classCallCheck(this, Composition);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Composition).call(this));

    _defineProperty(_assertThisInitialized(_this), "setEventListeners", function () {
      window.addEventListener('resize', _this.resize);
      window.addEventListener('mousemove', function (_ref2) {
        var clientX = _ref2.clientX,
            clientY = _ref2.clientY;
        var _this$container = _this.container,
            offsetWidth = _this$container.offsetWidth,
            offsetHeight = _this$container.offsetHeight;

        var _this$container$getBo = _this.container.getBoundingClientRect(),
            top = _this$container$getBo.top,
            left = _this$container$getBo.left;

        _this.mouse.x = (clientX - left) / offsetWidth * 2 - 1;
        _this.mouse.y = -((clientY - top) / offsetHeight) * 2 + 1;

        if (_this.glRenderer) {
          if (_this.onMouseStop) clearTimeout(_this.onMouseStop);
          _this.onMouseStop = setTimeout(function () {
            _this.findIntersects();

            if (_this.intersects.length) {
              var visual = _this.intersects[0].object;
              if (visual.onMouseOver) visual.onMouseOver(visual);
            }
          }, 25);
        }
      });
      window.addEventListener('click', function () {
        if (_this.intersects.length) {
          var visual = _this.intersects[0].object;
          if (visual.onClick) visual.onClick(visual);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "resize", function () {
      var _this$container2 = _this.container,
          clientWidth = _this$container2.clientWidth,
          clientHeight = _this$container2.clientHeight;

      if (_this.glRenderer) {
        _this.glRenderer.setSize(clientWidth, clientHeight);
      }

      if (_this.cssRenderer) {
        _this.cssRenderer.setSize(clientWidth, clientHeight);
      }

      if (_this.isPPEnabled) {
        _this.composer.setSize(clientWidth, clientHeight);
      }

      _this.camera.aspect = clientWidth / clientHeight;

      _this.camera.updateProjectionMatrix();
    });

    _defineProperty(_assertThisInitialized(_this), "update", function () {
      for (var k in _this.children) {
        _this.children[k].update();
      }

      if (_this.isPPEnabled) {
        if (_this.isLayerRendering) {
          for (var l in _this.layers) {
            _this.camera.layers.set(_this.layers[l]);

            _this.composer.render();
          }

          _this.glRenderer.clearDepth();

          _this.camera.layers.set(0);

          _this.glRenderer.render(_this.visual, _this.camera);
        } else {
          _this.composer.render();
        }
      } else if (_this.glRenderer) {
        _this.glRenderer.render(_this.visual, _this.camera);
      }

      if (_this.cssRenderer) {
        _this.cssRenderer.render(_this.visual, _this.camera);
      }

      _tween["default"].update();

      requestAnimationFrame(_this.update);
    });

    _defineProperty(_assertThisInitialized(_this), "findIntersects", function () {
      _this.raycaster.setFromCamera(_this.mouse, _this.camera);

      if (_this.activeScene) {
        if (_this.activeScene.glEvents) {
          _this.intersects = _this.raycaster.intersectObjects(_this.activeScene.visual.children, true);
        }
      } else {
        _this.intersects = _this.raycaster.intersectObjects(_this.visual.children, true);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "activateScene", function (id, params) {
      var _loop = function _loop(k) {
        var scene = _this.children[k].find(id);

        if (scene) {
          ['onMouseWheel', 'onMouseMove', 'onClick', 'onKeyUp'].forEach(function (e) {
            window[e.toLowerCase()] = scene.props[e] || null;
          });
          _this.activeScene = scene;
        }
      };

      for (var k in _this.children) {
        _loop(k);
      }

      _this.actions["".concat(id, ":ActivateScene")].begin(_objectSpread({
        duration: _this.activeScene.props.activationDuration
      }, params, {
        enforce: true
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "connectActions", function (decoration, actions) {
      for (var a in actions) {
        if (!_this.actions[a]) _this.actions[a] = new _Action.Action();

        _this.actions[a].addDecoration(decoration, actions[a]);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getAction", function (id) {
      return _this.actions[id];
    });

    _defineProperty(_assertThisInitialized(_this), "execActionsSequence", function (actionIds, params) {
      _this.actions[actionIds[0]].begin(_this.buildActionsSequence(actionIds, 1, params));
    });

    _defineProperty(_assertThisInitialized(_this), "buildActionsSequence", function (actionIds, index, params) {
      var p = _objectSpread({}, params);

      if (actionIds[index]) {
        p.callback = function () {
          return _this.actions[actionIds[index]].begin(params);
        };
      }

      if (index < actionIds.length - 1) {
        params = _this.buildActionsSequence(actionIds, index + 1, params);
      }

      return p;
    });

    _defineProperty(_assertThisInitialized(_this), "setPPEffects", function (effects) {
      var _this$container3 = _this.container,
          clientWidth = _this$container3.clientWidth,
          clientHeight = _this$container3.clientHeight;
      var pp = _this.props.postProcessing;
      if (!pp || _this.isMobileDevice()) return false;
      if (!effects || !effects.length) return false;
      _this.isPPEnabled = true;
      _this.composer.passes.length = 1;
      effects.forEach(function (eff, ei) {
        var ppEffect = null;

        if (eff.indexOf('Shader') === -1) {
          var params = pp[eff].params || [];
          ppEffect = _construct(_EffectComposer.EffectComposer["".concat(eff, "Pass")], _toConsumableArray(params));
        } else {
          ppEffect = new _EffectComposer.EffectComposer.ShaderPass(pp[eff].src);

          if (pp[eff].uniforms) {
            for (var u in pp[eff].uniforms) {
              ppEffect.uniforms[u].value = pp[eff].uniforms[u];
            }
          }
        }

        ppEffect.renderToScreen = ei === effects.length - 1;

        _this.composer.addPass(ppEffect);
      });

      _this.composer.setSize(clientWidth, clientHeight);
    });

    _defineProperty(_assertThisInitialized(_this), "enablePostProcessing", function (enabled) {
      return _this.isPPEnabled = enabled;
    });

    _defineProperty(_assertThisInitialized(_this), "enableLayerRendering", function (enabled) {
      return _this.isLayerRendering = enabled;
    });

    _defineProperty(_assertThisInitialized(_this), "isMobileScreen", function () {
      return _this.container.clientWidth <= _config["default"].MOBILE_SCREEN_WIDTH;
    });

    _defineProperty(_assertThisInitialized(_this), "isMobileDevice", function () {
      return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);
    });

    _defineProperty(_assertThisInitialized(_this), "isSceneActive", function (id) {
      return id === _this.activeScene.id;
    });

    _defineProperty(_assertThisInitialized(_this), "capitalize", function (v) {
      return v.charAt(0).toUpperCase() + v.slice(1);
    });

    _this.state = {
      loading: true,
      loaded: 0,
      total: 0
    };
    _this.children = {};
    _this.actions = {};
    _this.layers = {};
    _this.intersects = [];
    _this.isPPEnabled = false;
    _this.isActionsEnabled = true;
    _this.isLayerRendering = layerRendering || false;
    _this.mouse = new Three.Vector2(-1, -1);
    _this.visual = new Three.Scene();
    _this.camera = new Three["".concat(_this.capitalize(camera.type), "Camera")](camera.fov, 1, camera.near, camera.far);

    if (glRenderer) {
      _this.glRenderer = new Three.WebGLRenderer(glRenderer);

      _this.glRenderer.setPixelRatio(window.devicePixelRatio);

      _this.raycaster = new Three.Raycaster();
      _this.loadingManager = new Three.LoadingManager();
      _this.textureLoader = new Three.TextureLoader(_this.loadingManager);
      _this.objLoader = new _threeObjMtlLoader.OBJLoader(_this.loadingManager);
      _this.mtlLoader = new _threeObjMtlLoader.MTLLoader(_this.loadingManager);

      _this.loadingManager.onProgress = function (item, loaded, total) {
        return _this.setState({
          loaded: loaded,
          total: total
        });
      };

      _this.loadingManager.onLoad = function () {
        return _this.setState({
          loading: false
        });
      };

      if (glRenderer.autoClear !== undefined) {
        _this.glRenderer.autoClear = glRenderer.autoClear;
      }
    } else {
      _this.state.loading = false;
    }

    if (cssRenderer) {
      _this.cssRenderer = new _threeRendererCss3d.CSS3DRenderer();
    }

    if (postProcessing) {
      _this.composer = new _EffectComposer.EffectComposer(_this.glRenderer);

      _this.composer.addPass(new _EffectComposer.EffectComposer.RenderPass(_this.visual, _this.camera));
    }

    _Decoration.Decoration.prototype.manager = _assertThisInitialized(_this);
    _Controller.Controller.prototype.manager = _assertThisInitialized(_this);
    _Action.Action.prototype.manager = _assertThisInitialized(_this);
    _Motion.Motion.prototype.manager = _assertThisInitialized(_this);
    return _this;
  }

  _createClass(Composition, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.glRenderer) {
        this.glContainer.appendChild(this.glRenderer.domElement);
        setTimeout(function () {
          if (!_this2.state.total) {
            _this2.setState({
              loading: false
            });
          }
        }, 100);
      }

      if (this.cssRenderer) {
        this.cssContainer.appendChild(this.cssRenderer.domElement);
      }

      if (this.activeScene) {
        this.activateScene(this.activeScene.id);
      }

      this.setEventListeners();
      this.update();
      this.resize();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          loading = _this$state.loading,
          loaded = _this$state.loaded,
          total = _this$state.total;
      return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("div", {
        ref: function ref(c) {
          return _this3.container = c;
        },
        className: 'container'
      }, _react["default"].createElement("div", {
        id: 'portal',
        className: 'renderer-container'
      }), _react["default"].createElement("div", {
        ref: function ref(c) {
          return _this3.glContainer = c;
        },
        className: 'renderer-container'
      }), _react["default"].createElement("div", {
        ref: function ref(c) {
          return _this3.cssContainer = c;
        },
        className: 'renderer-container'
      }), loading && _react["default"].createElement("div", {
        className: 'loader-container'
      }, _react["default"].createElement("div", {
        className: 'loader-container gradient'
      }, _react["default"].createElement("img", {
        className: 'loader',
        src: _loader["default"],
        alt: 'loader'
      }), _react["default"].createElement("div", {
        className: 'loader text-loader'
      }, "Loading resources (", loaded, " of ", total, ")")))), this.props.children);
    }
    /**
     * @function setEventListeners
     * Set window event listeners
     * onMouseStop - intersectObjects should not be called each time
     * since this leads to critical decrease of performance
     */

  }]);

  return Composition;
}(_react.Component);

exports.Composition = Composition;