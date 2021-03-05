const merge = require('webpack-merge');
const webpackCommon = require('./webpack.common');
const { createDefinePlugin, getOutputPublicPath } = require('./webpack-utils');

module.exports = merge(webpackCommon, {
  mode: 'development',
  output: {
    publicPath: getOutputPublicPath('dev')
  },
  plugins: [
    createDefinePlugin('dev')
  ]
});
