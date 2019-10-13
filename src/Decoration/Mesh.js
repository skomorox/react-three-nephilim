/*****************************************************************************************************
 * @author Skomorox
 * @class Mesh
 * Abstract: Class Mesh. THREE.Mesh wrapper.
 *****************************************************************************************************
 */

import * as Three from 'three';
import { Decoration } from './Decoration';

export class Mesh extends Decoration {
  
  constructor({ geometry, material }) {
    super();
    this.setMaterial(material);
    this.setGeometry(geometry, material);
  }

  setMaterial = ({ type, params, onlyDesktop }) => {
    if (type === 'shader') {
      if (params.uniforms.texture) {
        this.texture = this.manager.textureLoader.load(params.uniforms.texture.value);
      }
      if (onlyDesktop && this.manager.isMobileDevice()) {
        this.material = new Three.MeshBasicMaterial({
          color: 0xFFFFFF,
          map: this.texture
        });
      } else {
        params.uniforms.texture.value = this.texture;
        this.material = new Three.ShaderMaterial(params);
      }
    } else if (type !== 'mtl') {
      if(params.map) {
        this.texture = this.manager.textureLoader.load(params.map);
        params.map = this.texture;
      }
      this.material = new Three[`Mesh${this.manager.capitalize(type)}Material`](params);
    }
  };

  setGeometry = ({ type, params, custom, src }, material) => {
    if (type === 'obj') {
      this.visual = new Three.Group();
      this.manager.mtlLoader.setTexturePath(material.params.texturePath).load(material.params.src, materials => {
        materials.preload();
        this.manager.objLoader.setMaterials(materials).load(src, obj => {
          this.visual.add(obj);
        });
      });
    } else {
      this.geometry = custom || new Three[`${this.manager.capitalize(type)}BufferGeometry`](...params);
      this.visual = new Three.Mesh(this.geometry, this.material);
    }
  };
  
}
