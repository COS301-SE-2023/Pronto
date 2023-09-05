module.exports = {
  setupFiles: ["<rootDir>/test/.jest/setEnvVars.js"],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["**backend/**/src/*.js"],
  coverageDirectory: "test/coverage",
  resetMocks: false,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
