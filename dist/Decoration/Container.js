"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = void 0;

var _react = _interopRequireWildcard(require("react"));

var _three = require("three");

var _Decoration2 = require("./Decoration");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var Container =
/*#__PURE__*/
function (_Decoration) {
  _inherits(Container, _Decoration);

  function Container() {
    var _this;

    _classCallCheck(this, Container);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Container).call(this));

    _defineProperty(_assertThisInitialized(_this), "buildComposition", function (visual, i) {
      var composition = _this.props.composition;
      if (!composition) return false;
      var type = composition.type,
          cols = composition.cols,
          rows = composition.rows,
          xStart = composition.xStart,
          xStep = composition.xStep,
          xRand = composition.xRand,
          yStart = composition.yStart,
          yStep = composition.yStep,
          yRand = composition.yRand,
          zStart = composition.zStart,
          zStep = composition.zStep,
          zRand = composition.zRand,
          radius = composition.radius,
          shift = composition.shift;
      var column;
      var row;
      var layer;
      var position;
      var src = _this.manager.isMobileScreen() ? 0 : 1;
      cols = cols ? cols[src] || cols : 0;
      rows = rows ? rows[src] || rows : 0;
      radius = radius ? radius[src] || radius : 0;
      xStart = xStart ? xStart[src] || xStart : 0;
      yStart = yStart ? yStart[src] || yStart : 0;
      zStart = zStart ? zStart[src] || zStart : 0;
      xStep = xStep ? xStep[src] || xStep : 0;
      yStep = yStep ? yStep[src] || yStep : 0;
      zStep = zStep ? zStep[src] || zStep : 0;
      xRand = xRand ? xRand[src] || xRand : 0;
      yRand = yRand ? yRand[src] || yRand : 0;
      zRand = zRand ? zRand[src] || zRand : 0;

      switch (type) {
        case 'grid':
          column = i % cols;
          row = Math.floor(i / cols);
          var x = column * (xStep || 0) + (xStart || 0) + (Math.random() * xRand - xRand);

          if (shift && row % 2 === 1) {
            x += xStep / 2;
          }

          position = {
            x: x,
            y: row * (-yStep || 0) + (yStart || 0) + (Math.random() * yRand - yRand),
            z: (zStart || 0) + (Math.random() * zRand - zRand)
          };
          break;

        case 'z-grid':
          column = i % cols;
          row = Math.floor(i / cols) % rows;
          layer = Math.floor(i / (cols * rows));
          position = {
            x: column * (xStep || 0) + (xStart || 0) + (Math.random() * xRand - xRand),
            y: row * (-yStep || 0) + (yStart || 0) + (Math.random() * yRand - yRand),
            z: layer * (-zStep || 0) + (zStart || 0) + (Math.random() * zRand - zRand)
          };
          break;

        case 'cylinder':
          column = i % cols;
          row = Math.floor(i / cols);
          var phi = Math.PI / cols * 2 * (column + 1);

          if (shift) {
            phi += Math.PI / cols * (row + 1);
          }

          position = {
            x: radius * Math.sin(phi),
            y: row * (-yStep || 0),
            z: radius * Math.cos(phi)
          };
          break;

        default:
          break;
      }

      visual.position.set(position.x, position.y, position.z);
      if (type === 'cylinder') visual.lookAt(new _three.Vector3(0, position.y, 0));
    });

    _this.children = {};
    _this.visual = new _three.Group();
    return _this;
  }

  _createClass(Container, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement(_react.Fragment, null, _react.Children.map(this.props.children, function (child, i) {
        return child ? _react["default"].cloneElement(child, {
          ref: function ref(c) {
            if (!c || c.visual.parent === _this2.visual) return false;
            _this2.children[c.id] = c;

            _this2.buildComposition(c.visual, i);

            _this2.visual.add(c.visual);
          }
        }) : false;
      }));
    }
    /**
     * @function buildComposition
     * Add Decoration to the Сontainer according to composition settings
     * Acceptable options are: grid, z-grid, cylinder
     */

  }]);

  return Container;
}(_Decoration2.Decoration);

