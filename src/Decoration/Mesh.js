/*****************************************************************************************************
 * @author Skomorox
 * @class Mesh
 * Abstract: Class Mesh. THREE.Mesh wrapper.
 *****************************************************************************************************
 */

import * as Three from 'three';
import _ from 'lodash';
import { Decoration } from './Decoration';
import { basicMaterialTypes, basicGeometryTypes } from '../Loader';

export class Mesh extends Decoration {
  
  constructor({ material, geometry }) {
    super();
    this.isBasicGeometry = (
      geometry.uuid ||
      basicGeometryTypes.includes(geometry.type.toLowerCase())
    );
    this.setMaterial(material);
    this.setGeometry(geometry, material);
  }

  setMaterial = ({ type, params }) => {
    params = _.cloneDeep(params);
    if (type === 'shader') {
      if (params.uniforms.map) {
        params.uniforms.map.value = this.manager.textureLoader.load(params.uniforms.map.value);
      }
      this.material = new Three.ShaderMaterial(params);
    } else if (basicMaterialTypes.includes(type.toLowerCase())) {
      if (params.map) {
        params.map = this.manager.textureLoader.load(params.map)
      }
      this.material = new Three[`Mesh${this.manager.capitalize(type)}Material`](params);
    }
  };

  setGeometry = (geometry, material) => {
    if (this.isBasicGeometry) {
      this.geometry = geometry.uuid ?
        geometry :
        new Three[`${this.manager.capitalize(geometry.type)}Geometry`](...geometry.params);
      this.visual = new Three.Mesh(this.geometry, this.material);
    } else {
      const materialLoader = `${material.type}Loader`;
      const geometryLoader = `${geometry.type}Loader`;
      this.visual = new Three.Group();
      this.manager.loaders[materialLoader].load(material.params.src, materials => {
        materials.preload();
        this.manager.loaders[geometryLoader].setMaterials(materials).load(geometry.src, obj => {
          this.visual.add(obj);
        });
      });
    }
  };

  updateMaterial = material => {
    this.setMaterial(material);
    if (this.isBasicGeometry) {
      this.visual.material = this.material;
    } else {
      // TODO
    }
  };

}
