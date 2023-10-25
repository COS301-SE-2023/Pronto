/* Amplify Params - DO NOT EDIT
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
const { GRAPHQL, NOTIFICATIONS_STATUS } = require("./helpers/constants");
const { sendMessageOperation } = require("./helpers/notificationsService");

const config = {
  region: process.env.AWS_REGION,
};

const pinpointClient = new PinpointClient(config);

exports.handler = async (event) => {
  console.log(`AnnouncementsHandler Event: ${JSON.stringify(event)}`);
  const { typeName, fieldName, identity, source, request } = event;
  const announcement = source;
  const graphQlRootObjectType = typeName;
  const sourceTypeName = source["__typename"];
  const sourceOperationName = source["__operation"];

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
    console.log("sending announcement");
    return await sendMessageOperation(sendMessageOperationInput);
  }
  console.error("invalid graphql object type");

  return {
    SMS: NOTIFICATIONS_STATUS.FAILED,
    EMAIL: NOTIFICATIONS_STATUS.FAILED,
    PUSH: NOTIFICATIONS_STATUS.FAILED,
  };
};
