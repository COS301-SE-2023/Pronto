const exclusionList = require("metro-config/src/defaults/exclusionList");

module.exports = {
  resolver: {
    blacklistRE: exclusionList([/amplify\/#current-cloud-backend\/.*/]),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
