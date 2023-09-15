/* Amplify Params - DO NOT EDIT
	API_PRONTOGRAPHQLAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_PRONTOGRAPHQLAPI_GRAPHQLAPIIDOUTPUT
	API_PRONTOGRAPHQLAPI_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const ROLES = require("../../prontoPreSignUp/src/roles");
const {
  isLectureEmailPartOfInstitution,
  isAdminAllocated,
  isStudentEmailDomainPartOfInstitution,
} = require("../../prontoPreSignUp/src/assertInstitutionInfo");
const isAppClientValid = require("./isAppClientValid.js");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.table(event);
  if (!event.request.clientMetadata.role)
    throw new Error("User role not provided on clientMetadata");
  if (!event.callerContext.clientId)
    throw new Error("ClientId not provided on callerContext");
  if (!Object.values(ROLES).includes(event.request.clientMetadata.role))
    throw new Error("Invalid User Role");
  if (
    !isAppClientValid(
      event.callerContext.clientId,
      event.request.clientMetadata.role
    )
  )
    throw new Error(
      `Cannot authenticate user from this app client: 
      Students Should use the mobile app and Admin/Lectures should use the web app`
    );

  event.response.autoConfirmUser = false;
  try {
    if (
      await isStudentEmailDomainPartOfInstitution(
        event.request.userAttributes.email,
        event.request.clientMetadata.institutionId
      )
    )
      throw new Error("Students Should use the Pronto mobile app");
  } catch (preAuthError) {
    console.debug(preAuthError);
    throw new Error(preAuthError);
  }
  return event;
};
