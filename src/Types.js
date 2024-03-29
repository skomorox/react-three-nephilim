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
  BasisTexture: 'BasisTextureLoader',
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
  IFC: 'IFCLoader',
  KMZ: 'KMZLoader',
  KTX2: 'KTX2Loader',
  KTX: 'KTXLoader',
  LDraw: 'LDrawLoader',
  LogLuv: 'LogLuvLoader',
  Lottie: 'LottieLoader',
  LUT3dl: 'LUT3dlLoader',
  LUTCube: 'LUTCubeLoader',
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
  PRWM: 'PRWMLoader',
  PVR: 'PVRLoader',
  RGBE: 'RGBELoader',
  RGBM: 'RGBMLoader',
  Rhino3dm: 'Rhino3dmLoader',
  STL: 'STLLoader',
  SVG: 'SVGLoader',
  TDS: 'TDSLoader',
  TGA: 'TGALoader',
  ThreeMF: 'ThreeMFLoader',
  Tilt: 'TiltLoader',
  TTF: 'TTFLoader',
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

const Axes = {
  X: 'x',
  Y: 'y',
  Z: 'z',
  XY: 'xy',
  XZ: 'xz',
  YZ: 'yz',
  XYZ: 'xyz'
};

export {
  Camera, Geometry, Material, Light, Line,
  Loader, Composition, Axes
};
