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
  const emailSegmentGroupDimensions = {
    Attributes: {
      Values: [moduleCode],
      AttributeType: PINPOINT_SEGMENT_DIMENSIONS.ATTRIBUTES.ATTRIBUTE_TYPE,
    },
    Behavior: PINPOINT_SEGMENT_DIMENSIONS.BEHAVIOUR,
    Demographic: PINPOINT_SEGMENT_DIMENSIONS.EMAIL_DEMOGRAPHIC,
  };
  const smsSegmentGroupDimensions = {
    Attributes: {
      Values: [moduleCode],
      AttributeType: PINPOINT_SEGMENT_DIMENSIONS.ATTRIBUTES.ATTRIBUTE_TYPE,
    },
    Behavior: PINPOINT_SEGMENT_DIMENSIONS.BEHAVIOUR,
    Demographic: PINPOINT_SEGMENT_DIMENSIONS.SMS_DEMOGRAPHIC,
  };
  const pushSegmentGroupDimensions = {
    Attributes: {
      Values: [moduleCode],
      AttributeType: PINPOINT_SEGMENT_DIMENSIONS.ATTRIBUTES.ATTRIBUTE_TYPE,
    },
    Behavior: PINPOINT_SEGMENT_DIMENSIONS.BEHAVIOUR,
    Demographic: PINPOINT_SEGMENT_DIMENSIONS.PUSH_DEMOGRAPHIC,
  };
  const studentsSegmentGroup = {
    Dimensions: [
      emailSegmentGroupDimensions,
      smsSegmentGroupDimensions,
      pushSegmentGroupDimensions,
    ],
    Type: PINPOINT_SEGMENT_DIMENSIONS.SEGMENT_GROUPS.STUDENT_GROUP.TYPE,
  };
  const writeSegmentRequest = {
    Name: moduleSegmentName,
    SegmentGroups: {
      Groups: [studentsSegmentGroup],
      Include: PINPOINT_SEGMENT_DIMENSIONS.SEGMENT_GROUPS.INCLUDE,
    },
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
      break;
    case DATASTREAM_ACTIONS.INSTITUDE_UPDATED:
      break;
    case DATASTREAM_ACTIONS.MODULE_CODES_UPDATED:
      //create segments, return segmentID
      //use segmentID to create campain
      //store segmentIDs and campainID on institutionDB
      break;
    default:
      break;
  }
};

module.exports = {
  createModuleSegmentName,
  createModuleSegmentCommandInput,
  createCampaignNames,
  createPinpointCampaignCommandInput,
};
