/***************************************************************************************************************
 * @author Skomorox
 * @class Motion
 * Abstract: Motion represents different types of random or preset
 *           Decoration movement. Currently available motion types are:
 *           1. Random / static position (randVelocity / velocity, changes direction when maxValue is reached, if set)
 *           2. Random / static rotation (randVelocity / velocity, changes direction when maxValue is reached, if set)
 *           3. Random / static scale (randVelocity / velocity, changes direction when maxValue is reached, if set)
 *           4. Track mouse position - change position, rotation, scale (x, y, z) + custom modifiers
 *           5. Update shader uniforms
 *           6. Update morph targets
 ***************************************************************************************************************
 */

export class Motion {

  /**
   * @function constructor
   */
  constructor(visual, params) {

    this.visual = visual;
    this.modes = {};
    
    for (let m in params) {
      if (m === 'swarm') {
        this.swarmParams = [];
        const { count } = this.visual.geometry.attributes.position;
        for (let c = 0; c < count; c++) {
          const velocity = {};
          ['x', 'y', 'z'].forEach(a => {
            const v = params[m].randVelocity;
            velocity[a] = params[m].axis.includes(a) ? -v + Math.random() * v * 2 : 0;
          });
          this.swarmParams.push({ velocity });
        }
        this.modes[m] = params[m];
      } else if (params[m].axis) {
        const axis = params[m].axis.split('');
        this.modes[m] = { axis: {} };
        axis.forEach(a => this.modes[m].axis[a] = {
          relativeValue: 0,
          maxValue: params[m].maxValue,
          velocity: params[m].velocity ?
            params[m].reverse ?
              -params[m].velocity :
              params[m].velocity :
            -params[m].randVelocity + Math.random() * params[m].randVelocity * 2
        });
      } else {
        this.modes[m] = params[m];
      }
    }
  }

  /**
   * @function update
   * Update Motion
   */
  update = () => {

    let axis = null;
    const { container: { offsetWidth, offsetHeight }, mouse, touch } = this.manager;

    for (let m in this.modes) {
      switch (m) {
        case 'trackMouse':
          const trackMouseX = this.modes[m].mouseX;
          const trackMouseY = this.modes[m].mouseY;
          if (trackMouseX) {
            this.trackMouseByAxis({
              track: trackMouseX,
              axis: trackMouseX.symmetry ? mouse.x - offsetWidth  / 2 : mouse.x
            });
          }
          if (trackMouseY) {
            this.trackMouseByAxis({
              track: trackMouseY,
              axis: trackMouseY.symmetry ? mouse.y - offsetHeight / 2 : mouse.y
            });
          }
          break;
        case 'trackTouch':
          const trackTouchX = this.modes[m].touchX;
          const trackTouchY = this.modes[m].touchY;
          if (trackTouchX) {
            this.trackMouseByAxis({
              track: trackTouchX,
              axis: trackTouchX.symmetry ? touch.x - offsetWidth  / 2 : touch.x
            });
          }
          if (trackTouchY) {
            this.trackMouseByAxis({
              track: trackTouchY,
              axis: trackTouchY.symmetry ? touch.y - offsetHeight / 2 : touch.y
            });
          }
          break;
        case 'uniforms':
          const uniforms = this.visual.material.uniforms;
          if (uniforms) {
            for (let u in this.modes[m]) {
              uniforms[u].value += this.modes[m][u];
            }
          }
          break;
        case 'morph':
          const mti = this.visual.morphTargetInfluences;
          for (let i = 0; i < mti.length; i++) {
            mti[i] += this.modes[m].step;
          }
          break;
        case 'swarm':
          const { array, count } = this.visual.geometry.attributes.position;
          axis = ['x', 'y', 'z'];
          for (let c = 0; c < count; c++) {
            const { velocity } = this.swarmParams[c];
            for (let a = 0; a < axis.length; a++) {
              array[c * 3 + a] += velocity[axis[a]];
              if (
                array[c * 3 + a] < -this.modes[m].maxValue ||
                array[c * 3 + a] > this.modes[m].maxValue
              ) {
                velocity[axis[a]] = -velocity[axis[a]];
              }
            }
          }
          break;
        default:
          axis = this.modes[m].axis;
          for (let a in axis) {
            axis[a].relativeValue += axis[a].velocity;
            this.visual[m][a] += axis[a].velocity;
            if (
              axis[a].relativeValue < -axis[a].maxValue ||
              axis[a].relativeValue > axis[a].maxValue
            ) {
              axis[a].velocity = -axis[a].velocity;
            }
          }
          break;
      }
    }
  };

  /**
   * @function trackMouseByAxis
   * Track mouse by axis
   */
  trackMouseByAxis = ({ track, axis }) => {
    ['position', 'rotation', 'scale'].forEach(type => {
      if (track[type]) {
        if (track[type].x) {
          this.visual[type].x = axis * track[type].x + (track[type].modX || 0);
        }
        if (track[type].y) {
          this.visual[type].y = axis * track[type].y + (track[type].modY || 0);
        }
        if (track[type].z) {
          this.visual[type].z = axis * track[type].z + (track[type].modZ || 0);
        }
      }
    });
  };

}
