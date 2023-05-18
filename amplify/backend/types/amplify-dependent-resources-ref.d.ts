export type AmplifyDependentResourcesAttributes = {
  "api": {
    "pronto": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "pronto": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    },
    "userPoolGroups": {
      "adminUserGroupGroupRole": "string",
      "lecturerUserGroupGroupRole": "string",
      "studentUserGroupGroupRole": "string"
    }
  },
  "storage": {
    "s3prontoblobestore": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}