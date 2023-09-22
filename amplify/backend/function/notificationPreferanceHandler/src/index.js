/* Amplify Params - DO NOT EDIT
	API_PRONTOGRAPHQLAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_PRONTOGRAPHQLAPI_GRAPHQLAPIIDOUTPUT
	API_PRONTOGRAPHQLAPI_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const { PinpointClient } = require("@aws-sdk/client-pinpoint");
const { SESClient } = require("@aws-sdk/client-ses");
const {
  PINPOINT_CONSTANTS,
  NOTIFICATIONS_STATUS,
} = require("./helpers/constants");
const { updateEndPointOperation } = require("./helpers/updateEndpoint");

const config = {
  region: process.env.AWS_REGION,
};

const pinpointClient = new PinpointClient(config);
const sesClient = new SESClient(config);

exports.handler = async (event) => {
  console.debug(
    `Notification Preferance Handler Event: ${JSON.stringify(event)}`
  );
  const user = {
    studentId: event.studentId,
    endPointAddress: event.endPoint,
  };
  switch (event.type) {
    case PINPOINT_CONSTANTS.CHANNEL_TYPES.EMAIL:
      if (!pinpointClient || !sesClient)
        throw new Error("UNDEFINED NOTIFICATION SERVICE");
      const emailEndPointRequest = {
        user: user,
        endPointType: PINPOINT_CONSTANTS.CHANNEL_TYPES.EMAIL,
        sesClient: sesClient,
        pinpointClient: pinpointClient,
      };
      return await updateEndPointOperation({
        ...emailEndPointRequest,
        endPointType: PINPOINT_CONSTANTS.CHANNEL_TYPES.PUSH,
        pinpointClient: pinpointClient,
      });

    case PINPOINT_CONSTANTS.CHANNEL_TYPES.SMS:
      if (!pinpointClient) throw new Error("UNDEFINED NOTIFICATION SERVICE");
      const smsEndPointRequest = {
        user: user,
        pinpointClient: pinpointClient,
      };
      return await updateEndPointOperation({
        ...smsEndPointRequest,
        endPointType: PINPOINT_CONSTANTS.CHANNEL_TYPES.PUSH,
        pinpointClient: pinpointClient,
      });

    case PINPOINT_CONSTANTS.CHANNEL_TYPES.PUSH:
      if (!pinpointClient) throw new Error("UNDEFINED NOTIFICATION SERVICE");
      const pushEndPointRequest = {
        user: user,
        pinpointClient: pinpointClient,
      };
      return await updateEndPointOperation({
        ...pushEndPointRequest,
        endPointType: PINPOINT_CONSTANTS.CHANNEL_TYPES.PUSH,
        pinpointClient: pinpointClient,
      });


};




