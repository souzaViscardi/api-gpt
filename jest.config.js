
module.exports = {
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js'],

  testEnvironment: 'node',

  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  testTimeout: 10000
};
