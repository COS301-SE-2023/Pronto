const { CreateCampaignCommand } = require("@aws-sdk/client-pinpoint");
const { DATASTREAM_EVENT_NAMES, CAMPAIGN_NAME_SUFFIX } = require("./constants");

const PINPOINT_APP_ID = process.env.PINPOINT_APP_ID;
const GRAPHQL_ENDPOINT = process.env.API_API_PRONTO_GRAPHQLAPIENDPOINT;
const GRAPHQL_API_KEY = process.env.API_API_PRONTO_GRAPHQLAPIKEY;

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
  const UpdateInstitutionInput = {};
  const updateInstitutionMutation = /* GraphQL */ `
    mutation updateInstitution($input: UpdateInstitutionInput) {
      updateInstitution(input: $input) {
        name
      }
    }
  `;
  const variables = {
    input: {
      id: institutionId,
      notificationsCampaignId: campaignId,
    },
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
    body = await response.json();
    console.debug(`graphQL Resonse: ${body}`);
    if (body.data) return true;
    throw new Error("API ERROR: Empty Respoonse");
  } catch (putCampainIdOnInstitutionError) {
    console.debug(putCampainIdOnInstitution);
    throw new Error("API ERROR: Failed to put campainId on Institude Table");
  }
};

const updateInstitudeResources = async (updateRequest, pinpointClient) => {
  switch (updateRequest.UpdateOption) {
    case DATASTREAM_EVENT_NAMES.INSTITUDE_CREATED:
      //CREATE campain
      const campaignCommandInput =
        createPinpointCampaignCommandInput(institutionName);
      const createCampaignCommand = new CreateCampaignCommand(
        campaignCommandInput
      );
      try {
        const createCampainResponse = await pinpointClient.send(
          createCampaignCommand
        );
        //write campainID to institutionDB
        //Update notifications status on institution table -> send test email?
      } catch (error) {}
      break;
    case DATASTREAM_EVENT_NAMES.INSTITUDE_UPDATED:
      try {
      } catch (error) {}
      break;
    case DATASTREAM_EVENT_NAMES.INSTITUDE_DELETED:
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
