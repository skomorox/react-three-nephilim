/***************************************************************************************************************
 * @author Skomorox
 * @class Motion
 * Abstract: Motion represents different types of random or preset
 *           Decoration movement. Currently available motion types are:
 *           1. Random / static position (randSpeed / speed, changes direction when maxValue is reached, if set)
 *           2. Random / static rotation (randSpeed / speed, changes direction when maxValue is reached, if set)
 *           3. Random / static scale (randSpeed / speed, changes direction when maxValue is reached, if set)
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
      if (params[m].axes) {
        const axes = params[m].axes.split('');
        this.modes[m] = { axes: {} };
        axes.forEach(a => this.modes[m].axes[a] = {
          currentValue: 0,
          maxValue: params[m].maxValue,
          direction: params[m].speed ? true : Math.random() > 0.5,
          speed: params[m].speed || Math.random() * params[m].randSpeed
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
    for (let m in this.modes) {
      switch (m) {
        case 'trackMouse':
          const trackMouseX = this.modes[m].mouseX;
          const trackMouseY = this.modes[m].mouseY;
          const {
            container: { offsetWidth, offsetHeight },
            mouse: { x, y }
          } = this.manager;
          if (trackMouseX) {
            this.trackMouseByAxis({
              track: trackMouseX,
              axis: trackMouseX.symmetry ? x - offsetWidth  / 2 : x
            });
          }
          if (trackMouseY) {
            this.trackMouseByAxis({
              track: trackMouseY,
              axis: trackMouseY.symmetry ? y - offsetHeight / 2 : y
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
        default:
          const axes = this.modes[m].axes;
          for (let a in axes) {
            axes[a].currentValue += axes[a].direction ? axes[a].speed : -axes[a].speed;
            this.visual[m][a] += axes[a].direction ? axes[a].speed : -axes[a].speed;
            if (axes[a].currentValue < -axes[a].maxValue) axes[a].direction = true;
            if (axes[a].currentValue > axes[a].maxValue) axes[a].direction = false;
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
