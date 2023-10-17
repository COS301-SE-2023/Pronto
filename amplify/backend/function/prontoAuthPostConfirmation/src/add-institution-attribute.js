const {
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
} = require("@aws-sdk/client-cognito-identity-provider");

const config = {
  region: process.env.REGION,
};

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient(config);

exports.handler = async (event) => {
  console.log(`ADD INSTITUTION ATTRIBUTE EVENT: ${JSON.stringify(event)}`);

  const institutionId = event.request.clientMetadata.institutionId;

  try {
    const adminUpdateUserAttributesCommandInput = {
      UserAttributes: [
        {
          Name: "custom:inst-id",
          Value: institutionId,
        },
      ],
      UserPoolId: event.userPoolId,
      Username: event.userName,
    };
    const adminUpdateUserAttributesCommand =
      new AdminUpdateUserAttributesCommand(
        adminUpdateUserAttributesCommandInput
      );
    const adminUpdateUserAttributesCommandOutput =
      await cognitoIdentityProviderClient.send(
        adminUpdateUserAttributesCommand
      );
    const { $metadata } = adminUpdateUserAttributesCommandOutput;
    if ($metadata.httpStatusCode === 200) return event;
    else {
      throw new Error("failed to update user attribute using admin api");
    }
  } catch (addInstitutionIdAttributeError) {
    console.debug(
      `failed add to InstitutionId = ${institutionId}. To username = ${
        event.userName
      }\n INFO: ${JSON.stringify(addInstitutionIdAttributeError)}`
    );
    throw new Error("failed to add you to an institution, go back and login");
  }
};
