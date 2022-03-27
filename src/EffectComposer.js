import { EffectComposer, Pass } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass.js';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass.js';
import { MaskPass, ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

EffectComposer.Pass = Pass;
EffectComposer.RenderPass = RenderPass;
EffectComposer.ShaderPass = ShaderPass;
EffectComposer.TexturePass = TexturePass;
EffectComposer.ClearPass = ClearPass;
EffectComposer.MaskPass = MaskPass;
EffectComposer.ClearMaskPass = ClearMaskPass;
EffectComposer.UnrealBloomPass = UnrealBloomPass;

export { EffectComposer };
