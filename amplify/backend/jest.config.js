module.exports = {
  setupFiles: ["<rootDir>/test/.jest/setEnvVars.js"],
  collectCoverage: true,
  coverageReporters: ["json", "html"],
  coverageDirectory: "<rootDir>/test/coverage",
};
