const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackCommon = require('./webpack.common');

/**
 * @internal
 */
const FILE_SIZE_THRESHOLD = 300000;

module.exports = merge(webpackCommon, {
  mode: 'production',
  optimization: {
    minimizer: [ new UglifyJsPlugin() ]
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: FILE_SIZE_THRESHOLD,
    maxAssetSize: FILE_SIZE_THRESHOLD
  }
});
