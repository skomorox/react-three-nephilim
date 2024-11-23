/*****************************************************************************************************
 * @author Skomorox
 * @class Sprite
 * Abstract: Class Sprite. THREE.Sprite wrapper.
 *****************************************************************************************************
 */

import _ from 'lodash';
import * as Three from 'three';
import * as Types from '../Types';
import { Decoration } from './Decoration';

export class Sprite extends Decoration {

  constructor(props) {
    super(props);
    this.type = Types.Decoration.Sprite;
    this.setVisual();
  }

  setMaterial = ({ ...params }) => {
    params = _.cloneDeep(params);
    if (params.map) {
      params.map = this.manager.textureLoader.load(params.map);
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
 