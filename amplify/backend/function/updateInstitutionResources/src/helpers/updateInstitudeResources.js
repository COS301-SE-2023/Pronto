const {
  CreateCampaignCommand,
  UpdateCampaignCommand,
  DeleteCampaignCommand,
} = require("@aws-sdk/client-pinpoint");
const { DATASTREAM_EVENT_NAMES, CAMPAIGN_NAME_SUFFIX } = require("./constants");

const PINPOINT_APP_ID = process.env.PINPOINT_APP_ID;
const GRAPHQL_ENDPOINT = process.env.API_API_PRONTO_GRAPHQLAPIENDPOINT;
const GRAPHQL_API_KEY = process.env.API_API_PRONTO_GRAPHQLAPIKEY;

const createCampaignName = (institutionName) => {
  formattedInstitutionName = institutionName.toLowerCase().replaceAll(" ", "+");
  return formattedInstitutionName + CAMPAIGN_NAME_SUFFIX;
};

/* create campain*/
const setAndGetPinpointCampaignCommandInput = (institutionName) => {
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

const createCampainOperation = async (
  institutionName,
  institutionId,
  pinpointClient
) => {
  const campaignCommandInput =
    setAndGetPinpointCampaignCommandInput(institutionName);
  const createCampaignCommand = new CreateCampaignCommand(campaignCommandInput);
  try {
    const createCampaignCommandOutput = await pinpointClient.send(
      createCampaignCommand
    );
    console.debug(`CREATE Campain Response: ${createCampaignCommandOutput}`);
    const responseMetadata =
      createCampaignCommandOutput.ResponseMetadata.httpStatusCode;
    const statusCode = responseMetadata.httpStatusCode;
    const campaignResponse = createCampaignCommandOutput.CampaignResponse;
    if (statusCode === 200) {
      console.debug(`CAMPAIGN CREATED. CAMPAIGN ID: ${campaignResponse.id}`);
      const isPutCampainIdSuccess = await putCampainIdOnInstitution(
        institutionId,
        campaignResponse.id
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

/*update campain*/
const setAndGetPinpointUpdateCampaignCommandInput = (
  institutionName,
  CampaignId
) => {
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

const updateCamapaignOperation = async (
  institutionName,
  campaignId,
  pinpointClient
) => {
  const updateCampaignCommandInput =
    setAndGetPinpointUpdateCampaignCommandInput(
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
  } catch (updateCamapaignOperationError) {
    console.debug(`FAILED TO UPDATE INSTITUDE RESOURCE FOR INSTUTION WITH ID ${updateRequest.institutionId}\n
            REASON: ${updateInstitudeResourceStatusError}`);
    throw new Error("FAILED TO UPDATE CAMPAIN NAME, CHECK LOGS");
  }
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

/*Write Institution info to instution table */
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

/* Delete Institude campain when institude is deleted */
const setAndGetPinpointDeleteCampaignCommandInput = (campaignId) => {
  const deleteCampaignCommandInput = {
    ApplicationId: PINPOINT_APP_ID,
    CampaignId: campaignId,
  };
  return deleteCampaignCommandInput;
};

const deleteCampaignOperation = async (
  institutionId,
  campaignId,
  pinpointClient
) => {
  const deleteCampaignCommandInput =
    setAndGetPinpointDeleteCampaignCommandInput(campaignId);
  const deleteCampainCommand = new DeleteCampaignCommand(
    deleteCampaignCommandInput
  );
  try {
    const deleteCampaignCommandOutput = await pinpointClient.send(
      deleteCampainCommand
    );
    console.debug(`DELETE Campain Response: ${deleteCampaignCommandOutput}`);
    const responseMetadata =
      deleteCampaignCommandOutput.ResponseMetadata.httpStatusCode;
    const statusCode = responseMetadata.httpStatusCode;
    if (statusCode !== 200) {
      console.debug(`campaign DELETED
    institution id:${institutionId}
    campain id:${campaignId}`);
      return true;
    } else {
      console.debug(`campaign NOT DELETED, please check logs for more info`);
      return false;
    }
  } catch (deleteCampaignCommandError) {
    console.debug(
      `ERROR SENDING DELETE CAMPIAIN COMMAND:\n= INFO:  ${deleteCampaignCommandError}`
    );
    throw new Error("FAILED TO DELETE CAMPAIN, CHECK LOGS");
  }
};

/* Handle different data streams */
const updateInstitudeResources = async (updateRequest, pinpointClient) => {
  switch (updateRequest.UpdateOption) {
    case DATASTREAM_EVENT_NAMES.INSTITUDE_CREATED:
      console.debug("INSTITUDE CREATED");
      try {
        await createCampainOperation(
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
      const { newImage, oldImage } = updateRequest.record.dynamodb;
      const oldInstiudeName = oldImage["name"];
      const newInstutudeName = updateRequest.institutionName;
      const campainId = newImage["notificationsCampaignId"];
      if (newInstutudeName != oldInstiudeName)
        try {
          await updateCamapaignOperation(newInstutudeName, campainId);
          return true;
        } catch (updateCamapaignOperationError) {
          console.debug(`FAILED TO SEND or HANDLE UPDATE PINPOINT REQUEST
          REASON: ${updateCamapaignOperationError}`);
          return false;
        }
      break;
    case DATASTREAM_EVENT_NAMES.INSTITUDE_DELETED:
      console.debug("INSITUDE UPDATED");
      try {
        const isCampaignDeleted = await deleteCampaignOperation(
          institutionId,
          campainId
        );
        return isCampaignDeleted;
      } catch (deleteCampaignOperationError) {
        console.debug(`FAILED TO SEND or HANDLE DELETE PINPOINT REQUEST
          REASON: ${deleteCampaignOperationError}`);
        return false;
      }
    default:
      throw new Error(`UNKOWN DATA STREAM EVENT`);
  }
};

module.exports = {
  createCampaignName,
  setAndGetPinpointCampaignCommandInput,
  createCampainOperation,
  updateInstitudeResources,
  setAndGetPinpointUpdateCampaignCommandInput,
  updateCamapaignOperation,
  setAndGetPinpointDeleteCampaignCommandInput,
  deleteCampaignOperation,
};
