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
const { GRAPHQL, NOTIFICATIONS_STATUS } = require("./helpers/constants");
const { sendMessageOperation } = require("./helpers/notificationsService");

const config = {
  region: process.env.AWS_REGION,
};

const pinpointClient = new PinpointClient(config);

exports.handler = async (event) => {
  console.debug(`AnnouncementsHandler Event: BEGIN`);
  const graphQlObject = event.typeName;
  const fieldName = event.fieldName;
  const announcement = event.arguments;
  const course = announcement.course;
  // const endPointId = course.notification.endPointId;
  console.debug({ graphQlObject });
  console.debug({ fieldName });
  console.debug({ announcement });
  console.table(course);
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
