import { EffectComposer, Pass } from 'three/examples/jsm/postprocessing/EffectComposer';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass';
import { CubeTexturePass } from 'three/examples/jsm/postprocessing/CubeTexturePass';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass';
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass';
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass';
import { MaskPass, ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass';
import { RenderTransitionPass } from 'three/examples/jsm/postprocessing/RenderTransitionPass';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import { ACESFilmicToneMappingShader } from 'three/examples/jsm/shaders/ACESFilmicToneMappingShader';
import { AfterimageShader } from 'three/examples/jsm/shaders/AfterimageShader';
import { BasicShader } from 'three/examples/jsm/shaders/BasicShader';
import { BleachBypassShader } from 'three/examples/jsm/shaders/BleachBypassShader';
import { BlendShader } from 'three/examples/jsm/shaders/BlendShader';
import { BokehShader } from 'three/examples/jsm/shaders/BokehShader';
import { BrightnessContrastShader } from 'three/examples/jsm/shaders/BrightnessContrastShader';
import { ColorCorrectionShader } from 'three/examples/jsm/shaders/ColorCorrectionShader';
import { ColorifyShader } from 'three/examples/jsm/shaders/ColorifyShader';
import { ConvolutionShader } from 'three/examples/jsm/shaders/ConvolutionShader';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader';
import { DepthLimitedBlurShader } from 'three/examples/jsm/shaders/DepthLimitedBlurShader';
import { DOFMipMapShader } from 'three/examples/jsm/shaders/DOFMipMapShader';
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader';
import { ExposureShader }from 'three/examples/jsm/shaders/ExposureShader';
import { FilmShader } from 'three/examples/jsm/shaders/FilmShader';
import { FocusShader } from 'three/examples/jsm/shaders/FocusShader';
import { FreiChenShader } from 'three/examples/jsm/shaders/FreiChenShader';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader';
import { HalftoneShader } from 'three/examples/jsm/shaders/HalftoneShader';
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader';
import { HorizontalTiltShiftShader } from 'three/examples/jsm/shaders/HorizontalTiltShiftShader';
import { HueSaturationShader } from 'three/examples/jsm/shaders/HueSaturationShader';
import { KaleidoShader } from 'three/examples/jsm/shaders/KaleidoShader';
import { LuminosityHighPassShader } from 'three/examples/jsm/shaders/LuminosityHighPassShader';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader';
import { MirrorShader } from 'three/examples/jsm/shaders/MirrorShader';
import { NormalMapShader } from 'three/examples/jsm/shaders/NormalMapShader';
import { OutputShader } from 'three/examples/jsm/shaders/OutputShader';
import { PoissonDenoiseShader } from 'three/examples/jsm/shaders/PoissonDenoiseShader';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader';
import { SepiaShader } from 'three/examples/jsm/shaders/SepiaShader';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader';
import { SubsurfaceScatteringShader } from 'three/examples/jsm/shaders/SubsurfaceScatteringShader';
import { TechnicolorShader } from 'three/examples/jsm/shaders/TechnicolorShader';
import { TriangleBlurShader } from 'three/examples/jsm/shaders/TriangleBlurShader';
import { UnpackDepthRGBAShader } from 'three/examples/jsm/shaders/UnpackDepthRGBAShader';
import { VelocityShader } from 'three/examples/jsm/shaders/VelocityShader';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader';
import { VerticalTiltShiftShader } from 'three/examples/jsm/shaders/VerticalTiltShiftShader';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader';
import { VolumeRenderShader1 as VolumeShader } from 'three/examples/jsm/shaders/VolumeShader';
import { WaterRefractionShader } from 'three/examples/jsm/shaders/WaterRefractionShader';
import { DigitalGlitch as DigitalGlitchShader } from 'three/examples/jsm/shaders/DigitalGlitch';
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
  FilmPass, GlitchPass, GTAOPass, HalftonePass, LUTPass, MaskPass, ClearMaskPass, OutputPass,
  RenderPass, RenderPixelatedPass, RenderTransitionPass, SAOPass, SavePass, ShaderPass,
  SMAAPass, SSAARenderPass, SSAOPass, TAARenderPass, TexturePass, UnrealBloomPass
};

const Shaders = {
  ACESFilmicToneMappingShader, AfterimageShader, BasicShader, BleachBypassShader, BlendShader,
  BokehShader, BrightnessContrastShader, ColorCorrectionShader, ColorifyShader, ConvolutionShader,
  CopyShader, DepthLimitedBlurShader, DigitalGlitchShader, DOFMipMapShader, DotScreenShader, ExposureShader,
  FilmShader, FocusShader, FreiChenShader, FXAAShader, GammaCorrectionShader, GodRaysDepthMaskShader,
  GodRaysGenerateShader, GodRaysCombineShader, GodRaysFakeSunShader, HalftoneShader, HorizontalBlurShader,
  HorizontalTiltShiftShader, HueSaturationShader, KaleidoShader, LuminosityHighPassShader, LuminosityShader,
  MirrorShader, NormalMapShader, OutputShader, PoissonDenoiseShader, RGBShiftShader, SepiaShader,
  SMAAEdgesShader, SMAAWeightsShader, SMAABlendShader, SobelOperatorShader, SSAOShader, SSAODepthShader,
  SSAOBlurShader, SSRShader, SSRDepthShader, SSRBlurShader, SubsurfaceScatteringShader, TechnicolorShader,
  ToonShaderHatching, ToonShaderDotted, TriangleBlurShader, UnpackDepthRGBAShader, VelocityShader,
  VerticalBlurShader, VerticalTiltShiftShader, VignetteShader, VolumeShader, WaterRefractionShader
};

export { EffectComposer, Passes, Shaders };
