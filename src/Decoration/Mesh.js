/*****************************************************************************************************
 * @author Skomorox
 * @class Mesh
 * Abstract: Class Mesh. THREE.Mesh wrapper.
 *****************************************************************************************************
 */

import * as Three from 'three';
import * as Types from '../Types';
import _ from 'lodash';
import { Decoration } from './Decoration';

export class Mesh extends Decoration {
  
  componentDidMount() {
    this.setVisual();
    super.componentDidMount();
  }

  setMaterial = ({ type, ...params }) => { // if geometry.uuid
    if (!type) return false;
    params = _.cloneDeep(params);
    if (type === Types.Material.Shader && params.uniforms?.map) {
      params.uniforms.map.value = this.manager.textureLoader.load(params.uniforms.map.value);
    } else if (params.map) {
      params.map = this.manager.textureLoader.load(params.map)
    }
    
    this.material = new Three[type](params);
  };

  setGeometry = (geometry, material) => {
    if (geometry.loader) {
      this.visual = new Three.Group();
      this.manager.loaders[material.loader].load(material.src, materials => {
        materials.preload();
        this.manager.loaders[geometry.loader].setMaterials(materials).load(geometry.src, obj => {
          this.visual.add(obj);
        });
      });
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
