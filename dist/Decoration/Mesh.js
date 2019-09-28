"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mesh = void 0;

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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Mesh =
/*#__PURE__*/
function (_Decoration) {
  _inherits(Mesh, _Decoration);

  function Mesh(_ref) {
    var _this;

    var geometry = _ref.geometry,
        _material = _ref.material;

    _classCallCheck(this, Mesh);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Mesh).call(this));

    _defineProperty(_assertThisInitialized(_this), "setMaterial", function (_ref2) {
      var type = _ref2.type,
          params = _ref2.params,
          onlyDesktop = _ref2.onlyDesktop;

      if (type === 'shader') {
        if (params.uniforms.texture) {
          _this.texture = _this.manager.textureLoader.load(params.uniforms.texture.value);
        }

        if (onlyDesktop && _this.manager.isMobileDevice()) {
          _this.material = new Three.MeshBasicMaterial({
            color: 0xFFFFFF,
            map: _this.texture
          });
        } else {
          params.uniforms.texture.value = _this.texture;
          _this.material = new Three.ShaderMaterial(params);
        }
      } else if (type !== 'mtl') {
        if (params.map) {
          _this.texture = _this.manager.textureLoader.load(params.map);
          params.map = _this.texture;
        }

        _this.material = new Three["Mesh".concat(_this.manager.capitalize(type), "Material")](params);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setGeometry", function (_ref3, material) {
      var type = _ref3.type,
          params = _ref3.params,
          custom = _ref3.custom,
          src = _ref3.src;

      if (type === 'obj') {
        _this.visual = new Three.Group();

        _this.manager.mtlLoader.setTexturePath(material.params.texturePath).load(material.params.src, function (materials) {
          materials.preload();

          _this.manager.objLoader.setMaterials(materials).load(src, function (obj) {
            _this.visual.add(obj);
          });
        });
      } else {
        _this.geometry = custom || _construct(Three["".concat(_this.manager.capitalize(type), "BufferGeometry")], _toConsumableArray(params));
        _this.visual = new Three.Mesh(_this.geometry, _this.material);
      }
    });

    _this.setMaterial(_material);

    _this.setGeometry(geometry, _material);

    return _this;
  }

  return Mesh;
}(_Decoration2.Decoration);

