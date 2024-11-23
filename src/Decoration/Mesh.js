/*****************************************************************************************************
 * @author Skomorox
 * @class Mesh
 * Abstract: Class Mesh. THREE.Mesh wrapper.
 *****************************************************************************************************
 */

import _ from 'lodash';
import * as Three from 'three';
import * as Types from '../Types';
import { Decoration } from './Decoration';

export class Mesh extends Decoration {

  constructor(props) {
    super(props);
    this.type = Types.Decoration.Mesh;
    this.setVisual();
  }

  setMaterial = material => {
    if (material.loader) {
      this.manager.setCustomLoader(material.loader);
      if (material.callback) {
        material.callback(this.manager.loaders, m => this.material = m);
      }
    } else if (material.uuid) {
      this.material = material;
    } else {
      let { type, ...params } = material;
      params = _.cloneDeep(params);
      if (type === Types.Material.Shader && params.uniforms?.map) {
        params.uniforms.map.value = this.manager.textureLoader.load(params.uniforms.map.value);
      } else if (params.map) {
        params.map = this.manager.textureLoader.load(params.map);
      }
      this.material = new Three[type](params);
    }
  };

  setGeometry = geometry => {
    if (geometry.loader) {
      this.visual = new Three.Group();
      this.manager.setCustomLoader(geometry.loader);
      if (geometry.callback) {
        geometry.callback(this.manager.loaders, obj => this.visual.add(obj));
      }
    } else {
      this.geometry = geometry.uuid ? geometry : new Three[geometry.type](...geometry.params);
      this.visual = new Three.Mesh(this.geometry, this.material);
    }
  };

  updateMaterial = material => {
    // TODO: loader
    this.setMaterial(material);
    this.visual.material = this.material;
  };

}
