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
  AdminAddUserToGroupCommand,
  AdminConfirmSignUpCommand,
  AdminDisableUserCommand,
  AdminEnableUserCommand,
  AdminGetUserCommand,
  AdminListGroupsForUserCommand,
  AdminRemoveUserFromGroupCommand,
  AdminUserGlobalSignOutCommand,
  ListGroupsCommand,
  ListUsersCommand,
  ListUsersInGroupCommand,
  AdminCreateUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
const { createHmac } = require("crypto");
const { CognitoIdentityServiceProvider } = require("aws-sdk");

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({});
const userPoolId = process.env.USERPOOL;

async function addUserToGroup(username, groupname) {
  const params = {
    GroupName: groupname,
    UserPoolId: userPoolId,
    Username: username,
  };

  console.log(`Attempting to add ${username} to ${groupname}`);

  try {
    await cognitoIdentityProviderClient.send(
      new AdminAddUserToGroupCommand(params)
    );
    console.log(`Success adding ${username} to ${groupname}`);
    return {
      message: `Success adding ${username} to ${groupname}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

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

async function getUser(username) {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  console.log(`Attempting to retrieve information for ${username}`);

  try {
    const result = await cognitoIdentityProviderClient.send(
      new AdminGetUserCommand(params)
    );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function listUsers(Limit, PaginationToken) {
  const params = {
    UserPoolId: userPoolId,
    ...(Limit && { Limit }),
    ...(PaginationToken && { PaginationToken }),
  };

  console.log("Attempting to list users");

  try {
    const result = await cognitoIdentityProviderClient.send(
      new ListUsersCommand(params)
    );

    // Rename to NextToken for consistency with other Cognito APIs
    result.NextToken = result.PaginationToken;
    delete result.PaginationToken;

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function listGroups(Limit, PaginationToken) {
  const params = {
    UserPoolId: userPoolId,
    ...(Limit && { Limit }),
    ...(PaginationToken && { PaginationToken }),
  };

  console.log("Attempting to list groups");

  try {
    const result = await cognitoIdentityProviderClient.send(
      new ListGroupsCommand(params)
    );

    // Rename to NextToken for consistency with other Cognito APIs
    result.NextToken = result.PaginationToken;
    delete result.PaginationToken;

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function listGroupsForUser(username, Limit, NextToken) {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
    ...(Limit && { Limit }),
    ...(NextToken && { NextToken }),
  };

  console.log(`Attempting to list groups for ${username}`);

  try {
    const result = await cognitoIdentityProviderClient.send(
      new AdminListGroupsForUserCommand(params)
    );
    /**
     * We are filtering out the results that seem to be innapropriate for client applications
     * to prevent any informaiton disclosure. Customers can modify if they have the need.
     */
    result.Groups.forEach((val) => {
      delete val.UserPoolId,
        delete val.LastModifiedDate,
        delete val.CreationDate,
        delete val.Precedence,
        delete val.RoleArn;
    });

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function listUsersInGroup(groupname, Limit, NextToken) {
  const params = {
    GroupName: groupname,
    UserPoolId: userPoolId,
    ...(Limit && { Limit }),
    ...(NextToken && { NextToken }),
  };

  console.log(`Attempting to list users in group ${groupname}`);

  try {
    const result = await cognitoIdentityProviderClient.send(
      new ListUsersInGroupCommand(params)
    );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Signs out from all devices, as an administrator.
async function signUserOut(username) {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  console.log(`Attempting to signout ${username}`);

  try {
    await cognitoIdentityProviderClient.send(
      new AdminUserGlobalSignOutCommand(params)
    );
    console.log(`Signed out ${username} from all devices`);
    return {
      message: `Signed out ${username} from all devices`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// grab all the constant variables from the user pool
const CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET;
const COGNITO_WEB_CLIENT_ID = process.env.COGNITO_WEB_CLIENT_ID;
const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID;

function signUp(username, password, attributes) {
  const cognito = new CognitoIdentityServiceProvider();

  const hasher = createHmac("sha256", CLIENT_SECRET);
  // AWS wants `"Username" + "Client Id"`
  hasher.update(`${username}${COGNITO_WEB_CLIENT_ID}`);
  const secretHash = hasher.digest("base64");

  return cognito
    .signUp({
      UserPoolId: USER_POOL_ID,
      ClientId: COGNITO_WEB_CLIENT_ID,
      UserName: username,
      Password: password,
      SecretHash: secretHash,
      UserAttributes: [
        // some attributes as an example
        { Name: "email", Value: attributes.email },
        { Name: "given_name", Value: attributes.firstName },
        { Name: "family_name", Value: attributes.lastName },
      ],
    })
    .promise();
}

// for creating an institude admin account upon verified request
const signAdminUp = async (email, institutionId, Password) => {
  const adminCreateUserCommandInput = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    UserAttributes: {
      email: email,
    },
    ValidationData: { role: "Admin", institutionId: institutionId },
    TemporaryPassword: Password,
    ForceAliasCreation: false,
    MessageAction: "RESEND",
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
    return adminCreateUserCommandOutput;
  } catch (error) {}
};

module.exports = {
  addUserToGroup,
  removeUserFromGroup,
  confirmUserSignUp,
  disableUser,
  enableUser,
  getUser,
  listUsers,
  listGroups,
  listGroupsForUser,
  listUsersInGroup,
  signUserOut,
  signAdminUp,
};
