"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = void 0;

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Container = function (_Decoration) {
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
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      Object.keys(this.children).forEach(function (k, i) {
        var c = _this2.children[k];

        _this2.buildComposition(c.visual, i);
      });

      _get(_getPrototypeOf(Container.prototype), "componentDidMount", this).call(this);
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return Container;
}(_Decoration2.Decoration);

exports.Container = Container;