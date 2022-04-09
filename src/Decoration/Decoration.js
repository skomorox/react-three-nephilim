/*****************************************************************************************************
 * @author Skomorox
 * @class Decoration
 * Abstract: Class Decoration. Basic class.
 *****************************************************************************************************
 */

import { Component } from 'react';
import { Vector3 } from 'three';
import { Motion } from '../Motion';

export class Decoration extends Component {

  /**
   * @function componentDidMount
   * Set settings for mounted component:
   * 1. Basic settings
   * 2. Position, rotation and scale
   * 3. Motion
   * 4. Actions
   * 5. Event listeners
   * 6. Enable layer if defined
   */
  componentDidMount() {

    const {
      id, motion, actions, layer, global,
      glEvents, onClick, onMouseOver
    } = this.props;
    this.id = id || this.id || this.visual.uuid;
    this.glEvents = this.glEvents || glEvents;
    this.isGlobal = global || false;
    this.setVisualState(this.props);

    if (motion) this.setMotion(motion);
    if (actions) this.setActions(actions);
    if (onClick) this.visual.onClick = onClick;
    if (onMouseOver) this.visual.onMouseOver = onMouseOver;
    if (layer) {
      this.visual.layers.enable(layer);
      this.manager.layers[layer] = layer;
    }

    this.connect(this._reactInternalFiber);
  }

  /**
   * @function componentDidUpdate
   * Update Motion
   */
  componentDidUpdate({ motion: prevMotion }) {
    const { motion } = this.props;
    if (JSON.stringify(motion) !== JSON.stringify(prevMotion)) {
      this.setMotion(motion);
    }
  }

  /**
   * @function componentWillUnmount
   * Remove object from Scene on unmount
   */
  componentWillUnmount() {
    this.visual.parent.remove(this.visual);
  }

  render() {
    return null;
  }

  /**
   * @function setVisualState
   * @param {Object} state
   * Set position, rotation and scale of the object
   */
  setVisualState = state => {
    const vs = this.calcVisualState(state);    
    this.visual.position.set(vs.position.x, vs.position.y, vs.position.z);
    this.visual.scale.set(vs.scale.x, vs.scale.y, vs.scale.z);
    if (vs.lookAt) {
      this.visual.lookAt(new Vector3(vs.lookAt.x, vs.lookAt.y, vs.lookAt.z));
    } else {
      this.visual.rotation.set(vs.rotation.x, vs.rotation.y, vs.rotation.z);
    }
  };

  /**
   * @function setStateValue
   * @param {Number | Array} sv - state value
   * @param {Number} vv - visual value
   * Calculate given state value based on current and new value
   */
  setStateValue = (sv, vv) => (
    sv === undefined ?
      vv :
      Array.isArray(sv) ?
        this.manager.isMobileScreen() ?
          sv[0] :
          sv[1] :
        sv
  );

  /**
   * @function setMotion
   * @param {Object} motion
   * Set Motion for current Decoration
   */
  setMotion = motion => {
    this.motion = new Motion(this.visual, motion);
  };

  /**
   * @function setActions
   * @param {Object} actions
   * Set Actions for current Decoration
   */
  setActions = actions => {
    this.actions = actions;
    this.manager.connectActions(this, actions);
  };

  /**
   * @function getActionState
   * @param {String} actions
   * Set Actions for current Decoration
   */
  getActionState = a => this.actions[a];

  /**
   * @function calcVisualState
   * @param {Object} state
   * Calculate position, rotation and scale based on current and new state
   */
  calcVisualState = state => {
    
    const visPos = this.visual.position;
    const visRot = this.visual.rotation;
    const visScl = this.visual.scale;
    const visState = {
      position: { x: visPos.x, y: visPos.y, z: visPos.z },
      rotation: { x: visRot.x, y: visRot.y, z: visRot.z },
      scale: { x: visScl.x, y: visScl.y, z: visScl.z }
    };

    if (state.position) {
      visState.position.x = this.setStateValue(state.position.x, visPos.x);
      visState.position.y = this.setStateValue(state.position.y, visPos.y);
      visState.position.z = this.setStateValue(state.position.z, visPos.z);
    }
    if (state.scale) {
      visState.scale.x = this.setStateValue(state.scale.x, visScl.x);
      visState.scale.y = this.setStateValue(state.scale.y, visScl.y);
      visState.scale.z = this.setStateValue(state.scale.z, visScl.z);
    }
    if (state.rotation) {
      visState.rotation.x = this.setStateValue(state.rotation.x, visRot.x);
      visState.rotation.y = this.setStateValue(state.rotation.y, visRot.y);
      visState.rotation.z = this.setStateValue(state.rotation.z, visRot.z);
    } else if (state.lookAt) {
      visState.lookAt = {};
      visState.lookAt.x = this.setStateValue(state.lookAt.x, 0);
      visState.lookAt.y = this.setStateValue(state.lookAt.y, 0);
      visState.lookAt.z = this.setStateValue(state.lookAt.z, 0);
    }

    return visState;
  };

  /**
   * @function update
   * @param {Boolean} onlyGlobal
   * Update Decorations for current active Scene
   * and Decorations that should be updated regardless of active Scene
   */
  update = onlyGlobal => {
    if (this.isScene) {
      onlyGlobal = this.id !== this.manager.activeScene.id;
    }
    if ((!onlyGlobal || (onlyGlobal && this.isGlobal)) && this.motion) {
      this.motion.update();
    }
    if (this.children) {
      for (let c in this.children) {
        this.children[c].update(onlyGlobal);
      }
    }
  };

  /**
   * @function connect
   * @param {Object} fiberNode
   * Connect current Decoration to the parent
   */
  connect = fiberNode => {
    const { stateNode } = fiberNode.return;
    if (!stateNode) {
      this.connect(fiberNode.return);
    } else {
      if (!stateNode.visual) {
        this.connect(stateNode._reactInternalFiber);
      } else {
        stateNode.visual.add(this.visual);
        stateNode.children[this.id] = this;
      }
    }
  };

  /**
   * @function find
   * @param {String} id
   * Find Decoration by id
   */
  find = id => {
    if (this.id === id) return this;
    if (!this.children) return false;
    for (let k in this.children) {
      const c = this.children[k].find(id);
      if (c) return c;
    }
  };

}
