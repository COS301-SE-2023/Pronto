import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_OZ7d8w67I",
  ClientId: "3uqlt9r8vsml0g02noh7v87dno",
};

export default new CognitoUserPool(poolData);
