"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Light = void 0;

var Three = _interopRequireWildcard(require("three"));

var _Decoration2 = require("./Decoration");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Light =
/*#__PURE__*/
function (_Decoration) {
  _inherits(Light, _Decoration);

  function Light(_ref) {
    var _this;

    var type = _ref.type,
        params = _ref.params;

    _classCallCheck(this, Light);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Light).call(this));
    _this.visual = _construct(Three["".concat(_this.manager.capitalize(type), "Light")], _toConsumableArray(params));
    return _this;
  }

  return Light;
}(_Decoration2.Decoration);

exports.Light = Light;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EZWNvcmF0aW9uL0xpZ2h0LmpzIl0sIm5hbWVzIjpbIkxpZ2h0IiwidHlwZSIsInBhcmFtcyIsInZpc3VhbCIsIlRocmVlIiwibWFuYWdlciIsImNhcGl0YWxpemUiLCJEZWNvcmF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBU0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWFBLEs7Ozs7O0FBQ1gsdUJBQThCO0FBQUE7O0FBQUEsUUFBaEJDLElBQWdCLFFBQWhCQSxJQUFnQjtBQUFBLFFBQVZDLE1BQVUsUUFBVkEsTUFBVTs7QUFBQTs7QUFDNUI7QUFDQSxVQUFLQyxNQUFMLGNBQWtCQyxLQUFLLFdBQUksTUFBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCTCxJQUF4QixDQUFKLFdBQXZCLHFCQUFvRUMsTUFBcEU7QUFGNEI7QUFHN0I7OztFQUp3QkssdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQGF1dGhvciBTa29tb3JveFxyXG4gKiB2My4wLjBcclxuICpcclxuICogQGNsYXNzIExpZ2h0XHJcbiAqIEFic3RyYWN0OiBDbGFzcyBMaWdodC4gVEhSRUUuTGlnaHQgd3JhcHBlci5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqL1xyXG5cclxuaW1wb3J0ICogYXMgVGhyZWUgZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgeyBEZWNvcmF0aW9uIH0gZnJvbSAnLi9EZWNvcmF0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBMaWdodCBleHRlbmRzIERlY29yYXRpb24ge1xyXG4gIGNvbnN0cnVjdG9yKHsgdHlwZSwgcGFyYW1zIH0pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnZpc3VhbCA9IG5ldyBUaHJlZVtgJHt0aGlzLm1hbmFnZXIuY2FwaXRhbGl6ZSh0eXBlKX1MaWdodGBdKC4uLnBhcmFtcyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==