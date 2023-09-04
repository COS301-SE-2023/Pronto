const {
  getAndSetInstitutionDetails,
} = require("../../pronto5f713f59PreSignup/src/assertInstitutionInfo");
const {
  DATASTREAM_ACTIONS,
  CAMPAIGN_NAME_SUFFIX,
  SEGMENT_NAME_SUFFIX,
  PINPOINT_SEGMENT_DIMENSIONS,
} = require("./constants");

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
const createModuleSegmentName = (institutionName, moduleCode) => {
  formattedInstitutionName = institutionName.toLowerCase().replaceAll(" ", "+");
  formattedModuleCode = moduleCode.toLowerCase().replaceAll(" ", "+");
  return (
    formattedInstitutionName + ":" + formattedModuleCode + SEGMENT_NAME_SUFFIX
  );
};

const createModuleSegmentCommandInput = (institutionName, moduleCode) => {
  const moduleSegmentName = createModuleSegmentName(
    institutionName,
    moduleCode
  );
  const segmentDimensions = {
    Attributes: {
      Values: moduleCode,
      AttributeType: PINPOINT_SEGMENT_DIMENSIONS.ATTRIBUTES.ATTRIBUTE_TYPE,
    },
    Behavior: PINPOINT_SEGMENT_DIMENSIONS.BEHAVIOUR,
    Demographic: PINPOINT_SEGMENT_DIMENSIONS.DEMOGRAPHIC,
  };
  const writeSegmentRequest = {
    Name: moduleSegmentName,
    Dimensions: segmentDimensions,
  };
  const createSegmentCommandInput = {
    ApplicationId: PINPOINT_APP_ID,
    WriteSegmentRequest: writeSegmentRequest,
  };
  return createSegmentCommandInput;
};

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
    ApplicationId: PINPOINT_APP_ID,
    WriteCampaignRequest: {
      Name: campaignNames.emailCampaignName,
      Description: `${institutionName} EMAIL Notifications Campaign`,
    },
  };

  const createSmsCampaignCommandInput = {
    ApplicationId: PINPOINT_APP_ID,
    WriteCampaignRequest: {
      Name: campaignNames.smsCampaignName,
      Description: `${institutionName} SMS Notifications Campaign`,
    },
  };

  const createPushCampaignCommandInput = {
    ApplicationId: PINPOINT_APP_ID,
    WriteCampaignRequest: {
      Name: campaignNames.pushCampaignName,
      Description: `${institutionName} PUSH Notifications Campaign`,
    },
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

module.exports = {
  createCampaignNames,
  createModuleSegmentName,
  createModuleSegmentCommandInput,
};
