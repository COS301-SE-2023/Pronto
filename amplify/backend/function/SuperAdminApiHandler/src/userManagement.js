const {
  AdminConfirmSignUpCommand,
  AdminDisableUserCommand,
  AdminEnableUserCommand,
  AdminRemoveUserFromGroupCommand,
  AdminCreateUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
const { APPLICATION_STATUS } = require("./constants");
const COGNITO_WEB_CLIENT_ID = process.env.COGNITO_WEB_CLIENT_ID;
const USER_POOL_ID = process.env.AUTH_PRONTOAUTH_USERPOOLID;

async function removeUserFromGroup(
  cognitoIdentityProviderClient,
  username,
  groupname
) {
  const params = {
    GroupName: groupname,
    UserPoolId: USER_POOL_ID,
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
async function confirmUserSignUp(cognitoIdentityProviderClient, username) {
  const params = {
    UserPoolId: USER_POOL_ID,
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

async function disableUser(cognitoIdentityProviderClient, username) {
  const params = {
    UserPoolId: USER_POOL_ID,
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

async function enableUser(cognitoIdentityProviderClient, username) {
  const params = {
    UserPoolId: USER_POOL_ID,
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

async function signAdminUp(
  cognitoIdentityProviderClient,
  firstname,
  lastname,
  email,
  institutionId,
  Password
) {
  console.log("ATTEMPTING TO CREATE ADMIN", {
    firstname,
    lastname,
    email,
    institutionId,
    Password,
  });
  const adminCreateUserCommandInput = {
    UserPoolId: USER_POOL_ID,
    Username: email,
    UserAttributes: [
      {
        Name: "name",
        Value: firstname,
      },
      { Name: "family_name", Value: lastname },
      {
        Name: "email",
        Value: email,
      },
    ],
    ValidationData: [
      {
        Name: "name",
        Value: firstname,
      },
      { Name: "family_name", Value: lastname },
      {
        Name: "role",
        Value: "Admin",
      },
      { Name: "institutionId", Value: institutionId },
      {
        Name: "email",
        Value: email,
      },
    ],
    TemporaryPassword: Password,
    ForceAliasCreation: false,
    DesiredDeliveryMediums: ["EMAIL"],
    ClientMetadata: {
      clientId: COGNITO_WEB_CLIENT_ID,
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
    console.log(
      `AUTH SERVICE RESPONSE ${JSON.stringify(adminCreateUserCommandOutput)}`
    );
    const { $metadata, User } = adminCreateUserCommandOutput;
    if ($metadata.httpStatusCode === 200)
      return {
        status: APPLICATION_STATUS.ACCEPTED,
        admin: {
          id: User.Username,
          institutionId: institutionId,
          firstname: firstname,
          lastname: lastname,
          email: email,
        },
      };
    return {
      status: APPLICATION_STATUS.APPROVAL_FAILED,
    };
  } catch (error) {
    console.error(`ADMIN ACCOUNT FAILED. INFO: ${error}`);
    return {
      status: APPLICATION_STATUS.APPROVAL_FAILED,
    };
  }
}

module.exports = {
  removeUserFromGroup,
  confirmUserSignUp,
  disableUser,
  enableUser,
  signAdminUp,
};
