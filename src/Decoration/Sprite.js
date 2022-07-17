/*****************************************************************************************************
 * @author Skomorox
 * @class Sprite
 * Abstract: Class Sprite. THREE.Sprite wrapper.
 *****************************************************************************************************
 */

import * as Three from 'three';
import { Decoration } from './Decoration';
import _ from 'lodash';
 
export class Sprite extends Decoration {
 
  constructor({ material }) {
    super();
    this.setMaterial(material);
    this.setGeometry();
  }
 
  setMaterial = ({ params }) => {
    params = _.cloneDeep(params);
    if (params.map) {
      params.map = this.manager.textureLoader.load(params.map)
    }
    this.material = new Three.SpriteMaterial(params);
  };
 
  setGeometry = () => {
    this.visual = new Three.Sprite(this.material);
  };
 
  updateMaterial = material => {
    this.setMaterial(material);
    this.visual.material = this.material;
  };

}
 