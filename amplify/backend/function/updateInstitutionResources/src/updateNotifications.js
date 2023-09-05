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

const createPinpointCampaignCommandInput = async (
  institutionName,
  SegmentId
) => {
  const campaignNames = createCampaignNames(institutionName);
  const createCampaignCommandInput = {
    ApplicationId: PINPOINT_APP_ID,
    WriteCampaignRequest: {
      Name: campaignNames.emailCampaignName,
      SegmentId: SegmentId,
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

const updateNotifications = async (UpdateOption) => {
  switch (UpdateOption) {
    case DATASTREAM_ACTIONS.INSTITUDE_CREATED:
      //CREATE campain
      //READ segmentIDs and campainID WRITE to institutionDB
      //Update notifications status on institution table -> send test email?
      break;
    case DATASTREAM_ACTIONS.INSTITUDE_UPDATED:
      break;
    case DATASTREAM_ACTIONS.MODULE_CODES_UPDATED:
      //get SegmentID
      //create lecturer segement group for module
      //UPDATE with student segement groups for module
      //WRITE segmentIDs WRITE to institutionDB, on COURSETABLE
      //Update notifications status on course table
      break;

    default:
      break;
  }
};

module.exports = {
  createCampaignNames,
  createPinpointCampaignCommandInput,
};
