/*****************************************************************************************************
 * @author Skomorox
 * @class Light
 * Abstract: Class Light. THREE.Light wrapper.
 *****************************************************************************************************
 */

import * as Three from 'three';
import * as Types from '../Types';
import { Decoration } from './Decoration';

export class Light extends Decoration {
  
  constructor(props) {
    super(props);
    this.type = Types.Decoration.Light;
    this.setVisual();
  }

  setVisual = () => {
    const { type, probe, params } = this.props;
    this.visual = new Three[`${type}${probe ? 'Probe' : ''}`](...params);
  };

}
