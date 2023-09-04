const {
  getAndSetInstitutionDetails,
} = require("../../pronto5f713f59PreSignup/src/assertInstitutionInfo");
const { DATASTREAM_ACTIONS, CAMPAIN_NAME_SUFFIX } = require("./constants");

/*on inst creation:
    build campain name
    create campain, if does not exist
    store campains
*/

/*on module codes update
    create module segment
    update compain
*/
const createCampainNames = (institutionName) => {
  formattedInstitutionName = institutionName.toLowerCase().replaceAll(" ", "+");
  emailCampainName = formattedInstitutionName + CAMPAIN_NAME_SUFFIX.EMAIL;
  smsCampainName = formattedInstitutionName + CAMPAIN_NAME_SUFFIX.SMS;
  pushCampainName =
    formattedInstitutionName + CAMPAIN_NAME_SUFFIX.PUSH_NOTIFICATIONS;
  return {
    emailCampainName,
    smsCampainName,
    pushCampainName,
  };
};

const createPinpointCampain = async (institutionName) => {
  const campainNames = createCampainNames(institutionName);
  const createCampaignCommandInput = {
    ApplicationId: process.env.PINPOINT_APP_ID,
    WriteCampaignRequest: {},
  };
};

const updateNotifications = async (UpdateOption) => {
  switch (UpdateOption) {
    case DATASTREAM_ACTIONS.INSTITUDE_CREATED:
      break;
    case DATASTREAM_ACTIONS.INSTITUDE_UPDATED:
      break;
    case DATASTREAM_ACTIONS.MODULE_CODES_UPDATED:
      break;

    default:
      break;
  }
};

module.exports = { createCampainNames };
