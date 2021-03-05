module.exports = api => {
  api.cache(true);

  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react'
    ],
    env: {
      test: {
        plugins: [ 'dynamic-import-node' ]
      }
    },
    plugins: [
      [
        '@babel/plugin-proposal-decorators', {
          legacy: true
        }
      ],
      [
        '@babel/plugin-proposal-class-properties', {
          loose: true
        }
      ],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-async-to-generator',
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-optional-chaining'
    ]
  };
};
