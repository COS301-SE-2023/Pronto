# Info
- This cloud function adds a user to a user group post sign-up.
# Trigger
- Amazon Cognito invokes this trigger after a new user is confirmed.
# Event
- Amazon Cognito will pass an event to this function containing parameter [Some Parameters](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html#cognito-user-pools-lambda-trigger-syntax-shared)
# Required Post confirmation Lambda trigger parameters
```json
{
    "userPoolId": "USERPOOLID", //userPoolId
        "userName": "USERNAME", //The current user's username.
        "request": {
          "callerContext": {
            "clientId": "CLIENTID", // The ID of the user pool app client.
            "clientMetadata": {
              "role": "USERROLE" // A custom input indicating the role to differentite lecture/admin from web client
            }
          },
      }
}
```