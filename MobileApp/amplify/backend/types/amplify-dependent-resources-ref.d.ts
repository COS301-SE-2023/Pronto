export type AmplifyDependentResourcesAttributes = {
  "api": {
    "pronto": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "prontoAuth": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    },
    "userPoolGroups": {
      "adminUserPoolGroupGroupRole": "string",
      "lecturerUserPoolGroupGroupRole": "string",
      "studentUserPoolGroupGroupRole": "string"
    }
  },
  "function": {
    "prontoAuthPostConfirmation": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "storage": {
    "s3prontoblobestore": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}