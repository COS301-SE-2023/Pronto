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
const { GRAPHQL, NOTIFICATIONS_STATUS } = require("./helpers/constants");
const { sendMessageOperation } = require("./helpers/notificationsService");

const config = {
  region: process.env.AWS_REGION,
};

const pinpointClient = new PinpointClient(config);

exports.handler = async (event) => {
  console.debug(`AnnouncementsHandler Event: BEGIN`);
  const { typeName, fieldName, identity, source, request } = event;
  const announcement = source;
  const course = announcement.course;
  const graphQlRootObjectType = typeName;
  const sourceTypeName = source["__typename"];
  const sourceOperationName = source["__operation"];
  console.debug(JSON.stringify(event));
  console.debug(`AnnouncementsHandler Event: END`);

  if (
    graphQlRootObjectType === GRAPHQL.ROOT_OBJECT &&
    fieldName === GRAPHQL.FIELDNAME &&
    sourceTypeName === GRAPHQL.ROOT_OBJECT &&
    sourceOperationName === GRAPHQL.OPERATION_TYPES.MUTATION
  ) {
    const sendMessageOperationInput = {
      announcement: announcement,
      pinpointClient,
    };
    console.debug("send announcement");
    return await sendMessageOperation(sendMessageOperationInput);
  }
  console.debug("invalid graphql object type");

  return {
    SMS: NOTIFICATIONS_STATUS.FAILED,
    EMAIL: NOTIFICATIONS_STATUS.FAILED,
    PUSH: NOTIFICATIONS_STATUS.FAILED,
    DETAILS: "NOT ALLOWED TO USE THIS OPERATION TYPE FOR SENDING ANNOUNCEMENTS",
  };
};
