const { defineConfig } = require("cypress");


module.exports = defineConfig({
  projectId: 'dvnjue',
  e2e: {
    fileServerFolder: "cypress/",
    supportFile: "./cypress/support/e2e.{js,jsx,ts,tsx}",
    specPattern: "./cypress/**/*.cy.{js,jsx,ts,tsx}",
    downloadsFolder: "./cypress/downloads",
    fixturesFolder: "./cypress/fixtures",
    screenshotsFolder: "./cypress/screenshots",
    videosFolder: "./cypress/videos",
    baseUrl: "https://testing-fixes.d23czn68v40k1e.amplifyapp.com/",
    setupNodeEvents(on, config) {

    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
