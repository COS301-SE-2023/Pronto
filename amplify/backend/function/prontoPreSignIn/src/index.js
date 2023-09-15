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
} = require("../../prontoPreSignUp/src/assertInstitutionInfo");
const isAppClientValid = require("../../prontoPreSignUp/src/isAppClientValid");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const isInstitideAdminOrLecturer = async (institutionId, mail, role) => {
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
        More details on: {path/to/pronto/web/about/institude/admin}`);
        return institutionetails.admin.email === mail;
      case ROLES.Lecture:
        if (!institutionetails.lectureremails)
          throw new Error(
            "Lecture email list was not provided, please contact your institution admin"
          );
        return institutionetails.lectureremails.includes(email);
      default:
    }
  } catch (error) {}
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
