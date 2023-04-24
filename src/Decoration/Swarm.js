/*****************************************************************************************************
 * @author Skomorox
 * @class Swarm
 * Abstract: Class Swarm. THREE.Points wrapper.
 *****************************************************************************************************
 */

import { Points, PointsMaterial } from 'three';
import { Decoration } from './Decoration';

export class Swarm extends Decoration {

  componentDidMount() {
    this.setVisual();
    super.componentDidMount();
  }

  setMaterial = ({ type, ...params }) => {
    this.material = new PointsMaterial(params);
  };

  setGeometry = geometry => {
    this.geometry = geometry;
    this.visual = new Points(this.geometry, this.material);
  };
}
