const { CreateCampaignCommand } = require("@aws-sdk/client-pinpoint");
const { DATASTREAM_ACTIONS, CAMPAIGN_NAME_SUFFIX } = require("./constants");

const PINPOINT_APP_ID = process.env.PINPOINT_APP_ID;

const createCampaignName = (institutionName) => {
  formattedInstitutionName = institutionName.toLowerCase().replaceAll(" ", "+");
  return formattedInstitutionName + CAMPAIGN_NAME_SUFFIX;
};

const createPinpointCampaignCommandInput = (institutionName) => {
  const campaignName = createCampaignName(institutionName);
  const createCampaignCommandInput = {
    ApplicationId: PINPOINT_APP_ID,
    WriteCampaignRequest: {
      Name: campaignName,
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

const putCampainIdOnInstitution = async (institutionId, campaignId) => {
  const updateInstitutionMutation = /* GraphQL */ `
    query updateInstitution($input: UpdateInstitutionInput!) {
      getInstitution(id: $input) {
        name
        adminId
        domains
        lectureremails
      }
    }
  `;
  const variables = {
    input: institution.id,
  };
  const options = {
    method: "POST",
    headers: {
      "x-api-key": GRAPHQL_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updateInstitutionMutation, variables }),
  };

  const request = new Request(GRAPHQL_ENDPOINT, options);
  let body;
  let response;

  try {
    response = await fetch(request);
  } catch (getEmailsQueryError) {}
};

const updateInstitudeResources = async (UpdateOption, pinpointClient) => {
  switch (UpdateOption) {
    case DATASTREAM_ACTIONS.INSTITUDE_CREATED:
      //CREATE campain
      //write campainID to institutionDB
      //Update notifications status on institution table -> send test email?
      const campaignCommandInput =
        createPinpointCampaignCommandInput(institutionName);
      const createCampaignCommand = new CreateCampaignCommand(
        campaignCommandInput
      );
      try {
        const createCampainResponse = await pinpointClient.send(
          createCampaignCommand
        );
      } catch (error) {}
      break;
    case DATASTREAM_ACTIONS.INSTITUDE_UPDATED:
      try {
      } catch (error) {}
      break;
    case DATASTREAM_ACTIONS.INSTITUDE_DELETED:
      try {
      } catch (error) {}
      break;
    default:
      throw new Error();
  }
};

module.exports = {
  createCampaignName,
  createPinpointCampaignCommandInput,
  updateInstitudeResources,
};
