
module.exports = {
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js'],

  testEnvironment: 'node',

  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  
  setupFilesAfterEnv: ['./jest.setup.js'],
  testTimeout: 10000
};
