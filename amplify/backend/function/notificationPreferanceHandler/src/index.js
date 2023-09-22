/* Amplify Params - DO NOT EDIT
	ANALYTICS_PRONTONOTIFICATIONS_ID
	ANALYTICS_PRONTONOTIFICATIONS_REGION
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
const { PINPOINT_CONSTANTS } = require("./helpers/constants");
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
    emailAddress: event.endPoint,
  };
  const updateEndPointRequest = {
    emailEndPointRequest: event.type ? { user: user } : null,
    sesClient: sesClient,
    user: user,
    endPointType: event.type,
  };
  return await updateEndPointOperation(updateEndPointRequest);
};