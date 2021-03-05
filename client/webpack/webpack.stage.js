const merge = require('webpack-merge');
const webpackCommonProd = require('./webpack.common.prod');
const { createDefinePlugin, getOutputPublicPath } = require('./webpack-utils');

module.exports = merge(webpackCommonProd, {
  output: {
    publicPath: getOutputPublicPath('stage')
  },
  plugins: [
    createDefinePlugin('stage')
  ]
});
