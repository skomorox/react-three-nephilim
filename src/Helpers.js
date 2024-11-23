import React, { Children, createContext, useContext, forwardRef } from 'react';
import { Platform, Orientation } from './Types';
import * as Interfaces from './Interfaces';

/**
 * NephilimContext
 */
const NephilimContext = createContext();

/**
 * NephilimProvider
 */
export const NephilimProvider = NephilimContext.Provider;

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
 * @function capitalize
 * @param {String} v
 * Capitalize string
 */
export const capitalize = v => v.charAt(0).toUpperCase() + v.slice(1);

/**
 * @function getDevicePlatform
 * Detect mobile platform using navigator.userAgent
 */
export const getDevicePlatform = () => {
  if ([
    /Android/i,
    /BlackBerry/i,
    /IEMobile/i,
    /Opera Mini/i,
    /Windows Phone/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /webOS/i
  ].some(p => navigator.userAgent.match(p))) {
    return Platform.MOBILE;
  }
  return Platform.DESKTOP;
};

/**
 * @function getDeviceOrientation
 * Check current screen proportions
 */
export const getDeviceOrientation = () => {
  if ((window.innerHeight / window.innerWidth) >= 1) {
    return Orientation.PORTRAIT;
  }
  return Orientation.LANDSCAPE;
};

/**
 * @function useNephilim
 * Nephilim context provider
 */
export const useNephilim = () => {
  const context = useContext(NephilimContext);
  return {
    ...context,
    devicePlatform: getDevicePlatform()
  };
};

/**
 * @function withNephilim
 * Nephilim context provider
 */
export const withNephilim = NephilimComponent => (
  forwardRef((props, ref) => (
    <NephilimContext.Consumer>
      {context => (
        <NephilimComponent
          {...props}
          {...context}
          ref={ref}
          devicePlatform={getDevicePlatform()}
        />
      )}
    </NephilimContext.Consumer>
  ))
);
