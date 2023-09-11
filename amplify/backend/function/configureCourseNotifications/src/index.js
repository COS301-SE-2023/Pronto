/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const { GRAPHQL } = require("./helpers/constants");
const {
  createCourseSegmentOperation,
  updateCourseSegemntOperation,
  deleteCourseSegemntOperation,
} = require("./helpers/notificationService");
const { PinpointClient } = require("@aws-sdk/client-pinpoint");

const config = {
  region: process.env.AWS_REGION,
};

const pinpointClient = new PinpointClient(config);

exports.handler = async (event) => {
  const graphQlObject = event.typeName;
  const fieldName = event.fieldName;
  const { institutionId, coursecode, coursename, notificationsSegmentId } =
    event.arguments;
  if (graphQlObject === GRAPHQL.OBJECT_TYPES.MUTATION) {
    switch (fieldName) {
      case GRAPHQL.FIELD_TYPES.CREATE_COURSE:
        return await createCourseSegmentOperation(
          institutionId,
          coursecode,
          pinpointClient
        );

      case GRAPHQL.FIELD_TYPES.UPDATE_COURSE:
        return await updateCourseSegemntOperation(
          institutionId,
          coursecode,
          notificationsSegmentId,
          pinpointClient
        );

      case GRAPHQL.FIELD_TYPES.DELETE_COURSE:
        return await deleteCourseSegemntOperation(
          institutionId,
          coursecode,
          notificationsSegmentId,
          pinpointClient
        );

      default:
        return "UNKNOWN COURSE MUTATION TYPE";
    }
  }
  return `FUNCTION NOT MENT TO BE CALLED USING THE ${graphQlObject} OBJECT TYPE`;
};
