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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHsgQ29tcG9zaXRpb24gYXMgZGVmYXVsdCB9IGZyb20gJy4vQ29tcG9zaXRpb24nO1xyXG5leHBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSAnLi9Db250cm9sbGVyJztcclxuZXhwb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi9BY3Rpb24nO1xyXG5leHBvcnQgeyBNb3Rpb24gfSBmcm9tICcuL01vdGlvbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vRGVjb3JhdGlvbic7XHJcbiJdfQ==