"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*****************************************************************************************************
 * @author Skomorox
 * v3.0.0
 * 
 * @class Controller
 *****************************************************************************************************
 */
var Controller = function Controller() {
  var _this = this;

  _classCallCheck(this, Controller);

  _defineProperty(this, "setDefaultScene", function (scene) {
    return _this.scene = scene;
  });

  _defineProperty(this, "setScene", function (scene) {
    return _this.scenes[scene.id] = scene;
  });

  _defineProperty(this, "isSceneActive", function () {
    return _this.scene.id === _this.manager.activeScene.id;
  });

  this.scene = null;
  this.scenes = {};
}
/**
 * @function setDefaultScene
 * @param {Scene} scene
 * Set default Scene for controller
 */
;

exports.Controller = Controller;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db250cm9sbGVyLmpzIl0sIm5hbWVzIjpbIkNvbnRyb2xsZXIiLCJzY2VuZSIsInNjZW5lcyIsImlkIiwibWFuYWdlciIsImFjdGl2ZVNjZW5lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7O0lBUWFBLFUsR0FFWCxzQkFBYztBQUFBOztBQUFBOztBQUFBLDJDQVVJLFVBQUFDLEtBQUs7QUFBQSxXQUFJLEtBQUksQ0FBQ0EsS0FBTCxHQUFhQSxLQUFqQjtBQUFBLEdBVlQ7O0FBQUEsb0NBaUJILFVBQUFBLEtBQUs7QUFBQSxXQUFJLEtBQUksQ0FBQ0MsTUFBTCxDQUFZRCxLQUFLLENBQUNFLEVBQWxCLElBQXdCRixLQUE1QjtBQUFBLEdBakJGOztBQUFBLHlDQXVCRTtBQUFBLFdBQU0sS0FBSSxDQUFDQSxLQUFMLENBQVdFLEVBQVgsS0FBa0IsS0FBSSxDQUFDQyxPQUFMLENBQWFDLFdBQWIsQ0FBeUJGLEVBQWpEO0FBQUEsR0F2QkY7O0FBQ1osT0FBS0YsS0FBTCxHQUFhLElBQWI7QUFDQSxPQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNEO0FBRUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQGF1dGhvciBTa29tb3JveFxyXG4gKiB2My4wLjBcclxuICogXHJcbiAqIEBjbGFzcyBDb250cm9sbGVyXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNjZW5lID0gbnVsbDtcclxuICAgIHRoaXMuc2NlbmVzID0ge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gc2V0RGVmYXVsdFNjZW5lXHJcbiAgICogQHBhcmFtIHtTY2VuZX0gc2NlbmVcclxuICAgKiBTZXQgZGVmYXVsdCBTY2VuZSBmb3IgY29udHJvbGxlclxyXG4gICAqL1xyXG4gIHNldERlZmF1bHRTY2VuZSA9IHNjZW5lID0+IHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIHNldFNjZW5lXHJcbiAgICogQHBhcmFtIHtTY2VuZX0gc2NlbmVcclxuICAgKiBBZGQgU2NlbmUgdG8gY29udHJvbGxlclxyXG4gICAqL1xyXG4gIHNldFNjZW5lID0gc2NlbmUgPT4gdGhpcy5zY2VuZXNbc2NlbmUuaWRdID0gc2NlbmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBpc1NjZW5lQWN0aXZlXHJcbiAgICogQ2hlY2sgaWYgZGVmYXVsdCBzY2VuZSBvZiB0aGlzIGNvbnRyb2xsZXIgaXMgY3VycmVudGx5IGFjdGl2ZVxyXG4gICAqL1xyXG4gIGlzU2NlbmVBY3RpdmUgPSAoKSA9PiB0aGlzLnNjZW5lLmlkID09PSB0aGlzLm1hbmFnZXIuYWN0aXZlU2NlbmUuaWQ7XHJcblxyXG59Il19