"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Line = void 0;

var Three = _interopRequireWildcard(require("three"));

var _Decoration2 = require("./Decoration");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Line =
/*#__PURE__*/
function (_Decoration) {
  _inherits(Line, _Decoration);

  function Line(_ref) {
    var _this;

    var vertices = _ref.vertices,
        material = _ref.material;

    _classCallCheck(this, Line);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Line).call(this));
    _this.geometry = new Three.Geometry();
    _this.geometry.vertices = vertices.map(function (_ref2) {
      var x = _ref2.x,
          y = _ref2.y,
          z = _ref2.z;
      return new Three.Vector3(x, y, z);
    });

    _this.geometry.computeLineDistances();

    _this.material = new Three["Line".concat(_this.manager.capitalize(material.type), "Material")](material.params);
    _this.visual = new Three.Line(_this.geometry, _this.material);
    return _this;
  }

  return Line;
}(_Decoration2.Decoration);

exports.Line = Line;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EZWNvcmF0aW9uL0xpbmUuanMiXSwibmFtZXMiOlsiTGluZSIsInZlcnRpY2VzIiwibWF0ZXJpYWwiLCJnZW9tZXRyeSIsIlRocmVlIiwiR2VvbWV0cnkiLCJtYXAiLCJ4IiwieSIsInoiLCJWZWN0b3IzIiwiY29tcHV0ZUxpbmVEaXN0YW5jZXMiLCJtYW5hZ2VyIiwiY2FwaXRhbGl6ZSIsInR5cGUiLCJwYXJhbXMiLCJ2aXN1YWwiLCJEZWNvcmF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBU0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWFBLEk7Ozs7O0FBQ1gsc0JBQW9DO0FBQUE7O0FBQUEsUUFBdEJDLFFBQXNCLFFBQXRCQSxRQUFzQjtBQUFBLFFBQVpDLFFBQVksUUFBWkEsUUFBWTs7QUFBQTs7QUFDbEM7QUFDQSxVQUFLQyxRQUFMLEdBQWdCLElBQUlDLEtBQUssQ0FBQ0MsUUFBVixFQUFoQjtBQUNBLFVBQUtGLFFBQUwsQ0FBY0YsUUFBZCxHQUF5QkEsUUFBUSxDQUFDSyxHQUFULENBQWE7QUFBQSxVQUFHQyxDQUFILFNBQUdBLENBQUg7QUFBQSxVQUFNQyxDQUFOLFNBQU1BLENBQU47QUFBQSxVQUFTQyxDQUFULFNBQVNBLENBQVQ7QUFBQSxhQUFpQixJQUFJTCxLQUFLLENBQUNNLE9BQVYsQ0FBa0JILENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkMsQ0FBeEIsQ0FBakI7QUFBQSxLQUFiLENBQXpCOztBQUNBLFVBQUtOLFFBQUwsQ0FBY1Esb0JBQWQ7O0FBQ0EsVUFBS1QsUUFBTCxHQUFnQixJQUFJRSxLQUFLLGVBQVEsTUFBS1EsT0FBTCxDQUFhQyxVQUFiLENBQXdCWCxRQUFRLENBQUNZLElBQWpDLENBQVIsY0FBVCxDQUFtRVosUUFBUSxDQUFDYSxNQUE1RSxDQUFoQjtBQUNBLFVBQUtDLE1BQUwsR0FBYyxJQUFJWixLQUFLLENBQUNKLElBQVYsQ0FBZSxNQUFLRyxRQUFwQixFQUE4QixNQUFLRCxRQUFuQyxDQUFkO0FBTmtDO0FBT25DOzs7RUFSdUJlLHVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIEBhdXRob3IgU2tvbW9yb3hcclxuICogdjMuMC4wXHJcbiAqXHJcbiAqIEBjbGFzcyBMaW5lXHJcbiAqIEFic3RyYWN0OiBDbGFzcyBMaW5lLiBUSFJFRS5MaW5lIHdyYXBwZXIuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKi9cclxuXHJcbmltcG9ydCAqIGFzIFRocmVlIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IHsgRGVjb3JhdGlvbiB9IGZyb20gJy4vRGVjb3JhdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZSBleHRlbmRzIERlY29yYXRpb24ge1xyXG4gIGNvbnN0cnVjdG9yKHsgdmVydGljZXMsIG1hdGVyaWFsIH0pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmdlb21ldHJ5ID0gbmV3IFRocmVlLkdlb21ldHJ5KCk7XHJcbiAgICB0aGlzLmdlb21ldHJ5LnZlcnRpY2VzID0gdmVydGljZXMubWFwKCh7IHgsIHksIHogfSkgPT4gbmV3IFRocmVlLlZlY3RvcjMoeCwgeSwgeikpO1xyXG4gICAgdGhpcy5nZW9tZXRyeS5jb21wdXRlTGluZURpc3RhbmNlcygpO1xyXG4gICAgdGhpcy5tYXRlcmlhbCA9IG5ldyBUaHJlZVtgTGluZSR7dGhpcy5tYW5hZ2VyLmNhcGl0YWxpemUobWF0ZXJpYWwudHlwZSl9TWF0ZXJpYWxgXShtYXRlcmlhbC5wYXJhbXMpO1xyXG4gICAgdGhpcy52aXN1YWwgPSBuZXcgVGhyZWUuTGluZSh0aGlzLmdlb21ldHJ5LCB0aGlzLm1hdGVyaWFsKTtcclxuICB9XHJcbn1cclxuIl19