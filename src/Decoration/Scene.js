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
    const { isInitial, navigationDuration, ppEffects } = this.props;
    if (isInitial) this.manager.activeScene = this;
    this.navigationDuration = navigationDuration;
    this.ppEffects = ppEffects;
    super.componentDidMount();
  }
  
}
