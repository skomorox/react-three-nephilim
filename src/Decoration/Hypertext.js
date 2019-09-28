/*****************************************************************************************************
 * @author Skomorox
 * v3.0.0
 *
 * @class Hypertext
 * Abstract: Class Hypertext. THREE.CSS3DObject wrapper.
 *****************************************************************************************************
 */

import React from 'react';
import { CSS3DObject } from 'three-renderer-css3d';
import { Decoration } from './Decoration';

export class Hypertext extends Decoration {
  
  componentDidMount() {
    this.visual = new CSS3DObject(this.content);
    super.componentDidMount();
  }

  render() {
    return (
      <div ref={c => this.content = c}>
        {this.props.children}
      </div>
    );
  }
}
