/*****************************************************************************************************
 * @author Skomorox
 * @class Controller
 *****************************************************************************************************
 */

export class Controller {

  /**
   * @function connect
   * @param {Object} components
   * Connect the components that this controller should manage
   */
  connect = components => {
    for (let c in components) {
      if (c === 'manager') return false;
      this[c] = components[c];
    }
  };
  
}