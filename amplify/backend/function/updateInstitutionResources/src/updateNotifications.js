const {
  getAndSetInstitutionDetails,
} = require("../../pronto5f713f59PreSignup/src/assertInstitutionInfo");
const { DATASTREAM_ACTIONS, CAMPAIGN_NAME_SUFFIX } = require("./constants");

const PINPOINT_APP_ID = process.env.PINPOINT_APP_ID;

/*on inst creation:
    build campaign name
    create campaign, if does not exist
    store campaigns
*/

/*on module codes update
    create module segment
    update compain
*/

const createCampaignName = (institutionName) => {
  formattedInstitutionName = institutionName.toLowerCase().replaceAll(" ", "+");
  return formattedInstitutionName + CAMPAIGN_NAME_SUFFIX;
};

const createPinpointCampaignCommandInput = async (institutionName) => {
  const campaignNames = createCampaignName(institutionName);
  const createCampaignCommandInput = {
    ApplicationId: PINPOINT_APP_ID,
    WriteCampaignRequest: {
      Name: campaignNames.emailCampaignName,
      Description: `${institutionName} Notifications Campaign`,
      Schedule: {
        StartTime: "IMMEDIATE",
      },
      TemplateConfiguration: {
        EmailTemplate: { Name: process.env.EMAIL_TEMPLATE_NAME },
        PushTemplate: { Name: process.env.PUSH_TEMPLATE_NAME },
        SMSTemplate: { Name: process.env.SMS_TEMPLATE_NAME },
      },
    },
  };
  return createCampaignCommandInput;
};

const updateOptionsHandler = async (UpdateOption) => {
  switch (UpdateOption) {
    case DATASTREAM_ACTIONS.INSTITUDE_CREATED:
      //CREATE campain
      //write campainID to institutionDB
      //Update notifications status on institution table -> send test email?
      break;
    default:
      break;
  }
};

module.exports = {
  createCampaignNames: createCampaignName,
  createPinpointCampaignCommandInput,
  updateOptionsHandler,
};
