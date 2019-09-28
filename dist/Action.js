"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Action = void 0;

var _tween = _interopRequireDefault(require("@tweenjs/tween.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Action = function Action() {
  var _this = this;

  _classCallCheck(this, Action);

  _defineProperty(this, "begin", function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        decorations = _ref.decorations,
        easing = _ref.easing,
        duration = _ref.duration,
        affectAll = _ref.affectAll,
        enforce = _ref.enforce,
        callback = _ref.callback;

    if (!_this.manager.isActionsEnabled) return false;
    var from = [];
    var to = [];
    var ad = {};

    if (decorations) {
      for (var d in decorations) {
        ad[d] = {
          decoration: _this.decorations[d].decoration,
          state: decorations[d].state
        };
      }

      if (affectAll) {
        for (var _d in _this.decorations) {
          if (!decorations[_d]) ad[_d] = _objectSpread({}, _this.decorations[_d]);
        }

        ;
      }
    } else {
      ad = _this.decorations;
    }

    for (var _d2 in ad) {
      var deco = ad[_d2].decoration;
      var state = ad[_d2].state;
      from.push(deco.visual);
      to.push(deco.buildVisualState(state));

      if (state.uniforms) {
        for (var u in state.uniforms) {
          from.push(deco.visual.material.uniforms[u]);
          to.push(state.uniforms[u]);
        }

        ;
      }
    }

    ;
    if (enforce) _this.manager.isActionsEnabled = false;

    _this.animate({
      from: from,
      to: to,
      easing: easing,
      duration: duration,
      callback: callback
    });
  });

  _defineProperty(this, "animate", function (_ref2) {
    var from = _ref2.from,
        to = _ref2.to,
        easing = _ref2.easing,
        duration = _ref2.duration,
        callback = _ref2.callback;
    var tweenPromises = [];
    var parts = easing ? easing.split('-') : ['exponential', 'out'];

    var e = _tween["default"].Easing[_this.manager.capitalize(parts[0])][_this.manager.capitalize(parts[1])];

    var dur = duration || 500;

    _tween["default"].removeAll();

    from.forEach(function (f, i) {
      if (from[i].position && to[i].position) {
        (function (from, to) {
          tweenPromises.push(new Promise(function (resolve) {
            new _tween["default"].Tween(from.position).to({
              x: to.position.x,
              y: to.position.y,
              z: to.position.z
            }, dur).easing(e).start().onComplete(function () {
              return resolve();
            });
          }));
        })(from[i], to[i]);
      }

      if (from[i].rotation && to[i].rotation) {
        (function (from, to) {
          tweenPromises.push(new Promise(function (resolve) {
            new _tween["default"].Tween(from.rotation).to({
              x: to.rotation.x,
              y: to.rotation.y,
              z: to.rotation.z
            }, dur).easing(e).start().onComplete(function () {
              return resolve();
            });
          }));
        })(from[i], to[i]);
      }

      if (from[i].scale && to[i].scale) {
        (function (from, to) {
          tweenPromises.push(new Promise(function (resolve) {
            new _tween["default"].Tween(from.scale).to({
              x: to.scale.x,
              y: to.scale.y,
              z: to.scale.z
            }, dur).easing(e).start().onComplete(function () {
              return resolve();
            });
          }));
        })(from[i], to[i]);
      }

      if (from[i].value !== undefined) {
        (function (from, to) {
          tweenPromises.push(new Promise(function (resolve) {
            new _tween["default"].Tween(from).to({
              value: to.value
            }, dur).easing(e).start().onComplete(function () {
              return resolve();
            });
          }));
        })(from[i], to[i]);
      }
    });
    Promise.all(tweenPromises).then(function () {
      return _this.onActionComplete({
        callback: callback
      });
    });
  });

  _defineProperty(this, "onActionComplete", function (_ref3) {
    var callback = _ref3.callback;
    _this.manager.isActionsEnabled = true;
    if (callback) callback();
  });

  _defineProperty(this, "getDecorations", function () {
    return _this.decorations;
  });

  _defineProperty(this, "addDecoration", function (decoration, state) {
    return _this.decorations[decoration.id] = {
      decoration: decoration,
      state: state
    };
  });

  _defineProperty(this, "removeDecoration", function (id) {
    return delete _this.decorations[id];
  });

  this.decorations = {};
}
/**
 * @function begin
 * @param {Object} params
 * @param {Object[]} decorations
 * @param {String} easing
 * @param {Number} duration
 * @param {Boolean} affectAll
 * @param {Boolean} enforce
 * @param {Function} callback
 * 1. Check if other Action is currently in progress and if Scene is locked
 * 2. Generate a list of affected Decorations and destination objects
 * 3. Begin animation
 */
