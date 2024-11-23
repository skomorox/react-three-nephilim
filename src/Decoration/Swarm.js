/*****************************************************************************************************
 * @author Skomorox
 * @class Swarm
 * Abstract: Class Swarm. THREE.Points wrapper.
 *****************************************************************************************************
 */

import * as Three from 'three';
import * as Types from '../Types';
import { Decoration } from './Decoration';

export class Swarm extends Decoration {

  constructor(props) {
    super(props);
    this.type = Types.Decoration.Swarm;
    this.setVisual();
  }

  setMaterial = ({ type, ...params }) => {
    this.material = new Three.PointsMaterial(params);
  };

  setGeometry = geometry => {
    this.geometry = geometry;
    this.visual = new Three.Points(this.geometry, this.material);
  };
}
