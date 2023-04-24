/*****************************************************************************************************
 * @author Skomorox
 * @class Emitter
 * Abstract: Class Emitter. three-nebula Emitter wrapper.
 *****************************************************************************************************
 */

import * as Three from 'three';
import ParticleSystem, * as Nebula from 'three-nebula';
import * as Types from '../Types';
import { Decoration } from './Decoration';
import { Mesh } from './Mesh';
import { Sprite } from './Sprite';
 
export class Emitter extends Decoration {
 
  constructor({ material, geometry, rate, initializers, behaviours }) {
    
    super();
    const body = material.type === Types.Material.Sprite ?
      new Sprite({ material }) :
      new Mesh({ material, geometry });
    body.setVisual();
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

    this.visual.addInitializers([new Nebula.Body(body.visual)]);
    this.visual.emit();
  }
   
  connectEmitter = stateNode => {
    const { renderer } = this.props;
    if (!this.nebula) {
      this.nebula = new ParticleSystem();
      this.nebula.addRenderer(new Nebula[`${this.manager.capitalize(renderer)}Renderer`](
        stateNode.visual,
        Three
      ));
    }
    this.nebula.addEmitter(this.visual);
  };

}