exports.Container = Container;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EZWNvcmF0aW9uL0NvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJDb250YWluZXIiLCJ2aXN1YWwiLCJpIiwiY29tcG9zaXRpb24iLCJwcm9wcyIsInR5cGUiLCJjb2xzIiwicm93cyIsInhTdGFydCIsInhTdGVwIiwieFJhbmQiLCJ5U3RhcnQiLCJ5U3RlcCIsInlSYW5kIiwielN0YXJ0IiwielN0ZXAiLCJ6UmFuZCIsInJhZGl1cyIsInNoaWZ0IiwiY29sdW1uIiwicm93IiwibGF5ZXIiLCJwb3NpdGlvbiIsInNyYyIsIm1hbmFnZXIiLCJpc01vYmlsZVNjcmVlbiIsIk1hdGgiLCJmbG9vciIsIngiLCJyYW5kb20iLCJ5IiwieiIsInBoaSIsIlBJIiwic2luIiwiY29zIiwic2V0IiwibG9va0F0IiwiVmVjdG9yMyIsImNoaWxkcmVuIiwiR3JvdXAiLCJDaGlsZHJlbiIsIm1hcCIsImNoaWxkIiwiUmVhY3QiLCJjbG9uZUVsZW1lbnQiLCJyZWYiLCJjIiwicGFyZW50IiwiaWQiLCJidWlsZENvbXBvc2l0aW9uIiwiYWRkIiwiRGVjb3JhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhQSxTOzs7OztBQUVYLHVCQUFjO0FBQUE7O0FBQUE7O0FBQ1o7O0FBRFksdUVBMEJLLFVBQUNDLE1BQUQsRUFBU0MsQ0FBVCxFQUFlO0FBQUEsVUFFeEJDLFdBRndCLEdBRVIsTUFBS0MsS0FGRyxDQUV4QkQsV0FGd0I7QUFJaEMsVUFBSSxDQUFDQSxXQUFMLEVBQWtCLE9BQU8sS0FBUDtBQUpjLFVBSzFCRSxJQUwwQixHQUs0RUYsV0FMNUUsQ0FLMUJFLElBTDBCO0FBQUEsVUFLcEJDLElBTG9CLEdBSzRFSCxXQUw1RSxDQUtwQkcsSUFMb0I7QUFBQSxVQUtkQyxJQUxjLEdBSzRFSixXQUw1RSxDQUtkSSxJQUxjO0FBQUEsVUFLUkMsTUFMUSxHQUs0RUwsV0FMNUUsQ0FLUkss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ZWhCLFFBQVEsQ0FBQ1EsQ0FBeEIsRUFBMkIsQ0FBM0IsQ0FBZDtBQUMxQixLQW5HYTs7QUFFWixVQUFLUyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsVUFBS3RDLE1BQUwsR0FBYyxJQUFJdUMsWUFBSixFQUFkO0FBSFk7QUFJYjs7Ozs2QkFFUTtBQUFBOztBQUNQLGFBQ0UsZ0NBQUMsZUFBRCxRQUNHQyxnQkFBU0MsR0FBVCxDQUFhLEtBQUt0QyxLQUFMLENBQVdtQyxRQUF4QixFQUFrQyxVQUFDSSxLQUFELEVBQVF6QyxDQUFSLEVBQWM7QUFDL0MsZUFBT3lDLEtBQUssR0FBR0Msa0JBQU1DLFlBQU4sQ0FBbUJGLEtBQW5CLEVBQTBCO0FBQUVHLFVBQUFBLEdBQUcsRUFBRSxhQUFBQyxDQUFDLEVBQUk7QUFDbkQsZ0JBQUksQ0FBQ0EsQ0FBRCxJQUFNQSxDQUFDLENBQUM5QyxNQUFGLENBQVMrQyxNQUFULEtBQW9CLE1BQUksQ0FBQy9DLE1BQW5DLEVBQTJDLE9BQU8sS0FBUDtBQUMzQyxZQUFBLE1BQUksQ0FBQ3NDLFFBQUwsQ0FBY1EsQ0FBQyxDQUFDRSxFQUFoQixJQUFzQkYsQ0FBdEI7O0FBQ0EsWUFBQSxNQUFJLENBQUNHLGdCQUFMLENBQXNCSCxDQUFDLENBQUM5QyxNQUF4QixFQUFnQ0MsQ0FBaEM7O0FBQ0EsWUFBQSxNQUFJLENBQUNELE1BQUwsQ0FBWWtELEdBQVosQ0FBZ0JKLENBQUMsQ0FBQzlDLE1BQWxCO0FBQ0Q7QUFMd0MsU0FBMUIsQ0FBSCxHQUtOLEtBTE47QUFNRCxPQVBBLENBREgsQ0FERjtBQVlEO0FBRUQ7Ozs7Ozs7OztFQXZCNkJtRCx1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBAYXV0aG9yIFNrb21vcm94XHJcbiAqIHYzLjAuMFxyXG4gKlxyXG4gKiBAY2xhc3MgQ29udGFpbmVyXHJcbiAqIEFic3RyYWN0OiBDbGFzcyBDb250YWluZXIuIFRIUkVFLkdyb3VwIHdyYXBwZXIuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCwgeyBGcmFnbWVudCwgQ2hpbGRyZW4gfSBmcm9tICdyZWFjdCc7IFxyXG5pbXBvcnQgeyBHcm91cCwgVmVjdG9yMyB9IGZyb20gJ3RocmVlJztcclxuaW1wb3J0IHsgRGVjb3JhdGlvbiB9IGZyb20gJy4vRGVjb3JhdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgRGVjb3JhdGlvbiB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuY2hpbGRyZW4gPSB7fTtcclxuICAgIHRoaXMudmlzdWFsID0gbmV3IEdyb3VwKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8RnJhZ21lbnQ+XHJcbiAgICAgICAge0NoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQsIGkpID0+IHtcclxuICAgICAgICAgIHJldHVybiBjaGlsZCA/IFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwgeyByZWY6IGMgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWMgfHwgYy52aXN1YWwucGFyZW50ID09PSB0aGlzLnZpc3VhbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuW2MuaWRdID0gYztcclxuICAgICAgICAgICAgdGhpcy5idWlsZENvbXBvc2l0aW9uKGMudmlzdWFsLCBpKTtcclxuICAgICAgICAgICAgdGhpcy52aXN1YWwuYWRkKGMudmlzdWFsKTtcclxuICAgICAgICAgIH19KSA6IGZhbHNlO1xyXG4gICAgICAgIH0pfVxyXG4gICAgICA8L0ZyYWdtZW50PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBidWlsZENvbXBvc2l0aW9uXHJcbiAgICogQWRkIERlY29yYXRpb24gdG8gdGhlINChb250YWluZXIgYWNjb3JkaW5nIHRvIGNvbXBvc2l0aW9uIHNldHRpbmdzXHJcbiAgICogQWNjZXB0YWJsZSBvcHRpb25zIGFyZTogZ3JpZCwgei1ncmlkLCBjeWxpbmRlclxyXG4gICAqLyAgXHJcbiAgYnVpbGRDb21wb3NpdGlvbiA9ICh2aXN1YWwsIGkpID0+IHtcclxuXHJcbiAgICBjb25zdCB7IGNvbXBvc2l0aW9uIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGlmICghY29tcG9zaXRpb24pIHJldHVybiBmYWxzZTtcclxuICAgIGxldCB7IHR5cGUsIGNvbHMsIHJvd3MsIHhTdGFydCwgeFN0ZXAsIHhSYW5kLCB5U3RhcnQsIHlTdGVwLCB5UmFuZCwgelN0YXJ0LCB6U3RlcCwgelJhbmQsIHJhZGl1cywgc2hpZnQgfSA9IGNvbXBvc2l0aW9uO1xyXG5cclxuICAgIGxldCBjb2x1bW47XHJcbiAgICBsZXQgcm93O1xyXG4gICAgbGV0IGxheWVyO1xyXG4gICAgbGV0IHBvc2l0aW9uO1xyXG4gICAgbGV0IHNyYyA9IHRoaXMubWFuYWdlci5pc01vYmlsZVNjcmVlbigpID8gMCA6IDE7XHJcblxyXG4gICAgY29scyA9IGNvbHMgPyAoY29sc1tzcmNdIHx8IGNvbHMpIDogMDtcclxuICAgIHJvd3MgPSByb3dzID8gKHJvd3Nbc3JjXSB8fCByb3dzKSA6IDA7XHJcbiAgICByYWRpdXMgPSByYWRpdXMgPyAocmFkaXVzW3NyY10gfHwgcmFkaXVzKSA6IDA7XHJcbiAgICB4U3RhcnQgPSB4U3RhcnQgPyAoeFN0YXJ0W3NyY10gfHwgeFN0YXJ0KSA6IDA7XHJcbiAgICB5U3RhcnQgPSB5U3RhcnQgPyAoeVN0YXJ0W3NyY10gfHwgeVN0YXJ0KSA6IDA7XHJcbiAgICB6U3RhcnQgPSB6U3RhcnQgPyAoelN0YXJ0W3NyY10gfHwgelN0YXJ0KSA6IDA7XHJcbiAgICB4U3RlcCA9IHhTdGVwID8gKHhTdGVwW3NyY10gfHwgeFN0ZXApIDogMDtcclxuICAgIHlTdGVwID0geVN0ZXAgPyAoeVN0ZXBbc3JjXSB8fCB5U3RlcCkgOiAwO1xyXG4gICAgelN0ZXAgPSB6U3RlcCA/ICh6U3RlcFtzcmNdIHx8IHpTdGVwKSA6IDA7XHJcbiAgICB4UmFuZCA9IHhSYW5kID8gKHhSYW5kW3NyY10gfHwgeFJhbmQpIDogMDtcclxuICAgIHlSYW5kID0geVJhbmQgPyAoeVJhbmRbc3JjXSB8fCB5UmFuZCkgOiAwO1xyXG4gICAgelJhbmQgPSB6UmFuZCA/ICh6UmFuZFtzcmNdIHx8IHpSYW5kKSAgOiAwO1xyXG4gICAgXHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgXHJcbiAgICAgIGNhc2UgJ2dyaWQnOlxyXG4gICAgICAgIGNvbHVtbiA9IGkgJSBjb2xzO1xyXG4gICAgICAgIHJvdyA9IE1hdGguZmxvb3IoaSAvIGNvbHMpO1xyXG4gICAgICAgIGxldCB4ID0gY29sdW1uICogKHhTdGVwIHx8IDApICsgKHhTdGFydCB8fCAwKSArIChNYXRoLnJhbmRvbSgpICogeFJhbmQgLSB4UmFuZCk7XHJcbiAgICAgICAgaWYgKHNoaWZ0ICYmIHJvdyAlIDIgPT09IDEpIHtcclxuICAgICAgICAgIHggKz0geFN0ZXAgLyAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwb3NpdGlvbiA9IHtcclxuICAgICAgICAgIHgsXHJcbiAgICAgICAgICB5OiByb3cgKiAoLXlTdGVwIHx8IDApICsgKHlTdGFydCB8fCAwKSArIChNYXRoLnJhbmRvbSgpICogeVJhbmQgLSB5UmFuZCksXHJcbiAgICAgICAgICB6OiAoelN0YXJ0IHx8IDApICsgKE1hdGgucmFuZG9tKCkgKiB6UmFuZCAtIHpSYW5kKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgXHJcbiAgICAgIGNhc2UgJ3otZ3JpZCc6XHJcbiAgICAgICAgY29sdW1uID0gaSAlIGNvbHM7XHJcbiAgICAgICAgcm93ID0gTWF0aC5mbG9vcihpIC8gY29scykgJSByb3dzO1xyXG4gICAgICAgIGxheWVyID0gTWF0aC5mbG9vcihpIC8gKGNvbHMgKiByb3dzKSk7XHJcbiAgICAgICAgcG9zaXRpb24gPSB7XHJcbiAgICAgICAgICB4OiBjb2x1bW4gKiAoeFN0ZXAgfHwgMCkgKyAoeFN0YXJ0IHx8IDApICsgKE1hdGgucmFuZG9tKCkgKiB4UmFuZCAtIHhSYW5kKSxcclxuICAgICAgICAgIHk6IHJvdyAqICgteVN0ZXAgfHwgMCkgKyAoeVN0YXJ0IHx8IDApICsgKE1hdGgucmFuZG9tKCkgKiB5UmFuZCAtIHlSYW5kKSxcclxuICAgICAgICAgIHo6IGxheWVyICogKC16U3RlcCB8fCAwKSArICh6U3RhcnQgfHwgMCkgKyAoTWF0aC5yYW5kb20oKSAqIHpSYW5kIC0gelJhbmQpXHJcbiAgICAgICAgfTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ2N5bGluZGVyJzpcclxuICAgICAgICBjb2x1bW4gPSBpICUgY29scztcclxuICAgICAgICByb3cgPSBNYXRoLmZsb29yKGkgLyBjb2xzKTtcclxuICAgICAgICBsZXQgcGhpID0gKE1hdGguUEkgLyBjb2xzICogMikgKiAoY29sdW1uICsgMSk7XHJcbiAgICAgICAgaWYgKHNoaWZ0KSB7XHJcbiAgICAgICAgICBwaGkgKz0gTWF0aC5QSSAvIGNvbHMgKiAocm93ICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgeDogcmFkaXVzICogTWF0aC5zaW4ocGhpKSxcclxuICAgICAgICAgIHk6IHJvdyAqICgteVN0ZXAgfHwgMCksXHJcbiAgICAgICAgICB6OiByYWRpdXMgKiBNYXRoLmNvcyhwaGkpXHJcbiAgICAgICAgfTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdmlzdWFsLnBvc2l0aW9uLnNldChwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwb3NpdGlvbi56KTtcclxuICAgIGlmICh0eXBlID09PSAnY3lsaW5kZXInKSB2aXN1YWwubG9va0F0KG5ldyBWZWN0b3IzKDAsIHBvc2l0aW9uLnksIDApKTtcclxuICB9O1xyXG59XHJcbiJdfQ==