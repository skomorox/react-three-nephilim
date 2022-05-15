/*****************************************************************************************************
 * @author Skomorox
 * @class Line
 * Abstract: Class Line. THREE.Line, THREE.LineSegments wrapper.
 *****************************************************************************************************
 */

 import * as Three from 'three';
 import { Decoration } from './Decoration';
 
 export class Line extends Decoration {
 
   constructor({ type, geometry, material }) {
     super();
     this.setMaterial(material);
     this.setGeomerty(type, geometry);
   }
 
   setMaterial = ({ type, params }) => {
     this.material = new Three[`Line${this.manager.capitalize(type)}Material`](params);
   };
 
   setGeomerty = (type, geometry) => {
     this.geometry = geometry;
     this.visual = new Three[type === 'line' ?
      'Line' :
      `Line${this.manager.capitalize(type || '')}`
    ](this.geometry, this.material);
   };
 
   updateMaterial = material => {
     this.setMaterial(material);
     this.visual.material = this.material;
   };
   
 }
 