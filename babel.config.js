module.exports = function (api) {
  api.cache(true);
  const presets = [
    "@babel/preset-env",
    "@babel/preset-react"
  ];
  const plugins = [
    "@babel/plugin-transform-class-properties",
    "@babel/plugin-transform-optional-chaining"
  ];
  return { presets, plugins };
};
