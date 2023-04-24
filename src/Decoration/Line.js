/*****************************************************************************************************
 * @author Skomorox
 * @class Line
 * Abstract: Class Line. THREE.Line wrapper.
 *****************************************************************************************************
 */

import * as Three from 'three';
import * as Types from '../Types';
import { Decoration } from './Decoration';

export class Line extends Decoration {

  componentDidMount() {
    this.setVisual();
    super.componentDidMount();
  }
 
  setMaterial = ({ type, ...params }) => {
    this.material = new Three[type](params);
  };

  setGeometry = geometry => {
    const { type = Types.Line.Basic } = this.props;
    this.geometry = geometry;
    this.visual = new Three[type](this.geometry, this.material);
  };
 
  updateMaterial = material => {
    this.setMaterial(material);
    this.visual.material = this.material;
  };

}
