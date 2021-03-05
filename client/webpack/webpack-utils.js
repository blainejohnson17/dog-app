const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

/**
 * A map of environments to output.publicPath values for each
 * respective webpack config. The public path controls where
 * supplementary chunks and resources loaded in by the main
 * script should be sourced from, as opposed to loading them
 * in relative to the runtime environment.
 *
 * @internal
 */
const OutputPublicPathMap = {
  dev: '',
  test: '',
  stage: '',
  prod: ''
};

/**
 * Determines whether the app is being run in dev server mode,
 * rather than being built.
 *
 * @internal
 */
const IS_DEV_SERVER_MODE = process.argv.some(arg => arg.includes('webpack-dev-server'));

/**
 * Creates and returns a DefinePlugin instance defined
 * with values loaded from an environment file.
 *
 * @see <root>/environments/*
 *
 * @param {'mock' | 'dev' | 'test' | 'stage' | 'prod'} environment
 * @returns {webpack.DefinePlugin}
 */
exports.createDefinePlugin = environment => {
  const envFilePath = path.resolve(process.cwd(), `./environments/.env.${environment}`);

  const { parsed: envConfig } = dotenv.config({
    path: envFilePath
  });

  const definitions = Object.keys(envConfig).reduce((acc, key) => {
    acc[key] = JSON.stringify(envConfig[key]);

    return acc;
  }, {});

  return new webpack.DefinePlugin(definitions);
};

/**
 * Returns an environment-dependent value for output.publicPath.
 * In dev server (local development) mode, assets can be loaded
 * relatively, so we can return an empty string.
 *
 * @param {'dev' | 'test' | 'stage' | 'prod'} environment
 * @returns {string}
 */
exports.getOutputPublicPath = environment => IS_DEV_SERVER_MODE ? '' : OutputPublicPathMap[environment];
