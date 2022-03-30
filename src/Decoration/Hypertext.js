/*****************************************************************************************************
 * @author Skomorox
 * @class Hypertext
 * Abstract: Class Hypertext. THREE.CSS3DObject wrapper.
 *****************************************************************************************************
 */

import ReactDOM from 'react-dom';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { Decoration } from './Decoration';

export class Hypertext extends Decoration {

  constructor() {
    super();
    this.element = document.createElement('div');
  }
  
  componentDidMount() {
    document.getElementById('portal').appendChild(this.element);
    this.visual = new CSS3DObject(this.element);
    super.componentDidMount();
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.element);
  }
  
}
