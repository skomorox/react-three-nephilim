import EffectComposer, {
  Pass,
	RenderPass,
	ShaderPass,
	TexturePass,
	ClearPass,
  MaskPass,
  ClearMaskPass
} from '@johh/three-effectcomposer';
import { UnrealBloomPass } from './UnrealBloomPass.js';

EffectComposer.Pass = Pass;
EffectComposer.RenderPass = RenderPass;
EffectComposer.ShaderPass = ShaderPass;
EffectComposer.TexturePass = TexturePass;
EffectComposer.ClearPass = ClearPass;
EffectComposer.MaskPass = MaskPass;
EffectComposer.ClearMaskPass = ClearMaskPass;
EffectComposer.UnrealBloomPass = UnrealBloomPass;

export { EffectComposer };
