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
    baseUrl: "https://fix---auth.d1ckzmac0m6yvh.amplifyapp.com/",
    setupNodeEvents(on, config) {

    },
    env: {
      E2E_USERS_JSON: process.env.E2E_USERS_JSON || "", // Set the default value
    },
  },
});
