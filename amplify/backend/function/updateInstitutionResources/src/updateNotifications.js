const {
  getAndSetInstitutionDetails,
} = require("../../pronto5f713f59PreSignup/src/assertInstitutionInfo");
const { DATASTREAM_ACTIONS, CAMPAIGN_NAME_SUFFIX } = require("./constants");

/*on inst creation:
    build campaign name
    create campaign, if does not exist
    store campaigns
*/

/*on module codes update
    create module segment
    update compain
*/
const createCampaignNames = (institutionName) => {
  formattedInstitutionName = institutionName.toLowerCase().replaceAll(" ", "+");
  emailCampaignName = formattedInstitutionName + CAMPAIGN_NAME_SUFFIX.EMAIL;
  smsCampaignName = formattedInstitutionName + CAMPAIGN_NAME_SUFFIX.SMS;
  pushCampaignName =
    formattedInstitutionName + CAMPAIGN_NAME_SUFFIX.PUSH_NOTIFICATIONS;
  return {
    emailCampaignName,
    smsCampaignName,
    pushCampaignName,
  };
};

const createPinpointCampaign = async (institutionName) => {
  const campaignNames = createCampaignNames(institutionName);
  const createEmailCampaignCommandInput = {
    ApplicationId: process.env.PINPOINT_APP_ID,
    WriteCampaignRequest: {},
  };
  const createSmsCampaignCommandInput = {
    ApplicationId: process.env.PINPOINT_APP_ID,
    WriteCampaignRequest: {
      Description: `${institutionName} SMS Notifications Campaign`,
    },
  };
  const createPushCampaignCommandInput = {
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

module.exports = { createCampaignNames };
