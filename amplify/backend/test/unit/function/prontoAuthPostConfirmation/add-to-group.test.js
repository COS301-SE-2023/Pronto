const addToGroup = require("../../../../function/prontoAuthPostConfirmation/src/add-to-group");
const adminEvent = require("../../../../function/prontoAuthPostConfirmation/src/events/admin.event.json");
const lecturerEvent = require("../../../../function/prontoAuthPostConfirmation/src/events/lecturers.event.json");
const studentsEvent = require("../../../../function/prontoAuthPostConfirmation/src/events/students.event.json");

jest.mock("@aws-sdk/client-cognito-identity-provider", () => {
  return {
    CognitoIdentityProviderClient: class {
      send() {
        return {};
      }

      promise() {
        return Promise.reject({});
      }
    },
  };
});
describe("input validation", () => {
  test(`Should throw Error('Invalid User Role or Role not provided'`, async () => {
    const requestWithNullRole = {
      callerContext: {},
      request: {
        clientMetadata: {},
      },
    };
    await expect(addToGroup.handler(requestWithNullRole)).rejects.toThrow(
      "Invalid User Role or Role not provided"
    );
  });
  test(`Should throw Error('Client Id not provided'`, async () => {
    const requestWithNullClientId = {
      request: { clientMetadata: { role: "Admin" } },
      callerContext: {},
    };
    await expect(addToGroup.handler(requestWithNullClientId)).rejects.toThrow(
      "Client Id not provided"
    );
  });
  test(`Should throw Error('Invalid User Role or Role not provided'`, async () => {
    const requestWithNullclientId = {
      callerContext: {},
      request: {
        clientMetadata: {
          role: " ",
        },
      },
    };
    await expect(addToGroup.handler(requestWithNullclientId)).rejects.toThrow(
      /^Invalid User Role or Role not provided$/
    );
  });
  test(`Should throw Error('Invalid User Role'`, async () => {
    const requestWithInvalidRole = {
      callerContext: {
        clientId: "aClientId",
      },
      request: {
        clientMetadata: {
          role: "InvalidRole",
        },
      },
    };
    await expect(addToGroup.handler(requestWithInvalidRole)).rejects.toThrow(
      /Invalid User Role or Role not provided/
    );
  });
  test(`Should throw Error('Unrecognised Client. Cannot authenticate user from this app client.'`, async () => {
    const requestWithNullclientId = {
      callerContext: {
        clientId: "UnrecognisedId",
      },
      request: {
        clientMetadata: {
          role: "Lecturer",
        },
      },
    };
    await expect(addToGroup.handler(requestWithNullclientId)).rejects.toThrow(
      /^Unrecognised Client. Cannot authenticate user from this app client.$/
    );
  });

  test("show throw: The App is reserved for STUDENTS only...", async () => {
    const studentRequestWithWrongRole = JSON.parse(
      JSON.stringify(studentsEvent)
    );
    studentRequestWithWrongRole.request.clientMetadata.role = "Lecturer";
    await expect(
      addToGroup.handler(studentRequestWithWrongRole)
    ).rejects.toThrow(/The App is reserved for STUDENTS only/);
  });
  test("show throw: The Web App is reserved for ADMINs or LECTURERs only...", async () => {
    const adminRequestWithWrongRole = JSON.parse(JSON.stringify(adminEvent));
    adminRequestWithWrongRole.request.clientMetadata.role = "Student";
    await expect(addToGroup.handler(adminRequestWithWrongRole)).rejects.toThrow(
      /The Web App is reserved for ADMINs or LECTURERs only/
    );
  });

  test("show throw: The Web App is reserved for ADMINs or LECTURERs only...", async () => {
    console.table(adminEvent);
    await expect(addToGroup.handler(adminEvent)).rejects.toThrow(
      /^failed to add user to user group$/
    );
  });
});

describe("should fail to group", () => {
  test(`should fail to student to group`, async () => {
    await expect(addToGroup.handler(studentsEvent)).rejects.toThrow(
      /^failed to add user to user group$/
    );
  });
});
