/*****************************************************************************************************
 * @author Skomorox
 * @class Decoration
 * Abstract: Class Decoration. Basic class.
 *****************************************************************************************************
 */

import _ from 'lodash';
import * as Three from 'three';
import * as Types from '../Types';
import { Component } from 'react';
import { Motion } from '../Motion';
import { getDeviceOrientation, withInterface } from '../Helpers';

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
      id, audio, motion, actions, layer,
      isGlobal, isGLEvents, onClick, onMouseOver
    } = withInterface(this.props);
    this.id = id || this.visual.uuid || this.visual.id;
    this.isGLEvents = this.isGLEvents || isGLEvents;
    this.isGlobal = isGlobal || false;
    this.metadata = { state: { position: {}, scale: {}, rotation: {}, lookAt: {} } };
    this.setVisualState();

    if (audio) this.setAudio(audio);
    if (motion) this.setMotion(motion);
    if (actions) this.setActions(actions);
    if (onClick) this.visual.onClick = onClick;
    if (onMouseOver) this.visual.onMouseOver = onMouseOver;
    if (layer) {
      this.visual.layers.enable(layer);
      this.manager.layers[layer] = layer;
    }

    this.connect(this._reactInternals);
  }

  /**
   * @function componentDidUpdate
   * 1. Update visual state
   * 2. Update Motion
   * 3. Update Actions
   * 4. Update Material
   * 5. Update Audio
   */
  componentDidUpdate({
    position: prevPosition,
    rotation: prevRotation,
    scale: prevScale,
    lookAt: prevLookAt,
    motion: prevMotion,
    actions: prevActions,
    material: prevMaterial,
    audio: prevAudio
  }) {

    const {
      position, rotation, scale, lookAt,
      motion, actions, material, audio
    } = this.props;

    if (
      !_.isEqual(position, prevPosition) ||
      !_.isEqual(rotation, prevRotation) || 
      !_.isEqual(scale, prevScale) ||
      !_.isEqual(lookAt, prevLookAt)
    ) {
      this.setVisualState({ position, rotation, scale, lookAt });
    }
    if (!_.isEqual(motion, prevMotion)) {
      this.setMotion(motion);
    }
    if (!_.isEqual(actions, prevActions)) {
      this.setActions(actions);
    }
    if (!_.isEqual(material, prevMaterial)) {
      this.updateMaterial(material);
    }
    if (!_.isEqual(audio, prevAudio)) {
      for (let a in audio) {
        if (audio[a].play) {
          this.audio[a].play();
        } else if (this.audio[a].isPlaying) {
          this.audio[a].stop();
        }
      }
    }
  }

  /**
   * @function componentWillUnmount
   * Remove object from Scene on unmount
   */
  componentWillUnmount() {
    for (let a in this.audio) {
      if (this.audio[a]?.isPlaying) {
        this.audio[a].stop();
      }
    }
    if (this.type === Types.Decoration.Emitter) {
      this.visual.parent.destroy();
    } else {
      this.visual.parent.remove(this.visual);
    }
    delete this._nephilimParentNode.children[this.id];
  }

  render() {
    return null;
  }

  /**
   * @function setVisual
   * Init visual
   */
  setVisual = () => {
    const { material, geometry } = withInterface(this.props);
    this.setMaterial(material);
    this.setGeometry(geometry);
  };

  /**
   * @function setVisualState
   * @param {Object} state
   * Set position, rotation and scale of the object
   */
  setVisualState = state => {
    if (!state) state = this.props;
    const vs = this.calculateVisualState(state);
    this.visual.position.set(vs.position.x, vs.position.y, vs.position.z);
    if (this.type !== Types.Decoration.Emitter) {
      this.visual.scale.set(vs.scale.x, vs.scale.y, vs.scale.z);
    }
    if (vs.lookAt) {
      this.visual.lookAt(new Three.Vector3(vs.lookAt.x, vs.lookAt.y, vs.lookAt.z));
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
        getDeviceOrientation() ===  Types.Orientation.Portrait ?
          sv[0] :
          sv[1] :
        sv
  );

  /**
   * @function setAudio
   * @param {Object} audio
   * Set Audio for current Decoration
   */
  setAudio = audio => {

    const { audioListener, audioLoader } = this.manager;
    this.audio = {};

    for (let a in audio) {
      const { src, refDistance, maxDistance, volume, loop, play } = audio[a];
      this.audio[a] = new Three.PositionalAudio(audioListener);
      audioLoader.load(src, buffer => {
        this.audio[a].setBuffer(buffer);
        if (refDistance !== undefined) {
          this.audio[a].setRefDistance(refDistance);
        }
        if (maxDistance !== undefined) {
          this.audio[a].setMaxDistance(maxDistance);
        }
        if (volume !== undefined) {
          this.audio[a].setVolume(volume);
        }
        if (loop !== undefined) {
          this.audio[a].setLoop(loop);
        }
        if (play) {
          this.audio[a].play();
        }
        this.visual.add(this.audio[a]);
      });
    }
  };

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
   * @function calculateVisualState
   * @param {Object} state
   * Calculate position, rotation and scale based on current and new state
   */
  calculateVisualState = state => {

    const { position, rotation, scale } = this.visual;
    const calculatedState = {
      position: { x: position.x, y: position.y, z: position.z },
      rotation: { x: rotation.x, y: rotation.y, z: rotation.z },
      scale: { x: scale.x, y: scale.y, z: scale.z }
    };
    this.metadata.state = { position, rotation, scale };

    if (state.position) {
      calculatedState.position.x = this.setStateValue(state.position.x, position.x);
      calculatedState.position.y = this.setStateValue(state.position.y, position.y);
      calculatedState.position.z = this.setStateValue(state.position.z, position.z);
      this.metadata.state.position = state.position;
    }
    if (state.scale) {
      calculatedState.scale.x = this.setStateValue(state.scale.x, scale.x);
      calculatedState.scale.y = this.setStateValue(state.scale.y, scale.y);
      calculatedState.scale.z = this.setStateValue(state.scale.z, scale.z);
      this.metadata.state.scale = state.scale;
    }
    if (state.rotation) {
      calculatedState.rotation.x = this.setStateValue(state.rotation.x, rotation.x);
      calculatedState.rotation.y = this.setStateValue(state.rotation.y, rotation.y);
      calculatedState.rotation.z = this.setStateValue(state.rotation.z, rotation.z);
      this.metadata.state.rotation = state.rotation;
    } else if (state.lookAt) {
      calculatedState.lookAt = {};
      calculatedState.lookAt.x = this.setStateValue(state.lookAt.x, 0);
      calculatedState.lookAt.y = this.setStateValue(state.lookAt.y, 0);
      calculatedState.lookAt.z = this.setStateValue(state.lookAt.z, 0);
      this.metadata.state.lookAt = state.lookAt;
    }

    return calculatedState;
  };

  /**
   * @function update
   * @param {Boolean} onlyGlobal
   * Update Decorations for current active Scene
   * and Decorations that should be updated regardless of active Scene
   */
  update = onlyGlobal => {
    if (this.type === Types.Decoration.Scene) {
      onlyGlobal = this.id !== this.manager.activeScene.id;
    }
    if ((!onlyGlobal || (onlyGlobal && this.isGlobal)) && this.motion) {
      this.motion.update();
    }
    if (this.type === Types.Decoration.Emitter) {
      this.nebula.update();
    }
    if (this.children) {
      for (let c in this.children) {
        this.children[c].update(onlyGlobal);
      }
    }
  };

  /**
   * @function updateLayout
   * Update Decorations layout
   */
  updateLayout = () => {
    const { state } = this.metadata;
    if (this.type === Types.Decoration.Container) {
      this.setCompositionState();
    }
    this.setVisualState(state);
    if (this.children) {
      for (let c in this.children) {
        this.children[c].updateLayout();
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
        this.connect(stateNode._reactInternals);
      } else {
        if (this.type === Types.Decoration.Emitter) {
          this.connectEmitter(stateNode);
        } else {
          stateNode.visual.add(this.visual);
        }
        stateNode.children[this.id] = this;
        this._nephilimParentNode = stateNode;
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

  /**
   * @function findAll
   * @param {String} id
   * @param {Decoration[]} all
   * Find Decorations containing given id part
   */
  findAll = (id, all = []) => {
    if (this.id.includes(id)) all.push(this);
    if (!this.children) return false;
    for (let k in this.children) {
      this.children[k].findAll(id, all);
    }
    return all;
  };

}
