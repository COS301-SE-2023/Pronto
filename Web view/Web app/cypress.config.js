const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    fileServerFolder: "test/e2e",
    supportFile: "test/e2e/cypress/support/e2e.{js,jsx,ts,tsx}",
    specPattern: "test/e2e/cypress/**/*.cy.{js,jsx,ts,tsx}",
    downloadsFolder: "test/e2e/cypress/downloads",
    fixturesFolder: "test/e2e/cypress/fixtures",
    screenshotsFolder: "test/e2e/cypress/screenshots",
    videosFolder: "test/e2e/cypress/videos",
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
