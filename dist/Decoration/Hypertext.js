"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hypertext = void 0;

var _react = _interopRequireDefault(require("react"));

var _threeRendererCss3d = require("three-renderer-css3d");

var _Decoration2 = require("./Decoration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var Hypertext =
/*#__PURE__*/
function (_Decoration) {
  _inherits(Hypertext, _Decoration);

  function Hypertext() {
    _classCallCheck(this, Hypertext);

    return _possibleConstructorReturn(this, _getPrototypeOf(Hypertext).apply(this, arguments));
  }

  _createClass(Hypertext, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.visual = new _threeRendererCss3d.CSS3DObject(this.content);

      _get(_getPrototypeOf(Hypertext.prototype), "componentDidMount", this).call(this);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return _react["default"].createElement("div", {
        ref: function ref(c) {
          return _this.content = c;
        }
      }, this.props.children);
    }
  }]);

  return Hypertext;
}(_Decoration2.Decoration);

exports.Hypertext = Hypertext;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EZWNvcmF0aW9uL0h5cGVydGV4dC5qcyJdLCJuYW1lcyI6WyJIeXBlcnRleHQiLCJ2aXN1YWwiLCJDU1MzRE9iamVjdCIsImNvbnRlbnQiLCJjIiwicHJvcHMiLCJjaGlsZHJlbiIsIkRlY29yYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFTQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsUzs7Ozs7Ozs7Ozs7Ozt3Q0FFUztBQUNsQixXQUFLQyxNQUFMLEdBQWMsSUFBSUMsK0JBQUosQ0FBZ0IsS0FBS0MsT0FBckIsQ0FBZDs7QUFDQTtBQUNEOzs7NkJBRVE7QUFBQTs7QUFDUCxhQUNFO0FBQUssUUFBQSxHQUFHLEVBQUUsYUFBQUMsQ0FBQztBQUFBLGlCQUFJLEtBQUksQ0FBQ0QsT0FBTCxHQUFlQyxDQUFuQjtBQUFBO0FBQVgsU0FDRyxLQUFLQyxLQUFMLENBQVdDLFFBRGQsQ0FERjtBQUtEOzs7O0VBYjRCQyx1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBAYXV0aG9yIFNrb21vcm94XHJcbiAqIHYzLjAuMFxyXG4gKlxyXG4gKiBAY2xhc3MgSHlwZXJ0ZXh0XHJcbiAqIEFic3RyYWN0OiBDbGFzcyBIeXBlcnRleHQuIFRIUkVFLkNTUzNET2JqZWN0IHdyYXBwZXIuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IENTUzNET2JqZWN0IH0gZnJvbSAndGhyZWUtcmVuZGVyZXItY3NzM2QnO1xyXG5pbXBvcnQgeyBEZWNvcmF0aW9uIH0gZnJvbSAnLi9EZWNvcmF0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBIeXBlcnRleHQgZXh0ZW5kcyBEZWNvcmF0aW9uIHtcclxuICBcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHRoaXMudmlzdWFsID0gbmV3IENTUzNET2JqZWN0KHRoaXMuY29udGVudCk7XHJcbiAgICBzdXBlci5jb21wb25lbnREaWRNb3VudCgpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiByZWY9e2MgPT4gdGhpcy5jb250ZW50ID0gY30+XHJcbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19