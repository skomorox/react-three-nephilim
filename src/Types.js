const Decoration = {
  Container: 'Container',
  Emitter: 'Emitter',
  Glass: 'Glass',
  Hypertext: 'Hypertext',
  Light: 'Light',
  Line: 'Line',
  Mesh: 'Mesh',
  Scene: 'Scene',
  Sprite: 'Sprite',
  Swarm: 'Swarm'
};

const Camera = {
  Cube: 'CubeCamera',
  Orthographic: 'OrthographicCamera',
  Perspective: 'PerspectiveCamera',
  Stereo: 'StereoCamera'
};

const Geometry = {
  Box: 'BoxGeometry',
  Capsule: 'CapsuleGeometry',
  Circle: 'CircleGeometry',
  Cone: 'ConeGeometry',
  Cylinder: 'CylinderGeometry',
  Dodecahedron: 'DodecahedronGeometry',
  Extrude: 'ExtrudeGeometry',
  Icosahedron: 'IcosahedronGeometry',
  Lathe: 'LatheGeometry',
  Octahedron: 'OctahedronGeometry',
  Plane: 'PlaneGeometry',
  Polyhedron: 'PolyhedronGeometry',
  Ring: 'RingGeometry',
  Shape: 'ShapeGeometry',
  Sphere: 'SphereGeometry',
  Tetrahedron: 'TetrahedronGeometry',
  Torus: 'TorusGeometry',
  TorusKnot: 'TorusKnotGeometry',
  Tube: 'TubeGeometry'
};

const Material = {
  Basic: 'MeshBasicMaterial',
  Depth: 'MeshDepthMaterial',
  Distance: 'MeshDistanceMaterial',
  Lambert: 'MeshLambertMaterial',
  Matcap: 'MeshMatcapMaterial',
  Normal: 'MeshNormalMaterial',
  Phong: 'MeshPhongMaterial',
  Physical: 'MeshPhysicalMaterial',
  Standard: 'MeshStandardMaterial',
  Toon: 'MeshToonMaterial',
  Points: 'PointsMaterial',
  LineBasic: 'LineBasicMaterial',
  LineDashed: 'LineDashedMaterial',
  Shader: 'ShaderMaterial',
  Shadow: 'ShadowMaterial',
  Sprite: 'SpriteMaterial'
};

const Glass = {
  Reflector: 'Reflector',
  Refractor: 'Refractor'
};

const Light = {
  Ambient: 'AmbientLight',
  Directional: 'DirectionalLight',
  Hemisphere: 'HemisphereLight',
  Point: 'PointLight',
  Spot: 'SpotLight'
};

const Line = {
  Basic: 'Line',
  Loop: 'LineLoop',
  Segments: 'LineSegments'
};

const Loader = {
  AMF: 'AMFLoader',
  BVH: 'BVHLoader',
  Collada: 'ColladaLoader',
  DDS: 'DDSLoader',
  DRACO: 'DRACOLoader',
  EXR: 'EXRLoader',
  FBX: 'FBXLoader',
  Font: 'FontLoader',
  GCode: 'GCodeLoader',
  GLTF: 'GLTFLoader',
  HDRCubeTexture: 'HDRCubeTextureLoader',
  IES: 'IESLoader',
  KMZ: 'KMZLoader',
  KTX: 'KTXLoader',
  KTX2: 'KTX2Loader',
  LDraw: 'LDrawLoader',
  Lottie: 'LottieLoader',
  LUT3dl: 'LUT3dlLoader',
  LUTCube: 'LUTCubeLoader',
  LUTImage: 'LUTImageLoader',
  LWO: 'LWOLoader',
  MD2: 'MD2Loader',
  MDD: 'MDDLoader',
  MMD: 'MMDLoader',
  MTL: 'MTLLoader',
  NRRD: 'NRRDLoader',
  OBJ: 'OBJLoader',
  PCD: 'PCDLoader',
  PDB: 'PDBLoader',
  PLY: 'PLYLoader',
  PVR: 'PVRLoader',
  RGBE: 'RGBELoader',
  RGBM: 'RGBMLoader',
  Rhino3dm: 'Rhino3dmLoader',
  STL: 'STLLoader',
  SVG: 'SVGLoader',
  TDS: 'TDSLoader',
  TGA: 'TGALoader',
  ThreeMF: 'ThreeMFLoader',
  TIFF: 'TIFFLoader',
  TTF: 'TTFLoader',
  UltraHDR: 'UltraHDRLoader',
  USDZ: 'USDZLoader',
  VOX: 'VOXLoader',
  VRML: 'VRMLLoader',
  VTK: 'VTKLoader',
  XYZ: 'XYZLoader'
};

const Composition = {
  Cylinder: 'Cylinder',
  DepthGrid: 'DepthGrid',
  Grid: 'Grid'
};

const Platform = {
  Desktop: 'desktop',
  Mobile: 'mobile'
};

const Orientation = {
  Landscape: 'landscape',
  Portrait: 'portrait'
};

const Axis = {
  X: 'x',
  Y: 'y',
  Z: 'z',
  XY: 'xy',
  XZ: 'xz',
  YZ: 'yz',
  XYZ: 'xyz'
};

export {
  Decoration, Camera, Geometry, Material, Glass, Light,
  Line, Loader, Composition, Platform, Orientation, Axis
};
