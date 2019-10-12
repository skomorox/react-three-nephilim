/*****************************************************************************************************
 * @author Skomorox
 * v3.0.0
 *
 * @class Container
 * Abstract: Class Container. THREE.Group wrapper.
 *****************************************************************************************************
 */

import { Group, Vector3 } from 'three';
import { Decoration } from './Decoration';

export class Container extends Decoration {

  constructor() {
    super();
    this.children = {};
    this.visual = new Group();
  }

  componentDidMount() {
    Object.keys(this.children).forEach((k, i) => {
      const c = this.children[k];
      this.buildComposition(c.visual, i);
    });
    super.componentDidMount();
  }

  render() {
    return this.props.children;
  }

  /**
   * @function buildComposition
   * Add Decoration to the Сontainer according to composition settings
   * Acceptable options are: grid, z-grid, cylinder
   */  
  buildComposition = (visual, i) => {

    const { composition } = this.props;

    if (!composition) return false;
    let { type, cols, rows, xStart, xStep, xRand, yStart, yStep, yRand, zStart, zStep, zRand, radius, shift } = composition;

    let column;
    let row;
    let layer;
    let position;
    let src = this.manager.isMobileScreen() ? 0 : 1;

    cols = cols ? (cols[src] || cols) : 0;
    rows = rows ? (rows[src] || rows) : 0;
    radius = radius ? (radius[src] || radius) : 0;
    xStart = xStart ? (xStart[src] || xStart) : 0;
    yStart = yStart ? (yStart[src] || yStart) : 0;
    zStart = zStart ? (zStart[src] || zStart) : 0;
    xStep = xStep ? (xStep[src] || xStep) : 0;
    yStep = yStep ? (yStep[src] || yStep) : 0;
    zStep = zStep ? (zStep[src] || zStep) : 0;
    xRand = xRand ? (xRand[src] || xRand) : 0;
    yRand = yRand ? (yRand[src] || yRand) : 0;
    zRand = zRand ? (zRand[src] || zRand)  : 0;
    
    switch (type) {
      
      case 'grid':
        column = i % cols;
        row = Math.floor(i / cols);
        let x = column * (xStep || 0) + (xStart || 0) + (Math.random() * xRand - xRand);
        if (shift && row % 2 === 1) {
          x += xStep / 2;
        }
        position = {
          x,
          y: row * (-yStep || 0) + (yStart || 0) + (Math.random() * yRand - yRand),
          z: (zStart || 0) + (Math.random() * zRand - zRand)
        };
        break;
        
      case 'z-grid':
        column = i % cols;
        row = Math.floor(i / cols) % rows;
        layer = Math.floor(i / (cols * rows));
        position = {
          x: column * (xStep || 0) + (xStart || 0) + (Math.random() * xRand - xRand),
          y: row * (-yStep || 0) + (yStart || 0) + (Math.random() * yRand - yRand),
          z: layer * (-zStep || 0) + (zStart || 0) + (Math.random() * zRand - zRand)
        };
        break;

      case 'cylinder':
        column = i % cols;
        row = Math.floor(i / cols);
        let phi = (Math.PI / cols * 2) * (column + 1);
        if (shift) {
          phi += Math.PI / cols * (row + 1);
        }
        position = {
          x: radius * Math.sin(phi),
          y: row * (-yStep || 0),
          z: radius * Math.cos(phi)
        };
        break;
      
      default:
        break;
    }

    visual.position.set(position.x, position.y, position.z);
    if (type === 'cylinder') visual.lookAt(new Vector3(0, position.y, 0));
  };
}
