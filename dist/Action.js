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