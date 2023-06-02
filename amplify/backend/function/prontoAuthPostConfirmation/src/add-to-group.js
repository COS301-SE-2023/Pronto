const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  GetGroupCommand,
  CreateGroupCommand,
} = require('@aws-sdk/client-cognito-identity-provider');

const Roles = require('./roles');
const cognitoIdentityServiceProvider = new CognitoIdentityProviderClient({});

/**
 * @type {import('@types/aws-lambda').PostConfirmationTriggerHandler}
 */
exports.handler = async (event) => {
  let GroupName;
  switch (event.callerContext.clientId) {
    case process.env.AppClientId:
      GroupName = process.env.StudentsGroupName;
      break;
    
    case process.env.AppClientIdWeb:
      // missing: check if lecturer is in institution lecturers list
      GroupName = event.clientMetadata?.role==Roles.Lecture ? process.env.LecturersGroupName : process.env.AdminGroupName;
      break;
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
