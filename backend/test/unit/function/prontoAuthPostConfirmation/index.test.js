const studentsEvent = require("../../../../function/prontoAuthPostConfirmation/src/events/students.event.json");
const moduleIterator = require("../../../../function/prontoAuthPostConfirmation/src/index");
const addToGroup = require("../../../../function/prontoAuthPostConfirmation/src/add-to-group");

jest.mock(
  "../../../../function/prontoAuthPostConfirmation/src/node_modules/@aws-sdk/client-cognito-identity-provider",
  () => {
    return {
      CognitoIdentityProviderClient: class {
        send() {
          return Promise.resolve({ $metadata: { httpStatusCode: 200 } });
        }

        promise() {
          return Promise.reject({});
        }
      },
      AdminAddUserToGroupCommand: class {},
      AdminUpdateUserAttributesCommand: class {},
    };
  }
);
describe("testing module iterator", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test("should throw Invalid institution", async () => {
    const invalidStudentEvent = JSON.parse(JSON.stringify(studentsEvent));
    invalidStudentEvent.request.clientMetadata.institutionId = null;
    await expect(moduleIterator.handler(invalidStudentEvent)).rejects.toThrow(
      /^Invalid institution$/
    );
  });
  test("should return the event", async () => {
    const mockmoduleIterator = require("../../../../function/prontoAuthPostConfirmation/src/index");
    expect(await mockmoduleIterator.handler(studentsEvent)).toMatchObject(
      studentsEvent
    );
  });
});
