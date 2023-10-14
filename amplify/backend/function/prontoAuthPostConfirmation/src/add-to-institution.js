const {
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
} = require("@aws-sdk/client-cognito-identity-provider");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

const config = {
  region: process.env.AWS_REGION,
};
const dynamoDBClient = new DynamoDBClient(config);
const documentClient = new DynamoDBDocumentClient(dynamoDBClient);

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient(config);

const isInstitutionIdValid = async (institutionId) => {
  if (!institutionId)
    throw new Error("Invalid institution, please select a valid institution");
  const institutionTableName = `institution-${apiGraphQLAPIIdOutput}-${environment}`;
  const GetCommandInput = {
    TableName: institutionTableName,
    Key: institutionId,
  };
  const getCommand = new GetCommand(GetCommandInput);
  try {
    const response = await documentClient.send(command);
    console.log(response);
    return response.item && response.item.Record;
  } catch (getInstitutionError) {
    console.debug(`FAILED TO GET INSTITUTION. INFO: ${getInstitutionError}`);
  }
};

exports.handler = async (event) => {
  console.log(`ADD TO INSTITUTION EVENT: ${JSON.stringify(event)}`);
  const institutionId = event.request.ClientMetadata;
  const adminUpdateUserAttributesCommandInput = {
    UserAttributes: [{ Name: "custom:institutionId", Value: institutionId }],
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };
  try {
    const $metadata = await cognitoIdentityProviderClient.send(
      adminUpdateUserAttributesCommandInput
    );
    if ($metadata.httpStatusCode === 200) return event;
  } catch (addInstitutionIdAttributeError) {
    console.debug(
      `failed to institution on username = ${
        event.userName
      }. InstitutionId = ${institutionId}. INFO: ${JSON.stringify(
        addInstitutionIdAttributeError
      )}`
    );
    throw new Error(
      "failed to add you to an institution, please contact your admin"
    );
  }
  return event;
};
