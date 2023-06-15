const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  GetGroupCommand,
  CreateGroupCommand,
} = require('@aws-sdk/client-cognito-identity-provider');
const ROLES = require('./roles');

const cognitoIdentityServiceProvider = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

/**
 * @type {import('@types/aws-lambda').PostConfirmationTriggerHandler}
 */
exports.handler = async (event) => {
  if (!event.request.callerContext.clientMetadata.role)
    throw new Error('User role not provided on clientMetadata')
  if(!event.request.callerContext.clientId)
    throw new Error('ClientId not provided on callerContext')
  let GroupName;
  console.debug(event.request.callerContext.clientId);  
  console.debug(process.env.AppClientIdWeb);
  console.debug(process.env.AppClientId);
  console.debug('process.env', process.env);
  
  switch (event.request.callerContext.clientId) {
    case process.env.AppClientId:
      GroupName = process.env.StudentsGroupName;
      break;
    case process.env.AppClientIdWeb:
      GroupName = event.request.callerContext.clientMetadata.role==ROLES.Lecture ? process.env.LecturersGroupName : process.env.AdminGroupName;
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
  console.debug('GroupName', GroupName);
  console.debug(cognitoIdentityServiceProvider);
  //get user group
  //add user to user group
    //else create and add user to group
  try {
    await cognitoIdentityServiceProvider.send(new GetGroupCommand(groupParams));
  } catch (e) {
    await cognitoIdentityServiceProvider.send(new CreateGroupCommand(groupParams));
  }
  await cognitoIdentityServiceProvider.send(new AdminAddUserToGroupCommand(addUserParams));
  event.response.groupParams = groupParams;
  return event;
};
