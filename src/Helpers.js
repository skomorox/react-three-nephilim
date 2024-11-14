import { Children } from 'react';
import * as Interfaces from './Interfaces';
import config from './config';

/**
 * @function applyInterfaceProps
 * @param {Object[]} props
 * Apply Interface props
*/
export const applyInterfaceProps = props => {
  const mergedProps = { ...props };
  Children.forEach(props.children, c => {
    if (c === null) return false;
    if (c.type === Interfaces.GLRenderer) mergedProps.glRenderer = c.props;
    if (c.type === Interfaces.CSSRenderer) mergedProps.cssRenderer = c.props;
    if (c.type === Interfaces.PostProcessing) mergedProps.postProcessing = c.props;
    if (c.type === Interfaces.LayerRendering) mergedProps.isLayerRendering = c.props;
    if (c.type === Interfaces.Composition) mergedProps.composition = c.props;
    if (c.type === Interfaces.Camera) mergedProps.camera = c.props;
    if (c.type === Interfaces.Material) mergedProps.material = c.props;
    if (c.type === Interfaces.Geometry) mergedProps.geometry = c.props;
    if (c.type === Interfaces.Audio) mergedProps.audio = c.props;
    if (c.type === Interfaces.Motion) mergedProps.motion = c.props;
    if (c.type === Interfaces.Router) mergedProps.router = c.props;
  });
  return mergedProps;
};

/**
 * @function isMobilePlatform
 * Detect mobile platform using navigator.userAgent
 */
export const isMobilePlatform = () => {
  const platforms = [
    /Android/i,
    /BlackBerry/i,
    /IEMobile/i,
    /Opera Mini/i,
    /Windows Phone/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /webOS/i
  ];
  return platforms.some(p => navigator.userAgent.match(p));
};

/**
 * @function isMobileScreen
 * Check current client width
 */
export const isMobileScreen = c => c.clientWidth <= config.MOBILE_SCREEN_WIDTH;

/**
 * @function capitalize
 * @param {String} v
 * Capitalize string
 */
export const capitalize = v => v.charAt(0).toUpperCase() + v.slice(1);
