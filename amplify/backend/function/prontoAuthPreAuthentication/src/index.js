/* Amplify Params - DO NOT EDIT
	API_PRONTO_GRAPHQLAPIENDPOINTOUTPUT
	API_PRONTO_GRAPHQLAPIIDOUTPUT
	API_PRONTO_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const ROLES = require("./roles.js");
const { isUserAdminOrLecturer } = require("./helpers/assertInstitutionInfo");
const isAppClientValid = require("./helpers/isAppClientValid");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event, context) => {
  console.debug(JSON.stringify(event));
  if (!event.request.userAttributes.email)
    throw new Error("Invalid or empty email address");
  if (
    !event.request.validationData.role ||
    !Object.values(ROLES).includes(event.request.validationData.role)
  )
    throw new Error("Invalid User Role or Role not provided");
  if (
    !isAppClientValid(
      event.callerContext.clientId,
      event.request.validationData.role
    )
  )
    throw new Error(
      `Cannot authenticate user from this app client: 
      Students Should use the mobile app and Admin/Lectures should use the web app`
    );
  try {
    if (
      !(await isUserAdminOrLecturer(
        event.request.userAttributes.email,
        event.request.validationData.role
      )) &&
      process.env.COGNITO_WEB_CLIENT_ID === event.callerContext.clientId
    )
      throw new Error(`Only admins/lecturer are allowed to use the web app\n
      Please Use the mobile if you are student, or sign up as a lecturer/admin
      Request for an account as an Institute admin\n
      Or contact your Institute admin if you are a lecture\n
      More details on: http://prontotimetable.co.za`);
  } catch (preAuthError) {
    console.debug(preAuthError);
    throw new Error(preAuthError);
  }
  return event;
};
