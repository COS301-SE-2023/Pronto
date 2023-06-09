/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	API_PRONTO_GRAPHQLAPIIDOUTPUT
	API_PRONTO_GRAPHQLAPIENDPOINTOUTPUT
	API_PRONTO_GRAPHQLAPIKEYOUTPUT
	AUTH_PRONTOAUTH_USERPOOLID
	StudentsGroupName
	LecturersGroupName
	AdminGroupName
Amplify Params - DO NOT EDIT */
const ROLES = require('./roles.js');
const { isLectureEmailPartOfInstitution, isAdminAllocated } = require('./assertInstitutionInfo.js');
const isAppClientValid = require('./isAppClientValid.js');
/** 
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  if (!event.request.clientMetadata.role) throw new Error('User role not provided on ClientMetadata');
  if (!isAppClientValid(event.request.callerContext.clientId, event.request.clientMetadata.role))
    throw new Error(
      `Cannot authenticate users from this app client: Students Should use the mobile app and Admin/Lectures should use the web app`,
    );

  event.response.autoConfirmUser = false;
  try {
    switch (event.request.clientMetadata.role) {
      case ROLES.Admin:
        if (await isAdminAllocated(event.request.clientMetadata.institutionId)) {
          event.response.autoConfirmUser = false;
          throw new Error(
            `Institution has an admin already. institutionId=${event.request.clientMetadata.institutionId}`,
          );
        }
        event.response.autoConfirmUser = true;
        break;
      case ROLES.Lecture:
        const isLectureEmailPartOfInst = await isLectureEmailPartOfInstitution(
          event.request.userAttributes.email,
          event.request.clientMetadata.institutionId,
        );

        if (!isLectureEmailPartOfInst) {
          event.response.autoConfirmUser = false;
          throw new Error(
            `Lecturer email is not part of the Institution. institutionId=${event.request.clientMetadata.institutionId}`,
          );
        }
        event.response.autoConfirmUser = true;
      case ROLES.Student:
        //call api
        //get email domains for the institution
        //check student domain : match(/@domain$/)
        //event.response.autoConfirmUser = isStudentDomainPartOfInstitution();
        event.response.autoConfirmUser = false;
        break;
    }
  } catch (preAuthError) {
    console.debug(preAuthError);
    throw new Error(preAuthError);
  }
  return event;
};
