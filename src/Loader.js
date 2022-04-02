import { AMFLoader } from 'three/examples/jsm/loaders/AMFLoader.js';
import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader.js';
import { BVHLoader } from 'three/examples/jsm/loaders/BVHLoader.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { GCodeLoader } from 'three/examples/jsm/loaders/GCodeLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader.js';
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader.js';
import { KMZLoader } from 'three/examples/jsm/loaders/KMZLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { KTXLoader } from 'three/examples/jsm/loaders/KTXLoader.js';
import { LDrawLoader } from 'three/examples/jsm/loaders/LDrawLoader.js';
import { LogLuvLoader } from 'three/examples/jsm/loaders/LogLuvLoader.js';
import { LottieLoader } from 'three/examples/jsm/loaders/LottieLoader.js';
import { LUT3dlLoader } from 'three/examples/jsm/loaders/LUT3dlLoader.js';
import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader.js';
import { LWOLoader } from 'three/examples/jsm/loaders/LWOLoader.js';
import { MD2Loader } from 'three/examples/jsm/loaders/MD2Loader.js';
import { MDDLoader } from 'three/examples/jsm/loaders/MDDLoader.js';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { NRRDLoader } from 'three/examples/jsm/loaders/NRRDLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js';
import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader.js';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
import { PRWMLoader } from 'three/examples/jsm/loaders/PRWMLoader.js';
import { PVRLoader } from 'three/examples/jsm/loaders/PVRLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { RGBMLoader } from 'three/examples/jsm/loaders/RGBMLoader.js';
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader.js';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader.js';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';
import { TiltLoader } from 'three/examples/jsm/loaders/TiltLoader.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader.js';
import { VRMLLoader } from 'three/examples/jsm/loaders/VRMLLoader.js';
import { VTKLoader } from 'three/examples/jsm/loaders/VTKLoader.js';
import { XYZLoader } from 'three/examples/jsm/loaders/XYZLoader.js';

const Loaders = {
  AMFLoader, BasisTextureLoader, BVHLoader, ColladaLoader, DDSLoader, DRACOLoader, EXRLoader,
  FBXLoader, FontLoader, GCodeLoader, GLTFLoader, HDRCubeTextureLoader, IFCLoader, KMZLoader,
  KTX2Loader, KTXLoader, LDrawLoader, LogLuvLoader, LottieLoader, LUT3dlLoader, LUTCubeLoader,
  LWOLoader, MD2Loader, MDDLoader, MMDLoader, MTLLoader, NRRDLoader, OBJLoader, PCDLoader,
  PDBLoader, PLYLoader, PRWMLoader, PVRLoader, RGBELoader, RGBMLoader, Rhino3dmLoader, STLLoader,
  SVGLoader, TDSLoader, TGALoader, ThreeMFLoader, TiltLoader, TTFLoader, VOXLoader, VRMLLoader,
  VTKLoader, XYZLoader
};

const basicMaterialTypes = [
  'basic', 'depth', 'distance', 'lambert', 'matcap',
  'normal', 'phong', 'physical', 'standard', 'toon'
];

const basicGeometryTypes = [
  'box', 'capsule', 'circle', 'cone', 'cylinder',
  'dodecahedron', 'extrude', 'icosahedron', 'lathe',
  'octahedron', 'plane', 'polyhedron', 'ring', 'shape',
  'sphere', 'tetrahedron', 'torus', 'torusknot', 'tube'
];

export { Loaders, basicMaterialTypes, basicGeometryTypes };
