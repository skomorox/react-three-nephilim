/*****************************************************************************************************
 * @author Skomorox
 * @class Decoration
 * Abstract: Class Decoration. Basic class.
 *****************************************************************************************************
 */

import _ from 'lodash';
import { Component } from 'react';
import { Vector3, PositionalAudio } from 'three'; 
import { Motion } from '../Motion';
import { applyInterfaceProps, isMobileScreen } from '../Helpers';

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

    let {
      id, audio, motion, actions, layer,
      isGlobal, isGLEvents, onClick, onMouseOver
    } = applyInterfaceProps(this.props);
    this.id = id || this.visual.uuid || this.visual.id;
    this.isGLEvents = this.isGLEvents || isGLEvents;
    this.isGlobal = isGlobal || false;
    this.isEmitter = this.visual.type === 'Emitter'; // is emitter?
    this.setVisualState(this.props);

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
    // update material
    
    const { position, rotation, scale, lookAt, motion, actions, material, audio } = this.props;
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
    if (this.isEmitter) {
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
    const { material, geometry } = applyInterfaceProps(this.props);
    this.setMaterial(material);
    this.setGeometry(geometry);
  };

  /**
   * @function setVisualState
   * @param {Object} state
   * Set position, rotation and scale of the object
   */
  setVisualState = state => {
    const vs = this.calcVisualState(state);    
    this.visual.position.set(vs.position.x, vs.position.y, vs.position.z);
    if (!this.isEmitter) {
      this.visual.scale.set(vs.scale.x, vs.scale.y, vs.scale.z);
    }
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
        isMobileScreen(this.manager.container) ?
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
      this.audio[a] = new PositionalAudio(audioListener);
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
    if (this.isEmitter) {
      this.nebula.update();
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
        this.connect(stateNode._reactInternals);
      } else {
        if (this.isEmitter) {
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
