const {
  CreateCampaignCommand,
  UpdateCampaignCommand,
  DeleteCampaignCommand,
} = require("@aws-sdk/client-pinpoint");
const { CAMPAIGN_NAME_SUFFIX } = require("./constants");

const PINPOINT_APP_ID = process.env.PINPOINT_APP_ID;
const GRAPHQL_ENDPOINT = process.env.API_API_PRONTO_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_API_PRONTO_GRAPHQLAPIKEYOUTPUT;

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
    const responseMetadata = createCampaignCommandOutput.$metadata;
    const statusCode = responseMetadata.httpStatusCode;
    const campaignResponse = createCampaignCommandOutput.CampaignResponse;
    if (statusCode === 200) {
      console.debug(`CAMPAIGN CREATED. CAMPAIGN ID: ${campaignResponse.Id}`);
      const isPutCampainIdSuccess = await putCampainIdOnInstitution(
        institutionId,
        campaignResponse.id
      );
      if (!isPutCampainIdSuccess) {
        await updateInstitudeResourceStatus("CREATION FAILED");
        return true;
      }
    } else {
      console.debug(`CAMPAIGN NOT CREATED, please check logs for more info`);
      return false;
    }
  } catch (createInstitutionResourcesError) {
    console.debug(`ERROR SENDING CREATE CAMPAIGN COMMAND FOR INSTUTION WITH ID ${institutionId}\n
            INFO: ${createInstitutionResourcesError}`);
    try {
      await updateInstitudeResourceStatus("CREATION FAILED");
    } catch (updateInstitudeResourceStatusError) {
      console.debug(`ERROR UPDATE NOTIFICATION STATUS FOR INSTUTION WITH ID ${institutionId}\n
            INFO: ${updateInstitudeResourceStatusError}`);
      throw new Error(
        "FAILED TO UPDATE INSTITUDE NOTIFICATION STATUS, CHECK LOGS"
      );
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
  institutionId,
  campaignId,
  pinpointClient
) => {
  const updateCampaignCommandInput =
    setAndGetPinpointUpdateCampaignCommandInput(institutionName, campaignId);
  try {
    const updateCampaignCommand = new UpdateCampaignCommand(
      updateCampaignCommandInput
    );
    const updateAdmChannelCommandOutput = await pinpointClient.send(
      updateCampaignCommand
    );
    console.debug(`UPDATE Campain Response: ${updateAdmChannelCommandOutput}`);
    const responseMetadata = updateAdmChannelCommandOutput.$metadata;
    const statusCode = responseMetadata.httpStatusCode;
    if (statusCode !== 200) {
      console.debug(`campaign NOT UPDATED, please check logs for more info`);
      return false;
    } else if (statusCode === 200) {
      console.debug(`campaign UPDATED`);
      await updateInstitudeResourceStatus("UPDATE COMPLETE");
      return true;
    }
  } catch (updateCamapaignOperationError) {
    console.debug(`ERROR SENDING UPDATE CAMPAIGN COMMAND OR RESOURCE STATUS FOR INSTUTION WITH ID ${institutionId}\n
            INFO: ${updateCamapaignOperationError}`);
    throw new Error(
      "FAILED TO UPDATE INSTITUDE NOTIFICATIONS CAMPAIN OR NOTIFICATIONS CAMPAIN STATUS, CHECK LOGS"
    );
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
  try {
    const response = await fetch(request);
    const responseObject = await response.json();
    const body = responseObject.body;
    console.debug(`graphQL Resonse body: ${body}`);
    if (body.data) return !body.data.updateInstitution;
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
  try {
    const response = await fetch(request);
    const responseObject = await response.json();
    const body = responseObject.body;
    console.debug(`graphQL Resonse body: ${body}`);
    if (body.data) return !body.data.updateInstitution;
    throw new Error("API ERROR: Empty Respoonse");
  } catch (putCampainIdOnInstitutionError) {
    console.debug(putCampainIdOnInstitutionError);
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
    const responseMetadata = deleteCampaignCommandOutput.$metadata;
    const statusCode = responseMetadata.httpStatusCode;
    if (statusCode !== 200) {
      console.debug(`campaign NOT DELETED, please check logs for more info`);
      return false;
    } else if (statusCode === 200) {
      console.debug(`campaign DELETED
        institution id:${institutionId}
        campain id:${campaignId}`);
      return true;
    }
  } catch (deleteCampaignCommandError) {
    console.debug(
      `ERROR SENDING DELETE CAMPIAIN COMMAND:\n INFO:  ${deleteCampaignCommandError}`
    );
    throw new Error("FAILED TO DELETE CAMPAIN, CHECK LOGS");
  }
};

module.exports = {
  createCampaignName,
  setAndGetPinpointCampaignCommandInput,
  createCampainOperation,
  setAndGetPinpointUpdateCampaignCommandInput,
  updateCamapaignOperation,
  setAndGetPinpointDeleteCampaignCommandInput,
  deleteCampaignOperation,
};
