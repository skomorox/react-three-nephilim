/*****************************************************************************************************
 * @author Skomorox
 * v3.0.0
 * 
 * @class Controller
 *****************************************************************************************************
 */

export class Controller {

  constructor() {
    this.scene = null;
    this.scenes = {};
  }

  /**
   * @function setDefaultScene
   * @param {Scene} scene
   * Set default Scene for controller
   */
  setDefaultScene = scene => this.scene = scene;

  /**
   * @function setScene
   * @param {Scene} scene
   * Add Scene to controller
   */
  setScene = scene => this.scenes[scene.id] = scene;

  /**
   * @function isSceneActive
   * Check if default scene of this controller is currently active
   */
  isSceneActive = () => this.scene.id === this.manager.activeScene.id;

}