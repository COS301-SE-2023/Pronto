const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  GetGroupCommand,
  CreateGroupCommand,
} = require('@aws-sdk/client-cognito-identity-provider');
const ROLES = require('./roles');

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

const cognitoIdentityServiceProvider = new CognitoIdentityProviderClient(config);

/**
 * @type {import('@types/aws-lambda').PostConfirmationTriggerHandler}
 */
exports.handler = async (event) => {
  if (!event.request.callerContext.clientMetadata.role)
    throw new Error('User role not provided on clientMetadata')
  if(!event.request.callerContext.clientId)
    throw new Error('ClientId not provided on callerContext')
  let GroupName;
  console.table(event.request.callerContext.clientId);  
  console.table(process.env.AppClientIdWeb);
  console.table(process.env.AppClientId);
  console.table( process.env);
  
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
  console.table(GroupName);
  console.table(cognitoIdentityServiceProvider);
  //get user group
  //add user to user group
  try {
    await cognitoIdentityServiceProvider.send(new GetGroupCommand(groupParams));
  } catch (e) {
    console.table(e);
    throw new Error(`User Group with groupName = ${groupParams.GroupName} Does not exist`);
  }
  await cognitoIdentityServiceProvider.send(new AdminAddUserToGroupCommand(addUserParams));
  
  return event;
};
