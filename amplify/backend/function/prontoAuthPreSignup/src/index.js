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
const ROLES = require("./roles.js");
const {
  isLectureEmailPartOfInstitution,
  isAdminAllocated,
  isStudentEmailDomainPartOfInstitution,
} = require("./assertInstitutionInfo.js");
const isAppClientValid = require("./isAppClientValid.js");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  console.table(event);
  if (!event.request.clientMetadata.role)
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
    switch (event.request.clientMetadata.role) {
      case ROLES.Admin:
        if (
          await isAdminAllocated(event.request.clientMetadata.institutionId)
        ) {
          throw new Error(`Institution has an admin already.`);
        }
        break;
      case ROLES.Lecture:
        const isLectureEmailPartOfInst = await isLectureEmailPartOfInstitution(
          event.request.userAttributes.email,
          event.request.clientMetadata.institutionId
        );

        if (!isLectureEmailPartOfInst) {
          throw new Error(`Lecturer email is not part of the Institution.`);
        }
        break;
      case ROLES.Student:
        if (
          !(await isStudentEmailDomainPartOfInstitution(
            event.request.userAttributes.email,
            event.request.clientMetadata.institutionId
          ))
        )
          throw new Error(
            `The provided student email does not match the selected institutions student emails format.
          Please use your institution provided email.`
          );
        break;
    }
  } catch (preAuthError) {
    console.debug(preAuthError);
    throw new Error(preAuthError);
  }
  return event;
};
