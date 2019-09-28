

/*****************************************************************************************************
 * @author Skomorox
 * v3.0.0
 *
 * @class Action
 * Abstract: Actions are finalized acts which affect Decorations or Scenes.
 *           Only one Action can be performed at the same time.
 *           Performs transition between Scenes or changing Scene Decorations
 *****************************************************************************************************
 */
 
import TWEEN from '@tweenjs/tween.js';

export class Action {

  constructor() {
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
  begin = ({ decorations, easing, duration, affectAll, enforce, callback } = {}) => {

    if (!this.manager.isActionsEnabled) return false;

    const from = [];
    const to = [];
    let ad = {};

    if (decorations) {      
      for (let d in decorations) {
        ad[d] = {
          decoration: this.decorations[d].decoration,
          state: decorations[d].state
        }
      }
      if (affectAll) {
        for (let d in this.decorations) {
          if (!decorations[d]) ad[d] = { ...this.decorations[d] };
        };
      }
    } else {
      ad = this.decorations;
    }

    for (let d in ad) {

      const deco = ad[d].decoration;
      const state = ad[d].state;

      from.push(deco.visual);
      to.push(deco.buildVisualState(state));    

      if (state.uniforms) {
        for (let u in state.uniforms) {
          from.push(deco.visual.material.uniforms[u]);
          to.push(state.uniforms[u]);
        };
      }
    };

    if (enforce) this.manager.isActionsEnabled = false;

    this.animate({ from, to, easing, duration, callback });
  }

  /**
   * @function animate
   * @param {Object} params
   * @param {Object[]} from
   * @param {Object[]} to
   * @param {String} easing
   * @param {Number} duration
   * @param {Function} callback
   * Animate objects (params.from) using tween.js (https://github.com/tweenjs/tween.js).
   * Execute callback function, if set, after.
   */
  animate = ({ from, to, easing, duration, callback }) => {

    const tweenPromises = [];
    const parts = easing ? easing.split('-') : ['exponential', 'out'];
    const e = TWEEN.Easing[this.manager.capitalize(parts[0])][this.manager.capitalize(parts[1])];
    const dur = duration || 500;

    TWEEN.removeAll();

    from.forEach((f, i) => {
      if (from[i].position && to[i].position) {
        ((from, to) => {
          tweenPromises.push(new Promise(resolve => {
            new TWEEN.Tween(from.position)
              .to({ x: to.position.x, y: to.position.y, z: to.position.z }, dur)
              .easing(e).start().onComplete(() => resolve());
          }));
        })(from[i], to[i]);
      }
      if (from[i].rotation && to[i].rotation) {
        ((from, to) => {
          tweenPromises.push(new Promise(resolve => {
            new TWEEN.Tween(from.rotation)
              .to({ x: to.rotation.x, y: to.rotation.y, z: to.rotation.z }, dur)
              .easing(e).start().onComplete(() => resolve());
          }));
        })(from[i], to[i]);
      }
      if (from[i].scale && to[i].scale) {
        ((from, to) => {
          tweenPromises.push(new Promise(resolve => {
            new TWEEN.Tween(from.scale)
              .to({ x: to.scale.x, y: to.scale.y, z: to.scale.z }, dur)
              .easing(e).start().onComplete(() => resolve());
          }));
        })(from[i], to[i]);
      }
      if (from[i].value !== undefined) {
        ((from, to) => {
          tweenPromises.push(new Promise(resolve => {
            new TWEEN.Tween(from)
              .to({ value: to.value }, dur)
              .easing(e).start().onComplete(() => resolve());
          }));
        })(from[i], to[i]);
      }
    });

    Promise.all(tweenPromises).then(() => this.onActionComplete({ callback }));
  };

  /**
   * @function onActionComplete
   * Enable actions after tween complete and execute callback if needed
   */
  onActionComplete = ({ callback }) => {
    this.manager.isActionsEnabled = true;
    if (callback) callback();
  }

  /**
   * @function getDecorations
   * Get all affected Decorations
   */
  getDecorations = () => this.decorations;

  /**
   * @function addDecoration
   * @param {Decoration} decoration
   * @param {Object} state
   * Add affected Decoration to the Action
   */
  addDecoration = (decoration, state) => this.decorations[decoration.id] = { decoration, state };

  /**
   * @function removeDecoration
   * @param {String} id
   * Remove affected Decoration by id
   */
  removeDecoration = id => delete this.decorations[id];
  
}
