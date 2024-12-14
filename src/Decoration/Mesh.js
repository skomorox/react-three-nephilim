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
import { withInterface } from '../Helpers';

export class Mesh extends Decoration {

  constructor(props) {
    super(props);
    this.type = Types.Decoration.Mesh;
    this.setVisual();
  }

  setMaterial = material => {
    if (material.uuid) {
      this.material = material;
    } else if (material.loader) {
      this.materialLoader = this.manager.setLoader(material.loader);
    }  else {
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

    const { material } = withInterface(this.props);

    if (geometry.loader) {
      this.visual = new Three.Group();
      this.geometryLoader = this.manager.setLoader(geometry.loader);
      if (material.loader) {
        this.materialLoader.load(material.src, materials => {
          materials.preload();
          this.geometryLoader.setMaterials(materials).load(geometry.src, v => {
            this.visual.add(v);
          });
        });
      } else {
        this.geometryLoader.load(geometry.src, v => {
          this.geometry = v.children[0].geometry;
          this.visual.add(new Three.Mesh(this.geometry, this.material));
        });
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
