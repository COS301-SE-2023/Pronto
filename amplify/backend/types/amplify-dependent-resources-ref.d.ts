export type AmplifyDependentResourcesAttributes = {
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
    },
    "prontoAuthPreConfirmation": {
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