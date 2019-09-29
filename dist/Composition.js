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

      if (_this.activeScene) {
        if (_this.activeScene.glEvents) {
          _this.intersects = _this.raycaster.intersectObjects(_this.activeScene.visual.children, true);
        }
      } else {
        _this.intersects = _this.raycaster.intersectObjects(_this.scene.children, true);
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
      _this.state.loading = false;
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
      }, "Loading resources (", loaded, " of ", total, ")")))), _react.Children.map(this.props.children, function (child) {
        return child ? _react["default"].cloneElement(child, {
          ref: function ref(c) {
            if (!c || c.visual.parent === _this3.visual) return false;
            _this3.children[c.id] = c;

            _this3.scene.add(c.visual);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db21wb3NpdGlvbi5qcyJdLCJuYW1lcyI6WyJDb21wb3NpdGlvbiIsImNhbWVyYSIsImdsUmVuZGVyZXIiLCJjc3NSZW5kZXJlciIsInBvc3RQcm9jZXNzaW5nIiwibGF5ZXJSZW5kZXJpbmciLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplIiwiY2xpZW50WCIsImNsaWVudFkiLCJjb250YWluZXIiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImxlZnQiLCJtb3VzZSIsIngiLCJ5Iiwib25Nb3VzZVN0b3AiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiZmluZEludGVyc2VjdHMiLCJpbnRlcnNlY3RzIiwibGVuZ3RoIiwidmlzdWFsIiwib2JqZWN0Iiwib25Nb3VzZU92ZXIiLCJvbkNsaWNrIiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJzZXRTaXplIiwiaXNQUEVuYWJsZWQiLCJjb21wb3NlciIsImFzcGVjdCIsInVwZGF0ZVByb2plY3Rpb25NYXRyaXgiLCJrIiwiY2hpbGRyZW4iLCJ1cGRhdGUiLCJpc0xheWVyUmVuZGVyaW5nIiwibCIsImxheWVycyIsInNldCIsInJlbmRlciIsImNsZWFyRGVwdGgiLCJzY2VuZSIsIlRXRUVOIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicmF5Y2FzdGVyIiwic2V0RnJvbUNhbWVyYSIsImFjdGl2ZVNjZW5lIiwiZ2xFdmVudHMiLCJpbnRlcnNlY3RPYmplY3RzIiwiaWQiLCJwYXJhbXMiLCJmaW5kIiwiZm9yRWFjaCIsImUiLCJ0b0xvd2VyQ2FzZSIsInByb3BzIiwiYWN0aW9ucyIsImJlZ2luIiwiZHVyYXRpb24iLCJhY3RpdmF0aW9uRHVyYXRpb24iLCJlbmZvcmNlIiwiZGVjb3JhdGlvbiIsImEiLCJBY3Rpb24iLCJhZGREZWNvcmF0aW9uIiwiYWN0aW9uSWRzIiwiYnVpbGRBY3Rpb25zU2VxdWVuY2UiLCJpbmRleCIsInAiLCJjYWxsYmFjayIsImVmZmVjdHMiLCJwcCIsImlzTW9iaWxlRGV2aWNlIiwicGFzc2VzIiwiZWZmIiwiZWkiLCJwcEVmZmVjdCIsImluZGV4T2YiLCJFZmZlY3RDb21wb3NlciIsIlNoYWRlclBhc3MiLCJzcmMiLCJ1bmlmb3JtcyIsInUiLCJ2YWx1ZSIsInJlbmRlclRvU2NyZWVuIiwiYWRkUGFzcyIsImVuYWJsZWQiLCJjb25maWciLCJNT0JJTEVfU0NSRUVOX1dJRFRIIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibWF0Y2giLCJ2IiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInN0YXRlIiwibG9hZGluZyIsImxvYWRlZCIsInRvdGFsIiwiaXNBY3Rpb25zRW5hYmxlZCIsIlRocmVlIiwiVmVjdG9yMiIsIlNjZW5lIiwiY2FwaXRhbGl6ZSIsInR5cGUiLCJmb3YiLCJuZWFyIiwiZmFyIiwiV2ViR0xSZW5kZXJlciIsInNldFBpeGVsUmF0aW8iLCJkZXZpY2VQaXhlbFJhdGlvIiwiUmF5Y2FzdGVyIiwibG9hZGluZ01hbmFnZXIiLCJMb2FkaW5nTWFuYWdlciIsInRleHR1cmVMb2FkZXIiLCJUZXh0dXJlTG9hZGVyIiwib2JqTG9hZGVyIiwiT0JKTG9hZGVyIiwibXRsTG9hZGVyIiwiTVRMTG9hZGVyIiwib25Qcm9ncmVzcyIsIml0ZW0iLCJzZXRTdGF0ZSIsIm9uTG9hZCIsImF1dG9DbGVhciIsInVuZGVmaW5lZCIsIkNTUzNEUmVuZGVyZXIiLCJSZW5kZXJQYXNzIiwiRGVjb3JhdGlvbiIsInByb3RvdHlwZSIsIm1hbmFnZXIiLCJNb3Rpb24iLCJDb250cm9sbGVyIiwiZ2xDb250YWluZXIiLCJhcHBlbmRDaGlsZCIsImRvbUVsZW1lbnQiLCJjc3NDb250YWluZXIiLCJhY3RpdmF0ZVNjZW5lIiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJjIiwibG9hZGVyIiwiQ2hpbGRyZW4iLCJtYXAiLCJjaGlsZCIsIlJlYWN0IiwiY2xvbmVFbGVtZW50IiwicmVmIiwi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UUFBQSxTQUFTLEVBQUU7QUFBaEIsZ0NBQ3NCM0MsTUFEdEIsVUFDa0NDLEtBRGxDLE1BTkYsQ0FERixDQWJKLENBREYsRUE0QkcyQyxnQkFBU0MsR0FBVCxDQUFhLEtBQUt4RixLQUFMLENBQVd0QixRQUF4QixFQUFrQyxVQUFBK0csS0FBSyxFQUFJO0FBQzFDLGVBQU9BLEtBQUssR0FBR0Msa0JBQU1DLFlBQU4sQ0FBbUJGLEtBQW5CLEVBQTBCO0FBQUVHLFVBQUFBLEdBQUcsRUFBRSxhQUFBUCxDQUFDLEVBQUk7QUFDbkQsZ0JBQUksQ0FBQ0EsQ0FBRCxJQUFNQSxDQUFDLENBQUN2SCxNQUFGLENBQVMrSCxNQUFULEtBQW9CLE1BQUksQ0FBQy9ILE1BQW5DLEVBQTJDLE9BQU8sS0FBUDtBQUMzQyxZQUFBLE1BQUksQ0FBQ1ksUUFBTCxDQUFjMkcsQ0FBQyxDQUFDM0YsRUFBaEIsSUFBc0IyRixDQUF0Qjs7QUFDQSxZQUFBLE1BQUksQ0FBQ25HLEtBQUwsQ0FBVzRHLEdBQVgsQ0FBZVQsQ0FBQyxDQUFDdkgsTUFBakI7QUFDRDtBQUp3QyxTQUExQixDQUFILEdBSU4sS0FKTjtBQUtELE9BTkEsQ0E1QkgsQ0FERjtBQXNDRDtBQUVEOzs7Ozs7Ozs7O0VBekkrQmlJLGdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIEBhdXRob3IgU2tvbW9yb3hcclxuICogdjMuMC4wXHJcbiAqXHJcbiAqIEBjbGFzcyBDb21wb3NpdGlvblxyXG4gKiBBYnN0cmFjdDogQ2xhc3MgQ29tcG9zaXRpb25cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgQ2hpbGRyZW4sIEZyYWdtZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBUaHJlZSBmcm9tICd0aHJlZSc7XHJcbmltcG9ydCB7IENTUzNEUmVuZGVyZXIgfSBmcm9tICd0aHJlZS1yZW5kZXJlci1jc3MzZCc7XHJcbmltcG9ydCB7IE9CSkxvYWRlciwgTVRMTG9hZGVyIH0gZnJvbSAndGhyZWUtb2JqLW10bC1sb2FkZXInO1xyXG5pbXBvcnQgeyBFZmZlY3RDb21wb3NlciB9IGZyb20gJy4vRWZmZWN0Q29tcG9zZXIvRWZmZWN0Q29tcG9zZXInO1xyXG5pbXBvcnQgeyBEZWNvcmF0aW9uIH0gZnJvbSAnLi9EZWNvcmF0aW9uL0RlY29yYXRpb24nO1xyXG5pbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSAnLi9Db250cm9sbGVyJztcclxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi9BY3Rpb24nO1xyXG5pbXBvcnQgeyBNb3Rpb24gfSBmcm9tICcuL01vdGlvbic7XHJcbmltcG9ydCBUV0VFTiBmcm9tICdAdHdlZW5qcy90d2Vlbi5qcyc7XHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xyXG5pbXBvcnQgJy4uL2Nzcy9zdHlsZXMuY3NzJztcclxuaW1wb3J0IGxvYWRlciBmcm9tICcuLi9pbWFnZXMvbG9hZGVyLmdpZic7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9zaXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIFxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBjb25zdHJ1Y3RvclxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcclxuICAgKiBAcGFyYW0ge09iamVjdH0gY2FtZXJhXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGdsUmVuZGVyZXJcclxuICAgKiBAcGFyYW0ge09iamVjdH0gY3NzUmVuZGVyZXJcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcG9zdFByb2Nlc3NpbmdcclxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGxheWVyUmVuZGVyaW5nXHJcbiAgICogXHJcbiAgICogSW5pdCBhcHBsaWNhdGlvblxyXG4gICAqIDEuIFNldHVwIG1vdXNlLCBnbG9iYWwgU2NlbmUgYW5kIENhbWVyYVxyXG4gICAqIDIuIFNldHVwIFRIUkVFLldlYkdMUmVuZGVyZXJcclxuICAgKiAzLiBTZXR1cCBUSFJFRS5DU1MzRFJlbmRlcmVyXHJcbiAgICogNC4gU2V0dXAgVEhSRUUuRWZmZWN0Q29tcG9zZXJcclxuICAgKiA1LiBJbmplY3QgdGhpcyBhcyBtYW5hZ2VyIGluIERlY29yYXRpb24sIEFjdGlvbiwgTW90aW9uLCBDb250cm9sbGVyIGNsYXNzZXNcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih7IGNhbWVyYSwgZ2xSZW5kZXJlciwgY3NzUmVuZGVyZXIsIHBvc3RQcm9jZXNzaW5nLCBsYXllclJlbmRlcmluZyB9KSB7XHJcblxyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGxvYWRpbmc6IHRydWUsXHJcbiAgICAgIGxvYWRlZDogMCxcclxuICAgICAgdG90YWw6IDBcclxuICAgIH07XHJcbiAgICB0aGlzLmNoaWxkcmVuID0ge307XHJcbiAgICB0aGlzLmFjdGlvbnMgPSB7fTtcclxuICAgIHRoaXMubGF5ZXJzID0ge307XHJcbiAgICB0aGlzLmludGVyc2VjdHMgPSBbXTtcclxuICAgIHRoaXMuaXNQUEVuYWJsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNBY3Rpb25zRW5hYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLmlzTGF5ZXJSZW5kZXJpbmcgPSBsYXllclJlbmRlcmluZyB8fCBmYWxzZTtcclxuICAgIHRoaXMubW91c2UgPSBuZXcgVGhyZWUuVmVjdG9yMigtMSwgLTEpO1xyXG4gICAgdGhpcy5zY2VuZSA9IG5ldyBUaHJlZS5TY2VuZSgpO1xyXG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgVGhyZWVbYCR7dGhpcy5jYXBpdGFsaXplKGNhbWVyYS50eXBlKX1DYW1lcmFgXShcclxuICAgICAgY2FtZXJhLmZvdiwgMSxcclxuICAgICAgY2FtZXJhLm5lYXIsXHJcbiAgICAgIGNhbWVyYS5mYXJcclxuICAgICk7XHJcblxyXG4gICAgaWYgKGdsUmVuZGVyZXIpIHtcclxuICAgICAgdGhpcy5nbFJlbmRlcmVyID0gbmV3IFRocmVlLldlYkdMUmVuZGVyZXIoZ2xSZW5kZXJlcik7XHJcbiAgICAgIHRoaXMuZ2xSZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcclxuICAgICAgdGhpcy5yYXljYXN0ZXIgPSBuZXcgVGhyZWUuUmF5Y2FzdGVyKCk7XHJcbiAgICAgIHRoaXMubG9hZGluZ01hbmFnZXIgPSBuZXcgVGhyZWUuTG9hZGluZ01hbmFnZXIoKTtcclxuICAgICAgdGhpcy50ZXh0dXJlTG9hZGVyID0gbmV3IFRocmVlLlRleHR1cmVMb2FkZXIodGhpcy5sb2FkaW5nTWFuYWdlcik7XHJcbiAgICAgIHRoaXMub2JqTG9hZGVyID0gbmV3IE9CSkxvYWRlcih0aGlzLmxvYWRpbmdNYW5hZ2VyKTtcclxuICAgICAgdGhpcy5tdGxMb2FkZXIgPSBuZXcgTVRMTG9hZGVyKHRoaXMubG9hZGluZ01hbmFnZXIpO1xyXG4gICAgICB0aGlzLmxvYWRpbmdNYW5hZ2VyLm9uUHJvZ3Jlc3MgPSAoaXRlbSwgbG9hZGVkLCB0b3RhbCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGxvYWRlZCwgdG90YWwgfSk7XHJcbiAgICAgIHRoaXMubG9hZGluZ01hbmFnZXIub25Mb2FkID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IGZhbHNlIH0pO1xyXG4gICAgICBpZiAoZ2xSZW5kZXJlci5hdXRvQ2xlYXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuZ2xSZW5kZXJlci5hdXRvQ2xlYXIgPSBnbFJlbmRlcmVyLmF1dG9DbGVhcjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zdGF0ZS5sb2FkaW5nID0gZmFsc2U7IFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjc3NSZW5kZXJlcikge1xyXG4gICAgICB0aGlzLmNzc1JlbmRlcmVyID0gbmV3IENTUzNEUmVuZGVyZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocG9zdFByb2Nlc3NpbmcpIHtcclxuICAgICAgdGhpcy5jb21wb3NlciA9IG5ldyBFZmZlY3RDb21wb3Nlcih0aGlzLmdsUmVuZGVyZXIpO1xyXG4gICAgICB0aGlzLmNvbXBvc2VyLmFkZFBhc3MobmV3IEVmZmVjdENvbXBvc2VyLlJlbmRlclBhc3ModGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpKTtcclxuICAgIH1cclxuXHJcbiAgICBEZWNvcmF0aW9uLnByb3RvdHlwZS5tYW5hZ2VyID0gdGhpcztcclxuICAgIEFjdGlvbi5wcm90b3R5cGUubWFuYWdlciA9IHRoaXM7XHJcbiAgICBNb3Rpb24ucHJvdG90eXBlLm1hbmFnZXIgPSB0aGlzO1xyXG4gICAgQ29udHJvbGxlci5wcm90b3R5cGUubWFuYWdlciA9IHRoaXM7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGlmICh0aGlzLmdsUmVuZGVyZXIpIHtcclxuICAgICAgdGhpcy5nbENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmdsUmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS50b3RhbCkge1xyXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IGZhbHNlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgMTAwKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmNzc1JlbmRlcmVyKSB7XHJcbiAgICAgIHRoaXMuY3NzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY3NzUmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5hY3RpdmVTY2VuZSkge1xyXG4gICAgICB0aGlzLmFjdGl2YXRlU2NlbmUodGhpcy5hY3RpdmVTY2VuZS5pZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgdGhpcy5yZXNpemUoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuXHJcbiAgICBjb25zdCB7IGxvYWRpbmcsIGxvYWRlZCwgdG90YWwgfSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEZyYWdtZW50PlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIHJlZj17YyA9PiB0aGlzLmNvbnRhaW5lciA9IGN9XHJcbiAgICAgICAgICBjbGFzc05hbWU9eydjb250YWluZXInfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgcmVmPXtjID0+IHRoaXMuZ2xDb250YWluZXIgPSBjfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9eydyZW5kZXJlci1jb250YWluZXInfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgcmVmPXtjID0+IHRoaXMuY3NzQ29udGFpbmVyID0gY31cclxuICAgICAgICAgICAgY2xhc3NOYW1lPXsncmVuZGVyZXItY29udGFpbmVyJ31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICB7bG9hZGluZyAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnbG9hZGVyLWNvbnRhaW5lcid9PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnbG9hZGVyLWNvbnRhaW5lciBncmFkaWVudCd9PlxyXG4gICAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydsb2FkZXInfVxyXG4gICAgICAgICAgICAgICAgICBzcmM9e2xvYWRlcn1cclxuICAgICAgICAgICAgICAgICAgYWx0PXsnbG9hZGVyJ31cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2xvYWRlciB0ZXh0LWxvYWRlcid9PlxyXG4gICAgICAgICAgICAgICAgICBMb2FkaW5nIHJlc291cmNlcyAoe2xvYWRlZH0gb2Yge3RvdGFsfSlcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAge0NoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuLCBjaGlsZCA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gY2hpbGQgPyBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHsgcmVmOiBjID0+IHtcclxuICAgICAgICAgICAgaWYgKCFjIHx8IGMudmlzdWFsLnBhcmVudCA9PT0gdGhpcy52aXN1YWwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltjLmlkXSA9IGM7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKGMudmlzdWFsKTtcclxuICAgICAgICAgIH19KSA6IGZhbHNlO1xyXG4gICAgICAgIH0pfSAgXHJcbiAgICAgIDwvRnJhZ21lbnQ+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIHNldEV2ZW50TGlzdGVuZXJzXHJcbiAgICogU2V0IHdpbmRvdyBldmVudCBsaXN0ZW5lcnNcclxuICAgKiBvbk1vdXNlU3RvcCAtIGludGVyc2VjdE9iamVjdHMgc2hvdWxkIG5vdCBiZSBjYWxsZWQgZWFjaCB0aW1lXHJcbiAgICogc2luY2UgdGhpcyBsZWFkcyB0byBjcml0aWNhbCBkZWNyZWFzZSBvZiBwZXJmb3JtYW5jZVxyXG4gICAqL1xyXG4gIHNldEV2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoeyBjbGllbnRYLCBjbGllbnRZIH0pID0+IHtcclxuXHJcbiAgICAgIGNvbnN0IHsgb2Zmc2V0V2lkdGgsIG9mZnNldEhlaWdodCB9ID0gdGhpcy5jb250YWluZXI7XHJcbiAgICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgdGhpcy5tb3VzZS54ID0gKChjbGllbnRYIC0gbGVmdCkgLyBvZmZzZXRXaWR0aCkgKiAyIC0gMTtcclxuICAgICAgdGhpcy5tb3VzZS55ID0gLSAoKGNsaWVudFkgLSB0b3ApIC8gb2Zmc2V0SGVpZ2h0KSAqIDIgKyAxO1xyXG4gICAgICBcclxuICAgICAgaWYgKHRoaXMuZ2xSZW5kZXJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLm9uTW91c2VTdG9wKSBjbGVhclRpbWVvdXQodGhpcy5vbk1vdXNlU3RvcCk7XHJcbiAgICAgICAgdGhpcy5vbk1vdXNlU3RvcCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5maW5kSW50ZXJzZWN0cygpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuaW50ZXJzZWN0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgdmlzdWFsID0gdGhpcy5pbnRlcnNlY3RzWzBdLm9iamVjdDtcclxuICAgICAgICAgICAgaWYgKHZpc3VhbC5vbk1vdXNlT3ZlcikgdmlzdWFsLm9uTW91c2VPdmVyKHZpc3VhbCk7ICBcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCAyNSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5pbnRlcnNlY3RzLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IHZpc3VhbCA9IHRoaXMuaW50ZXJzZWN0c1swXS5vYmplY3Q7XHJcbiAgICAgICAgaWYgKHZpc3VhbC5vbkNsaWNrKSB2aXN1YWwub25DbGljayh2aXN1YWwpOyAgXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIHJlc2l6ZVxyXG4gICAqIFVwZGF0ZSBSZW5kZXJlciBzaXplcyBhbmQgYWRqdXN0IENhbWVyYSBhc3BlY3QgcmF0aW9uIGFjY29yZGluZyB0byBuZXcgc2l6ZVxyXG4gICAqL1xyXG4gIHJlc2l6ZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCB9ID0gdGhpcy5jb250YWluZXI7XHJcbiAgICBpZiAodGhpcy5nbFJlbmRlcmVyKSB7XHJcbiAgICAgIHRoaXMuZ2xSZW5kZXJlci5zZXRTaXplKGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY3NzUmVuZGVyZXIpIHtcclxuICAgICAgdGhpcy5jc3NSZW5kZXJlci5zZXRTaXplKGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNQUEVuYWJsZWQpIHtcclxuICAgICAgdGhpcy5jb21wb3Nlci5zZXRTaXplKGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gY2xpZW50V2lkdGggLyBjbGllbnRIZWlnaHQ7XHJcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIHVwZGF0ZVxyXG4gICAqIDEuIFVwZGF0ZSBjaGlsZHJlblxyXG4gICAqIDIuIEluIGNhc2UgcG9zdCBwcm9jZXNzaW5nIGVuYWJsZWQsIHJlbmRlciBjb21wb3NlciBvciBsYXllciBieSBsYXllclxyXG4gICAqIDMuIEluIGNhc2UgcG9zdCBwcm9jZXNzaW5nIGRpc2FibGVkLCByZW5kZXIgV2ViR0xSZW5kZXJlclxyXG4gICAqIDQuIFJlbmRlciBDU1MzRFJlbmRlcmVyXHJcbiAgICogNS4gVXBkYXRlIFR3ZWVuXHJcbiAgICovXHJcbiAgdXBkYXRlID0gKCkgPT4ge1xyXG4gICAgZm9yIChsZXQgayBpbiB0aGlzLmNoaWxkcmVuKSB7XHJcbiAgICAgIHRoaXMuY2hpbGRyZW5ba10udXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc1BQRW5hYmxlZCkge1xyXG4gICAgICBpZiAodGhpcy5pc0xheWVyUmVuZGVyaW5nKSB7XHJcbiAgICAgICAgZm9yIChsZXQgbCBpbiB0aGlzLmxheWVycykge1xyXG4gICAgICAgICAgdGhpcy5jYW1lcmEubGF5ZXJzLnNldCh0aGlzLmxheWVyc1tsXSk7XHJcbiAgICAgICAgICB0aGlzLmNvbXBvc2VyLnJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdsUmVuZGVyZXIuY2xlYXJEZXB0aCgpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLmxheWVycy5zZXQoMCk7XHJcbiAgICAgICAgdGhpcy5nbFJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jb21wb3Nlci5yZW5kZXIoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLmdsUmVuZGVyZXIpIHtcclxuICAgICAgdGhpcy5nbFJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jc3NSZW5kZXJlcikge1xyXG4gICAgICB0aGlzLmNzc1JlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XHJcbiAgICB9XHJcbiAgICBUV0VFTi51cGRhdGUoKTtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGZpbmRJbnRlcnNlY3RzXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjbGllbnRYXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGNsaWVudFlcclxuICAgKiBJbiBjYXNlIGdsRXZlbnRzIGFyZSBlbmFibGVkIGZvciBhY3RpdmUgU2NlbmUsIGdldCBpbnRlcnNlY3RlZCBvYmplY3RzXHJcbiAgICovXHJcbiAgZmluZEludGVyc2VjdHMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnJheWNhc3Rlci5zZXRGcm9tQ2FtZXJhKHRoaXMubW91c2UsIHRoaXMuY2FtZXJhKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZVNjZW5lKSB7XHJcbiAgICAgIGlmICh0aGlzLmFjdGl2ZVNjZW5lLmdsRXZlbnRzKSB7XHJcbiAgICAgICAgdGhpcy5pbnRlcnNlY3RzID0gdGhpcy5yYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0cyh0aGlzLmFjdGl2ZVNjZW5lLnZpc3VhbC5jaGlsZHJlbiwgdHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW50ZXJzZWN0cyA9IHRoaXMucmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHModGhpcy5zY2VuZS5jaGlsZHJlbiwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGFjdGl2YXRlU2NlbmVcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXHJcbiAgICogQWN0aXZhdGUgU2NlbmUgYnkgaWRcclxuICAgKi9cclxuICBhY3RpdmF0ZVNjZW5lID0gKGlkLCBwYXJhbXMpID0+IHtcclxuICAgIGZvciAobGV0IGsgaW4gdGhpcy5jaGlsZHJlbikge1xyXG4gICAgICBjb25zdCBzY2VuZSA9IHRoaXMuY2hpbGRyZW5ba10uZmluZChpZCk7XHJcbiAgICAgIGlmIChzY2VuZSkge1xyXG4gICAgICAgIFsnb25Nb3VzZVdoZWVsJywgJ29uTW91c2VNb3ZlJywgJ29uQ2xpY2snLCAnb25LZXlVcCddLmZvckVhY2goZSA9PiB7XHJcbiAgICAgICAgICB3aW5kb3dbZS50b0xvd2VyQ2FzZSgpXSA9IHNjZW5lLnByb3BzW2VdIHx8IG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTY2VuZSA9IHNjZW5lO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGlvbnNbYCR7aWR9OkFjdGl2YXRlU2NlbmVgXS5iZWdpbih7XHJcbiAgICAgIGR1cmF0aW9uOiB0aGlzLmFjdGl2ZVNjZW5lLnByb3BzLmFjdGl2YXRpb25EdXJhdGlvbixcclxuICAgICAgLi4ucGFyYW1zLFxyXG4gICAgICBlbmZvcmNlOiB0cnVlXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gY29ubmVjdEFjdGlvbnNcclxuICAgKiBAcGFyYW0ge0RlY29yYXRpb259IGRlY29yYXRpb25cclxuICAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uc1xyXG4gICAqIExpbmsgQWN0aW9ucyBvYmplY3QgdG8gZ2l2ZW4gRGVjb3JhdGlvblxyXG4gICAqL1xyXG4gIGNvbm5lY3RBY3Rpb25zID0gKGRlY29yYXRpb24sIGFjdGlvbnMpID0+IHtcclxuICAgIGZvciAobGV0IGEgaW4gYWN0aW9ucykge1xyXG4gICAgICBpZiAoIXRoaXMuYWN0aW9uc1thXSkgdGhpcy5hY3Rpb25zW2FdID0gbmV3IEFjdGlvbigpO1xyXG4gICAgICB0aGlzLmFjdGlvbnNbYV0uYWRkRGVjb3JhdGlvbihkZWNvcmF0aW9uLCBhY3Rpb25zW2FdKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gZ2V0QWN0aW9uXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICogR2V0IEFjdGlvbiBieSBpZFxyXG4gICAqL1xyXG4gIGdldEFjdGlvbiA9IGlkID0+IHRoaXMuYWN0aW9uc1tpZF07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBleGVjQWN0aW9uc1NlcXVlbmNlXHJcbiAgICogQHBhcmFtIHtTdHJpbmdbXX0gYWN0aW9uSWRzXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xyXG4gICAqIEV4ZWN1dGUgc2VxdWVuY2Ugb2YgQWN0aW9uc1xyXG4gICAqL1xyXG4gIGV4ZWNBY3Rpb25zU2VxdWVuY2UgPSAoYWN0aW9uSWRzLCBwYXJhbXMpID0+IHtcclxuICAgIHRoaXMuYWN0aW9uc1thY3Rpb25JZHNbMF1dLmJlZ2luKHRoaXMuYnVpbGRBY3Rpb25zU2VxdWVuY2UoYWN0aW9uSWRzLCAxLCBwYXJhbXMpKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gYnVpbGRBY3Rpb25zU2VxdWVuY2VcclxuICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBhY3Rpb25JZHNcclxuICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXHJcbiAgICogQnVpbGQgQWN0aW9ucyBzZXF1ZW5jZVxyXG4gICAqL1xyXG4gIGJ1aWxkQWN0aW9uc1NlcXVlbmNlID0gKGFjdGlvbklkcywgaW5kZXgsIHBhcmFtcykgPT4ge1xyXG4gICAgY29uc3QgcCA9IHsgLi4ucGFyYW1zIH07XHJcbiAgICBpZiAoYWN0aW9uSWRzW2luZGV4XSkge1xyXG4gICAgICBwLmNhbGxiYWNrID0gKCkgPT4gdGhpcy5hY3Rpb25zW2FjdGlvbklkc1tpbmRleF1dLmJlZ2luKHBhcmFtcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoaW5kZXggPCBhY3Rpb25JZHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICBwYXJhbXMgPSB0aGlzLmJ1aWxkQWN0aW9uc1NlcXVlbmNlKGFjdGlvbklkcywgaW5kZXggKyAxLCBwYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHA7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIHNldFBQRWZmZWN0c1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nW119IGVmZmVjdHNcclxuICAgKiBTZXQgcG9zdCBwcm9jZXNzaW5nIGVmZmVjdHMgb25seSBmb3IgZGVza3RvcFxyXG4gICAqL1xyXG4gIHNldFBQRWZmZWN0cyA9IGVmZmVjdHMgPT4ge1xyXG5cclxuICAgIGNvbnN0IHsgY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCB9ID0gdGhpcy5jb250YWluZXI7XHJcbiAgICBjb25zdCBwcCA9IHRoaXMucHJvcHMucG9zdFByb2Nlc3Npbmc7XHJcblxyXG4gICAgaWYgKCFwcCB8fCB0aGlzLmlzTW9iaWxlRGV2aWNlKCkpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghZWZmZWN0cyB8fCAhZWZmZWN0cy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmlzUFBFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuY29tcG9zZXIucGFzc2VzLmxlbmd0aCA9IDE7XHJcblxyXG4gICAgZWZmZWN0cy5mb3JFYWNoKChlZmYsIGVpKSA9PiB7XHJcbiAgICAgIGxldCBwcEVmZmVjdCA9IG51bGw7XHJcbiAgICAgIGlmIChlZmYuaW5kZXhPZignU2hhZGVyJykgPT09IC0xKSB7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gcHBbZWZmXS5wYXJhbXMgfHwgW107XHJcbiAgICAgICAgcHBFZmZlY3QgPSBuZXcgRWZmZWN0Q29tcG9zZXJbYCR7ZWZmfVBhc3NgXSguLi5wYXJhbXMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBwRWZmZWN0ID0gbmV3IEVmZmVjdENvbXBvc2VyLlNoYWRlclBhc3MocHBbZWZmXS5zcmMpO1xyXG4gICAgICAgIGlmIChwcFtlZmZdLnVuaWZvcm1zKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCB1IGluIHBwW2VmZl0udW5pZm9ybXMpIHtcclxuICAgICAgICAgICAgcHBFZmZlY3QudW5pZm9ybXNbdV0udmFsdWUgPSBwcFtlZmZdLnVuaWZvcm1zW3VdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBwcEVmZmVjdC5yZW5kZXJUb1NjcmVlbiA9IGVpID09PSBlZmZlY3RzLmxlbmd0aCAtIDE7XHJcbiAgICAgIHRoaXMuY29tcG9zZXIuYWRkUGFzcyhwcEVmZmVjdCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuY29tcG9zZXIuc2V0U2l6ZShjbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0KTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gZW5hYmxlUG9zdFByb2Nlc3NpbmdcclxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGVuYWJsZWRcclxuICAgKiBFbmFibGUgLyBkaXNhYmxlIHBvc3QgcHJvY2Vzc2luZ1xyXG4gICAqL1xyXG4gIGVuYWJsZVBvc3RQcm9jZXNzaW5nID0gZW5hYmxlZCA9PiB0aGlzLmlzUFBFbmFibGVkID0gZW5hYmxlZDtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGVuYWJsZUxheWVyUmVuZGVyaW5nXHJcbiAgICogQHBhcmFtIHtCb29sZWFufSBlbmFibGVkXHJcbiAgICogRW5hYmxlIC8gZGlzYWJsZSBsYXllciBieSBsYXllciByZW5kZXJpbmdcclxuICAgKi9cclxuICBlbmFibGVMYXllclJlbmRlcmluZyA9IGVuYWJsZWQgPT4gdGhpcy5pc0xheWVyUmVuZGVyaW5nID0gZW5hYmxlZDtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGlzTW9iaWxlU2NyZWVuXHJcbiAgICogQ2hlY2sgY3VycmVudCBjbGllbnQgd2lkdGhcclxuICAgKi9cclxuICBpc01vYmlsZVNjcmVlbiA9ICgpID0+IHtcclxuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aCA8PSBjb25maWcuTU9CSUxFX1NDUkVFTl9XSURUSDtcclxuICB9O1xyXG4gIFxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBpc01vYmlsZURldmljZVxyXG4gICAqIERldGVjdCBtb2JpbGUgZGV2aWNlIHVzaW5nIG5hdmlnYXRvci51c2VyQWdlbnRcclxuICAgKi9cclxuICBpc01vYmlsZURldmljZSA9ICgpID0+IHtcclxuICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BbmRyb2lkL2kpXHJcbiAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL3dlYk9TL2kpXHJcbiAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQaG9uZS9pKVxyXG4gICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGFkL2kpXHJcbiAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQb2QvaSlcclxuICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQmxhY2tCZXJyeS9pKVxyXG4gICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9XaW5kb3dzIFBob25lL2kpO1xyXG4gIH07XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGNhcGl0YWxpemVcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gdlxyXG4gICAqIENhcGl0YWxpemUgc3RyaW5nXHJcbiAgICovXHJcbiAgY2FwaXRhbGl6ZSA9IHYgPT4gdi5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHYuc2xpY2UoMSk7XHJcbiAgXHJcbn1cclxuIl19