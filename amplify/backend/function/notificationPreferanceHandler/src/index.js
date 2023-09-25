
/* Amplify Params - DO NOT EDIT
	ANALYTICS_PRONTOANALYTICS_ID
	ANALYTICS_PRONTOANALYTICS_REGION
	API_PRONTO_GRAPHQLAPIENDPOINTOUTPUT
	API_PRONTO_GRAPHQLAPIIDOUTPUT
	API_PRONTO_GRAPHQLAPIKEYOUTPUT
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
  console.debug(`notificationPreferanceHandler Event: BEGIN`);
  const { typeName, fieldName, identity, source, request } = event;
  const student = source;
  const graphQlRootObjectType = typeName;
  const sourceTypeName = source["__typename"];
  const sourceOperationName = source["__operation"];
  console.debug(JSON.stringify(event));
  console.debug(`notificationPreferanceHandler Event: END`);

  const user = {
    studentId: student.id,
    endPointAddress: event.endPointAddress,
  };
  if (
    graphQlRootObjectType === GRAPHQL.ROOT_OBJECT &&
    fieldName === GRAPHQL.FIELDNAME &&
    sourceTypeName === GRAPHQL.ROOT_OBJECT &&
    sourceOperationName === GRAPHQL.OPERATION_TYPES.MUTATION
  ) {
    switch (source.endpoint.type) {
      case PINPOINT_CONSTANTS.CHANNEL_TYPES.EMAIL:
        if (!pinpointClient || !sesClient)
          throw new Error("UNDEFINED NOTIFICATION SERVICE");
        console.debug("BEGIN: UPDATE TO EMAIL PREFERANCE");

        return await updateEndPointOperation({
          user: user,
          endPointType: PINPOINT_CONSTANTS.CHANNEL_TYPES.EMAIL,
          sesClient: sesClient,
          pinpointClient: pinpointClient,
        });

      case PINPOINT_CONSTANTS.CHANNEL_TYPES.SMS:
        if (!pinpointClient) throw new Error("UNDEFINED NOTIFICATION SERVICE");
        console.debug("BEGIN: UPDATE TO SMS PREFERANCE");

        return await updateEndPointOperation({
          user: user,
          endPointType: PINPOINT_CONSTANTS.CHANNEL_TYPES.SMS,
          pinpointClient: pinpointClient,
        });

      case PINPOINT_CONSTANTS.CHANNEL_TYPES.PUSH:
        if (!pinpointClient) throw new Error("UNDEFINED NOTIFICATION SERVICE");
        console.debug("BEGIN: UPDATE TO PUSH PREFERANCE");

        return await updateEndPointOperation({
          user: user,
          pushEndPointRequest,
          endPointType: PINPOINT_CONSTANTS.CHANNEL_TYPES.PUSH,
          pinpointClient: pinpointClient,
        });

      default:
        return {
          status: NOTIFICATIONS_STATUS.FAILED,
          info: "failed to process request: unsupported notification preference type",
          type: source.endpoint.type,
          endpointID: event.endpointID,
        };
    }
  }
  return {
    status: NOTIFICATIONS_STATUS.FAILED,
    info: "operation not allowed",
    type: source.endpoint.type,
    endpointID: event.endpointID,
  };
};
