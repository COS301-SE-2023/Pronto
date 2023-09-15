const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    fileServerFolder: "testing/e2e",
    supportFile: "testing/e2e/cypress/support/e2e.{js,jsx,ts,tsx}",
    specPattern: "testing/e2e/cypress/**/*.cy.{js,jsx,ts,tsx}",
    downloadsFolder: "testing/e2e/cypress/downloads",
    fixturesFolder: "testing/e2e/cypress/fixtures",
    screenshotsFolder: "testing/e2e/cypress/screenshots",
    videosFolder: "testing/e2e/cypress/videos",
    baseUrl: "https://prontocapstone.netlify.app",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
