"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Controller = function Controller() {
  var _this = this;

  _classCallCheck(this, Controller);

  _defineProperty(this, "connect", function (components) {
    for (var c in components) {
      if (c === 'manager') return false;
      _this[c] = components[c];
    }
  });
};

exports.Controller = Controller;