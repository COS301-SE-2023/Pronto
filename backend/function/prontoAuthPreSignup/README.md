# Info

- This cloud function perfoms additional serverside auth verification.
- It checks:
  1. If an institution has a designated admin
  2. If the lecturer email is part of the lecturer email list provided by the institution admin
  3. If a student is using the email domain prescribed by the institution
  4. If users are using the correct app client

# Trigger

- Amazon Cognito invokes this trigger on sign-up request, before the user can be created

# Event

- Amazon Cognito will pass an event to this function containing [Some Parameters](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html#cognito-user-pools-lambda-trigger-syntax-shared)

# Required PreSignUP confirmation Lambda trigger parameters

```json
{
  "userPoolId": "USERPOOLID", //userPoolId
  "userName": "USERNAME", //The current user's username.
  "callerContext": {
    "clientId": "APP_CLIENTID"
  },
  "request": {
    "clientMetadata": {
      "role": "Student", // A custom input indicating the role to differentite lecture/admin from web client
      "institutionId": "INSTITUTIONID" // A custom input for the institutionId
    },
    "userAttributes": {
      "email": "EMAIL"
    }
  },
  "response": {}
}
```

# Important Errors

Errors will be thrown from the cloud function, which will be sent to the client and can be safely displayed.
| Error Message | Description |
| ------------- | ----------- |
| `Invalid User Role` | The provided user role on `event.request.clientMetadata.role`does not match any of the expected roles |
| `Unrecognised user pool app client ID` | The provided appClientID on `event.callerContext.clientId` does not match any of the possible appClientIDs |
| `Invalid Institution Id: InstitutionId = Undefined` | institutionId is null on `event.request.clientMetadata.institutionId` |
| `Failed To retrieve...`, ``| call to graphQL API failed, consult the cloud logs for more info |
|`Lecture email list was not provided, please contact your institution admin`| email list is null on institution's table |
|`The Allowed Email Domain for students has not been set for this institution. Please contact your admin`| student email is null on institution's table |
| `Cannot authenticate user from this app client: Students Should use the mobile app and Admin/Lectures should use the web app`| appClientId does not match the provided role |
| `Institution has an admin already.`| Instution has been allocated an admin already |
|`Lecturer email is not part of the Institution.` | The provided email by the lecturer has not been registered by the institution's admin |

