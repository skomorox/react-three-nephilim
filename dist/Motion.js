"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Motion = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***************************************************************************************************************
 * @author Skomorox
 * v3.0.0
 * 
 * @class Motion
 * Abstract: Motion represents different types of random or preset
 *           Decoration movement. Currently available motion types are:
 *           1. Random / static position (randSpeed / speed, changes direction when maxValue is reached, if set)
 *           2. Random / static rotation (randSpeed / speed, changes direction when maxValue is reached, if set)
 *           3. Random / static scale (randSpeed / speed, changes direction when maxValue is reached, if set)
 *           4. Track mouse position - change position, rotation, scale (x, y, z) + custom modifiers
 *           5. Update shader uniforms
 *           6. Update morph targets
 ***************************************************************************************************************
 */
var Motion =
/**
 * @function constructor
 */
function Motion(visual, params) {
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
}
/**
 * @function update
 * Update Motion
 */
;

exports.Motion = Motion;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Nb3Rpb24uanMiXSwibmFtZXMiOlsiTW90aW9uIiwidmlzdWFsIiwicGFyYW1zIiwibSIsIm1vZGVzIiwidHJhY2tNb3VzZVgiLCJtb3VzZVgiLCJ0cmFja01vdXNlWSIsIm1vdXNlWSIsIm1hbmFnZXIiLCJjb250YWluZXIiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsIm1vdXNlIiwieCIsInkiLCJ0cmFja01vdXNlQnlBeGlzIiwidHJhY2siLCJheGlzIiwic3ltbWV0cnkiLCJ1bmlmb3JtcyIsIm1hdGVyaWFsIiwidSIsInZhbHVlIiwibXRpIiwibW9ycGhUYXJnZXRJbmZsdWVuY2VzIiwiaSIsImxlbmd0aCIsInN0ZXAiLCJheGVzIiwiYSIsImN1cnJlbnRWYWx1ZSIsImRpcmVjdGlvbiIsInNwZWVkIiwibWF4VmFsdWUiLCJmb3JFYWNoIiwidHlwZSIsIm1vZFgiLCJtb2RZIiwieiIsIm1vZFoiLCJzcGxpdCIsIk1hdGgiLCJyYW5kb20iLCJyYW5kU3BlZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztJQWdCYUEsTTtBQUVYOzs7QUFHQSxnQkFBWUMsTUFBWixFQUFvQkMsTUFBcEIsRUFBNEI7QUFBQTs7QUFBQTs7QUFBQSxrQ0EwQm5CLFlBQU07QUFDYixTQUFLLElBQUlDLENBQVQsSUFBYyxLQUFJLENBQUNDLEtBQW5CLEVBQTBCO0FBQ3hCLGNBQVFELENBQVI7QUFDRSxhQUFLLFlBQUw7QUFDRSxjQUFNRSxXQUFXLEdBQUcsS0FBSSxDQUFDRCxLQUFMLENBQVdELENBQVgsRUFBY0csTUFBbEM7QUFDQSxjQUFNQyxXQUFXLEdBQUcsS0FBSSxDQUFDSCxLQUFMLENBQVdELENBQVgsRUFBY0ssTUFBbEM7QUFGRiw4QkFNTSxLQUFJLENBQUNDLE9BTlg7QUFBQSxvREFJSUMsU0FKSjtBQUFBLGNBSWlCQyxXQUpqQix5QkFJaUJBLFdBSmpCO0FBQUEsY0FJOEJDLFlBSjlCLHlCQUk4QkEsWUFK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QixJQUFsQixHQUF5QlMsSUFBSSxDQUFDQyxNQUFMLEtBQWdCLEdBQTNFO0FBQ0QsT0FORDtBQU9ELEtBVkQsTUFVTztBQUNMLE1BQUEsS0FBSSxDQUFDdkMsS0FBTCxDQUFXRCxDQUFYLElBQWdCRCxNQUFNLENBQUNDLENBQUQsQ0FBdEI7QUFDRDtBQWxCdUI7O0FBSzFCLE9BQUssSUFBSUEsQ0FBVCxJQUFjRCxNQUFkLEVBQXNCO0FBQUEsVUFBYkMsQ0FBYTtBQWNyQjtBQUNGO0FBRUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIEBhdXRob3IgU2tvbW9yb3hcclxuICogdjMuMC4wXHJcbiAqIFxyXG4gKiBAY2xhc3MgTW90aW9uXHJcbiAqIEFic3RyYWN0OiBNb3Rpb24gcmVwcmVzZW50cyBkaWZmZXJlbnQgdHlwZXMgb2YgcmFuZG9tIG9yIHByZXNldFxyXG4gKiAgICAgICAgICAgRGVjb3JhdGlvbiBtb3ZlbWVudC4gQ3VycmVudGx5IGF2YWlsYWJsZSBtb3Rpb24gdHlwZXMgYXJlOlxyXG4gKiAgICAgICAgICAgMS4gUmFuZG9tIC8gc3RhdGljIHBvc2l0aW9uIChyYW5kU3BlZWQgLyBzcGVlZCwgY2hhbmdlcyBkaXJlY3Rpb24gd2hlbiBtYXhWYWx1ZSBpcyByZWFjaGVkLCBpZiBzZXQpXHJcbiAqICAgICAgICAgICAyLiBSYW5kb20gLyBzdGF0aWMgcm90YXRpb24gKHJhbmRTcGVlZCAvIHNwZWVkLCBjaGFuZ2VzIGRpcmVjdGlvbiB3aGVuIG1heFZhbHVlIGlzIHJlYWNoZWQsIGlmIHNldClcclxuICogICAgICAgICAgIDMuIFJhbmRvbSAvIHN0YXRpYyBzY2FsZSAocmFuZFNwZWVkIC8gc3BlZWQsIGNoYW5nZXMgZGlyZWN0aW9uIHdoZW4gbWF4VmFsdWUgaXMgcmVhY2hlZCwgaWYgc2V0KVxyXG4gKiAgICAgICAgICAgNC4gVHJhY2sgbW91c2UgcG9zaXRpb24gLSBjaGFuZ2UgcG9zaXRpb24sIHJvdGF0aW9uLCBzY2FsZSAoeCwgeSwgeikgKyBjdXN0b20gbW9kaWZpZXJzXHJcbiAqICAgICAgICAgICA1LiBVcGRhdGUgc2hhZGVyIHVuaWZvcm1zXHJcbiAqICAgICAgICAgICA2LiBVcGRhdGUgbW9ycGggdGFyZ2V0c1xyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vdGlvbiB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHZpc3VhbCwgcGFyYW1zKSB7XHJcblxyXG4gICAgdGhpcy5tb2RlcyA9IHt9O1xyXG4gICAgdGhpcy52aXN1YWwgPSB2aXN1YWw7XHJcblxyXG4gICAgZm9yIChsZXQgbSBpbiBwYXJhbXMpIHtcclxuICAgICAgaWYgKHBhcmFtc1ttXS5heGVzKSB7XHJcbiAgICAgICAgY29uc3QgYXhlcyA9IHBhcmFtc1ttXS5heGVzLnNwbGl0KCcnKTtcclxuICAgICAgICB0aGlzLm1vZGVzW21dID0geyBheGVzOiB7fSB9O1xyXG4gICAgICAgIGF4ZXMuZm9yRWFjaChhID0+IHtcclxuICAgICAgICAgIHRoaXMubW9kZXNbbV0uYXhlc1thXSA9IHt9O1xyXG4gICAgICAgICAgdGhpcy5tb2Rlc1ttXS5heGVzW2FdLnNwZWVkID0gcGFyYW1zW21dLnNwZWVkID8gcGFyYW1zW21dLnNwZWVkIDogTWF0aC5yYW5kb20oKSAqIHBhcmFtc1ttXS5yYW5kU3BlZWQ7XHJcbiAgICAgICAgICB0aGlzLm1vZGVzW21dLmF4ZXNbYV0uY3VycmVudFZhbHVlID0gMDtcclxuICAgICAgICAgIHRoaXMubW9kZXNbbV0uYXhlc1thXS5tYXhWYWx1ZSA9IHBhcmFtc1ttXS5tYXhWYWx1ZTtcclxuICAgICAgICAgIHRoaXMubW9kZXNbbV0uYXhlc1thXS5kaXJlY3Rpb24gPSBwYXJhbXNbbV0uc3BlZWQgPyB0cnVlIDogTWF0aC5yYW5kb20oKSA+IDAuNTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vZGVzW21dID0gcGFyYW1zW21dO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gdXBkYXRlXHJcbiAgICogVXBkYXRlIE1vdGlvblxyXG4gICAqL1xyXG4gIHVwZGF0ZSA9ICgpID0+IHtcclxuICAgIGZvciAobGV0IG0gaW4gdGhpcy5tb2Rlcykge1xyXG4gICAgICBzd2l0Y2ggKG0pIHtcclxuICAgICAgICBjYXNlICd0cmFja01vdXNlJzpcclxuICAgICAgICAgIGNvbnN0IHRyYWNrTW91c2VYID0gdGhpcy5tb2Rlc1ttXS5tb3VzZVg7XHJcbiAgICAgICAgICBjb25zdCB0cmFja01vdXNlWSA9IHRoaXMubW9kZXNbbV0ubW91c2VZO1xyXG4gICAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICBjb250YWluZXI6IHsgb2Zmc2V0V2lkdGgsIG9mZnNldEhlaWdodCB9LFxyXG4gICAgICAgICAgICBtb3VzZTogeyB4LCB5IH1cclxuICAgICAgICAgIH0gPSB0aGlzLm1hbmFnZXI7XHJcbiAgICAgICAgICBpZiAodHJhY2tNb3VzZVgpIHtcclxuICAgICAgICAgICAgdGhpcy50cmFja01vdXNlQnlBeGlzKHtcclxuICAgICAgICAgICAgICB0cmFjazogdHJhY2tNb3VzZVgsXHJcbiAgICAgICAgICAgICAgYXhpczogdHJhY2tNb3VzZVguc3ltbWV0cnkgPyB4IC0gb2Zmc2V0V2lkdGggIC8gMiA6IHhcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodHJhY2tNb3VzZVkpIHtcclxuICAgICAgICAgICAgdGhpcy50cmFja01vdXNlQnlBeGlzKHtcclxuICAgICAgICAgICAgICB0cmFjazogdHJhY2tNb3VzZVksXHJcbiAgICAgICAgICAgICAgYXhpczogdHJhY2tNb3VzZVkuc3ltbWV0cnkgPyB5IC0gb2Zmc2V0SGVpZ2h0IC8gMiA6IHlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd1bmlmb3Jtcyc6XHJcbiAgICAgICAgICBjb25zdCB1bmlmb3JtcyA9IHRoaXMudmlzdWFsLm1hdGVyaWFsLnVuaWZvcm1zO1xyXG4gICAgICAgICAgaWYgKHVuaWZvcm1zKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHUgaW4gdGhpcy5tb2Rlc1ttXSkge1xyXG4gICAgICAgICAgICAgIHVuaWZvcm1zW3VdLnZhbHVlICs9IHRoaXMubW9kZXNbbV1bdV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ21vcnBoJzpcclxuICAgICAgICAgIGNvbnN0IG10aSA9IHRoaXMudmlzdWFsLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcztcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXRpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG10aVtpXSArPSB0aGlzLm1vZGVzW21dLnN0ZXA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgY29uc3QgYXhlcyA9IHRoaXMubW9kZXNbbV0uYXhlcztcclxuICAgICAgICAgIGZvciAobGV0IGEgaW4gYXhlcykge1xyXG4gICAgICAgICAgICBheGVzW2FdLmN1cnJlbnRWYWx1ZSArPSBheGVzW2FdLmRpcmVjdGlvbiA/IGF4ZXNbYV0uc3BlZWQgOiAtYXhlc1thXS5zcGVlZDtcclxuICAgICAgICAgICAgdGhpcy52aXN1YWxbbV1bYV0gKz0gYXhlc1thXS5kaXJlY3Rpb24gPyBheGVzW2FdLnNwZWVkIDogLWF4ZXNbYV0uc3BlZWQ7XHJcbiAgICAgICAgICAgIGlmIChheGVzW2FdLmN1cnJlbnRWYWx1ZSA8IC1heGVzW2FdLm1heFZhbHVlKSBheGVzW2FdLmRpcmVjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChheGVzW2FdLmN1cnJlbnRWYWx1ZSA+IGF4ZXNbYV0ubWF4VmFsdWUpIGF4ZXNbYV0uZGlyZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIHRyYWNrTW91c2VCeUF4aXNcclxuICAgKiBUcmFjayBtb3VzZSBieSBheGlzXHJcbiAgICovXHJcbiAgdHJhY2tNb3VzZUJ5QXhpcyA9ICh7IHRyYWNrLCBheGlzIH0pID0+IHtcclxuICAgIFsncG9zaXRpb24nLCAncm90YXRpb24nLCAnc2NhbGUnXS5mb3JFYWNoKHR5cGUgPT4ge1xyXG4gICAgICBpZiAodHJhY2tbdHlwZV0pIHtcclxuICAgICAgICBpZiAodHJhY2tbdHlwZV0ueCkge1xyXG4gICAgICAgICAgdGhpcy52aXN1YWxbdHlwZV0ueCA9IGF4aXMgKiB0cmFja1t0eXBlXS54ICsgKHRyYWNrW3R5cGVdLm1vZFggfHwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0cmFja1t0eXBlXS55KSB7XHJcbiAgICAgICAgICB0aGlzLnZpc3VhbFt0eXBlXS55ID0gYXhpcyAqIHRyYWNrW3R5cGVdLnkgKyAodHJhY2tbdHlwZV0ubW9kWSB8fCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRyYWNrW3R5cGVdLnopIHtcclxuICAgICAgICAgIHRoaXMudmlzdWFsW3R5cGVdLnogPSBheGlzICogdHJhY2tbdHlwZV0ueiArICh0cmFja1t0eXBlXS5tb2RaIHx8IDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxufVxyXG4iXX0=