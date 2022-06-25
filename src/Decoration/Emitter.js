/*****************************************************************************************************
 * @author Skomorox
 * @class Emitter
 * Abstract: Class Emitter. three-nebula Emitter wrapper.
 *****************************************************************************************************
 */

import * as Nebula from 'three-nebula';
import { Decoration } from './Decoration';
import { Mesh } from './Mesh';
import { Sprite } from './Sprite';
 
export class Emitter extends Decoration {
 
  constructor({ material, geometry, rate, initializers, behaviours }) {
    super();

    const body = geometry.type === 'sprite' ?
      new Sprite({ material }).visual :
      new Mesh({ material, geometry }).visual;

    this.visual = new Nebula.Emitter();

    if (rate) {
      this.visual.setRate(new Nebula.Rate(...rate));
    }
    if (initializers) {
      this.visual.addInitializers(Object.keys(initializers).map(i => {
        return new Nebula[this.manager.capitalize(i)](...initializers[i]);
      }));
    }
    if (behaviours) {
      this.visual.addBehaviours(Object.keys(behaviours).map(b => {
        return new Nebula[this.manager.capitalize(b)](...behaviours[b]);
      }));
    }

    this.visual.addInitializers([new Nebula.Body(body)]);
    this.visual.emit();
  }

}
