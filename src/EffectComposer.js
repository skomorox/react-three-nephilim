import { EffectComposer, Pass } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass.js';
import { CubeTexturePass } from 'three/examples/jsm/postprocessing/CubeTexturePass.js';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass.js';
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass.js';
import { MaskPass, ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass.js';
import { RenderTransitionPass } from 'three/examples/jsm/postprocessing/RenderTransitionPass.js';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass.js';
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { SSRPass } from 'three/examples/jsm/postprocessing/SSRPass.js';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass.js';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass.js';
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
import { ExposureShader }from 'three/examples/jsm/shaders/ExposureShader.js';
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
import { OutputShader } from 'three/examples/jsm/shaders/OutputShader.js';
import { PoissonDenoiseShader } from 'three/examples/jsm/shaders/PoissonDenoiseShader.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { SepiaShader } from 'three/examples/jsm/shaders/SepiaShader.js';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader.js';
import { SubsurfaceScatteringShader } from 'three/examples/jsm/shaders/SubsurfaceScatteringShader.js';
import { TechnicolorShader } from 'three/examples/jsm/shaders/TechnicolorShader.js';
import { TriangleBlurShader } from 'three/examples/jsm/shaders/TriangleBlurShader.js';
import { UnpackDepthRGBAShader } from 'three/examples/jsm/shaders/UnpackDepthRGBAShader.js';
import { VelocityShader } from 'three/examples/jsm/shaders/VelocityShader.js';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader.js';
import { VerticalTiltShiftShader } from 'three/examples/jsm/shaders/VerticalTiltShiftShader.js';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader.js';
import { VolumeRenderShader1 as VolumeShader } from 'three/examples/jsm/shaders/VolumeShader.js';
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
  Pass, AfterimagePass, BloomPass, BokehPass, ClearPass, CubeTexturePass, DotScreenPass,
  FilmPass, GlitchPass, GTAOPass, HalftonePass, LUTPass, MaskPass, ClearMaskPass, OutlinePass,
  OutputPass, RenderPass, RenderPixelatedPass, RenderTransitionPass, SAOPass, SavePass, ShaderPass,
  SMAAPass, SSAARenderPass, SSAOPass, SSRPass, TAARenderPass, TexturePass, UnrealBloomPass
};

const Shaders = {
  ACESFilmicToneMappingShader, AfterimageShader, BasicShader, BleachBypassShader, BlendShader,
  BokehShader, BrightnessContrastShader, ColorCorrectionShader, ColorifyShader, ConvolutionShader,
  CopyShader, DepthLimitedBlurShader, DigitalGlitchShader, DOFMipMapShader, DotScreenShader, ExposureShader,
  FilmShader, FocusShader, FreiChenShader, FXAAShader, GammaCorrectionShader, GodRaysDepthMaskShader,
  GodRaysGenerateShader, GodRaysCombineShader, GodRaysFakeSunShader, HalftoneShader, HorizontalBlurShader,
  HorizontalTiltShiftShader, HueSaturationShader, KaleidoShader, LuminosityHighPassShader, LuminosityShader,
  MirrorShader, MMDToonShader, NormalMapShader, OutputShader, PoissonDenoiseShader, RGBShiftShader, SepiaShader,
  SMAAEdgesShader, SMAAWeightsShader, SMAABlendShader, SobelOperatorShader, SSAOShader, SSAODepthShader,
  SSAOBlurShader, SSRShader, SSRDepthShader, SSRBlurShader, SubsurfaceScatteringShader, TechnicolorShader,
  ToonShaderHatching, ToonShaderDotted, TriangleBlurShader, UnpackDepthRGBAShader, VelocityShader,
  VerticalBlurShader, VerticalTiltShiftShader, VignetteShader, VolumeShader, WaterRefractionShader
};

export { EffectComposer, Passes, Shaders };
