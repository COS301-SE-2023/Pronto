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
const { GRAPHQL, NOTIFICATIONS_STATUS } = require("./helpers/constants");
const { sendMessageOperations } = require("./helpers/notificationsService");

const config = {
  region: process.env.AWS_REGION,
};

const pinpointClient = new PinpointClient(config);

exports.handler = async (event) => {
  console.debug(`AnnouncementsHandler Event: ${event}`);
  const graphQlObject = event.typeName;
  const fieldName = event.fieldName;
  const announcement = event.arguments;
  const course = announcement.course;
  const endPointId = course.notifications.endPointId;

  if (graphQlObject === GRAPHQL.OBJECT_TYPES.MUTATION) {
    switch (fieldName) {
      case GRAPHQL.FIELD_TYPES.CREATE_ANNOUNCEMENT:
        const sendMessageOperationInput = {
          course: course,
          announcement: announcement,
          pinpointClient,
        };
        return await sendMessageOperations(sendMessageOperationInput);

      case GRAPHQL.FIELD_TYPES.UPDATE_ANNOUNCEMENT:
        return {
          SMS: NOTIFICATIONS_STATUS.DISABLED,
          EMAIL: NOTIFICATIONS_STATUS.DISABLED,
          PUSH: NOTIFICATIONS_STATUS.DISABLED,
        };
      case GRAPHQL.FIELD_TYPES.DELETE_ANNOUNCEMENT:
        return {
          SMS: NOTIFICATIONS_STATUS.DISABLED,
          EMAIL: NOTIFICATIONS_STATUS.DISABLED,
          PUSH: NOTIFICATIONS_STATUS.DISABLED,
        };
      default:
        return {
          SMS: NOTIFICATIONS_STATUS.FAILED,
          EMAIL: NOTIFICATIONS_STATUS.FAILED,
          PUSH: NOTIFICATIONS_STATUS.FAILED,
        };
    }
  }
  return {
    SMS: NOTIFICATIONS_STATUS.FAILED,
    EMAIL: NOTIFICATIONS_STATUS.FAILED,
    PUSH: NOTIFICATIONS_STATUS.FAILED,
  };
};
