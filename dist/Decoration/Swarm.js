"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Swarm = void 0;

var _three = require("three");

var _Decoration2 = require("./Decoration");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Swarm =
/*#__PURE__*/
function (_Decoration) {
  _inherits(Swarm, _Decoration);

  function Swarm(_ref) {
    var _this;

    var geometry = _ref.geometry,
        material = _ref.material;

    _classCallCheck(this, Swarm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Swarm).call(this));
    _this.material = new _three.PointsMaterial(material);
    _this.visual = new _three.Points(geometry, _this.material);
    return _this;
  }

  return Swarm;
}(_Decoration2.Decoration);

exports.Swarm = Swarm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EZWNvcmF0aW9uL1N3YXJtLmpzIl0sIm5hbWVzIjpbIlN3YXJtIiwiZ2VvbWV0cnkiLCJtYXRlcmlhbCIsIlBvaW50c01hdGVyaWFsIiwidmlzdWFsIiwiUG9pbnRzIiwiRGVjb3JhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBRWFBLEs7Ozs7O0FBQ1gsdUJBQW9DO0FBQUE7O0FBQUEsUUFBdEJDLFFBQXNCLFFBQXRCQSxRQUFzQjtBQUFBLFFBQVpDLFFBQVksUUFBWkEsUUFBWTs7QUFBQTs7QUFDbEM7QUFDQSxVQUFLQSxRQUFMLEdBQWdCLElBQUlDLHFCQUFKLENBQW1CRCxRQUFuQixDQUFoQjtBQUNBLFVBQUtFLE1BQUwsR0FBYyxJQUFJQyxhQUFKLENBQVdKLFFBQVgsRUFBcUIsTUFBS0MsUUFBMUIsQ0FBZDtBQUhrQztBQUluQzs7O0VBTHdCSSx1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBAYXV0aG9yIFNrb21vcm94XHJcbiAqIHYzLjAuMFxyXG4gKlxyXG4gKiBAY2xhc3MgU3dhcm1cclxuICogQWJzdHJhY3Q6IENsYXNzIFN3YXJtLiBUSFJFRS5Qb2ludHMgd3JhcHBlci5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgUG9pbnRzLCBQb2ludHNNYXRlcmlhbCB9IGZyb20gJ3RocmVlJztcclxuaW1wb3J0IHsgRGVjb3JhdGlvbiB9IGZyb20gJy4vRGVjb3JhdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgU3dhcm0gZXh0ZW5kcyBEZWNvcmF0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih7IGdlb21ldHJ5LCBtYXRlcmlhbCB9KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5tYXRlcmlhbCA9IG5ldyBQb2ludHNNYXRlcmlhbChtYXRlcmlhbCk7XHJcbiAgICB0aGlzLnZpc3VhbCA9IG5ldyBQb2ludHMoZ2VvbWV0cnksIHRoaXMubWF0ZXJpYWwpO1xyXG4gIH1cclxufVxyXG4iXX0=