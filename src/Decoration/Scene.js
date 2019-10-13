/*****************************************************************************************************
 * @author Skomorox
 * @class Scene
 * Abstract: Class Scene. Routing is being carried out between Scenes. THREE.Group wrapper.
 *****************************************************************************************************
 */

import { Container } from './Container';

export class Scene extends Container {

  constructor() {
    super();
    this.isScene = true;
  }
  
  componentDidMount() {
    if (this.props.default) this.manager.activeScene = this;
    super.componentDidMount();
  }
  
}
