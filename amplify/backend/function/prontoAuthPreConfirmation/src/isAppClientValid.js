const ROLES = require('./roles.js');
function isAppClientValid(clientId,role){
    if (!(role in ROLES)) throw new Error('Invalid User Role');
    switch (clientId) {
        case process.env.AppClientIdWeb:
            return ROLES.Lecture == role || ROLES.Admin == role;
        case process.env.AppClientId:
            return ROLES.Student == role;
        default:
            throw new Error(`Unrecognised user pool app client ID=${clientId}`);
    }
}
module.exports = isAppClientValid;