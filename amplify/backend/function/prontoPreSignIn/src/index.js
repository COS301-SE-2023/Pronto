/* Amplify Params - DO NOT EDIT
	API_PRONTOGRAPHQLAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_PRONTOGRAPHQLAPI_GRAPHQLAPIIDOUTPUT
	API_PRONTOGRAPHQLAPI_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const ROLES = require("../../prontoPreSignUp/src/roles");
const {
  getAndSetInstitutionDetails,
} = require("./getAndSetInstitutionDetails");
const isAppClientValid = require("./isAppClientValid");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const isInstitideAdminOrLecturer = async (email, institutionId, role) => {
  if (!email || !institutionId)
    throw new Error(`Invalid institution Id or email`);
  try {
    const institutionetails = await getAndSetInstitutionDetails(institutionId);
    if (!institutionetails)
      throw new Error(`Failed To retrieve institution details`);
    switch (role) {
      case ROLES.Admin:
        if (!institutionetails.admin)
          throw new Error(`Institude does not have an admin,\n
        Please request for one on AgileArchitectsCapstone@gmail.com\n
        More info on: {path/to/pronto/web/about/institude/admin}`);
        return institutionetails.admin.email === mail;
      case ROLES.Lecture:
        if (!institutionetails.lectureremails)
          throw new Error(
            "Lecture email list was not provided, please contact your institution admin"
          );
        return institutionetails.lectureremails.includes(email);
      default:
        throw new Error("Invalid role");
    }
  } catch (getAndSetInstitutionDetailsError) {
    console.debug(`ERROR CONFIRMING ADMIN OR LECTURER PRESIGNIP INFORMATION.\n
    DETAILS: ${getAndSetInstitutionDetailsError}`);
    throw new Error("FAILED TO VALIDATE ADMIN or LECTURER USER ROLE TYPE");
  }
};

exports.handler = async (event) => {
  console.table(event);
  if (
    !event.request.clientMetadata.role ||
    !Object.values(ROLES).includes(event.request.clientMetadata.role)
  )
    throw new Error("Invalid User Role or Role not provided");
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
      !(await isInstitideAdminOrLecturer(
        event.request.userAttributes.email,
        event.request.clientMetadata.institutionId,
        event.request.clientMetadata.role
      )) &&
      process.env.COGNITO_WEB_CLIENT_ID === event.callerContext.clientId
    )
      throw new Error(`Only admins/lecturer are allowed to use the web app\n
      Please Use the mobile if you are student, or sign up as a lecturer/admin
      Request for an account as an institude admin\n
      Or contact your institude admin if you are a lecture\n
      More details on: {path/to/pronto/web/about/institude/admin}`);
  } catch (preAuthError) {
    console.debug(preAuthError);
    throw new Error(preAuthError);
  }
  return event;
};
