/*****************************************************************************************************
 * @author Skomorox
 * v3.0.0
 *
 * @class Line
 * Abstract: Class Line. THREE.Line wrapper.
 *****************************************************************************************************
 */

import * as Three from 'three';
import { Decoration } from './Decoration';

export class Line extends Decoration {
  constructor({ vertices, material }) {
    super();
    this.geometry = new Three.Geometry();
    this.geometry.vertices = vertices.map(({ x, y, z }) => new Three.Vector3(x, y, z));
    this.geometry.computeLineDistances();
    this.material = new Three[`Line${this.manager.capitalize(material.type)}Material`](material.params);
    this.visual = new Three.Line(this.geometry, this.material);
  }
}
