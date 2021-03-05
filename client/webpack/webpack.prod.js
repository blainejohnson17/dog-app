const merge = require('webpack-merge');
const pickBy = require('lodash.pickby');
const webpackCommonProd = require('./webpack.common.prod');
const { createDefinePlugin, getOutputPublicPath } = require('./webpack-utils');

/**
 * A lineup of webpack plugin classes we specifically want
 * excluded from use in the production config.
 *
 * @internal
 */
const BLACKLISTED_WEBPACK_PLUGINS = [];

/**
 * A lineup of entry point names we want excluded from the
 * production bundle.
 *
 * @internal
 */
const BLACKLISTED_ENTRY_POINTS = [];

/**
 * @internal
 */
const isAllowedWebpackPlugin = plugin => {
  for (const BlacklistedPlugin of BLACKLISTED_WEBPACK_PLUGINS) {
    if (plugin instanceof BlacklistedPlugin) {
      return false;
    }
  }

  return true;
};

/**
 * @internal
 */
const isAllowedEntryPoint = (_, key) => !BLACKLISTED_ENTRY_POINTS.includes(key);

/**
 * @internal
 */
const customMerge = merge({
  customizeArray(a, b, key) {
    if (key === 'plugins') {
      return [
        ...a.filter(isAllowedWebpackPlugin),
        ...b.filter(isAllowedWebpackPlugin)
      ];
    }
  },
  customizeObject(a, b, key) {
    if (key === 'entry') {
      return {
        ...pickBy(a, isAllowedEntryPoint),
        ...pickBy(b, isAllowedEntryPoint)
      };
    }
  }
});

/**
 * Since we want to deliberately omit certain 'common' webpack
 * configuration options, we use a custom merge function.
 *
 * - The demo index page should be excluded (via the omission of its HtmlWebpackPlugin)
 * - entries in blacklists above will be omitted from the entry points
 *
 * @see webpack.common.js
 */
module.exports = customMerge(webpackCommonProd, {
  entry: {
    main: webpackCommonProd.entry.main
  },
  output: {
    publicPath: getOutputPublicPath('prod')
  },
  plugins: [
    createDefinePlugin('prod')
  ]
});
