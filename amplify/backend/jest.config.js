module.exports = {
  setupFiles: ["<rootDir>/test/.jest/setEnvVars.js"],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["**/src/*.js"],
  coverageDirectory: "test/coverage",
  resetMocks: false,
};
