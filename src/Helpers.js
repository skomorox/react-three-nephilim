import React, { Children, createContext, useContext, forwardRef } from 'react';
import { Platform } from './Types';
import * as Interfaces from './Interfaces';
import config from './config';

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
 * @function getPlatform
 * Detect mobile platform using navigator.userAgent
 */
export const getPlatform = () => {
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
  if (platforms.some(p => navigator.userAgent.match(p))) {
    return Platform.MOBILE;
  }
  return Platform.DESKTOP;
};

/**
 * @function getScreen
 * Check current client width
 */
export const getScreen = () => {
  if (
    window.innerWidth <= config.MOBILE_SCREEN_WIDTH &&
    (window.innerHeight / window.innerWidth) > 0.9
  ) {
    return Platform.MOBILE;
  }
  return Platform.DESKTOP;
};

/**
 * @function useNephilim
 * Nephilim context provider
 */
export const useNephilim = () => {
  const { screen } = useContext(NephilimContext);
  return {
    screen,
    platform: getPlatform()
  };
};

/**
 * @function withNephilim
 * Nephilim context provider
 */
export const withNephilim = NephilimComponent => (
  forwardRef((props, ref) => (
    <NephilimContext.Consumer>
      {({ screen }) => (
        <NephilimComponent
          {...props}
          ref={ref}
          screen={screen}
          platform={getPlatform()}
        />
      )}
    </NephilimContext.Consumer>
  ))
);
