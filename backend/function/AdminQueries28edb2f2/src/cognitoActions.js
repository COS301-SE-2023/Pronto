/* eslint-disable */
/*
 * Copyright 2019-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

const {
  CognitoIdentityProviderClient,
  AdminConfirmSignUpCommand,
  AdminDisableUserCommand,
  AdminEnableUserCommand,
  AdminRemoveUserFromGroupCommand,
  AdminCreateUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const config = {
  region: process.env.AWS_REGION,
};

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient(config);

const userPoolId = process.env.AUTH_PRONTOAUTH_USERPOOLID;

async function removeUserFromGroup(username, groupname) {
  const params = {
    GroupName: groupname,
    UserPoolId: userPoolId,
    Username: username,
  };

  console.log(`Attempting to remove ${username} from ${groupname}`);

  try {
    await cognitoIdentityProviderClient.send(
      new AdminRemoveUserFromGroupCommand(params)
    );
    console.log(`Removed ${username} from ${groupname}`);
    return {
      message: `Removed ${username} from ${groupname}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Confirms as an admin without using a confirmation code.
async function confirmUserSignUp(username) {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  try {
    await cognitoIdentityProviderClient.send(
      new AdminConfirmSignUpCommand(params)
    );
    console.log(`Confirmed ${username} registration`);
    return {
      message: `Confirmed ${username} registration`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function disableUser(username) {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  try {
    await cognitoIdentityProviderClient.send(
      new AdminDisableUserCommand(params)
    );
    console.log(`Disabled ${username}`);
    return {
      message: `Disabled ${username}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function enableUser(username) {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  try {
    await cognitoIdentityProviderClient.send(
      new AdminEnableUserCommand(params)
    );
    console.log(`Enabled ${username}`);
    return {
      message: `Enabled ${username}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// for creating an institute admin account upon verified request
async function signAdminUp(name, email, institutionId, Password) {
  console.debug("ATTEMPTING TO CREATE ADMIN");
  console.debug({ name, email, institutionId, Password });
  const adminCreateUserCommandInput = {
    UserPoolId: process.env.AUTH_PRONTOAUTH_USERPOOLID,
    Username: email,
    UserAttributes: [
      {
        Name: "name",
        Value: name,
      },
      {
        Name: "email",
        Value: email,
      },
    ],
    ValidationData: [
      { Name: name, role: "Admin", institutionId: institutionId },
    ],
    TemporaryPassword: Password,
    ForceAliasCreation: false,
    DesiredDeliveryMediums: ["EMAIL"],
    ClientMetadata: {
      clientId: process.env.COGNITO_WEB_CLIENT_ID,
      role: "Admin",
      institutionId: institutionId,
    },
  };
  const adminCreateUserCommand = new AdminCreateUserCommand(
    adminCreateUserCommandInput
  );
  try {
    const adminCreateUserCommandOutput =
      await cognitoIdentityProviderClient.send(adminCreateUserCommand);
    console.debug(
      `AUTH SERVICE RESPONSE ${JSON.stringify(adminCreateUserCommandOutput)}`
    );
    return adminCreateUserCommandOutput;
  } catch (error) {
    console.debug(`ERROR CREATING ADMIN ACCOUNT: ${error}`);
    throw error;
  }
}

module.exports = {
  removeUserFromGroup,
  confirmUserSignUp,
  disableUser,
  enableUser,
  signAdminUp,
};
