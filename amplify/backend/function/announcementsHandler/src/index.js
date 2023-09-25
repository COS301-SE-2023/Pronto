
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
  const graphQlRootObjectType = typeName;
  const sourceTypeName = source["__typename"];
  const sourceOperationName = source["__operation"];
  console.debug(JSON.stringify(event));
  console.debug(`AnnouncementsHandler Event: END`);

  if (graphQlObject === GRAPHQL.OBJECT_TYPES.MUTATION) {
    switch (fieldName) {
      case GRAPHQL.FIELD_TYPES.CREATE_ANNOUNCEMENT:
        const sendMessageOperationInput = {
          announcement: announcement,
          pinpointClient,
        };
        console.debug("send announcement");
        return await sendMessageOperation(sendMessageOperationInput);

      case GRAPHQL.FIELD_TYPES.UPDATE_ANNOUNCEMENT:
        return {
          SMS: NOTIFICATIONS_STATUS.DISABLED,
          EMAIL: NOTIFICATIONS_STATUS.DISABLED,
          PUSH: NOTIFICATIONS_STATUS.DISABLED,
        };
      case GRAPHQL.FIELD_TYPES.DELETE_ANNOUNCEMENT:
        console.debug("sedele announcement: disabled");
        return {
          SMS: NOTIFICATIONS_STATUS.DISABLED,
          EMAIL: NOTIFICATIONS_STATUS.DISABLED,
          PUSH: NOTIFICATIONS_STATUS.DISABLED,
        };
      default:
        console.debug("invalid field name");
        return {
          SMS: NOTIFICATIONS_STATUS.FAILED,
          EMAIL: NOTIFICATIONS_STATUS.FAILED,
          PUSH: NOTIFICATIONS_STATUS.FAILED,
        };
    }
  }
  console.debug("invalid graphql object type");

  return {
    SMS: NOTIFICATIONS_STATUS.FAILED,
    EMAIL: NOTIFICATIONS_STATUS.FAILED,
    PUSH: NOTIFICATIONS_STATUS.FAILED,
  };
};
