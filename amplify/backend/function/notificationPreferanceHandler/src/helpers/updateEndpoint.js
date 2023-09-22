const { UpdateEndpointCommand } = require("@aws-sdk/client-pinpoint");
const {
  PINPOINT_CONSTANTS,
  SES_CONSTANTS,
  NOTIFICATIONS_STATUS,
} = require("./constants");
const {
  verifyEmailAddressOperation,
  getUpdateEmailEndpointCommandInput,
} = require("./emailService");
const { getUpdateSmsEndpointCommandInput } = require("./smsService");

const getEndPointUpdatedResponseMessage = (type) => {
  const messagePrefix = "Your notification preferance has been updated";
  let infoMessage = "";
  switch (type) {
    case PINPOINT_CONSTANTS.CHANNEL_TYPES.SMS:
      infoMessage = messagePrefix + "to SMS";
      break;
    case PINPOINT_CONSTANTS.CHANNEL_TYPES.EMAIL:
      infoMessage = messagePrefix + "to EMAIL";
    case PINPOINT_CONSTANTS.CHANNEL_TYPES.PUSH:
      infoMessage = "unsupported notification type";
    default:
      infoMessage = "unsupported notification type";
      break;
  }
  return infoMessage;
};

const getUpdateEndPointResponse = (status, type, endpointID) => {
  let infoMessage = "";
  switch (status) {
    case NOTIFICATIONS_STATUS.UPDATED:
      infoMessage = getEndPointUpdatedResponseMessage(type);
    case NOTIFICATIONS_STATUS.FAILED:
      infoMessage =
        "failed to configure notication preferance, please retry or contact your institude admin";
    case NOTIFICATIONS_STATUS.DISABLED:
      infoMessage = "unsupported notification preference type";
    default:
      infoMessage = "invalid status";
  }
  return {
    status: status,
    info: infoMessage,
    type: type,
    endpointID: endpointID,
  };
};

const updateEndPointOperation = async (updateEndPointRequest) => {
  console.debug(
    `UPDATE ENDPOINT REQUEST: ${JSON.stringify(updateEndPointRequest)}`
  );
  const { user, pinpointClient } = updateEndPointRequest;
  try {
    console.debug(
      `ATTEMPTING TO UPDATE ENDPOINT FOR: ${updateEndPointRequest.user.studentId}`
    );
    const { user, pinpointClient } = updateEndPointRequest;
    if (!user)
      throw new Error(
        "missing user attributes, please provide email/phone number and studentId"
      );
    if (!pinpointClient)
      throw new Error("server error: unable to process update email request");
    switch (updateEndPointRequest.endPointType) {
      case PINPOINT_CONSTANTS.CHANNEL_TYPES.EMAIL:
        const sesClient = updateEndPointRequest.emailEndPointRequest.sesClient;
        if (!sesClient)
          throw new Error(
            "server error: unable to process update email request"
          );
        const isEmailVerified = await verifyEmailAddressOperation({
          ...updateEndPointRequest.emailEndPointRequest,
        });
        if (!isEmailVerified) {
          const additionalDetails = ", email verification failed";
          const verificationFailedResponse = getUpdateEndPointResponse(
            NOTIFICATIONS_STATUS.FAILED,
            SES_CONSTANTS.EMAIL,
            updateEndPointRequest.emailEndPointRequest.user.studentId
          );
          verificationFailedResponse.info =
            verificationFailedResponse.info + additionalDetails;
          return verificationFailedResponse;
        }
        const updateEmailEndpointCommandInput =
          getUpdateEmailEndpointCommandInput(
            updateEndPointRequest.emailEndPointRequest
          );
        const updateEmailEndpointCommand = new UpdateEndpointCommand(
          updateEmailEndpointCommandInput
        );
        const updateEmailEndpointCommandOutPut = await pinpointClient.send(
          updateEmailEndpointCommand
        );
        console.debug(
          `UPDATE EMAIL ENDPOINT REPONSE: ${JSON.stringify(
            updateEmailEndpointCommandOutPut
          )}`
        );
        const { $metadata } = updateEmailEndpointCommandOutPut;

        if ($metadata.httpStatusCode !== 202) {
          return getUpdateEndPointResponse(
            NOTIFICATIONS_STATUS.FAILED,
            PINPOINT_CONSTANTS.CHANNEL_TYPES.EMAIL,
            updateEndPointRequest.emailEndPointRequest.user.studentId
          );
        }
        return getUpdateEndPointResponse(
          NOTIFICATIONS_STATUS.UPDATED,
          PINPOINT_CONSTANTS.CHANNEL_TYPES.EMAIL,
          updateEndPointRequest.emailEndPointRequest.user.studentId
        );

      case PINPOINT_CONSTANTS.CHANNEL_TYPES.SMS:
        const updateSmsEndpointCommand = new UpdateEndpointCommand(
          getUpdateSmsEndpointCommandInput(
            updateEndPointRequest.smsEndPointRequest
          )
        );
        const updateSmsEndpointCommandOutPut = await pinpointClient.send(
          updateSmsEndpointCommand
        );
        console.debug(
          `UPDATE SMS ENDPOINT REPONSE: ${JSON.stringify(
            updateSmsEndpointCommandOutPut
          `UPDATE SMS ENDPOINT REPONSE: ${JSON.stringify(
            updateSmsEndpointCommandOutPut
          )}`
        );
        if ($metadata.httpStatusCode !== 202)
          return getUpdateEndPointResponse(
            NOTIFICATIONS_STATUS.FAILED,
            PINPOINT_CONSTANTS.CHANNEL_TYPES.SMS,
            updateEndPointRequest.emailEndPointRequest.user.studentId
          );
        return getUpdateEndPointResponse(
          NOTIFICATIONS_STATUS.UPDATED,
          PINPOINT_CONSTANTS.CHANNEL_TYPES.SMS,
          updateEndPointRequest.emailEndPointRequest.user.studentId
        );
      case PINPOINT_CONSTANTS.CHANNEL_TYPES.PUSH:
      //To be implemented once Apple dev account is available/obtained
      default:
        return getUpdateEndPointResponse(
          NOTIFICATIONS_STATUS.UPDATED,
          PINPOINT_CONSTANTS.CHANNEL_TYPES.PUSH,
          updateEndPointRequest.emailEndPointRequest.user.studentId
        );
    }
  } catch (UpdateEndpointError) {
    console.debug(`FAILED TO UPDATE ENDPOINT. DETAILS: ${UpdateEndpointError}`);
    return {
      status: NOTIFICATIONS_STATUS.FAILED,
      info: UpdateEndpointError.message,
      type: updateEndPointRequest.endPointType,
      endpointID: updateEndPointRequest.emailEndPointRequest.user.studentId,
    };
  }
};
module.exports = { updateEndPointOperation };
