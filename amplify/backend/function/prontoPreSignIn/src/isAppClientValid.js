const ROLES = require("./roles.js");
function isAppClientValid(clientId, role) {
  if (!Object.values(ROLES).includes(role))
    throw new Error("Invalid User Role");
  switch (clientId) {
    case process.env.COGNITO_WEB_CLIENT_ID:
      return ROLES.Lecture === role || ROLES.Admin === role;
    case process.env.COGNITO_MOBILE_CLIENT_ID:
      return ROLES.Student === role;
    default:
      throw new Error(`Unrecognised user pool app client ID`);
  }
}
module.exports = isAppClientValid;
