"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Controller: true,
  Action: true,
  Motion: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _Composition.Composition;
  }
});
Object.defineProperty(exports, "Controller", {
  enumerable: true,
  get: function get() {
    return _Controller.Controller;
  }
});
Object.defineProperty(exports, "Action", {
  enumerable: true,
  get: function get() {
    return _Action.Action;
  }
});
Object.defineProperty(exports, "Motion", {
  enumerable: true,
  get: function get() {
    return _Motion.Motion;
  }
});

var _Composition = require("./Composition");

var _Controller = require("./Controller");

var _Action = require("./Action");

var _Motion = require("./Motion");

var _Decoration = require("./Decoration");

Object.keys(_Decoration).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Decoration[key];
    }
  });
});