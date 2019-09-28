"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scene = void 0;

var _three = require("three");

var _Decoration2 = require("./Decoration");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Scene =
/*#__PURE__*/
function (_Decoration) {
  _inherits(Scene, _Decoration);

  function Scene() {
    var _this;

    _classCallCheck(this, Scene);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Scene).call(this));
    _this.isScene = true;
    _this.children = {};
    _this.visual = new _three.Group();
    return _this;
  }

  _createClass(Scene, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props["default"]) {
        this.manager.activeScene = this;
      }

      for (var c in this.children) {
        this.visual.add(this.children[c].visual);
      }

      _get(_getPrototypeOf(Scene.prototype), "componentDidMount", this).call(this);
    }
  }]);

  return Scene;
}(_Decoration2.Decoration);

exports.Scene = Scene;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EZWNvcmF0aW9uL1NjZW5lLmpzIl0sIm5hbWVzIjpbIlNjZW5lIiwiaXNTY2VuZSIsImNoaWxkcmVuIiwidmlzdWFsIiwiR3JvdXAiLCJwcm9wcyIsIm1hbmFnZXIiLCJhY3RpdmVTY2VuZSIsImMiLCJhZGQiLCJEZWNvcmF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBU0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhQSxLOzs7OztBQUVYLG1CQUFjO0FBQUE7O0FBQUE7O0FBQ1o7QUFDQSxVQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLFVBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxVQUFLQyxNQUFMLEdBQWMsSUFBSUMsWUFBSixFQUFkO0FBSlk7QUFLYjs7Ozt3Q0FFbUI7QUFDbEIsVUFBSSxLQUFLQyxLQUFMLFdBQUosRUFBd0I7QUFDdEIsYUFBS0MsT0FBTCxDQUFhQyxXQUFiLEdBQTJCLElBQTNCO0FBQ0Q7O0FBQ0QsV0FBSyxJQUFJQyxDQUFULElBQWMsS0FBS04sUUFBbkIsRUFBNkI7QUFDM0IsYUFBS0MsTUFBTCxDQUFZTSxHQUFaLENBQWdCLEtBQUtQLFFBQUwsQ0FBY00sQ0FBZCxFQUFpQkwsTUFBakM7QUFDRDs7QUFDRDtBQUNEOzs7O0VBakJ3Qk8sdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQGF1dGhvciBTa29tb3JveFxyXG4gKiB2My4wLjBcclxuICpcclxuICogQGNsYXNzIFNjZW5lXHJcbiAqIEFic3RyYWN0OiBDbGFzcyBTY2VuZS4gUm91dGluZyBpcyBiZWluZyBjYXJyaWVkIG91dCBiZXR3ZWVuIFNjZW5lcy4gVEhSRUUuR3JvdXAgd3JhcHBlci5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICd0aHJlZSc7XHJcbmltcG9ydCB7IERlY29yYXRpb24gfSBmcm9tICcuL0RlY29yYXRpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjZW5lIGV4dGVuZHMgRGVjb3JhdGlvbiB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuaXNTY2VuZSA9IHRydWU7XHJcbiAgICB0aGlzLmNoaWxkcmVuID0ge307XHJcbiAgICB0aGlzLnZpc3VhbCA9IG5ldyBHcm91cCgpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5kZWZhdWx0KSB7XHJcbiAgICAgIHRoaXMubWFuYWdlci5hY3RpdmVTY2VuZSA9IHRoaXM7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBjIGluIHRoaXMuY2hpbGRyZW4pIHtcclxuICAgICAgdGhpcy52aXN1YWwuYWRkKHRoaXMuY2hpbGRyZW5bY10udmlzdWFsKTtcclxuICAgIH1cclxuICAgIHN1cGVyLmNvbXBvbmVudERpZE1vdW50KCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==