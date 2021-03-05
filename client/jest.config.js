module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/test-setup/mock-svg.component.js',
    '\\.png$': '<rootDir>/test-setup/mock-png.js',
    '^react-redux$': '<rootDir>/test-setup/mock-react-redux.js'
  },
  moduleDirectories: [
    'src',
    'node_modules'
  ],
  setupFiles: [
    './test-setup/enzyme-adapter.js',
    './test-setup/globals.js'
  ],
  testPathIgnorePatterns: [
    'webpack/*'
  ],
  transformIgnorePatterns: [
    'node_modules/'
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    }
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    'src/**/*.jsx',
    '!src/index.js',
    '!src/store/index.js'
  ]
};
