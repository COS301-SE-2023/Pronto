const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  GetGroupCommand,
  CreateGroupCommand,
} = require('@aws-sdk/client-cognito-identity-provider');
const ROLES = require('./roles');

const config = {
  region: process.env.AWS_REGION,
};

const cognitoIdentityServiceProviderClient = new CognitoIdentityProviderClient(config);

console.table(config);
console.table(cognitoIdentityServiceProviderClient);
/**
 * @type {import('@types/aws-lambda').PostConfirmationTriggerHandler}
 */
exports.handler = async (event) => {
  if (!event.request.clientMetadata.role) throw new Error('User role not provided on clientMetadata');
  if (!event.request.callerContext.clientId) throw new Error('ClientId not provided on callerContext');
  if (!(event.request.clientMetadata.role in ROLES)) throw new Error('Invalid User Role');
  let GroupName;
  console.table(event.request);
  console.table(process.env);
  console.table(ROLES);

  switch (event.request.callerContext.clientId) {
    case process.env.AppClientId:
      GroupName = process.env.StudentsGroupName;
      break;
    case process.env.AppClientIdWeb:
      GroupName =
        event.request.clientMetadata.role == ROLES.Lecture
          ? process.env.LecturersGroupName
          : process.env.AdminGroupName;
      break;
    default:
      throw new Error(`Unrecognised user pool app client ID=${event.request.callerContext.clientId}`);
  }

  if (!event.request.clientMetadata.role) throw new Error('User role not provided on clientMetadata');
  if (!event.request.callerContext.clientId) throw new Error('ClientId not provided on callerContext');
  if (!(event.request.clientMetadata.role in ROLES)) throw new Error('Invalid User Role');
  let GroupName;
  console.table(event.request);
  console.table(process.env);
  console.table(ROLES);

  switch (event.request.callerContext.clientId) {
    case process.env.AppClientId:
      GroupName = process.env.StudentsGroupName;
      break;
    case process.env.AppClientIdWeb:
      GroupName =
        event.request.clientMetadata.role == ROLES.Lecture
          ? process.env.LecturersGroupName
          : process.env.AdminGroupName;
      break;
    default:
      throw new Error(`Unrecognised user pool app client ID=${event.request.callerContext.clientId}`);
  }

  const groupParams = {
    GroupName: GroupName,
    GroupName: GroupName,
    UserPoolId: event.userPoolId,
  };
  const addUserParams = {
    GroupName: GroupName,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };
  console.table(groupParams);
  console.table(addUserParams);
  try {
    await cognitoIdentityServiceProviderClient.send(new GetGroupCommand(groupParams));
  } catch (getGroupError) {
    console.table(getGroupError);
    throw new Error(`Failed to get User Group with userGroupName = ${groupParams.GroupName}`);
  }
  return event;
};
