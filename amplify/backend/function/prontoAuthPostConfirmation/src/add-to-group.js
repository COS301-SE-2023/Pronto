const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  GetGroupCommand,
  CreateGroupCommand,
} = require('@aws-sdk/client-cognito-identity-provider');
const ROLES = require('./roles');

const cognitoIdentityServiceProvider = new CognitoIdentityProviderClient({});

/**
 * @type {import('@types/aws-lambda').PostConfirmationTriggerHandler}
 */
exports.handler = async (event) => {
  if (!event.request.clientMetadata.role)
    throw new Error('User role not provided on ClientMetadata')
  let GroupName;
  switch (event.request.callerContext.clientId) {
    case process.env.AppClientId:
      GroupName = process.env.StudentsGroupName;
      break;
    case process.env.AppClientIdWeb:
      GroupName = event.request.clientMetadata.role==ROLES.Lecture ? process.env.LecturersGroupName : process.env.AdminGroupName;
      break;
    default: 
      throw new Error(`Unrecognised user pool app client ID=${event.request.callerContext.clientId}`);
  }
  const groupParams = {
    GroupName: GroupName,
    UserPoolId: event.userPoolId,
  };
  const addUserParams = {
    GroupName: GroupName,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };
  console.debug(GroupName);
  //add user to user group
  try {
    await cognitoIdentityServiceProvider.send(new GetGroupCommand(groupParams));
  } catch (e) {
    await cognitoIdentityServiceProvider.send(new CreateGroupCommand(groupParams));
  }
  await cognitoIdentityServiceProvider.send(new AdminAddUserToGroupCommand(addUserParams));

  return event;
};
