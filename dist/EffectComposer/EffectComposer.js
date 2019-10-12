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