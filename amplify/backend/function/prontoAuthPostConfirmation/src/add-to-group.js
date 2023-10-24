const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
const ROLES = require("./roles");

const config = {
  region: process.env.REGION,
};

const cognitoIdentityServiceProviderClient = new CognitoIdentityProviderClient(
  config
);

/**
 * @type {import('@types/aws-lambda').PostConfirmationTriggerHandler}
 */
exports.handler = async (event) => {
  console.debug(`ADD TO GROUP EVENT ${JSON.stringify(event)}`);
  if (
    !event.request.clientMetadata.role ||
    !Object.values(ROLES).includes(event.request.clientMetadata.role)
  )
    throw new Error("Invalid User Role or Role not provided");
  if (!event.callerContext.clientId) throw new Error("Client Id not provided");
  let GroupName;

  switch (event.callerContext.clientId) {
    case process.env.COGNITO_MOBILE_CLIENT_ID:
      if (event.request.clientMetadata.role !== ROLES.Student)
        throw new Error(
          "The App is reserved for STUDENTS only!\n please signup as a student or if you are an ADMIN or LECTURER, use the web app"
        );
      GroupName = process.env.STUDENT_GROUP_NAME;
      break;
    case process.env.COGNITO_WEB_CLIENT_ID:
      if (event.request.clientMetadata.role === ROLES.Student)
        throw new Error(
          "The Web App is reserved for ADMINs or LECTURERs only, please signup as an ADMINs or LECTURERs, if you are a STUDENT the Pronto app"
        );
      GroupName =
        event.request.clientMetadata.role == ROLES.Lecture
          ? process.env.LECTURER_GROUP_NAME
          : process.env.ADMIN_GROUP_NAME;
      break;
    default:
      console.debug(
        `Unrecognised user pool app client ID=${event.callerContext.clientId}`
      );
      throw new Error(
        "Unrecognised Client. Cannot authenticate user from this app client."
      );
  }
  const addUserParams = {
    GroupName: GroupName,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };
  console.table(addUserParams);
  try {
    await cognitoIdentityServiceProviderClient.send(
      new AdminAddUserToGroupCommand(addUserParams)
    );
  } catch (adminAddUserToGroupError) {
    console.debug(
      `failed to add user to userGroupName = ${
        addUserParams.GroupName
      }. INFO: ${JSON.stringify(adminAddUserToGroupError)}`
    );
    throw new Error(`failed to add user to user group`);
  }

  return event;
};
