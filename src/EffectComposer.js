import { EffectComposer, Pass } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass.js';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass.js';
import { MaskPass, ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass.js';
import { AdaptiveToneMappingPass } from 'three/examples/jsm/postprocessing/AdaptiveToneMappingPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { CubeTexturePass } from 'three/examples/jsm/postprocessing/CubeTexturePass.js';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass.js';
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass.js';
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { SSRPass } from 'three/examples/jsm/postprocessing/SSRPass.js';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import { ACESFilmicToneMappingShader } from 'three/examples/jsm/shaders/ACESFilmicToneMappingShader.js';
import { AfterimageShader } from 'three/examples/jsm/shaders/AfterimageShader.js';
import { BasicShader } from 'three/examples/jsm/shaders/BasicShader.js';
import { BleachBypassShader } from 'three/examples/jsm/shaders/BleachBypassShader.js';
import { BlendShader } from 'three/examples/jsm/shaders/BlendShader.js';
import { BokehShader } from 'three/examples/jsm/shaders/BokehShader.js';
import { BrightnessContrastShader } from 'three/examples/jsm/shaders/BrightnessContrastShader.js';
import { ColorCorrectionShader } from 'three/examples/jsm/shaders/ColorCorrectionShader.js';
import { ColorifyShader } from 'three/examples/jsm/shaders/ColorifyShader.js';
import { ConvolutionShader } from 'three/examples/jsm/shaders/ConvolutionShader.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { DepthLimitedBlurShader } from 'three/examples/jsm/shaders/DepthLimitedBlurShader.js';
import { DOFMipMapShader } from 'three/examples/jsm/shaders/DOFMipMapShader.js';
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js';
import { FilmShader } from 'three/examples/jsm/shaders/FilmShader.js';
import { FocusShader } from 'three/examples/jsm/shaders/FocusShader.js';
import { FreiChenShader } from 'three/examples/jsm/shaders/FreiChenShader.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { HalftoneShader } from 'three/examples/jsm/shaders/HalftoneShader.js';
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader.js';
import { HorizontalTiltShiftShader } from 'three/examples/jsm/shaders/HorizontalTiltShiftShader.js';
import { HueSaturationShader } from 'three/examples/jsm/shaders/HueSaturationShader.js';
import { KaleidoShader } from 'three/examples/jsm/shaders/KaleidoShader.js';
import { LuminosityHighPassShader } from 'three/examples/jsm/shaders/LuminosityHighPassShader.js';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { MirrorShader } from 'three/examples/jsm/shaders/MirrorShader.js';
import { MMDToonShader } from 'three/examples/jsm/shaders/MMDToonShader.js';
import { NormalMapShader } from 'three/examples/jsm/shaders/NormalMapShader.js';
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { SAOShader } from 'three/examples/jsm/shaders/SAOShader.js';
import { SepiaShader } from 'three/examples/jsm/shaders/SepiaShader.js';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader.js';
import { SubsurfaceScatteringShader } from 'three/examples/jsm/shaders/SubsurfaceScatteringShader.js';
import { TechnicolorShader } from 'three/examples/jsm/shaders/TechnicolorShader.js';
import { ToneMapShader } from 'three/examples/jsm/shaders/ToneMapShader.js';
import { TriangleBlurShader } from 'three/examples/jsm/shaders/TriangleBlurShader.js';
import { UnpackDepthRGBAShader } from 'three/examples/jsm/shaders/UnpackDepthRGBAShader.js';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader.js';
import { VerticalTiltShiftShader } from 'three/examples/jsm/shaders/VerticalTiltShiftShader.js';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader.js';
import { WaterRefractionShader } from 'three/examples/jsm/shaders/WaterRefractionShader.js';
import { DigitalGlitch as DigitalGlitchShader } from 'three/examples/jsm/shaders/DigitalGlitch.js';
import {
  GodRaysDepthMaskShader,
  GodRaysGenerateShader,
  GodRaysCombineShader,
  GodRaysFakeSunShader
} from 'three/examples/jsm/shaders/GodRaysShader.js';
import {
  SMAAEdgesShader,
  SMAAWeightsShader,
  SMAABlendShader
} from 'three/examples/jsm/shaders/SMAAShader.js';
import {
  SSAOShader,
  SSAODepthShader,
  SSAOBlurShader
} from 'three/examples/jsm/shaders/SSAOShader.js';
import {
  SSRShader,
  SSRDepthShader,
  SSRBlurShader
} from 'three/examples/jsm/shaders/SSRShader.js';
import {
  ToonShaderHatching,
  ToonShaderDotted
} from 'three/examples/jsm/shaders/ToonShader.js';

const Passes = {
  Pass, RenderPass, ShaderPass, TexturePass, ClearPass, MaskPass, ClearMaskPass,
  AdaptiveToneMappingPass, AfterimagePass, BloomPass, BokehPass, CubeTexturePass,
  DotScreenPass, FilmPass, GlitchPass, HalftonePass, LUTPass, OutlinePass, SAOPass,
  SavePass, SMAAPass, SSAARenderPass, SSAOPass, SSRPass, TAARenderPass, UnrealBloomPass
};

const Shaders = {
  ACESFilmicToneMappingShader, AfterimageShader, BasicShader, BleachBypassShader, BlendShader,
  BokehShader, BrightnessContrastShader, ColorCorrectionShader, ColorifyShader, ConvolutionShader,
  CopyShader, DepthLimitedBlurShader, DigitalGlitchShader, DOFMipMapShader, DotScreenShader,
  FilmShader, FocusShader, FreiChenShader, FXAAShader, GammaCorrectionShader, GodRaysDepthMaskShader,
  GodRaysGenerateShader, GodRaysCombineShader, GodRaysFakeSunShader, HalftoneShader, HorizontalBlurShader,
  HorizontalTiltShiftShader, HueSaturationShader, KaleidoShader, LuminosityHighPassShader, LuminosityShader,
  MirrorShader, MMDToonShader, NormalMapShader, PixelShader, RGBShiftShader, SAOShader, SepiaShader,
  SMAAEdgesShader, SMAAWeightsShader, SMAABlendShader, SobelOperatorShader, SSAOShader, SSAODepthShader,
  SSAOBlurShader, SSRShader, SSRDepthShader, SSRBlurShader, SubsurfaceScatteringShader, TechnicolorShader,
  ToneMapShader, ToonShaderHatching, ToonShaderDotted, TriangleBlurShader, UnpackDepthRGBAShader,
  VerticalBlurShader, VerticalTiltShiftShader, VignetteShader, WaterRefractionShader
};

export { EffectComposer, Passes, Shaders };
