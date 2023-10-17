const {
  handler,
} = require("../../../../function/prontoAuthPostConfirmation/src/add-institution-attribute");

jest.mock(
  "../../../../function/prontoAuthPostConfirmation/src/node_modules/@aws-sdk/client-cognito-identity-provider",
  () => {
    return {
      CognitoIdentityProviderClient: class {
        send() {
          return Promise.resolve({ $metadata: { httpStatusCode: 200 } });
        }
      },
      AdminUpdateUserAttributesCommand: class {},
    };
  }
);
describe("handler", () => {
  test("should add institution attribute", async () => {
    const event = {
      request: {
        clientMetadata: { institutionId: "validInstitutionId" },
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
        clientMetadata: { institutionId: null },
      },
      userPoolId: "yourUserPoolId",
      userName: "testUserName",
    };
    await expect(handler(event)).rejects.toThrow("Invalid institution");
  });
});
