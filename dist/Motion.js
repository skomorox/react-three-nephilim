"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Motion = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Motion = function Motion(visual, params) {
  var _this = this;

  _classCallCheck(this, Motion);

  _defineProperty(this, "update", function () {
    for (var m in _this.modes) {
      switch (m) {
        case 'trackMouse':
          var trackMouseX = _this.modes[m].mouseX;
          var trackMouseY = _this.modes[m].mouseY;
          var _this$manager = _this.manager,
              _this$manager$contain = _this$manager.container,
              offsetWidth = _this$manager$contain.offsetWidth,
              offsetHeight = _this$manager$contain.offsetHeight,
              _this$manager$mouse = _this$manager.mouse,
              x = _this$manager$mouse.x,
              y = _this$manager$mouse.y;

          if (trackMouseX) {
            _this.trackMouseByAxis({
              track: trackMouseX,
              axis: trackMouseX.symmetry ? x - offsetWidth / 2 : x
            });
          }

          if (trackMouseY) {
            _this.trackMouseByAxis({
              track: trackMouseY,
              axis: trackMouseY.symmetry ? y - offsetHeight / 2 : y
            });
          }

          break;

        case 'uniforms':
          var uniforms = _this.visual.material.uniforms;

          if (uniforms) {
            for (var u in _this.modes[m]) {
              uniforms[u].value += _this.modes[m][u];
            }
          }

          break;

        case 'morph':
          var mti = _this.visual.morphTargetInfluences;

          for (var i = 0; i < mti.length; i++) {
            mti[i] += _this.modes[m].step;
          }

          break;

        default:
          var axes = _this.modes[m].axes;

          for (var a in axes) {
            axes[a].currentValue += axes[a].direction ? axes[a].speed : -axes[a].speed;
            _this.visual[m][a] += axes[a].direction ? axes[a].speed : -axes[a].speed;
            if (axes[a].currentValue < -axes[a].maxValue) axes[a].direction = true;
            if (axes[a].currentValue > axes[a].maxValue) axes[a].direction = false;
          }

          break;
      }
    }
  });

  _defineProperty(this, "trackMouseByAxis", function (_ref) {
    var track = _ref.track,
        axis = _ref.axis;
    ['position', 'rotation', 'scale'].forEach(function (type) {
      if (track[type]) {
        if (track[type].x) {
          _this.visual[type].x = axis * track[type].x + (track[type].modX || 0);
        }

        if (track[type].y) {
          _this.visual[type].y = axis * track[type].y + (track[type].modY || 0);
        }

        if (track[type].z) {
          _this.visual[type].z = axis * track[type].z + (track[type].modZ || 0);
        }
      }
    });
  });

  this.modes = {};
  this.visual = visual;

  var _loop = function _loop(m) {
    if (params[m].axes) {
      var axes = params[m].axes.split('');
      _this.modes[m] = {
        axes: {}
      };
      axes.forEach(function (a) {
        _this.modes[m].axes[a] = {};
        _this.modes[m].axes[a].speed = params[m].speed ? params[m].speed : Math.random() * params[m].randSpeed;
        _this.modes[m].axes[a].currentValue = 0;
        _this.modes[m].axes[a].maxValue = params[m].maxValue;
        _this.modes[m].axes[a].direction = params[m].speed ? true : Math.random() > 0.5;
      });
    } else {
      _this.modes[m] = params[m];
    }
  };

  for (var m in params) {
    _loop(m);
  }
};

exports.Motion = Motion;