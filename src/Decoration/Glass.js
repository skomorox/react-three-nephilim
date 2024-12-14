/*****************************************************************************************************
 * @author Skomorox
 * @class Glass
 * Abstract: Class Glass. Reflector, Refractor wrapper.
 *****************************************************************************************************
 */

import * as Three from 'three';
import * as Types from '../Types';
import { Reflector } from 'three/examples/jsm/objects/Reflector';
import { Refractor } from 'three/examples/jsm/objects/Refractor';
import { Decoration } from './Decoration';
import { withInterface } from '../Helpers';

export class Glass extends Decoration {

  constructor(props) {
    super(props);
    this.type = Types.Decoration.Glass;
    this.setVisual();
  }

  setVisual = () => {
    const { geometry, ...params } = withInterface(this.props);
    this.setGeometry(geometry, params);
  };

  setGeometry = (geometry, params) => {

    const { type } = this.props;
    const Visual = type === Types.Glass.Reflector ? Reflector : Refractor;
    
    if (geometry.loader) {
      this.visual = new Three.Group();
      this.geometryLoader = this.manager.setLoader(geometry.loader);
      this.geometryLoader.load(geometry.src, v => {
        this.geometry = v.children[0].geometry;
        this.visual.add(new Visual(this.geometry, params));
      });
    } else {
      this.geometry = geometry.uuid ? geometry : new Three[geometry.type](...geometry.params);
      this.visual = new Visual(this.geometry, params);
    }
  };

}
