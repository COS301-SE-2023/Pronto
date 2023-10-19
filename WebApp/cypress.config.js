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
    baseUrl: "https://mobile-datastore.d2kif3nhx7o2zb.amplifyapp.com/",
    setupNodeEvents(on, config) {

    },
    env :
        {
            CYPRESS_LECTURER_PASSWORD: "October01!",
        }
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
