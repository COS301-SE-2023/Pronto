/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	API_PRONTO_GRAPHQLAPIIDOUTPUT
	API_PRONTO_GRAPHQLAPIENDPOINTOUTPUT
	API_PRONTO_GRAPHQLAPIKEYOUTPUT
	AUTH_PRONTOAUTH_USERPOOLID
	COGNITO_WEB_CLIENT_ID
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const {
  CognitoIdentityProviderClient,
} = require("@aws-sdk/client-cognito-identity-provider");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");
const { GRAPHQL, APPLICATION_STATUS } = require("./constants");
const { signAdminUp } = require("./cognitoActions");

const config = {
  region: process.env.AWS_REGION,
};
const dynamoDBClient = new DynamoDBClient(config);
const documentClient = new DynamoDBDocumentClient(dynamoDBClient);

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient(config);

const getAdminApplicationStatus = async (applicationId) => {
  if (!applicationId)
    throw new Error("Invalid applicationId, please select a valid institution");
  const TableName = `AdminApplication-${process.env.API_PRONTO_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`;
  const GetCommandInput = {
    TableName: institutionTableName,
    Key: applicationId,
  };
  const getCommand = new GetCommand(GetCommandInput);
  try {
    const response = await documentClient.send(getCommand);
    console.log(response);
    if (response.item && response.item.applicationInfo)
      return response.item.applicationInfo.status;
  } catch (getInstitutionError) {
    console.debug(`FAILED TO GET INSTITUTION. INFO: ${getInstitutionError}`);
    throw new Error("failed to get application status");
  }
};

exports.handler = async (event) => {
  console.debug(`SuperAdminApiHandler Event: BEGIN`);
  const { typeName, fieldName, source } = event;
  const AdminApplication = source;
  const graphQlRootObjectType = typeName;
  console.debug(JSON.stringify(event));
  console.debug(`SuperAdminApiHandler Event: END`);

  if (
    graphQlRootObjectType === GRAPHQL.ROOT_OBJECT &&
    fieldName === GRAPHQL.FIELDNAME
  ) {
    console.debug("send announcement");
    return await signAdminUp(
      cognitoIdentityProviderClient,
      AdminApplication.firstname,
      AdminApplication.lastname,
      AdminApplication.email,
      AdminApplication.institutionId,
      AdminApplication.tempPassword
    );
  } else if (
    graphQlRootObjectType === GRAPHQL.ROOT_OBJECT &&
    fieldName === GRAPHQL.FIELDNAME
  )
    try {
      return await getAdminApplicationStatus(AdminApplication.institutionId);
    } catch (getAdminApplicationStatusError) {
      console.log(
        `FAILED TO GET APPLICATION STATUS. INFO ${JSON.stringify(
          getAdminApplicationStatusError
        )}`
      );
      return {
        status: APPLICATION_STATUS.GET_STATUS_FAILED,
      };
    }
};
