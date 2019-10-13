"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Decoration = void 0;

var _react = require("react");

var _three = require("three");

var _Motion = require("../Motion");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Decoration = function (_Component) {
  _inherits(Decoration, _Component);

  function Decoration() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Decoration);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Decoration)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "connect", function (fiberNode) {
      var stateNode = fiberNode["return"].stateNode;

      if (!stateNode) {
        _this.connect(fiberNode["return"]);
      } else {
        if (!stateNode.visual) {
          _this.connect(stateNode._reactInternalFiber);
        } else {
          stateNode.visual.add(_this.visual);
          stateNode.children[_this.id] = _assertThisInitialized(_this);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setVisualState", function (state) {
      var vs = _this.buildVisualState(state);

      _this.visual.position.set(vs.position.x, vs.position.y, vs.position.z);

      _this.visual.scale.set(vs.scale.x, vs.scale.y, vs.scale.z);

      if (vs.lookAt) {
        _this.visual.lookAt(new _three.Vector3(vs.lookAt.x, vs.lookAt.y, vs.lookAt.z));
      } else {
        _this.visual.rotation.set(vs.rotation.x, vs.rotation.y, vs.rotation.z);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "buildVisualState", function (state) {
      var visPos = _this.visual.position;
      var visRot = _this.visual.rotation;
      var visScl = _this.visual.scale;
      var visState = {
        position: {
          x: visPos.x,
          y: visPos.y,
          z: visPos.z
        },
        rotation: {
          x: visRot.x,
          y: visRot.y,
          z: visRot.z
        },
        scale: {
          x: visScl.x,
          y: visScl.y,
          z: visScl.z
        }
      };

      if (state.position) {
        visState.position.x = _this.setStateValue(state.position.x, visPos.x);
        visState.position.y = _this.setStateValue(state.position.y, visPos.y);
        visState.position.z = _this.setStateValue(state.position.z, visPos.z);
      }

      if (state.scale) {
        visState.scale.x = _this.setStateValue(state.scale.x, visScl.x);
        visState.scale.y = _this.setStateValue(state.scale.y, visScl.y);
        visState.scale.z = _this.setStateValue(state.scale.z, visScl.z);
      }

      if (state.rotation) {
        visState.rotation.x = _this.setStateValue(state.rotation.x, visRot.x);
        visState.rotation.y = _this.setStateValue(state.rotation.y, visRot.y);
        visState.rotation.z = _this.setStateValue(state.rotation.z, visRot.z);
      } else if (state.lookAt) {
        visState.lookAt = {};
        visState.lookAt.x = _this.setStateValue(state.lookAt.x, 0);
        visState.lookAt.y = _this.setStateValue(state.lookAt.y, 0);
        visState.lookAt.z = _this.setStateValue(state.lookAt.z, 0);
      }

      return visState;
    });

    _defineProperty(_assertThisInitialized(_this), "setStateValue", function (sv, vv) {
      return sv === undefined ? vv : Array.isArray(sv) ? _this.manager.isMobileScreen() ? sv[0] : sv[1] : sv;
    });

    _defineProperty(_assertThisInitialized(_this), "update", function (onlyGlobal) {
      if (_this.isScene) {
        onlyGlobal = _this.id !== _this.manager.activeScene.id;
      }

      if ((!onlyGlobal || onlyGlobal && _this.isGlobal) && _this.motion) {
        _this.motion.update();
      }

      if (_this.children) {
        for (var c in _this.children) {
          _this.children[c].update(onlyGlobal);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setActions", function (actions) {
      _this.actions = actions;

      _this.manager.connectActions(_assertThisInitialized(_this), actions);
    });

    _defineProperty(_assertThisInitialized(_this), "getActionState", function (a) {
      return _this.actions[a];
    });

    _defineProperty(_assertThisInitialized(_this), "find", function (id) {
      if (_this.id === id) return _assertThisInitialized(_this);
      if (!_this.children) return false;

      for (var k in _this.children) {
        var c = _this.children[k].find(id);

        if (c) return c;
      }
    });

    return _this;
  }

  _createClass(Decoration, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          id = _this$props.id,
          motion = _this$props.motion,
          actions = _this$props.actions,
          layer = _this$props.layer,
          global = _this$props.global,
          glEvents = _this$props.glEvents,
          onClick = _this$props.onClick,
          onMouseOver = _this$props.onMouseOver;
      this.id = id || this.id || this.visual.uuid;
      this.glEvents = this.glEvents || glEvents;
      this.isGlobal = global || false;
      this.setVisualState(this.props);
      if (motion) this.motion = new _Motion.Motion(this.visual, motion);
      if (actions) this.setActions(actions);
      if (onClick) this.visual.onClick = onClick;
      if (onMouseOver) this.visual.onMouseOver = onMouseOver;

      if (layer) {
        this.visual.layers.enable(layer);
        this.manager.layers[layer] = layer;
      }

      this.connect(this._reactInternalFiber);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.visual.parent.remove(this.visual);
    }
  }, {
    key: "render",
    value: function render() {
      return false;
    }
  }]);

  return Decoration;
}(_react.Component);

exports.Decoration = Decoration;