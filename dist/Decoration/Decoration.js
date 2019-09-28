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

var Decoration =
/*#__PURE__*/
function (_Component) {
  _inherits(Decoration, _Component);

  function Decoration() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Decoration);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Decoration)).call.apply(_getPrototypeOf2, [this].concat(args)));

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

    /**
     * @function componentDidMount
     * Set settings for mounted component:
     * 1. Basic settings
     * 2. Position, rotation and scale
     * 3. Motion
     * 4. Actions
     * 5. Event listeners
     * 6. Enable layer if defined
     */
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
    }
    /**
     * @function componentWillUnmount
     * Remove object from Scene on unmount
     */

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.visual.parent.remove(this.visual);
    }
    /**
     * @function setVisualState
     * @param {Object} state
     * Set position, rotation and scale of the object
     */

  }, {
    key: "render",
    value: function render() {
      return false;
    }
  }]);

  return Decoration;
}(_react.Component);

exports.Decoration = Decoration;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EZWNvcmF0aW9uL0RlY29yYXRpb24uanMiXSwibmFtZXMiOlsiRGVjb3JhdGlvbiIsInN0YXRlIiwidnMiLCJidWlsZFZpc3VhbFN0YXRlIiwidmlzdWFsIiwicG9zaXRpb24iLCJzZXQiLCJ4IiwieSIsInoiLCJzY2FsZSIsImxvb2tBdCIsIlZlY3RvcjMiLCJyb3RhdGlvbiIsInZpc1BvcyIsInZpc1JvdCIsInZpc1NjbCIsInZpc1N0YXRlIiwic2V0U3RhdGVWYWx1ZSIsInN2IiwidnYiLCJ1bmRlZmluZWQiLCJBcnJheSIsImlzQXJyYXkiLCJtYW5hZ2VyIiwiaXNNb2JpbGVTY3JlZW4iLCJvbmx5R2xvYmFsIiwiaXNTY2VuZSIsImlkIiwiYWN0aXZlU2NlbmUiLCJpc0dsb2JhbCIsIm1vdGlvbiIsInVwZGF0ZSIsImNoaWxkcmVuIiwiYyIsImFjdGlvbnMiLCJjb25uZWN0QWN0aW9ucyIsImEiLCJrIiwiZmluZCIsInByb3BzIiwibGF5ZXIiLCJnbG9iYWwiLCJnbEV2ZW50cyIsIm9uQ2xpY2siLCJvbk1vdXNlT3ZlciIsInV1aWQiLCJzZXRWaXN1YWxTdGF0ZSIsIk1vdGlvbiIsInNldEFjdGlvbnMiLCJsYXllcnMiLCJlbmFibGUiLCJwYXJlbnQiLCJyZW1vdmUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFTQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhQSxVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7cUVBMkNNLFVBQUFDLEtBQUssRUFBSTtBQUN4QixVQUFNQyxFQUFFLEdBQUcsTUFBS0MsZ0JBQUwsQ0FBc0JGLEtBQXRCLENBQVg7O0FBQ0EsWUFBS0csTUFBTCxDQUFZQyxRQUFaLENBQXFCQyxHQUFyQixDQUF5QkosRUFBRSxDQUFDRyxRQUFILENBQVlFLENBQXJDLEVBQXdDTCxFQUFFLENBQUNHLFFBQUgsQ0FBWUcsQ0FBcEQsRUFBdUROLEVBQUUsQ0FBQ0csUUFBSCxDQUFZSSxDQUFuRTs7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T0FBdEI7QUFDYixVQUFJQyxXQUFKLEVBQWlCLEtBQUt6QyxNQUFMLENBQVl5QyxXQUFaLEdBQTBCQSxXQUExQjs7QUFDakIsVUFBSUosS0FBSixFQUFXO0FBQ1QsYUFBS3JDLE1BQUwsQ0FBWThDLE1BQVosQ0FBbUJDLE1BQW5CLENBQTBCVixLQUExQjtBQUNBLGFBQUtqQixPQUFMLENBQWEwQixNQUFiLENBQW9CVCxLQUFwQixJQUE2QkEsS0FBN0I7QUFDRDtBQUNGO0FBRUQ7Ozs7Ozs7MkNBSXVCO0FBQ3JCLFdBQUtyQyxNQUFMLENBQVlnRCxNQUFaLENBQW1CQyxNQUFuQixDQUEwQixLQUFLakQsTUFBL0I7QUFDRDtBQUVEOzs7Ozs7Ozs2QkFxSFM7QUFBRSxhQUFPLEtBQVA7QUFBZTs7OztFQTNKSWtELGdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIEBhdXRob3IgU2tvbW9yb3hcclxuICogdjMuMC4wXHJcbiAqXHJcbiAqIEBjbGFzcyBEZWNvcmF0aW9uXHJcbiAqIEFic3RyYWN0OiBDbGFzcyBEZWNvcmF0aW9uLiBCYXNpYyBjbGFzcy5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgeyBNb3Rpb24gfSBmcm9tICcuLi9Nb3Rpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlY29yYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnRcclxuICAgKiBTZXQgc2V0dGluZ3MgZm9yIG1vdW50ZWQgY29tcG9uZW50OlxyXG4gICAqIDEuIEJhc2ljIHNldHRpbmdzXHJcbiAgICogMi4gUG9zaXRpb24sIHJvdGF0aW9uIGFuZCBzY2FsZVxyXG4gICAqIDMuIE1vdGlvblxyXG4gICAqIDQuIEFjdGlvbnNcclxuICAgKiA1LiBFdmVudCBsaXN0ZW5lcnNcclxuICAgKiA2LiBFbmFibGUgbGF5ZXIgaWYgZGVmaW5lZFxyXG4gICAqL1xyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG5cclxuICAgIGNvbnN0IHsgaWQsIG1vdGlvbiwgYWN0aW9ucywgbGF5ZXIsIGdsb2JhbCwgZ2xFdmVudHMsIG9uQ2xpY2ssIG9uTW91c2VPdmVyIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgdGhpcy5pZCA9IGlkIHx8IHRoaXMuaWQgfHwgdGhpcy52aXN1YWwudXVpZDtcclxuICAgIHRoaXMuZ2xFdmVudHMgPSB0aGlzLmdsRXZlbnRzIHx8IGdsRXZlbnRzO1xyXG4gICAgdGhpcy5pc0dsb2JhbCA9IGdsb2JhbCB8fCBmYWxzZTtcclxuICAgIHRoaXMuc2V0VmlzdWFsU3RhdGUodGhpcy5wcm9wcyk7XHJcblxyXG4gICAgaWYgKG1vdGlvbikgdGhpcy5tb3Rpb24gPSBuZXcgTW90aW9uKHRoaXMudmlzdWFsLCBtb3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbnMpIHRoaXMuc2V0QWN0aW9ucyhhY3Rpb25zKTtcclxuICAgIGlmIChvbkNsaWNrKSB0aGlzLnZpc3VhbC5vbkNsaWNrID0gb25DbGljaztcclxuICAgIGlmIChvbk1vdXNlT3ZlcikgdGhpcy52aXN1YWwub25Nb3VzZU92ZXIgPSBvbk1vdXNlT3ZlcjtcclxuICAgIGlmIChsYXllcikge1xyXG4gICAgICB0aGlzLnZpc3VhbC5sYXllcnMuZW5hYmxlKGxheWVyKTtcclxuICAgICAgdGhpcy5tYW5hZ2VyLmxheWVyc1tsYXllcl0gPSBsYXllcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudFxyXG4gICAqIFJlbW92ZSBvYmplY3QgZnJvbSBTY2VuZSBvbiB1bm1vdW50XHJcbiAgICovXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICB0aGlzLnZpc3VhbC5wYXJlbnQucmVtb3ZlKHRoaXMudmlzdWFsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBzZXRWaXN1YWxTdGF0ZVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxyXG4gICAqIFNldCBwb3NpdGlvbiwgcm90YXRpb24gYW5kIHNjYWxlIG9mIHRoZSBvYmplY3RcclxuICAgKi9cclxuICBzZXRWaXN1YWxTdGF0ZSA9IHN0YXRlID0+IHtcclxuICAgIGNvbnN0IHZzID0gdGhpcy5idWlsZFZpc3VhbFN0YXRlKHN0YXRlKTsgICAgXHJcbiAgICB0aGlzLnZpc3VhbC5wb3NpdGlvbi5zZXQodnMucG9zaXRpb24ueCwgdnMucG9zaXRpb24ueSwgdnMucG9zaXRpb24ueik7XHJcbiAgICB0aGlzLnZpc3VhbC5zY2FsZS5zZXQodnMuc2NhbGUueCwgdnMuc2NhbGUueSwgdnMuc2NhbGUueik7XHJcbiAgICBpZiAodnMubG9va0F0KSB7XHJcbiAgICAgIHRoaXMudmlzdWFsLmxvb2tBdChuZXcgVmVjdG9yMyh2cy5sb29rQXQueCwgdnMubG9va0F0LnksIHZzLmxvb2tBdC56KSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnZpc3VhbC5yb3RhdGlvbi5zZXQodnMucm90YXRpb24ueCwgdnMucm90YXRpb24ueSwgdnMucm90YXRpb24ueik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGJ1aWxkVmlzdWFsU3RhdGVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcclxuICAgKiBDYWxjdWxhdGUgcG9zaXRpb24sIHJvdGF0aW9uIGFuZCBzY2FsZSBiYXNlZCBvbiBjdXJyZW50IGFuZCBuZXcgc3RhdGVcclxuICAgKi9cclxuICBidWlsZFZpc3VhbFN0YXRlID0gc3RhdGUgPT4ge1xyXG4gICAgXHJcbiAgICBjb25zdCB2aXNQb3MgPSB0aGlzLnZpc3VhbC5wb3NpdGlvbjtcclxuICAgIGNvbnN0IHZpc1JvdCA9IHRoaXMudmlzdWFsLnJvdGF0aW9uO1xyXG4gICAgY29uc3QgdmlzU2NsID0gdGhpcy52aXN1YWwuc2NhbGU7XHJcbiAgICBjb25zdCB2aXNTdGF0ZSA9IHtcclxuICAgICAgcG9zaXRpb246IHsgeDogdmlzUG9zLngsIHk6IHZpc1Bvcy55LCB6OiB2aXNQb3MueiB9LFxyXG4gICAgICByb3RhdGlvbjogeyB4OiB2aXNSb3QueCwgeTogdmlzUm90LnksIHo6IHZpc1JvdC56IH0sXHJcbiAgICAgIHNjYWxlOiB7IHg6IHZpc1NjbC54LCB5OiB2aXNTY2wueSwgejogdmlzU2NsLnogfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoc3RhdGUucG9zaXRpb24pIHtcclxuICAgICAgdmlzU3RhdGUucG9zaXRpb24ueCA9IHRoaXMuc2V0U3RhdGVWYWx1ZShzdGF0ZS5wb3NpdGlvbi54LCB2aXNQb3MueCk7XHJcbiAgICAgIHZpc1N0YXRlLnBvc2l0aW9uLnkgPSB0aGlzLnNldFN0YXRlVmFsdWUoc3RhdGUucG9zaXRpb24ueSwgdmlzUG9zLnkpO1xyXG4gICAgICB2aXNTdGF0ZS5wb3NpdGlvbi56ID0gdGhpcy5zZXRTdGF0ZVZhbHVlKHN0YXRlLnBvc2l0aW9uLnosIHZpc1Bvcy56KTtcclxuICAgIH1cclxuICAgIGlmIChzdGF0ZS5zY2FsZSkge1xyXG4gICAgICB2aXNTdGF0ZS5zY2FsZS54ID0gdGhpcy5zZXRTdGF0ZVZhbHVlKHN0YXRlLnNjYWxlLngsIHZpc1NjbC54KTtcclxuICAgICAgdmlzU3RhdGUuc2NhbGUueSA9IHRoaXMuc2V0U3RhdGVWYWx1ZShzdGF0ZS5zY2FsZS55LCB2aXNTY2wueSk7XHJcbiAgICAgIHZpc1N0YXRlLnNjYWxlLnogPSB0aGlzLnNldFN0YXRlVmFsdWUoc3RhdGUuc2NhbGUueiwgdmlzU2NsLnopO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0YXRlLnJvdGF0aW9uKSB7XHJcbiAgICAgIHZpc1N0YXRlLnJvdGF0aW9uLnggPSB0aGlzLnNldFN0YXRlVmFsdWUoc3RhdGUucm90YXRpb24ueCwgdmlzUm90LngpO1xyXG4gICAgICB2aXNTdGF0ZS5yb3RhdGlvbi55ID0gdGhpcy5zZXRTdGF0ZVZhbHVlKHN0YXRlLnJvdGF0aW9uLnksIHZpc1JvdC55KTtcclxuICAgICAgdmlzU3RhdGUucm90YXRpb24ueiA9IHRoaXMuc2V0U3RhdGVWYWx1ZShzdGF0ZS5yb3RhdGlvbi56LCB2aXNSb3Queik7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlLmxvb2tBdCkge1xyXG4gICAgICB2aXNTdGF0ZS5sb29rQXQgPSB7fTtcclxuICAgICAgdmlzU3RhdGUubG9va0F0LnggPSB0aGlzLnNldFN0YXRlVmFsdWUoc3RhdGUubG9va0F0LngsIDApO1xyXG4gICAgICB2aXNTdGF0ZS5sb29rQXQueSA9IHRoaXMuc2V0U3RhdGVWYWx1ZShzdGF0ZS5sb29rQXQueSwgMCk7XHJcbiAgICAgIHZpc1N0YXRlLmxvb2tBdC56ID0gdGhpcy5zZXRTdGF0ZVZhbHVlKHN0YXRlLmxvb2tBdC56LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmlzU3RhdGU7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIHNldFN0YXRlVmFsdWVcclxuICAgKiBAcGFyYW0ge051bWJlciB8IEFycmF5fSBzdiAtIHN0YXRlIHZhbHVlXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHZ2IC0gdmlzdWFsIHZhbHVlXHJcbiAgICogQ2FsY3VsYXRlIGdpdmVuIHN0YXRlIHZhbHVlIGJhc2VkIG9uIGN1cnJlbnQgYW5kIG5ldyB2YWx1ZVxyXG4gICAqL1xyXG4gIHNldFN0YXRlVmFsdWUgPSAoc3YsIHZ2KSA9PiB7XHJcbiAgICByZXR1cm4gc3YgPT09IHVuZGVmaW5lZCA/IHZ2IDogQXJyYXkuaXNBcnJheShzdikgPyB0aGlzLm1hbmFnZXIuaXNNb2JpbGVTY3JlZW4oKSA/IHN2WzBdIDogc3ZbMV0gOiBzdjtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gdXBkYXRlXHJcbiAgICogQHBhcmFtIHtCb29sZWFufSBvbmx5R2xvYmFsXHJcbiAgICogVXBkYXRlIERlY29yYXRpb25zIGZvciBjdXJyZW50IGFjdGl2ZSBTY2VuZVxyXG4gICAqIGFuZCBEZWNvcmF0aW9ucyB0aGF0IHNob3VsZCBiZSB1cGRhdGVkIHJlZ2FyZGxlc3Mgb2YgYWN0aXZlIFNjZW5lXHJcbiAgICovXHJcbiAgdXBkYXRlID0gb25seUdsb2JhbCA9PiB7XHJcbiAgICBpZiAodGhpcy5pc1NjZW5lKSB7XHJcbiAgICAgIG9ubHlHbG9iYWwgPSB0aGlzLmlkICE9PSB0aGlzLm1hbmFnZXIuYWN0aXZlU2NlbmUuaWQ7XHJcbiAgICB9XHJcbiAgICBpZiAoKCFvbmx5R2xvYmFsIHx8IChvbmx5R2xvYmFsICYmIHRoaXMuaXNHbG9iYWwpKSAmJiB0aGlzLm1vdGlvbikge1xyXG4gICAgICB0aGlzLm1vdGlvbi51cGRhdGUoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmNoaWxkcmVuKSB7XHJcbiAgICAgIGZvciAobGV0IGMgaW4gdGhpcy5jaGlsZHJlbikge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bY10udXBkYXRlKG9ubHlHbG9iYWwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIHNldEFjdGlvbnNcclxuICAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uc1xyXG4gICAqIFNldCBBY3Rpb25zIGZvciBjdXJyZW50IERlY29yYXRpb25cclxuICAgKi9cclxuICBzZXRBY3Rpb25zID0gYWN0aW9ucyA9PiB7XHJcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xyXG4gICAgdGhpcy5tYW5hZ2VyLmNvbm5lY3RBY3Rpb25zKHRoaXMsIGFjdGlvbnMpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBnZXRBY3Rpb25TdGF0ZVxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25zXHJcbiAgICogU2V0IEFjdGlvbnMgZm9yIGN1cnJlbnQgRGVjb3JhdGlvblxyXG4gICAqL1xyXG4gIGdldEFjdGlvblN0YXRlID0gYSA9PiB0aGlzLmFjdGlvbnNbYV07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBmaW5kXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICogRmluZCBEZWNvcmF0aW9uIGJ5IGlkXHJcbiAgICovXHJcbiAgZmluZCA9IGlkID0+IHtcclxuICAgIGlmICh0aGlzLmlkID09PSBpZCkgcmV0dXJuIHRoaXM7XHJcbiAgICBpZiAoIXRoaXMuY2hpbGRyZW4pIHJldHVybiBmYWxzZTtcclxuICAgIGZvciAobGV0IGsgaW4gdGhpcy5jaGlsZHJlbikge1xyXG4gICAgICBjb25zdCBjID0gdGhpcy5jaGlsZHJlbltrXS5maW5kKGlkKTtcclxuICAgICAgaWYgKGMpIHJldHVybiBjO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJlbmRlcigpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbn1cclxuIl19