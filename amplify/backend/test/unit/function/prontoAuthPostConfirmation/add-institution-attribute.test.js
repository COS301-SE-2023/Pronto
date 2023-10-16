const {
  handler,
} = require("../../../../function/prontoAuthPostConfirmation/src/add-institution-attribute");

jest.mock("@aws-sdk/lib-dynamodb", () => ({
  DynamoDBDocumentClient: jest.fn().mockImplementation(() => ({
    send: jest.fn().mockResolvedValue({
      item: { Record: { institutionId: "validInstitutionId" } },
    }),
  })),
}));

jest.mock("@aws-sdk/client-cognito-identity-provider", () => ({
  CognitoIdentityProviderClient: jest.fn().mockImplementation(() => ({
    send: jest.fn().mockResolvedValue({ httpStatusCode: 200 }),
  })),
}));

describe("handler", () => {
  test("should handle adding institution attribute", async () => {
    const event = {
      request: {
        ClientMetadata: "validInstitutionId",
      },
      userPoolId: "yourUserPoolId",
      userName: "testUserName",
    };
    const result = await handler(event);
    expect(result).toEqual(event);
  });

  test("should throw an error when adding invalid institution attribute", async () => {
    const event = {
      request: {
        ClientMetadata: null,
      },
      userPoolId: "yourUserPoolId",
      userName: "testUserName",
    };
    await expect(handler(event)).rejects.toThrow("Invalid institution");
  });
});
