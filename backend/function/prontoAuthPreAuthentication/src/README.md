# Info

- This cloud function validates authentication requests in order to enforce client usage according to user role
- It confirms whether or not the user is a admin/lecturer by checking their email on the user's table, and client ID

# Trigger

- Amazon Cognito invokes this trigger before an sign up request is processed

# Event

```json
{
  "version": "VERSION NO",
  "region": "IDENTITIY POOL REGION",
  "userPoolId": "USER POOL ID",
  "userName": "USERNAME",
  "callerContext": {
    "clientId": "WEB/MOBILE CLIENT ID"
  },
  "triggerSource": "PreAuthentication_Authentication",
  "request": {
    "userAttributes": {
      "name": "NAMEn",
      "family_name": "FAMILY NAME",
      "email": "EMAIL@DOMAIN.COM"
    },
    "clientMetadata": null,
    "validationData": {
      "role": "USER ROLE",
      "institutionId": "INSTITUTIONID"
    }
  }
}
```
