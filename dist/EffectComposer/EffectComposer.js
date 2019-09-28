"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "EffectComposer", {
  enumerable: true,
  get: function get() {
    return _threeEffectcomposer["default"];
  }
});

var _threeEffectcomposer = _interopRequireWildcard(require("@johh/three-effectcomposer"));

var _UnrealBloomPass = require("./UnrealBloomPass.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_threeEffectcomposer["default"].Pass = _threeEffectcomposer.Pass;
_threeEffectcomposer["default"].RenderPass = _threeEffectcomposer.RenderPass;
_threeEffectcomposer["default"].ShaderPass = _threeEffectcomposer.ShaderPass;
_threeEffectcomposer["default"].TexturePass = _threeEffectcomposer.TexturePass;
_threeEffectcomposer["default"].ClearPass = _threeEffectcomposer.ClearPass;
_threeEffectcomposer["default"].MaskPass = _threeEffectcomposer.MaskPass;
_threeEffectcomposer["default"].ClearMaskPass = _threeEffectcomposer.ClearMaskPass;
_threeEffectcomposer["default"].UnrealBloomPass = _UnrealBloomPass.UnrealBloomPass;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9FZmZlY3RDb21wb3Nlci9FZmZlY3RDb21wb3Nlci5qcyJdLCJuYW1lcyI6WyJFZmZlY3RDb21wb3NlciIsIlBhc3MiLCJSZW5kZXJQYXNzIiwiU2hhZGVyUGFzcyIsIlRleHR1cmVQYXNzIiwiQ2xlYXJQYXNzIiwiTWFza1Bhc3MiLCJDbGVhck1hc2tQYXNzIiwiVW5yZWFsQmxvb21QYXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7QUFTQTs7Ozs7O0FBRUFBLGdDQUFlQyxJQUFmLEdBQXNCQSx5QkFBdEI7QUFDQUQsZ0NBQWVFLFVBQWYsR0FBNEJBLCtCQUE1QjtBQUNBRixnQ0FBZUcsVUFBZixHQUE0QkEsK0JBQTVCO0FBQ0FILGdDQUFlSSxXQUFmLEdBQTZCQSxnQ0FBN0I7QUFDQUosZ0NBQWVLLFNBQWYsR0FBMkJBLDhCQUEzQjtBQUNBTCxnQ0FBZU0sUUFBZixHQUEwQkEsNkJBQTFCO0FBQ0FOLGdDQUFlTyxhQUFmLEdBQStCQSxrQ0FBL0I7QUFDQVAsZ0NBQWVRLGVBQWYsR0FBaUNBLGdDQUFqQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFZmZlY3RDb21wb3Nlciwge1xyXG4gIFBhc3MsXHJcblx0UmVuZGVyUGFzcyxcclxuXHRTaGFkZXJQYXNzLFxyXG5cdFRleHR1cmVQYXNzLFxyXG5cdENsZWFyUGFzcyxcclxuICBNYXNrUGFzcyxcclxuICBDbGVhck1hc2tQYXNzXHJcbn0gZnJvbSAnQGpvaGgvdGhyZWUtZWZmZWN0Y29tcG9zZXInO1xyXG5pbXBvcnQgeyBVbnJlYWxCbG9vbVBhc3MgfSBmcm9tICcuL1VucmVhbEJsb29tUGFzcy5qcyc7XHJcblxyXG5FZmZlY3RDb21wb3Nlci5QYXNzID0gUGFzcztcclxuRWZmZWN0Q29tcG9zZXIuUmVuZGVyUGFzcyA9IFJlbmRlclBhc3M7XHJcbkVmZmVjdENvbXBvc2VyLlNoYWRlclBhc3MgPSBTaGFkZXJQYXNzO1xyXG5FZmZlY3RDb21wb3Nlci5UZXh0dXJlUGFzcyA9IFRleHR1cmVQYXNzO1xyXG5FZmZlY3RDb21wb3Nlci5DbGVhclBhc3MgPSBDbGVhclBhc3M7XHJcbkVmZmVjdENvbXBvc2VyLk1hc2tQYXNzID0gTWFza1Bhc3M7XHJcbkVmZmVjdENvbXBvc2VyLkNsZWFyTWFza1Bhc3MgPSBDbGVhck1hc2tQYXNzO1xyXG5FZmZlY3RDb21wb3Nlci5VbnJlYWxCbG9vbVBhc3MgPSBVbnJlYWxCbG9vbVBhc3M7XHJcblxyXG5leHBvcnQgeyBFZmZlY3RDb21wb3NlciB9O1xyXG4iXX0=