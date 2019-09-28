/*****************************************************************************************************
 * @author Skomorox
 * v3.0.0
 *
 * @class Scene
 * Abstract: Class Scene. Routing is being carried out between Scenes. THREE.Group wrapper.
 *****************************************************************************************************
 */

import { Group } from 'three';
import { Decoration } from './Decoration';

export class Scene extends Decoration {

  constructor() {
    super();
    this.isScene = true;
    this.children = {};
    this.visual = new Group();
  }

  componentDidMount() {
    if (this.props.default) {
      this.manager.activeScene = this;
    }
    for (let c in this.children) {
      this.visual.add(this.children[c].visual);
    }
    super.componentDidMount();
  }
}
