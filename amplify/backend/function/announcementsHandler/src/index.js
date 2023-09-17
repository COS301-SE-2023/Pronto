/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	API_PRONTOGRAPHQLAPI_GRAPHQLAPIIDOUTPUT
	API_PRONTOGRAPHQLAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_PRONTOGRAPHQLAPI_GRAPHQLAPIKEYOUTPUT
	PINPOINT_APP_ID
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const { GRAPHQL } = require("./helpers/constants");

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
        return "";

      case GRAPHQL.FIELD_TYPES.UPDATE_ANNOUNCEMENT:
        return "";
      case GRAPHQL.FIELD_TYPES.DELETE_ANNOUNCEMENT:
        return "";

      default:
        return { SMS: "", EMAIL: "", PUSH: "" };
    }
  }
  return { SMS: "", EMAIL: "", PUSH: "" };
};
