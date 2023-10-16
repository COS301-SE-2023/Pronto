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
  const institutionTableName = `institution-${process.env.API_PRONTO_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`;
  const GetCommandInput = {
    TableName: institutionTableName,
    Key: institutionId,
  };
  const getCommand = new GetCommand(GetCommandInput);
  try {
    const response = await documentClient.send(getCommand);
    console.log(response);
    return (
      response.item && response.item.Record.institutionId === institutionId
    );
  } catch (getInstitutionError) {
    console.debug(`FAILED TO GET INSTITUTION. INFO: ${getInstitutionError}`);
    throw new Error(
      "failed to validate the institution you selected\n please contact your admin"
    );
  }
};

exports.handler = async (event) => {
  console.log(`ADD INSTITUTION ATTRIBUTE EVENT: ${JSON.stringify(event)}`);
  const institutionId = event.request.ClientMetadata;
  try {
    if (!isInstitutionIdValid(institutionId)) {
      const invalidInstitutionError = new Error("Invalid institution");
      throw invalidInstitutionError;
    }
    const adminUpdateUserAttributesCommandInput = {
      UserAttributes: [{ Name: "custom:institutionId", Value: institutionId }],
      UserPoolId: event.userPoolId,
      Username: event.userName,
    };
    const $metadata = await cognitoIdentityProviderClient.send(
      adminUpdateUserAttributesCommandInput
    );
    if ($metadata.httpStatusCode === 200) return event;
    else {
      const failedToAddInstitutionAttributeError = new Error(
        "failed to add you to an institution, please contact your admin"
      );
      throw failedToAddInstitutionAttributeError;
    }
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
};
