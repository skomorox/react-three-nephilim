/*****************************************************************************************************
 * @author Skomorox
 * @class Line
 * Abstract: Class Line. THREE.Line wrapper.
 *****************************************************************************************************
 */

import * as Three from 'three';
import { Decoration } from './Decoration';

export class Line extends Decoration {

  constructor({ vertices, material }) {
    super();
    this.setMaterial(material);
    this.setGeomerty(vertices); 
  }

  setMaterial = ({ type, params }) => {
    this.material = new Three[`Line${this.manager.capitalize(type)}Material`](params);
  };

  setGeomerty = vertices => {
    this.geometry = new Three.Geometry();
    this.geometry.vertices = vertices.map(({ x, y, z }) => new Three.Vector3(x, y, z));
    this.geometry.computeLineDistances();
    this.visual = new Three.Line(this.geometry, this.material);
  };

  updateMaterial = material => {
    this.setMaterial(material);
    this.visual.material = this.material;
  };
  
}
