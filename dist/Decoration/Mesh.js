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