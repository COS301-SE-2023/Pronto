const { UpdateEndpointCommand } = require("@aws-sdk/client-pinpoint");
const { PINPOINT_CONSTANTS, SES_CONSTANTS } = require("./constants");
const { verifyEmailAddressOperation } = require("./emailService");

const getUpdateEmailEndpointCommandInput = (emailEndPointRequest) => {
  const updateEndpointCommandInput = {
    ApplicationId: process.env.ANALYTICS_PRONTONOTIFICATIONS_ID,
    EndpointId: emailEndPointRequest.user.studentId,
    EndpointRequest: {
      Address: emailEndPointRequest.user.emailAddress,
      ChannelType: PINPOINT_CONSTANTS.CHANNEL_TYPES.EMAIL,
      Demographic: {},
      EndpointStatus: PINPOINT_CONSTANTS.ENDPOINT_STATUS,
      Metrics: {},
      User: {
        UserAttributes: {},
        UserId: emailEndPointRequest.user.studentId,
      },
    },
  };
  return updateEndpointCommandInput;
};

const updateEndPointOperation = async (updateEndPointRequest) => {
  console.debug(
    `UPDATE ENDPOINT REQUEST: ${JSON.stringify(updateEndPointRequest)}`
  );
  try {
    console.debug(
      `ATTEMPTING TO UPDATE ENDPOINT FOR: ${updateEndPointRequest.user.studentId}`
    );
    switch (updateEndPointRequest.endPointType) {
      case SES_CONSTANTS.EMAIL:
        const sesClient = updateEndPointRequest.sesClient;
        const isEmailVerified = await verifyEmailAddressOperation({
          ...updateEndPointRequest.emailEndPointRequest,
          sesClient,
        });
        if (isEmailVerified) return { EMAIL: "verified" };
        return { EMAIL: "verification failed" };
      case PINPOINT_CONSTANTS.CHANNEL_TYPES.PUSH:
        const updateEndpointCommandInput = getUpdateEmailEndpointCommandInput(
          updateEndPointRequest.emailEndPointRequest
        );
        const updateEndpointCommand = new UpdateEndpointCommand(
          updateEndpointCommandInput
        );
        const pinpointClient = updateEndPointRequest.pinpointClient;
        const updateEndpointCommandOutPut = await pinpointClient.send(
          updateEndpointCommand
        );
        console.debug(
          `UPDATE ENDPOINT REPONSE: ${JSON.stringify(
            updateEndpointCommandOutPut
          )}`
        );
        const { $metadata, MessageBody } = updateEndpointCommandOutPut;
        if ($metadata.httpStatusCode === 200) return { type: "EMAIL" };
      default:
        throw new Error("UNSUPPORTED CHANNEL TYPE");
    }
  } catch (UpdateEndpointError) {
    console.debug(`FAILED TO UPDATE ENDPOINT. DETAILS: ${UpdateEndpointError}`);
    throw new Error("FAILED TO UPDATE NOTIFICATION PREFERANCE");
  }
};
module.exports = { updateEndPointOperation };
