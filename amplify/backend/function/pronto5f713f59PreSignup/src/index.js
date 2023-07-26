/**
 * @fileoverview
 *
 * This CloudFormation Trigger creates a handler which awaits the other handlers
 * specified in the `MODULES` env var, located at `./${MODULE}`.
 */

/**
 * The names of modules to load are stored as a comma-delimited string in the
 * `MODULES` env var.
 */
const moduleNames = process.env.MODULES.split(',');
/**
 * The array of imported modules.
 */
const modules = moduleNames.map((name) => require(`./${name}`));

/**
 * This async handler iterates over the given modules and awaits them.
 *
 * @see https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html#nodejs-handler-async
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 *
 */
exports.handler = async (event, context) => {
  /**
   * Instead of naively iterating over all handlers, run them concurrently with
   * `await Promise.all(...)`. This would otherwise just be determined by the
   * order of names in the `MODULES` var.
   */
  await Promise.all(modules.map((module) => module.handler(event, context)));
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
exports.handler = async (event) => {
  console.table(event);
  if (!event.request.clientMetadata.role)
    throw new Error("User role not provided on ClientMetadata");
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
          event.response.autoConfirmUser = false;
          throw new Error(`Institution has an admin already.`);
        }
        event.response.autoConfirmUser = true;
        break;
      case ROLES.Lecture:
        const isLectureEmailPartOfInst = await isLectureEmailPartOfInstitution(
          event.request.userAttributes.email,
          event.request.clientMetadata.institutionId
        );

        if (!isLectureEmailPartOfInst) {
          event.response.autoConfirmUser = false;
          throw new Error(`Lecturer email is not part of the Institution.`);
        }
        event.response.autoConfirmUser = true;
        break;
      case ROLES.Student:
        if (
          !await isStudentEmailDomainPartOfInstitution(
            event.request.userAttributes.email,
            event.request.clientMetadata.institutionId
          )
        )
          throw new Error(
            `The provided student email does not match the selected institutions student emails format.
          Please use your institution provided email.`
          );
        event.response.autoConfirmUser = true;
        break;
    }
  } catch (preAuthError) {
    console.debug(preAuthError);
    throw new Error(preAuthError);
  }
  return event;
};
