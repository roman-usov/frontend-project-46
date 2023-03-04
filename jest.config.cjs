module.exports = {
  transform: {
    // '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/src/**/*.test.js',
  ],
  testEnvironment: 'jest-environment-node',
  coveragePathIgnorePatterns: [

  ],
  // "setupFiles": [
  //   "<rootDir>/test-setup.js"
  // ]
};
