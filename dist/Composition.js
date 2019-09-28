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
        if (_this.onMouseStop) clearTimeout(_this.onMouseStop);
        _this.onMouseStop = setTimeout(function () {
          _this.findIntersects();

          if (_this.intersects.length) {
            var visual = _this.intersects[0].object;
            if (visual.onMouseOver) visual.onMouseOver(visual);
          }
        }, 25);
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

      _this.glRenderer.setSize(clientWidth, clientHeight);

      _this.cssRenderer.setSize(clientWidth, clientHeight);

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

          _this.glRenderer.render(_this.scene, _this.camera);
        } else {
          _this.composer.render();
        }
      } else if (_this.glRenderer) {
        _this.glRenderer.render(_this.scene, _this.camera);
      }

      if (_this.cssRenderer) {
        _this.cssRenderer.render(_this.scene, _this.camera);
      }

      _tween["default"].update();

      requestAnimationFrame(_this.update);
    });

    _defineProperty(_assertThisInitialized(_this), "findIntersects", function () {
      _this.raycaster.setFromCamera(_this.mouse, _this.camera);

      if (_this.activeScene.glEvents) {
        _this.intersects = _this.raycaster.intersectObjects(_this.activeScene.visual.children, true);
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
    _this.scene = new Three.Scene();
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
      _this.setState({
        loading: false
      });
    }

    if (cssRenderer) {
      _this.cssRenderer = new _threeRendererCss3d.CSS3DRenderer();
    }

    if (postProcessing) {
      _this.composer = new _EffectComposer.EffectComposer(_this.glRenderer);

      _this.composer.addPass(new _EffectComposer.EffectComposer.RenderPass(_this.scene, _this.camera));
    }

    _Decoration.Decoration.prototype.manager = _assertThisInitialized(_this);
    _Action.Action.prototype.manager = _assertThisInitialized(_this);
    _Motion.Motion.prototype.manager = _assertThisInitialized(_this);
    _Controller.Controller.prototype.manager = _assertThisInitialized(_this);
    return _this;
  }

  _createClass(Composition, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.glContainer.appendChild(this.glRenderer.domElement);
      this.cssContainer.appendChild(this.cssRenderer.domElement);
      this.activateScene(this.activeScene.id);
      this.setEventListeners();
      this.update();
      this.resize();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          loading = _this$state.loading,
          loaded = _this$state.loaded,
          total = _this$state.total;
      return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("div", {
        ref: function ref(c) {
          return _this2.container = c;
        },
        className: 'container'
      }, _react["default"].createElement("div", {
        ref: function ref(c) {
          return _this2.glContainer = c;
        },
        className: 'renderer-container'
      }), _react["default"].createElement("div", {
        ref: function ref(c) {
          return _this2.cssContainer = c;
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
      }, "Loading resources (", loaded, " of ", total, ")")))), _react.Children.map(this.props.children, function (child) {
        return child ? _react["default"].cloneElement(child, {
          ref: function ref(c) {
            if (!c || c.visual.parent === _this2.visual) return false;
            _this2.children[c.id] = c;

            _this2.scene.add(c.visual);
          }
        }) : false;
      }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db21wb3NpdGlvbi5qcyJdLCJuYW1lcyI6WyJDb21wb3NpdGlvbiIsImNhbWVyYSIsImdsUmVuZGVyZXIiLCJjc3NSZW5kZXJlciIsInBvc3RQcm9jZXNzaW5nIiwibGF5ZXJSZW5kZXJpbmciLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplIiwiY2xpZW50WCIsImNsaWVudFkiLCJjb250YWluZXIiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImxlZnQiLCJtb3VzZSIsIngiLCJ5Iiwib25Nb3VzZVN0b3AiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiZmluZEludGVyc2VjdHMiLCJpbnRlcnNlY3RzIiwibGVuZ3RoIiwidmlzdWFsIiwib2JqZWN0Iiwib25Nb3VzZU92ZXIiLCJvbkNsaWNrIiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJzZXRTaXplIiwiaXNQUEVuYWJsZWQiLCJjb21wb3NlciIsImFzcGVjdCIsInVwZGF0ZVByb2plY3Rpb25NYXRyaXgiLCJrIiwiY2hpbGRyZW4iLCJ1cGRhdGUiLCJpc0xheWVyUmVuZGVyaW5nIiwibCIsImxheWVycyIsInNldCIsInJlbmRlciIsImNsZWFyRGVwdGgiLCJzY2VuZSIsIlRXRUVOIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicmF5Y2FzdGVyIiwic2V0RnJvbUNhbWVyYSIsImFjdGl2ZVNjZW5lIiwiZ2xFdmVudHMiLCJpbnRlcnNlY3RPYmplY3RzIiwiaWQiLCJwYXJhbXMiLCJmaW5kIiwiZm9yRWFjaCIsImUiLCJ0b0xvd2VyQ2FzZSIsInByb3BzIiwiYWN0aW9ucyIsImJlZ2luIiwiZHVyYXRpb24iLCJhY3RpdmF0aW9uRHVyYXRpb24iLCJlbmZvcmNlIiwiZGVjb3JhdGlvbiIsImEiLCJBY3Rpb24iLCJhZGREZWNvcmF0aW9uIiwiYWN0aW9uSWRzIiwiYnVpbGRBY3Rpb25zU2VxdWVuY2UiLCJpbmRleCIsInAiLCJjYWxsYmFjayIsImVmZmVjdHMiLCJwcCIsImlzTW9iaWxlRGV2aWNlIiwicGFzc2VzIiwiZWZmIiwiZWkiLCJwcEVmZmVjdCIsImluZGV4T2YiLCJFZmZlY3RDb21wb3NlciIsIlNoYWRlclBhc3MiLCJzcmMiLCJ1bmlmb3JtcyIsInUiLCJ2YWx1ZSIsInJlbmRlclRvU2NyZWVuIiwiYWRkUGFzcyIsImVuYWJsZWQiLCJjb25maWciLCJNT0JJTEVfU0NSRUVOX1dJRFRIIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibWF0Y2giLCJ2IiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInN0YXRlIiwibG9hZGluZyIsImxvYWRlZCIsInRvdGFsIiwiaXNBY3Rpb25zRW5hYmxlZCIsIlRocmVlIiwiVmVjdG9yMiIsIlNjZW5lIiwiY2FwaXRhbGl6ZSIsInR5cGUiLCJmb3YiLCJuZWFyIiwiZmFyIiwiV2ViR0xSZW5kZXJlciIsInNldFBpeGVsUmF0aW8iLCJkZXZpY2VQaXhlbFJhdGlvIiwiUmF5Y2FzdGVyIiwibG9hZGluZ01hbmFnZXIiLCJMb2FkaW5nTWFuYWdlciIsInRleHR1cmVMb2FkZXIiLCJUZXh0dXJlTG9hZGVyIiwib2JqTG9hZGVyIiwiT0JKTG9hZGVyIiwibXRsTG9hZGVyIiwiTVRMTG9hZGVyIiwib25Qcm9ncmVzcyIsIml0ZW0iLCJzZXRTdGF0ZSIsIm9uTG9hZCIsImF1dG9DbGVhciIsInVuZGVmaW5lZCIsIkNTUzNEUmVuZGVyZXIiLCJSZW5kZXJQYXNzIiwiRGVjb3JhdGlvbiIsInByb3RvdHlwZSIsIm1hbmFnZXIiLCJNb3Rpb24iLCJDb250cm9sbGVyIiwiZ2xDb250YWluZXIiLCJhcHBlbmRDaGlsZCIsImRvbUVsZW1lbnQiLCJjc3NDb250YWluZXIiLCJhY3RpdmF0ZVNjZW5lIiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJjIiwibG9hZGVyIiwiQ2hpbGRyZW4iLCJtYXAiLCJjaGlsZCIsIlJlYWN0IiwiY2xvbmVFbGVtZW50IiwicmVmIiwi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O0FBRUQ7Ozs7Ozs7Ozs7RUE5SCtCaUksZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQGF1dGhvciBTa29tb3JveFxyXG4gKiB2My4wLjBcclxuICpcclxuICogQGNsYXNzIENvbXBvc2l0aW9uXHJcbiAqIEFic3RyYWN0OiBDbGFzcyBDb21wb3NpdGlvblxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBDaGlsZHJlbiwgRnJhZ21lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIFRocmVlIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IHsgQ1NTM0RSZW5kZXJlciB9IGZyb20gJ3RocmVlLXJlbmRlcmVyLWNzczNkJztcclxuaW1wb3J0IHsgT0JKTG9hZGVyLCBNVExMb2FkZXIgfSBmcm9tICd0aHJlZS1vYmotbXRsLWxvYWRlcic7XHJcbmltcG9ydCB7IEVmZmVjdENvbXBvc2VyIH0gZnJvbSAnLi9FZmZlY3RDb21wb3Nlci9FZmZlY3RDb21wb3Nlcic7XHJcbmltcG9ydCB7IERlY29yYXRpb24gfSBmcm9tICcuL0RlY29yYXRpb24vRGVjb3JhdGlvbic7XHJcbmltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tICcuL0NvbnRyb2xsZXInO1xyXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL0FjdGlvbic7XHJcbmltcG9ydCB7IE1vdGlvbiB9IGZyb20gJy4vTW90aW9uJztcclxuaW1wb3J0IFRXRUVOIGZyb20gJ0B0d2VlbmpzL3R3ZWVuLmpzJztcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XHJcbmltcG9ydCAnLi4vY3NzL3N0eWxlcy5jc3MnO1xyXG5pbXBvcnQgbG9hZGVyIGZyb20gJy4uL2ltYWdlcy9sb2FkZXIuZ2lmJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb3NpdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGNvbnN0cnVjdG9yXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjYW1lcmFcclxuICAgKiBAcGFyYW0ge09iamVjdH0gZ2xSZW5kZXJlclxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjc3NSZW5kZXJlclxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwb3N0UHJvY2Vzc2luZ1xyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbGF5ZXJSZW5kZXJpbmdcclxuICAgKiBcclxuICAgKiBJbml0IGFwcGxpY2F0aW9uXHJcbiAgICogMS4gU2V0dXAgbW91c2UsIGdsb2JhbCBTY2VuZSBhbmQgQ2FtZXJhXHJcbiAgICogMi4gU2V0dXAgVEhSRUUuV2ViR0xSZW5kZXJlclxyXG4gICAqIDMuIFNldHVwIFRIUkVFLkNTUzNEUmVuZGVyZXJcclxuICAgKiA0LiBTZXR1cCBUSFJFRS5FZmZlY3RDb21wb3NlclxyXG4gICAqIDUuIEluamVjdCB0aGlzIGFzIG1hbmFnZXIgaW4gRGVjb3JhdGlvbiwgQWN0aW9uLCBNb3Rpb24sIENvbnRyb2xsZXIgY2xhc3Nlc1xyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHsgY2FtZXJhLCBnbFJlbmRlcmVyLCBjc3NSZW5kZXJlciwgcG9zdFByb2Nlc3NpbmcsIGxheWVyUmVuZGVyaW5nIH0pIHtcclxuXHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgbG9hZGluZzogdHJ1ZSxcclxuICAgICAgbG9hZGVkOiAwLFxyXG4gICAgICB0b3RhbDogMFxyXG4gICAgfTtcclxuICAgIHRoaXMuY2hpbGRyZW4gPSB7fTtcclxuICAgIHRoaXMuYWN0aW9ucyA9IHt9O1xyXG4gICAgdGhpcy5sYXllcnMgPSB7fTtcclxuICAgIHRoaXMuaW50ZXJzZWN0cyA9IFtdO1xyXG4gICAgdGhpcy5pc1BQRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc0FjdGlvbnNFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuaXNMYXllclJlbmRlcmluZyA9IGxheWVyUmVuZGVyaW5nIHx8IGZhbHNlO1xyXG4gICAgdGhpcy5tb3VzZSA9IG5ldyBUaHJlZS5WZWN0b3IyKC0xLCAtMSk7XHJcbiAgICB0aGlzLnNjZW5lID0gbmV3IFRocmVlLlNjZW5lKCk7XHJcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBUaHJlZVtgJHt0aGlzLmNhcGl0YWxpemUoY2FtZXJhLnR5cGUpfUNhbWVyYWBdKFxyXG4gICAgICBjYW1lcmEuZm92LCAxLFxyXG4gICAgICBjYW1lcmEubmVhcixcclxuICAgICAgY2FtZXJhLmZhclxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoZ2xSZW5kZXJlcikge1xyXG4gICAgICB0aGlzLmdsUmVuZGVyZXIgPSBuZXcgVGhyZWUuV2ViR0xSZW5kZXJlcihnbFJlbmRlcmVyKTtcclxuICAgICAgdGhpcy5nbFJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xyXG4gICAgICB0aGlzLnJheWNhc3RlciA9IG5ldyBUaHJlZS5SYXljYXN0ZXIoKTtcclxuICAgICAgdGhpcy5sb2FkaW5nTWFuYWdlciA9IG5ldyBUaHJlZS5Mb2FkaW5nTWFuYWdlcigpO1xyXG4gICAgICB0aGlzLnRleHR1cmVMb2FkZXIgPSBuZXcgVGhyZWUuVGV4dHVyZUxvYWRlcih0aGlzLmxvYWRpbmdNYW5hZ2VyKTtcclxuICAgICAgdGhpcy5vYmpMb2FkZXIgPSBuZXcgT0JKTG9hZGVyKHRoaXMubG9hZGluZ01hbmFnZXIpO1xyXG4gICAgICB0aGlzLm10bExvYWRlciA9IG5ldyBNVExMb2FkZXIodGhpcy5sb2FkaW5nTWFuYWdlcik7XHJcbiAgICAgIHRoaXMubG9hZGluZ01hbmFnZXIub25Qcm9ncmVzcyA9IChpdGVtLCBsb2FkZWQsIHRvdGFsKSA9PiB0aGlzLnNldFN0YXRlKHsgbG9hZGVkLCB0b3RhbCB9KTtcclxuICAgICAgdGhpcy5sb2FkaW5nTWFuYWdlci5vbkxvYWQgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogZmFsc2UgfSk7XHJcbiAgICAgIGlmIChnbFJlbmRlcmVyLmF1dG9DbGVhciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5nbFJlbmRlcmVyLmF1dG9DbGVhciA9IGdsUmVuZGVyZXIuYXV0b0NsZWFyO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogZmFsc2UgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNzc1JlbmRlcmVyKSB7XHJcbiAgICAgIHRoaXMuY3NzUmVuZGVyZXIgPSBuZXcgQ1NTM0RSZW5kZXJlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwb3N0UHJvY2Vzc2luZykge1xyXG4gICAgICB0aGlzLmNvbXBvc2VyID0gbmV3IEVmZmVjdENvbXBvc2VyKHRoaXMuZ2xSZW5kZXJlcik7XHJcbiAgICAgIHRoaXMuY29tcG9zZXIuYWRkUGFzcyhuZXcgRWZmZWN0Q29tcG9zZXIuUmVuZGVyUGFzcyh0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSkpO1xyXG4gICAgfVxyXG5cclxuICAgIERlY29yYXRpb24ucHJvdG90eXBlLm1hbmFnZXIgPSB0aGlzO1xyXG4gICAgQWN0aW9uLnByb3RvdHlwZS5tYW5hZ2VyID0gdGhpcztcclxuICAgIE1vdGlvbi5wcm90b3R5cGUubWFuYWdlciA9IHRoaXM7XHJcbiAgICBDb250cm9sbGVyLnByb3RvdHlwZS5tYW5hZ2VyID0gdGhpcztcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgdGhpcy5nbENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmdsUmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcbiAgICB0aGlzLmNzc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNzc1JlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG4gICAgdGhpcy5hY3RpdmF0ZVNjZW5lKHRoaXMuYWN0aXZlU2NlbmUuaWQpO1xyXG4gICAgdGhpcy5zZXRFdmVudExpc3RlbmVycygpO1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICAgIHRoaXMucmVzaXplKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcblxyXG4gICAgY29uc3QgeyBsb2FkaW5nLCBsb2FkZWQsIHRvdGFsIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxGcmFnbWVudD5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICByZWY9e2MgPT4gdGhpcy5jb250YWluZXIgPSBjfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPXsnY29udGFpbmVyJ31cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIHJlZj17YyA9PiB0aGlzLmdsQ29udGFpbmVyID0gY31cclxuICAgICAgICAgICAgY2xhc3NOYW1lPXsncmVuZGVyZXItY29udGFpbmVyJ31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIHJlZj17YyA9PiB0aGlzLmNzc0NvbnRhaW5lciA9IGN9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17J3JlbmRlcmVyLWNvbnRhaW5lcid9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAge2xvYWRpbmcgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2xvYWRlci1jb250YWluZXInfT5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2xvYWRlci1jb250YWluZXIgZ3JhZGllbnQnfT5cclxuICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnbG9hZGVyJ31cclxuICAgICAgICAgICAgICAgICAgc3JjPXtsb2FkZXJ9XHJcbiAgICAgICAgICAgICAgICAgIGFsdD17J2xvYWRlcid9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydsb2FkZXIgdGV4dC1sb2FkZXInfT5cclxuICAgICAgICAgICAgICAgICAgTG9hZGluZyByZXNvdXJjZXMgKHtsb2FkZWR9IG9mIHt0b3RhbH0pXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHtDaGlsZHJlbi5tYXAodGhpcy5wcm9wcy5jaGlsZHJlbiwgY2hpbGQgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGNoaWxkID8gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7IHJlZjogYyA9PiB7XHJcbiAgICAgICAgICAgIGlmICghYyB8fCBjLnZpc3VhbC5wYXJlbnQgPT09IHRoaXMudmlzdWFsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5bYy5pZF0gPSBjO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChjLnZpc3VhbCk7XHJcbiAgICAgICAgICB9fSkgOiBmYWxzZTtcclxuICAgICAgICB9KX0gIFxyXG4gICAgICA8L0ZyYWdtZW50PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBzZXRFdmVudExpc3RlbmVyc1xyXG4gICAqIFNldCB3aW5kb3cgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICogb25Nb3VzZVN0b3AgLSBpbnRlcnNlY3RPYmplY3RzIHNob3VsZCBub3QgYmUgY2FsbGVkIGVhY2ggdGltZVxyXG4gICAqIHNpbmNlIHRoaXMgbGVhZHMgdG8gY3JpdGljYWwgZGVjcmVhc2Ugb2YgcGVyZm9ybWFuY2VcclxuICAgKi9cclxuICBzZXRFdmVudExpc3RlbmVycyA9ICgpID0+IHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKHsgY2xpZW50WCwgY2xpZW50WSB9KSA9PiB7XHJcblxyXG4gICAgICBjb25zdCB7IG9mZnNldFdpZHRoLCBvZmZzZXRIZWlnaHQgfSA9IHRoaXMuY29udGFpbmVyO1xyXG4gICAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gdGhpcy5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIHRoaXMubW91c2UueCA9ICgoY2xpZW50WCAtIGxlZnQpIC8gb2Zmc2V0V2lkdGgpICogMiAtIDE7XHJcbiAgICAgIHRoaXMubW91c2UueSA9IC0gKChjbGllbnRZIC0gdG9wKSAvIG9mZnNldEhlaWdodCkgKiAyICsgMTtcclxuICAgICAgXHJcbiAgICAgIGlmICh0aGlzLm9uTW91c2VTdG9wKSBjbGVhclRpbWVvdXQodGhpcy5vbk1vdXNlU3RvcCk7XHJcbiAgICAgIHRoaXMub25Nb3VzZVN0b3AgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmZpbmRJbnRlcnNlY3RzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJzZWN0cy5sZW5ndGgpIHtcclxuICAgICAgICAgIGNvbnN0IHZpc3VhbCA9IHRoaXMuaW50ZXJzZWN0c1swXS5vYmplY3Q7XHJcbiAgICAgICAgICBpZiAodmlzdWFsLm9uTW91c2VPdmVyKSB2aXN1YWwub25Nb3VzZU92ZXIodmlzdWFsKTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgfSwgMjUpO1xyXG4gICAgfSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmludGVyc2VjdHMubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgdmlzdWFsID0gdGhpcy5pbnRlcnNlY3RzWzBdLm9iamVjdDtcclxuICAgICAgICBpZiAodmlzdWFsLm9uQ2xpY2spIHZpc3VhbC5vbkNsaWNrKHZpc3VhbCk7ICBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuICBcclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gcmVzaXplXHJcbiAgICogVXBkYXRlIFJlbmRlcmVyIHNpemVzIGFuZCBhZGp1c3QgQ2FtZXJhIGFzcGVjdCByYXRpb24gYWNjb3JkaW5nIHRvIG5ldyBzaXplXHJcbiAgICovXHJcbiAgcmVzaXplID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBjbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0IH0gPSB0aGlzLmNvbnRhaW5lcjtcclxuICAgIHRoaXMuZ2xSZW5kZXJlci5zZXRTaXplKGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQpO1xyXG4gICAgdGhpcy5jc3NSZW5kZXJlci5zZXRTaXplKGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQpO1xyXG4gICAgaWYgKHRoaXMuaXNQUEVuYWJsZWQpIHtcclxuICAgICAgdGhpcy5jb21wb3Nlci5zZXRTaXplKGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gY2xpZW50V2lkdGggLyBjbGllbnRIZWlnaHQ7XHJcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIHVwZGF0ZVxyXG4gICAqIDEuIFVwZGF0ZSBjaGlsZHJlblxyXG4gICAqIDIuIEluIGNhc2UgcG9zdCBwcm9jZXNzaW5nIGVuYWJsZWQsIHJlbmRlciBjb21wb3NlciBvciBsYXllciBieSBsYXllclxyXG4gICAqIDMuIEluIGNhc2UgcG9zdCBwcm9jZXNzaW5nIGRpc2FibGVkLCByZW5kZXIgV2ViR0xSZW5kZXJlclxyXG4gICAqIDQuIFJlbmRlciBDU1MzRFJlbmRlcmVyXHJcbiAgICogNS4gVXBkYXRlIFR3ZWVuXHJcbiAgICovXHJcbiAgdXBkYXRlID0gKCkgPT4ge1xyXG4gICAgZm9yIChsZXQgayBpbiB0aGlzLmNoaWxkcmVuKSB7XHJcbiAgICAgIHRoaXMuY2hpbGRyZW5ba10udXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc1BQRW5hYmxlZCkge1xyXG4gICAgICBpZiAodGhpcy5pc0xheWVyUmVuZGVyaW5nKSB7XHJcbiAgICAgICAgZm9yIChsZXQgbCBpbiB0aGlzLmxheWVycykge1xyXG4gICAgICAgICAgdGhpcy5jYW1lcmEubGF5ZXJzLnNldCh0aGlzLmxheWVyc1tsXSk7XHJcbiAgICAgICAgICB0aGlzLmNvbXBvc2VyLnJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdsUmVuZGVyZXIuY2xlYXJEZXB0aCgpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLmxheWVycy5zZXQoMCk7XHJcbiAgICAgICAgdGhpcy5nbFJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jb21wb3Nlci5yZW5kZXIoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLmdsUmVuZGVyZXIpIHtcclxuICAgICAgdGhpcy5nbFJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jc3NSZW5kZXJlcikge1xyXG4gICAgICB0aGlzLmNzc1JlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XHJcbiAgICB9XHJcbiAgICBUV0VFTi51cGRhdGUoKTtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGZpbmRJbnRlcnNlY3RzXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjbGllbnRYXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGNsaWVudFlcclxuICAgKiBJbiBjYXNlIGdsRXZlbnRzIGFyZSBlbmFibGVkIGZvciBhY3RpdmUgU2NlbmUsIGdldCBpbnRlcnNlY3RlZCBvYmplY3RzXHJcbiAgICovXHJcbiAgZmluZEludGVyc2VjdHMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnJheWNhc3Rlci5zZXRGcm9tQ2FtZXJhKHRoaXMubW91c2UsIHRoaXMuY2FtZXJhKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZVNjZW5lLmdsRXZlbnRzKSB7XHJcbiAgICAgIHRoaXMuaW50ZXJzZWN0cyA9IHRoaXMucmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHModGhpcy5hY3RpdmVTY2VuZS52aXN1YWwuY2hpbGRyZW4sIHRydWUpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBhY3RpdmF0ZVNjZW5lXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xyXG4gICAqIEFjdGl2YXRlIFNjZW5lIGJ5IGlkXHJcbiAgICovXHJcbiAgYWN0aXZhdGVTY2VuZSA9IChpZCwgcGFyYW1zKSA9PiB7XHJcbiAgICBmb3IgKGxldCBrIGluIHRoaXMuY2hpbGRyZW4pIHtcclxuICAgICAgY29uc3Qgc2NlbmUgPSB0aGlzLmNoaWxkcmVuW2tdLmZpbmQoaWQpO1xyXG4gICAgICBpZiAoc2NlbmUpIHtcclxuICAgICAgICBbJ29uTW91c2VXaGVlbCcsICdvbk1vdXNlTW92ZScsICdvbkNsaWNrJywgJ29uS2V5VXAnXS5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICAgICAgd2luZG93W2UudG9Mb3dlckNhc2UoKV0gPSBzY2VuZS5wcm9wc1tlXSB8fCBudWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU2NlbmUgPSBzY2VuZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5hY3Rpb25zW2Ake2lkfTpBY3RpdmF0ZVNjZW5lYF0uYmVnaW4oe1xyXG4gICAgICBkdXJhdGlvbjogdGhpcy5hY3RpdmVTY2VuZS5wcm9wcy5hY3RpdmF0aW9uRHVyYXRpb24sXHJcbiAgICAgIC4uLnBhcmFtcyxcclxuICAgICAgZW5mb3JjZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGNvbm5lY3RBY3Rpb25zXHJcbiAgICogQHBhcmFtIHtEZWNvcmF0aW9ufSBkZWNvcmF0aW9uXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbnNcclxuICAgKiBMaW5rIEFjdGlvbnMgb2JqZWN0IHRvIGdpdmVuIERlY29yYXRpb25cclxuICAgKi9cclxuICBjb25uZWN0QWN0aW9ucyA9IChkZWNvcmF0aW9uLCBhY3Rpb25zKSA9PiB7XHJcbiAgICBmb3IgKGxldCBhIGluIGFjdGlvbnMpIHtcclxuICAgICAgaWYgKCF0aGlzLmFjdGlvbnNbYV0pIHRoaXMuYWN0aW9uc1thXSA9IG5ldyBBY3Rpb24oKTtcclxuICAgICAgdGhpcy5hY3Rpb25zW2FdLmFkZERlY29yYXRpb24oZGVjb3JhdGlvbiwgYWN0aW9uc1thXSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGdldEFjdGlvblxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAqIEdldCBBY3Rpb24gYnkgaWRcclxuICAgKi9cclxuICBnZXRBY3Rpb24gPSBpZCA9PiB0aGlzLmFjdGlvbnNbaWRdO1xyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gZXhlY0FjdGlvbnNTZXF1ZW5jZVxyXG4gICAqIEBwYXJhbSB7U3RyaW5nW119IGFjdGlvbklkc1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcclxuICAgKiBFeGVjdXRlIHNlcXVlbmNlIG9mIEFjdGlvbnNcclxuICAgKi9cclxuICBleGVjQWN0aW9uc1NlcXVlbmNlID0gKGFjdGlvbklkcywgcGFyYW1zKSA9PiB7XHJcbiAgICB0aGlzLmFjdGlvbnNbYWN0aW9uSWRzWzBdXS5iZWdpbih0aGlzLmJ1aWxkQWN0aW9uc1NlcXVlbmNlKGFjdGlvbklkcywgMSwgcGFyYW1zKSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGJ1aWxkQWN0aW9uc1NlcXVlbmNlXHJcbiAgICogQHBhcmFtIHtTdHJpbmdbXX0gYWN0aW9uSWRzXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xyXG4gICAqIEJ1aWxkIEFjdGlvbnMgc2VxdWVuY2VcclxuICAgKi9cclxuICBidWlsZEFjdGlvbnNTZXF1ZW5jZSA9IChhY3Rpb25JZHMsIGluZGV4LCBwYXJhbXMpID0+IHtcclxuICAgIGNvbnN0IHAgPSB7IC4uLnBhcmFtcyB9O1xyXG4gICAgaWYgKGFjdGlvbklkc1tpbmRleF0pIHtcclxuICAgICAgcC5jYWxsYmFjayA9ICgpID0+IHRoaXMuYWN0aW9uc1thY3Rpb25JZHNbaW5kZXhdXS5iZWdpbihwYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZGV4IDwgYWN0aW9uSWRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgcGFyYW1zID0gdGhpcy5idWlsZEFjdGlvbnNTZXF1ZW5jZShhY3Rpb25JZHMsIGluZGV4ICsgMSwgcGFyYW1zKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBzZXRQUEVmZmVjdHNcclxuICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBlZmZlY3RzXHJcbiAgICogU2V0IHBvc3QgcHJvY2Vzc2luZyBlZmZlY3RzIG9ubHkgZm9yIGRlc2t0b3BcclxuICAgKi9cclxuICBzZXRQUEVmZmVjdHMgPSBlZmZlY3RzID0+IHtcclxuXHJcbiAgICBjb25zdCB7IGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQgfSA9IHRoaXMuY29udGFpbmVyO1xyXG4gICAgY29uc3QgcHAgPSB0aGlzLnByb3BzLnBvc3RQcm9jZXNzaW5nO1xyXG5cclxuICAgIGlmICghcHAgfHwgdGhpcy5pc01vYmlsZURldmljZSgpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWVmZmVjdHMgfHwgIWVmZmVjdHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5pc1BQRW5hYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLmNvbXBvc2VyLnBhc3Nlcy5sZW5ndGggPSAxO1xyXG5cclxuICAgIGVmZmVjdHMuZm9yRWFjaCgoZWZmLCBlaSkgPT4ge1xyXG4gICAgICBsZXQgcHBFZmZlY3QgPSBudWxsO1xyXG4gICAgICBpZiAoZWZmLmluZGV4T2YoJ1NoYWRlcicpID09PSAtMSkge1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHBwW2VmZl0ucGFyYW1zIHx8IFtdO1xyXG4gICAgICAgIHBwRWZmZWN0ID0gbmV3IEVmZmVjdENvbXBvc2VyW2Ake2VmZn1QYXNzYF0oLi4ucGFyYW1zKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwcEVmZmVjdCA9IG5ldyBFZmZlY3RDb21wb3Nlci5TaGFkZXJQYXNzKHBwW2VmZl0uc3JjKTtcclxuICAgICAgICBpZiAocHBbZWZmXS51bmlmb3Jtcykge1xyXG4gICAgICAgICAgZm9yIChsZXQgdSBpbiBwcFtlZmZdLnVuaWZvcm1zKSB7XHJcbiAgICAgICAgICAgIHBwRWZmZWN0LnVuaWZvcm1zW3VdLnZhbHVlID0gcHBbZWZmXS51bmlmb3Jtc1t1XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcHBFZmZlY3QucmVuZGVyVG9TY3JlZW4gPSBlaSA9PT0gZWZmZWN0cy5sZW5ndGggLSAxO1xyXG4gICAgICB0aGlzLmNvbXBvc2VyLmFkZFBhc3MocHBFZmZlY3QpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNvbXBvc2VyLnNldFNpemUoY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGVuYWJsZVBvc3RQcm9jZXNzaW5nXHJcbiAgICogQHBhcmFtIHtCb29sZWFufSBlbmFibGVkXHJcbiAgICogRW5hYmxlIC8gZGlzYWJsZSBwb3N0IHByb2Nlc3NpbmdcclxuICAgKi9cclxuICBlbmFibGVQb3N0UHJvY2Vzc2luZyA9IGVuYWJsZWQgPT4gdGhpcy5pc1BQRW5hYmxlZCA9IGVuYWJsZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBlbmFibGVMYXllclJlbmRlcmluZ1xyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gZW5hYmxlZFxyXG4gICAqIEVuYWJsZSAvIGRpc2FibGUgbGF5ZXIgYnkgbGF5ZXIgcmVuZGVyaW5nXHJcbiAgICovXHJcbiAgZW5hYmxlTGF5ZXJSZW5kZXJpbmcgPSBlbmFibGVkID0+IHRoaXMuaXNMYXllclJlbmRlcmluZyA9IGVuYWJsZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBpc01vYmlsZVNjcmVlblxyXG4gICAqIENoZWNrIGN1cnJlbnQgY2xpZW50IHdpZHRoXHJcbiAgICovXHJcbiAgaXNNb2JpbGVTY3JlZW4gPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGggPD0gY29uZmlnLk1PQklMRV9TQ1JFRU5fV0lEVEg7XHJcbiAgfTtcclxuICBcclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gaXNNb2JpbGVEZXZpY2VcclxuICAgKiBEZXRlY3QgbW9iaWxlIGRldmljZSB1c2luZyBuYXZpZ2F0b3IudXNlckFnZW50XHJcbiAgICovXHJcbiAgaXNNb2JpbGVEZXZpY2UgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKVxyXG4gICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC93ZWJPUy9pKVxyXG4gICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmUvaSlcclxuICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBhZC9pKVxyXG4gICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUG9kL2kpXHJcbiAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvaSlcclxuICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvV2luZG93cyBQaG9uZS9pKTtcclxuICB9O1xyXG4gIFxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBjYXBpdGFsaXplXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHZcclxuICAgKiBDYXBpdGFsaXplIHN0cmluZ1xyXG4gICAqL1xyXG4gIGNhcGl0YWxpemUgPSB2ID0+IHYuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB2LnNsaWNlKDEpO1xyXG4gIFxyXG59XHJcbiJdfQ==