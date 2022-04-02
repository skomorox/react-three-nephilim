/*****************************************************************************************************
 * @author Skomorox
 * @class Light
 * Abstract: Class Light. THREE.Light wrapper.
 *****************************************************************************************************
 */

import * as Three from 'three';
import { Decoration } from './Decoration';

export class Light extends Decoration {
  constructor({ type, probe, params }) {
    super();
    this.visual = new Three[`${this.manager.capitalize(type)}Light${probe ? 'Probe' : ''}`](...params);
  }
}