exports.Mesh = Mesh;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EZWNvcmF0aW9uL01lc2guanMiXSwibmFtZXMiOlsiTWVzaCIsImdlb21ldHJ5IiwibWF0ZXJpYWwiLCJ0eXBlIiwicGFyYW1zIiwib25seURlc2t0b3AiLCJ1bmlmb3JtcyIsInRleHR1cmUiLCJtYW5hZ2VyIiwidGV4dHVyZUxvYWRlciIsImxvYWQiLCJ2YWx1ZSIsImlzTW9iaWxlRGV2aWNlIiwiVGhyZWUiLCJNZXNoQmFzaWNNYXRlcmlhbCIsImNvbG9yIiwibWFwIiwiU2hhZGVyTWF0ZXJpYWwiLCJjYXBpdGFsaXplIiwiY3VzdG9tIiwic3JjIiwidmlzdWFsIiwiR3JvdXAiLCJtdGxMb2FkZXIiLCJzZXRUZXh0dXJlUGF0aCIsInRleHR1cmVQYXRoIiwibWF0ZXJpYWxzIiwicHJlbG9hZCIsIm9iakxvYWRlciIsInNldE1hdGVyaWFscyIsIm9iaiIsImFkZCIsInNldE1hdGVyaWFsIiwic2V0R2VvbWV0cnkiLCJEZWNvcmF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBU0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsSTs7Ozs7QUFFWCxzQkFBb0M7QUFBQTs7QUFBQSxRQUF0QkMsUUFBc0IsUUFBdEJBLFFBQXNCO0FBQUEsUUFBWkMsU0FBWSxRQUFaQSxRQUFZOztBQUFBOztBQUNsQzs7QUFEa0Msa0VBTXRCLGlCQUFtQztBQUFBLFVBQWhDQyxJQUFnQyxTQUFoQ0EsSUFBZ0M7QUFBQSxVQUExQkMsTUFBMEIsU0FBMUJBLE1BQTBCO0FBQUEsVUFBbEJDLFdBQWtCLFNBQWxCQSxXQUFrQjs7QUFDL0MsVUFBSUYsSUFBSSxLQUFLLFFBQWIsRUFBdUI7QUFDckIsWUFBSUMsTUFBTSxDQUFDRSxRQUFQLENBQWdCQyxPQUFwQixFQUE2QjtBQUMzQixnQkFBS0EsT0FBTCxHQUFlLE1BQUtDLE9BQUwsQ0FBYUMsYUFBYixDQUEyQkMsSUFBM0IsQ0FBZ0NOLE1BQU0sQ0FBQ0UsUUFBUCxDQUFnQkMsT0FBaEIsQ0FBd0JJLEtBQXhELENBQWY7QUFDRDs7QUFDRCxZQUFJTixXQUFXLElBQUksTUFBS0csT0FBTCxDQUFhSSxjQUFiLEVBQW5CLEVBQWtEO0FBQ2hELGdCQUFLVixRQUFMLEdBQWdCLElBQUlXLEtBQUssQ0FBQ0MsaUJBQVYsQ0FBNEI7QUFDMUNDLFlBQUFBLEtBQUssRUFBRSxRQURtQztBQUUxQ0MsWUFBQUEsR0FBRyxFQUFFLE1BQUtUO0FBRmdDLFdBQTVCLENBQWhCO0FBSUQsU0FMRCxNQUtPO0FBQ0xILFVBQUFBLE1BQU0sQ0FBQ0UsUUFBUCxDQUFnQkMsT0FBaEIsQ0FBd0JJLEtBQXhCLEdBQWdDLE1BQUtKLE9BQXJDO0FBQ0EsZ0JBQUtMLFFBQUwsR0FBZ0IsSUFBSVcsS0FBSyxDQUFDSSxjQUFWLENBQXlCYixNQUF6QixDQUFoQjtBQUNEO0FBQ0YsT0FiRCxNQWFPLElBQUlELElBQUksS0FBSyxLQUFiLEVBQW9CO0FBQ3pCLFlBQUdDLE1BQU0sQ0FBQ1ksR0FBVixFQUFlO0FBQ2IsZ0JBQUtULE9BQUwsR0FBZSxNQUFLQyxPQUFMLENBQWFDLGFBQWIsQ0FBMkJDLElBQTNCLENBQWdDTixNQUFNLENBQUNZLEdBQXZDLENBQWY7QUFDQVosVUFBQUEsTUFBTSxDQUFDWSxHQUFQLEdBQWEsTUFBS1QsT0FBbEI7QUFDRDs7QUFDRCxjQUFLTCxRQUFMLEdBQWdCLElBQUlXLEtBQUssZUFBUSxNQUFLTCxPQUFMLENBQWFVLFVBQWIsQ0FBd0JmLElBQXhCLENBQVIsY0FBVCxDQUEwREMsTUFBMUQsQ0FBaEI7QUFDRDtBQUNGLEtBM0JtQzs7QUFBQSxrRUE2QnRCLGlCQUFnQ0YsUUFBaEMsRUFBNkM7QUFBQSxVQUExQ0MsSUFBMEMsU0FBMUNBLElBQTBDO0FBQUEsVUFBcENDLE1BQW9DLFNBQXBDQSxNQUFvQztBQUFBLFVBQTVCZSxNQUE0QixTQUE1QkEsTUFBNEI7QUFBQSxVQUFwQkMsR0FBb0IsU0FBcEJBLEdBQW9COztBQUN6RCxVQUFJakIsSUFBSSxLQUFLLEtBQWIsRUFBb0I7QUFDbEIsY0FBS2tCLE1BQUwsR0FBYyxJQUFJUixLQUFLLENBQUNTLEtBQVYsRUFBZDs7QUFDQSxjQUFLZCxPQUFMLENBQWFlLFNBQWIsQ0FBdUJDLGNBQXZCLENBQXNDdEIsUUFBUSxDQUFDRSxNQUFULENBQWdCcUIsV0FBdEQsRUFBbUVmLElBQW5FLENBQXdFUixRQUFRLENBQUNFLE1BQVQsQ0FBZ0JnQixHQUF4RixFQUE2RixVQUFBTSxTQUFTLEVBQUk7QUFDeEdBLFVBQUFBLFNBQVMsQ0FBQ0MsT0FBVjs7QUFDQSxnQkFBS25CLE9BQUwsQ0FBYW9CLFNBQWIsQ0FBdUJDLFlBQXZCLENBQW9DSCxTQUFwQyxFQUErQ2hCLElBQS9DLENBQW9EVSxHQUFwRCxFQUF5RCxVQUFBVSxHQUFHLEVBQUk7QUFDOUQsa0JBQUtULE1BQUwsQ0FBWVUsR0FBWixDQUFnQkQsR0FBaEI7QUFDRCxXQUZEO0FBR0QsU0FMRDtBQU1ELE9BUkQsTUFRTztBQUNMLGNBQUs3QixRQUFMLEdBQWdCa0IsTUFBTSxlQUFRTixLQUFLLFdBQUksTUFBS0wsT0FBTCxDQUFhVSxVQUFiLENBQXdCZixJQUF4QixDQUFKLG9CQUFiLHFCQUFtRUMsTUFBbkUsRUFBdEI7QUFDQSxjQUFLaUIsTUFBTCxHQUFjLElBQUlSLEtBQUssQ0FBQ2IsSUFBVixDQUFlLE1BQUtDLFFBQXBCLEVBQThCLE1BQUtDLFFBQW5DLENBQWQ7QUFDRDtBQUNGLEtBMUNtQzs7QUFFbEMsVUFBSzhCLFdBQUwsQ0FBaUI5QixTQUFqQjs7QUFDQSxVQUFLK0IsV0FBTCxDQUFpQmhDLFFBQWpCLEVBQTJCQyxTQUEzQjs7QUFIa0M7QUFJbkM7OztFQU51QmdDLHVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIEBhdXRob3IgU2tvbW9yb3hcclxuICogdjMuMC4wXHJcbiAqXHJcbiAqIEBjbGFzcyBNZXNoXHJcbiAqIEFic3RyYWN0OiBDbGFzcyBNZXNoLiBUSFJFRS5NZXNoIHdyYXBwZXIuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKi9cclxuXHJcbmltcG9ydCAqIGFzIFRocmVlIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IHsgRGVjb3JhdGlvbiB9IGZyb20gJy4vRGVjb3JhdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzaCBleHRlbmRzIERlY29yYXRpb24ge1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKHsgZ2VvbWV0cnksIG1hdGVyaWFsIH0pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnNldE1hdGVyaWFsKG1hdGVyaWFsKTtcclxuICAgIHRoaXMuc2V0R2VvbWV0cnkoZ2VvbWV0cnksIG1hdGVyaWFsKTtcclxuICB9XHJcblxyXG4gIHNldE1hdGVyaWFsID0gKHsgdHlwZSwgcGFyYW1zLCBvbmx5RGVza3RvcCB9KSA9PiB7XHJcbiAgICBpZiAodHlwZSA9PT0gJ3NoYWRlcicpIHtcclxuICAgICAgaWYgKHBhcmFtcy51bmlmb3Jtcy50ZXh0dXJlKSB7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy5tYW5hZ2VyLnRleHR1cmVMb2FkZXIubG9hZChwYXJhbXMudW5pZm9ybXMudGV4dHVyZS52YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9ubHlEZXNrdG9wICYmIHRoaXMubWFuYWdlci5pc01vYmlsZURldmljZSgpKSB7XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbCA9IG5ldyBUaHJlZS5NZXNoQmFzaWNNYXRlcmlhbCh7XHJcbiAgICAgICAgICBjb2xvcjogMHhGRkZGRkYsXHJcbiAgICAgICAgICBtYXA6IHRoaXMudGV4dHVyZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBhcmFtcy51bmlmb3Jtcy50ZXh0dXJlLnZhbHVlID0gdGhpcy50ZXh0dXJlO1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwgPSBuZXcgVGhyZWUuU2hhZGVyTWF0ZXJpYWwocGFyYW1zKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlICE9PSAnbXRsJykge1xyXG4gICAgICBpZihwYXJhbXMubWFwKSB7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy5tYW5hZ2VyLnRleHR1cmVMb2FkZXIubG9hZChwYXJhbXMubWFwKTtcclxuICAgICAgICBwYXJhbXMubWFwID0gdGhpcy50ZXh0dXJlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubWF0ZXJpYWwgPSBuZXcgVGhyZWVbYE1lc2gke3RoaXMubWFuYWdlci5jYXBpdGFsaXplKHR5cGUpfU1hdGVyaWFsYF0ocGFyYW1zKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzZXRHZW9tZXRyeSA9ICh7IHR5cGUsIHBhcmFtcywgY3VzdG9tLCBzcmMgfSwgbWF0ZXJpYWwpID0+IHtcclxuICAgIGlmICh0eXBlID09PSAnb2JqJykge1xyXG4gICAgICB0aGlzLnZpc3VhbCA9IG5ldyBUaHJlZS5Hcm91cCgpO1xyXG4gICAgICB0aGlzLm1hbmFnZXIubXRsTG9hZGVyLnNldFRleHR1cmVQYXRoKG1hdGVyaWFsLnBhcmFtcy50ZXh0dXJlUGF0aCkubG9hZChtYXRlcmlhbC5wYXJhbXMuc3JjLCBtYXRlcmlhbHMgPT4ge1xyXG4gICAgICAgIG1hdGVyaWFscy5wcmVsb2FkKCk7XHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyLm9iakxvYWRlci5zZXRNYXRlcmlhbHMobWF0ZXJpYWxzKS5sb2FkKHNyYywgb2JqID0+IHtcclxuICAgICAgICAgIHRoaXMudmlzdWFsLmFkZChvYmopO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2VvbWV0cnkgPSBjdXN0b20gfHwgbmV3IFRocmVlW2Ake3RoaXMubWFuYWdlci5jYXBpdGFsaXplKHR5cGUpfUJ1ZmZlckdlb21ldHJ5YF0oLi4ucGFyYW1zKTtcclxuICAgICAgdGhpcy52aXN1YWwgPSBuZXcgVGhyZWUuTWVzaCh0aGlzLmdlb21ldHJ5LCB0aGlzLm1hdGVyaWFsKTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcbiJdfQ==