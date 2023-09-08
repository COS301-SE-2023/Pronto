const {
  CreateCampaignCommand,
  UpdateCampaignCommand,
} = require("@aws-sdk/client-pinpoint");
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

const updatePinpointCampaignCommandInput = (institutionName, CampaignId) => {
  const campaignName = createCampaignName(institutionName);
  const updateCampaignCommandInput = {
    CampaignId: CampaignId,
    Name: campaignName,
    WriteCampaignRequest: {
      Description: `${institutionName} Notifications Campaign`,
    },
  };
  return updateCampaignCommandInput;
};

const putCampainIdOnInstitution = async (institutionId, campaignId) => {
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
      resourcesStatus: "CREATED",
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

const updateInstitudeResourceStatus = async (status) => {
  const updateInstitutionMutation = /* GraphQL */ `
    mutation updateInstitution($input: UpdateInstitutionInput) {
      updateInstitution(input: $input) {
        name
      }
    }
  `;
  const variables = {
    input: {
      resourcesStatus: status,
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
    throw new Error("API ERROR: Failed to update Institude Resource status");
  }
};

const createAndHandlePinpointCampaign = async (
  institutionName,
  institutionId,
  pinpointClient
) => {
  const campaignCommandInput =
    createPinpointCampaignCommandInput(institutionName);
  const createCampaignCommand = new CreateCampaignCommand(campaignCommandInput);
  try {
    const createCampainResponse = await pinpointClient.send(
      createCampaignCommand
    );
    console.debug(`CREATE Campain Response: ${createCampainResponse}`);
    if (createCampainResponse.id) {
      const isPutCampainIdSuccess = await putCampainIdOnInstitution(
        institutionId,
        createCampainResponse.id
      );
      if (!isPutCampainIdSuccess)
        await updateInstitudeResourceStatus("CREATION FAILED");
    }
  } catch (createInstitutionResourcesError) {
    console.debug(
      `FAILED TO CREATE INSTITUTION RESOURCES FOR INSTUTION WITH ID ${institutionId}\n
          REASON: ${createInstitutionResourcesError}
          `
    );
    try {
      await updateInstitudeResourceStatus("CREATION FAILED");
    } catch (updateInstitudeResourceStatusError) {
      console.debug(`FAILED TO UPDATE INSTITUDE RESOURCE STATUS FOR INSTUTION WITH ID ${updateRequest.institutionId}\n
            REASON: ${updateInstitudeResourceStatusError}`);
      throw new Error("FAILED TO UPDATE INSTITUDE RESOURCE STATUS, CHECK LOGS");
    }
  }
};

const UpdateInstitutionCamapaign = async (
  institutionName,
  campaignId,
  pinpointClient
) => {
  const updateCampaignCommandInput = updatePinpointCampaignCommandInput(
    institutionName,
    campaignName,
    campaignId
  );
  try {
    const updateCampaignCommand = new UpdateCampaignCommand(
      updateCampaignCommandInput
    );
    const updateCampainResponse = pinpointClient.send(updateCampaignCommand);
    console.debug(`UPDATE Campain Response: ${createCampainResponse}`);
    if (updateCampainResponse.id == campaignId) {
      await updateInstitudeResourceStatus("CREATION FAILED");
    }
  } catch (UpdateInstitutionCamapaignError) {
    console.debug(`FAILED TO UPDATE INSTITUDE RESOURCE FOR INSTUTION WITH ID ${updateRequest.institutionId}\n
            REASON: ${updateInstitudeResourceStatusError}`);
    throw new Error("FAILED TO UPDATE CAMPAIN NAME, CHECK LOGS");
  }
};

const updateInstitudeResources = async (updateRequest, pinpointClient) => {
  switch (updateRequest.UpdateOption) {
    case DATASTREAM_EVENT_NAMES.INSTITUDE_CREATED:
      console.debug("INSTITUDE CREATED");
      try {
        await createAndHandlePinpointCampaign(
          updateRequest.institutionName,
          institutionId,
          pinpointClient
        );
        return true;
      } catch (sendAndHandleCreatePinpointCampaignError) {
        console.debug(`FAILED TO SEND or HANDLE CREATE PINPOINT REQUEST
        REASON: ${sendAndHandleCreatePinpointCampaignError}`);
        return false;
      }
    case DATASTREAM_EVENT_NAMES.INSTITUDE_UPDATED:
      console.debug("INSTITUDE UPDATED");
      const newImage = updateRequest.record.dynamodb.NewImage;
      const oldImage = updateRequest.record.dynamodb.OldImage;
      const newInstutudeName = newImage["name"];
      const oldInstiudeName = oldImage["name"];
      const campainId = newImage["notificationsCampaignId"];
      if (newInstutudeName != oldInstiudeName)
        try {
          await UpdateInstitutionCamapaign(newInstutudeName, campainId);
          return true;
        } catch (UpdateInstitutionCamapaignError) {
          console.debug(`FAILED TO SEND or HANDLE UPDATE PINPOINT REQUEST
          REASON: ${UpdateInstitutionCamapaignError}`);
          return false;
        }
      break;
    case DATASTREAM_EVENT_NAMES.INSTITUDE_DELETED:
      try {
      } catch (error) {}
      break;
    default:
      throw new Error(`UNKOWN DATA STREAM EVENT`);
  }
};

module.exports = {
  createCampaignName,
  createPinpointCampaignCommandInput,
  updateInstitudeResources,
};
