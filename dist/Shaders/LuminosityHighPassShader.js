"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _three = require("three");

/**
 * @author bhouston / http://clara.io/
 *
 * Luminosity
 * http://en.wikipedia.org/wiki/Luminosity
 */
var _default = {
  shaderID: "luminosityHighPass",
  uniforms: {
    "tDiffuse": {
      value: null
    },
    "luminosityThreshold": {
      value: 1.0
    },
    "smoothWidth": {
      value: 1.0
    },
    "defaultColor": {
      value: new _three.Color(0x000000)
    },
    "defaultOpacity": {
      value: 0.0
    }
  },
  vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
  fragmentShader: ["uniform sampler2D tDiffuse;", "uniform vec3 defaultColor;", "uniform float defaultOpacity;", "uniform float luminosityThreshold;", "uniform float smoothWidth;", "varying vec2 vUv;", "void main() {", "vec4 texel = texture2D( tDiffuse, vUv );", "vec3 luma = vec3( 0.299, 0.587, 0.114 );", "float v = dot( texel.xyz, luma );", "vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );", "float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );", "gl_FragColor = mix( outputColor, texel, alpha );", "}"].join("\n")
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TaGFkZXJzL0x1bWlub3NpdHlIaWdoUGFzc1NoYWRlci5qcyJdLCJuYW1lcyI6WyJzaGFkZXJJRCIsInVuaWZvcm1zIiwidmFsdWUiLCJDb2xvciIsInZlcnRleFNoYWRlciIsImpvaW4iLCJmcmFnbWVudFNoYWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU9BOztBQVBBOzs7Ozs7ZUFTZTtBQUVkQSxFQUFBQSxRQUFRLEVBQUUsb0JBRkk7QUFJZEMsRUFBQUEsUUFBUSxFQUFFO0FBQ1QsZ0JBQVk7QUFBRUMsTUFBQUEsS0FBSyxFQUFFO0FBQVQsS0FESDtBQUVULDJCQUF1QjtBQUFFQSxNQUFBQSxLQUFLLEVBQUU7QUFBVCxLQUZkO0FBR1QsbUJBQWU7QUFBRUEsTUFBQUEsS0FBSyxFQUFFO0FBQVQsS0FITjtBQUlULG9CQUFnQjtBQUFFQSxNQUFBQSxLQUFLLEVBQUUsSUFBSUMsWUFBSixDQUFXLFFBQVg7QUFBVCxLQUpQO0FBS1Qsc0JBQWtCO0FBQUVELE1BQUFBLEtBQUssRUFBRTtBQUFUO0FBTFQsR0FKSTtBQVlkRSxFQUFBQSxZQUFZLEVBQUUsQ0FDYixtQkFEYSxFQUViLGVBRmEsRUFHWixXQUhZLEVBSVosMkVBSlksRUFLYixHQUxhLEVBTVpDLElBTlksQ0FNUCxJQU5PLENBWkE7QUFvQmRDLEVBQUFBLGNBQWMsRUFBRSxDQUVmLDZCQUZlLEVBR2YsNEJBSGUsRUFJZiwrQkFKZSxFQUtmLG9DQUxlLEVBTWYsNEJBTmUsRUFPZixtQkFQZSxFQVNmLGVBVGUsRUFVZCwwQ0FWYyxFQVdkLDBDQVhjLEVBWWQsbUNBWmMsRUFhZCw4REFiYyxFQWNkLHdGQWRjLEVBZWQsa0RBZmMsRUFnQmYsR0FoQmUsRUFpQmRELElBakJjLENBaUJULElBakJTO0FBcEJGLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGF1dGhvciBiaG91c3RvbiAvIGh0dHA6Ly9jbGFyYS5pby9cclxuICpcclxuICogTHVtaW5vc2l0eVxyXG4gKiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0x1bWlub3NpdHlcclxuICovXHJcblxyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJ3RocmVlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHJcblx0c2hhZGVySUQ6IFwibHVtaW5vc2l0eUhpZ2hQYXNzXCIsXHJcblxyXG5cdHVuaWZvcm1zOiB7XHJcblx0XHRcInREaWZmdXNlXCI6IHsgdmFsdWU6IG51bGwgfSxcclxuXHRcdFwibHVtaW5vc2l0eVRocmVzaG9sZFwiOiB7IHZhbHVlOiAxLjAgfSxcclxuXHRcdFwic21vb3RoV2lkdGhcIjogeyB2YWx1ZTogMS4wIH0sXHJcblx0XHRcImRlZmF1bHRDb2xvclwiOiB7IHZhbHVlOiBuZXcgQ29sb3IoIDB4MDAwMDAwICkgfSxcclxuXHRcdFwiZGVmYXVsdE9wYWNpdHlcIjogeyB2YWx1ZTogMC4wIH1cclxuXHR9LFxyXG5cclxuXHR2ZXJ0ZXhTaGFkZXI6IFtcclxuXHRcdFwidmFyeWluZyB2ZWMyIHZVdjtcIixcclxuXHRcdFwidm9pZCBtYWluKCkge1wiLFxyXG5cdFx0XHRcInZVdiA9IHV2O1wiLFxyXG5cdFx0XHRcImdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQoIHBvc2l0aW9uLCAxLjAgKTtcIixcclxuXHRcdFwifVwiXHJcblx0XS5qb2luKFwiXFxuXCIpLFxyXG5cclxuXHRmcmFnbWVudFNoYWRlcjogW1xyXG4gICAgXHJcblx0XHRcInVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1wiLFxyXG5cdFx0XCJ1bmlmb3JtIHZlYzMgZGVmYXVsdENvbG9yO1wiLFxyXG5cdFx0XCJ1bmlmb3JtIGZsb2F0IGRlZmF1bHRPcGFjaXR5O1wiLFxyXG5cdFx0XCJ1bmlmb3JtIGZsb2F0IGx1bWlub3NpdHlUaHJlc2hvbGQ7XCIsXHJcblx0XHRcInVuaWZvcm0gZmxvYXQgc21vb3RoV2lkdGg7XCIsXHJcblx0XHRcInZhcnlpbmcgdmVjMiB2VXY7XCIsXHJcblxyXG5cdFx0XCJ2b2lkIG1haW4oKSB7XCIsXHJcblx0XHRcdFwidmVjNCB0ZXhlbCA9IHRleHR1cmUyRCggdERpZmZ1c2UsIHZVdiApO1wiLFxyXG5cdFx0XHRcInZlYzMgbHVtYSA9IHZlYzMoIDAuMjk5LCAwLjU4NywgMC4xMTQgKTtcIixcclxuXHRcdFx0XCJmbG9hdCB2ID0gZG90KCB0ZXhlbC54eXosIGx1bWEgKTtcIixcclxuXHRcdFx0XCJ2ZWM0IG91dHB1dENvbG9yID0gdmVjNCggZGVmYXVsdENvbG9yLnJnYiwgZGVmYXVsdE9wYWNpdHkgKTtcIixcclxuXHRcdFx0XCJmbG9hdCBhbHBoYSA9IHNtb290aHN0ZXAoIGx1bWlub3NpdHlUaHJlc2hvbGQsIGx1bWlub3NpdHlUaHJlc2hvbGQgKyBzbW9vdGhXaWR0aCwgdiApO1wiLFxyXG5cdFx0XHRcImdsX0ZyYWdDb2xvciA9IG1peCggb3V0cHV0Q29sb3IsIHRleGVsLCBhbHBoYSApO1wiLFxyXG5cdFx0XCJ9XCJcclxuXHRdLmpvaW4oXCJcXG5cIilcclxufTsiXX0=