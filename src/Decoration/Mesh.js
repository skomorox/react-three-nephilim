/*****************************************************************************************************
 * @author Skomorox
 * @class Mesh
 * Abstract: Class Mesh. THREE.Mesh wrapper.
 *****************************************************************************************************
 */

import * as Three from 'three';
import { Decoration } from './Decoration';
import { basicMaterialTypes, basicGeometryTypes } from '../Loader';

export class Mesh extends Decoration {
  
  constructor({ material, geometry }) {
    super();
    this.manager.setLoaders([material.type, geometry.type]);
    this.setMaterial(material);
    this.setGeometry(geometry, material);
  }

  setMaterial = ({ type, params }) => {
    if (type === 'shader') {
      if (params.uniforms.map) {
        params.uniforms.map.value = this.manager.textureLoader.load(params.uniforms.map.value);
      }
      this.material = new Three.ShaderMaterial(params);
    } else if (basicMaterialTypes.includes(type.toLowerCase())) {
      if(params.map) {
        params.map = this.manager.textureLoader.load(params.map)
      }
      this.material = new Three[`Mesh${this.manager.capitalize(type)}Material`](params);
    }
  };

  setGeometry = ({ type, params, custom, src }, material) => {
    if (custom || basicGeometryTypes.includes(type.toLowerCase())) {
      this.geometry = custom || new Three[`${this.manager.capitalize(type)}Geometry`](...params);
      this.visual = new Three.Mesh(this.geometry, this.material);
    } else {
      const materialLoader = `${material.type}Loader`;
      const geometryLoader = `${type}Loader`;
      this.visual = new Three.Group();
      this.manager.loaders[materialLoader].load(material.params.src, materials => {
        materials.preload();
        this.manager.loaders[geometryLoader].setMaterials(materials).load(src, obj => {
          this.visual.add(obj);
        });
      });
    }
  };

}
