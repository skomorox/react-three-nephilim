/*****************************************************************************************************
 * @author Skomorox
 * v3.0.0
 *
 * @class Swarm
 * Abstract: Class Swarm. THREE.Points wrapper.
 *****************************************************************************************************
 */

import { Points, PointsMaterial } from 'three';
import { Decoration } from './Decoration';

export class Swarm extends Decoration {
  constructor({ geometry, material }) {
    super();
    this.material = new PointsMaterial(material);
    this.visual = new Points(geometry, this.material);
  }
}
