export type AmplifyDependentResourcesAttributes = {
  "analytics": {
    "prontoEmailNotifications": {
      "Id": "string",
      "Region": "string",
      "appName": "string"
    }
  },
  "api": {
    "AdminQueries": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "pronto": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "pronto5f713f59": {
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
  "function": {
    "AdminQueries7f7a03b0": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "pronto5f713f59PostConfirmation": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "pronto5f713f59PreSignup": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "storage": {
    "prontoBlobeStore": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}