;

exports.Action = Action;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BY3Rpb24uanMiXSwibmFtZXMiOlsiQWN0aW9uIiwiZGVjb3JhdGlvbnMiLCJlYXNpbmciLCJkdXJhdGlvbiIsImFmZmVjdEFsbCIsImVuZm9yY2UiLCJjYWxsYmFjayIsIm1hbmFnZXIiLCJpc0FjdGlvbnNFbmFibGVkIiwiZnJvbSIsInRvIiwiYWQiLCJkIiwiZGVjb3JhdGlvbiIsInN0YXRlIiwiZGVjbyIsInB1c2giLCJ2aXN1YWwiLCJidWlsZFZpc3VhbFN0YXRlIiwidW5pZm9ybXMiLCJ1IiwibWF0ZXJpYWwiLCJhbmltYXRlIiwidHdlZW5Qcm9taXNlcyIsInBhcnRzIiwic3BsaXQiLCJlIiwiVFdFRU4iLCJFYXNpbmciLCJjYXBpdGFsaXplIiwiZHVyIiwicmVtb3ZlQWxsIiwiZm9yRWFjaCIsImYiLCJpIiwicG9zaXRpb24iLCJQcm9taXNlIiwicmVzb2x2ZSIsIlR3ZWVuIiwieCIsInkiLCJ6Iiwic3RhcnQiLCJvbkNvbXBsZXRlIiwicm90YXRpb24iLCJzY2FsZSIsInZhbHVlIiwidW5kZWZpbmVkIiwiYWxsIiwidGhlbiIsIm9uQWN0aW9uQ29tcGxldGUiLCJpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWFBOzs7Ozs7Ozs7Ozs7SUFFYUEsTSxHQUVYLGtCQUFjO0FBQUE7O0FBQUE7O0FBQUEsaUNBaUJOLFlBQTBFO0FBQUEsbUZBQVAsRUFBTztBQUFBLFFBQXZFQyxXQUF1RSxRQUF2RUEsV0FBdUU7QUFBQSxRQUExREMsTUFBMEQsUUFBMURBLE1BQTBEO0FBQUEsUUFBbERDLFFBQWtELFFBQWxEQSxRQUFrRDtBQUFBLFFBQXhDQyxTQUF3QyxRQUF4Q0EsU0FBd0M7QUFBQSxRQUE3QkMsT0FBNkIsUUFBN0JBLE9BQTZCO0FBQUEsUUFBcEJDLFFBQW9CLFFBQXBCQSxRQUFvQjs7QUFFaEYsUUFBSSxDQUFDLEtBQUksQ0FBQ0MsT0FBTCxDQUFhQyxnQkFBbEIsRUFBb0MsT0FBTyxLQUFQO0FBRXBDLFFBQU1DLElBQUksR0FBRyxF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QUksQ0FBQ0MsT0FBTCxDQUFhQyxnQkFBYixHQUFnQyxJQUFoQztBQUNBLFFBQUlGLFFBQUosRUFBY0EsUUFBUTtBQUN2QixHQW5JYTs7QUFBQSwwQ0F5SUc7QUFBQSxXQUFNLEtBQUksQ0FBQ0wsV0FBWDtBQUFBLEdBeklIOztBQUFBLHlDQWlKRSxVQUFDWSxVQUFELEVBQWFDLEtBQWI7QUFBQSxXQUF1QixLQUFJLENBQUNiLFdBQUwsQ0FBaUJZLFVBQVUsQ0FBQ3NDLEVBQTVCLElBQWtDO0FBQUV0QyxNQUFBQSxVQUFVLEVBQVZBLFVBQUY7QUFBY0MsTUFBQUEsS0FBSyxFQUFMQTtBQUFkLEtBQXpEO0FBQUEsR0FqSkY7O0FBQUEsNENBd0pLLFVBQUFxQyxFQUFFO0FBQUEsV0FBSSxPQUFPLEtBQUksQ0FBQ2xELFdBQUwsQ0FBaUJrRCxFQUFqQixDQUFYO0FBQUEsR0F4SlA7O0FBQ1osT0FBS2xELFdBQUwsR0FBbUIsRUFBbkI7QUFDRDtBQUVEIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQGF1dGhvciBTa29tb3JveFxyXG4gKiB2My4wLjBcclxuICpcclxuICogQGNsYXNzIEFjdGlvblxyXG4gKiBBYnN0cmFjdDogQWN0aW9ucyBhcmUgZmluYWxpemVkIGFjdHMgd2hpY2ggYWZmZWN0IERlY29yYXRpb25zIG9yIFNjZW5lcy5cclxuICogICAgICAgICAgIE9ubHkgb25lIEFjdGlvbiBjYW4gYmUgcGVyZm9ybWVkIGF0IHRoZSBzYW1lIHRpbWUuXHJcbiAqICAgICAgICAgICBQZXJmb3JtcyB0cmFuc2l0aW9uIGJldHdlZW4gU2NlbmVzIG9yIGNoYW5naW5nIFNjZW5lIERlY29yYXRpb25zXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKi9cclxuIFxyXG5pbXBvcnQgVFdFRU4gZnJvbSAnQHR3ZWVuanMvdHdlZW4uanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdGlvbiB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5kZWNvcmF0aW9ucyA9IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGJlZ2luXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0W119IGRlY29yYXRpb25zXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVhc2luZ1xyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gYWZmZWN0QWxsXHJcbiAgICogQHBhcmFtIHtCb29sZWFufSBlbmZvcmNlXHJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICAgKiAxLiBDaGVjayBpZiBvdGhlciBBY3Rpb24gaXMgY3VycmVudGx5IGluIHByb2dyZXNzIGFuZCBpZiBTY2VuZSBpcyBsb2NrZWRcclxuICAgKiAyLiBHZW5lcmF0ZSBhIGxpc3Qgb2YgYWZmZWN0ZWQgRGVjb3JhdGlvbnMgYW5kIGRlc3RpbmF0aW9uIG9iamVjdHNcclxuICAgKiAzLiBCZWdpbiBhbmltYXRpb25cclxuICAgKi9cclxuICBiZWdpbiA9ICh7IGRlY29yYXRpb25zLCBlYXNpbmcsIGR1cmF0aW9uLCBhZmZlY3RBbGwsIGVuZm9yY2UsIGNhbGxiYWNrIH0gPSB7fSkgPT4ge1xyXG5cclxuICAgIGlmICghdGhpcy5tYW5hZ2VyLmlzQWN0aW9uc0VuYWJsZWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBmcm9tID0gW107XHJcbiAgICBjb25zdCB0byA9IFtdO1xyXG4gICAgbGV0IGFkID0ge307XHJcblxyXG4gICAgaWYgKGRlY29yYXRpb25zKSB7ICAgICAgXHJcbiAgICAgIGZvciAobGV0IGQgaW4gZGVjb3JhdGlvbnMpIHtcclxuICAgICAgICBhZFtkXSA9IHtcclxuICAgICAgICAgIGRlY29yYXRpb246IHRoaXMuZGVjb3JhdGlvbnNbZF0uZGVjb3JhdGlvbixcclxuICAgICAgICAgIHN0YXRlOiBkZWNvcmF0aW9uc1tkXS5zdGF0ZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoYWZmZWN0QWxsKSB7XHJcbiAgICAgICAgZm9yIChsZXQgZCBpbiB0aGlzLmRlY29yYXRpb25zKSB7XHJcbiAgICAgICAgICBpZiAoIWRlY29yYXRpb25zW2RdKSBhZFtkXSA9IHsgLi4udGhpcy5kZWNvcmF0aW9uc1tkXSB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFkID0gdGhpcy5kZWNvcmF0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBkIGluIGFkKSB7XHJcblxyXG4gICAgICBjb25zdCBkZWNvID0gYWRbZF0uZGVjb3JhdGlvbjtcclxuICAgICAgY29uc3Qgc3RhdGUgPSBhZFtkXS5zdGF0ZTtcclxuXHJcbiAgICAgIGZyb20ucHVzaChkZWNvLnZpc3VhbCk7XHJcbiAgICAgIHRvLnB1c2goZGVjby5idWlsZFZpc3VhbFN0YXRlKHN0YXRlKSk7ICAgIFxyXG5cclxuICAgICAgaWYgKHN0YXRlLnVuaWZvcm1zKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdSBpbiBzdGF0ZS51bmlmb3Jtcykge1xyXG4gICAgICAgICAgZnJvbS5wdXNoKGRlY28udmlzdWFsLm1hdGVyaWFsLnVuaWZvcm1zW3VdKTtcclxuICAgICAgICAgIHRvLnB1c2goc3RhdGUudW5pZm9ybXNbdV0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKGVuZm9yY2UpIHRoaXMubWFuYWdlci5pc0FjdGlvbnNFbmFibGVkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5hbmltYXRlKHsgZnJvbSwgdG8sIGVhc2luZywgZHVyYXRpb24sIGNhbGxiYWNrIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGFuaW1hdGVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXHJcbiAgICogQHBhcmFtIHtPYmplY3RbXX0gZnJvbVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0W119IHRvXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVhc2luZ1xyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAgICogQW5pbWF0ZSBvYmplY3RzIChwYXJhbXMuZnJvbSkgdXNpbmcgdHdlZW4uanMgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzKS5cclxuICAgKiBFeGVjdXRlIGNhbGxiYWNrIGZ1bmN0aW9uLCBpZiBzZXQsIGFmdGVyLlxyXG4gICAqL1xyXG4gIGFuaW1hdGUgPSAoeyBmcm9tLCB0bywgZWFzaW5nLCBkdXJhdGlvbiwgY2FsbGJhY2sgfSkgPT4ge1xyXG5cclxuICAgIGNvbnN0IHR3ZWVuUHJvbWlzZXMgPSBbXTtcclxuICAgIGNvbnN0IHBhcnRzID0gZWFzaW5nID8gZWFzaW5nLnNwbGl0KCctJykgOiBbJ2V4cG9uZW50aWFsJywgJ291dCddO1xyXG4gICAgY29uc3QgZSA9IFRXRUVOLkVhc2luZ1t0aGlzLm1hbmFnZXIuY2FwaXRhbGl6ZShwYXJ0c1swXSldW3RoaXMubWFuYWdlci5jYXBpdGFsaXplKHBhcnRzWzFdKV07XHJcbiAgICBjb25zdCBkdXIgPSBkdXJhdGlvbiB8fCA1MDA7XHJcblxyXG4gICAgVFdFRU4ucmVtb3ZlQWxsKCk7XHJcblxyXG4gICAgZnJvbS5mb3JFYWNoKChmLCBpKSA9PiB7XHJcbiAgICAgIGlmIChmcm9tW2ldLnBvc2l0aW9uICYmIHRvW2ldLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgKChmcm9tLCB0bykgPT4ge1xyXG4gICAgICAgICAgdHdlZW5Qcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICBuZXcgVFdFRU4uVHdlZW4oZnJvbS5wb3NpdGlvbilcclxuICAgICAgICAgICAgICAudG8oeyB4OiB0by5wb3NpdGlvbi54LCB5OiB0by5wb3NpdGlvbi55LCB6OiB0by5wb3NpdGlvbi56IH0sIGR1cilcclxuICAgICAgICAgICAgICAuZWFzaW5nKGUpLnN0YXJ0KCkub25Db21wbGV0ZSgoKSA9PiByZXNvbHZlKCkpO1xyXG4gICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pKGZyb21baV0sIHRvW2ldKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZnJvbVtpXS5yb3RhdGlvbiAmJiB0b1tpXS5yb3RhdGlvbikge1xyXG4gICAgICAgICgoZnJvbSwgdG8pID0+IHtcclxuICAgICAgICAgIHR3ZWVuUHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgbmV3IFRXRUVOLlR3ZWVuKGZyb20ucm90YXRpb24pXHJcbiAgICAgICAgICAgICAgLnRvKHsgeDogdG8ucm90YXRpb24ueCwgeTogdG8ucm90YXRpb24ueSwgejogdG8ucm90YXRpb24ueiB9LCBkdXIpXHJcbiAgICAgICAgICAgICAgLmVhc2luZyhlKS5zdGFydCgpLm9uQ29tcGxldGUoKCkgPT4gcmVzb2x2ZSgpKTtcclxuICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KShmcm9tW2ldLCB0b1tpXSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGZyb21baV0uc2NhbGUgJiYgdG9baV0uc2NhbGUpIHtcclxuICAgICAgICAoKGZyb20sIHRvKSA9PiB7XHJcbiAgICAgICAgICB0d2VlblByb21pc2VzLnB1c2gobmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgIG5ldyBUV0VFTi5Ud2Vlbihmcm9tLnNjYWxlKVxyXG4gICAgICAgICAgICAgIC50byh7IHg6IHRvLnNjYWxlLngsIHk6IHRvLnNjYWxlLnksIHo6IHRvLnNjYWxlLnogfSwgZHVyKVxyXG4gICAgICAgICAgICAgIC5lYXNpbmcoZSkuc3RhcnQoKS5vbkNvbXBsZXRlKCgpID0+IHJlc29sdmUoKSk7XHJcbiAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSkoZnJvbVtpXSwgdG9baV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChmcm9tW2ldLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAoKGZyb20sIHRvKSA9PiB7XHJcbiAgICAgICAgICB0d2VlblByb21pc2VzLnB1c2gobmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgIG5ldyBUV0VFTi5Ud2Vlbihmcm9tKVxyXG4gICAgICAgICAgICAgIC50byh7IHZhbHVlOiB0by52YWx1ZSB9LCBkdXIpXHJcbiAgICAgICAgICAgICAgLmVhc2luZyhlKS5zdGFydCgpLm9uQ29tcGxldGUoKCkgPT4gcmVzb2x2ZSgpKTtcclxuICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KShmcm9tW2ldLCB0b1tpXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIFByb21pc2UuYWxsKHR3ZWVuUHJvbWlzZXMpLnRoZW4oKCkgPT4gdGhpcy5vbkFjdGlvbkNvbXBsZXRlKHsgY2FsbGJhY2sgfSkpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBvbkFjdGlvbkNvbXBsZXRlXHJcbiAgICogRW5hYmxlIGFjdGlvbnMgYWZ0ZXIgdHdlZW4gY29tcGxldGUgYW5kIGV4ZWN1dGUgY2FsbGJhY2sgaWYgbmVlZGVkXHJcbiAgICovXHJcbiAgb25BY3Rpb25Db21wbGV0ZSA9ICh7IGNhbGxiYWNrIH0pID0+IHtcclxuICAgIHRoaXMubWFuYWdlci5pc0FjdGlvbnNFbmFibGVkID0gdHJ1ZTtcclxuICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBnZXREZWNvcmF0aW9uc1xyXG4gICAqIEdldCBhbGwgYWZmZWN0ZWQgRGVjb3JhdGlvbnNcclxuICAgKi9cclxuICBnZXREZWNvcmF0aW9ucyA9ICgpID0+IHRoaXMuZGVjb3JhdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBhZGREZWNvcmF0aW9uXHJcbiAgICogQHBhcmFtIHtEZWNvcmF0aW9ufSBkZWNvcmF0aW9uXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXHJcbiAgICogQWRkIGFmZmVjdGVkIERlY29yYXRpb24gdG8gdGhlIEFjdGlvblxyXG4gICAqL1xyXG4gIGFkZERlY29yYXRpb24gPSAoZGVjb3JhdGlvbiwgc3RhdGUpID0+IHRoaXMuZGVjb3JhdGlvbnNbZGVjb3JhdGlvbi5pZF0gPSB7IGRlY29yYXRpb24sIHN0YXRlIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiByZW1vdmVEZWNvcmF0aW9uXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICogUmVtb3ZlIGFmZmVjdGVkIERlY29yYXRpb24gYnkgaWRcclxuICAgKi9cclxuICByZW1vdmVEZWNvcmF0aW9uID0gaWQgPT4gZGVsZXRlIHRoaXMuZGVjb3JhdGlvbnNbaWRdO1xyXG4gIFxyXG59XHJcbiJdfQ==