const addToGroup = require("../../../../function/prontoAuthPostConfirmation/src/add-to-group");
const adminEvent = require("../../../../function/prontoAuthPostConfirmation/src/events/admin.event.json");
const lecturerEvent = require("../../../../function/prontoAuthPostConfirmation/src/events/lecturers.event.json");
const studentsEvent = require("../../../../function/prontoAuthPostConfirmation/src/events/students.event.json");
const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  GetGroupCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

jest.mock("@aws-sdk/client-cognito-identity-provider", () => {
  return {
    CognitoIdentityProviderClient: class {
      send() {
        return Promise.resolve({});
      }
      promise() {
        return Promise.resolve({});
      }
    },
    GetGroupCommand: class {},
    AdminAddUserToGroupCommand: class {},
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
});

describe("add to group", () => {
  test(`Should add admin to group`, async () => {
    expect(await addToGroup.handler(adminEvent)).toMatchObject(adminEvent);
  });

  test(`Should add student to group`, async () => {
    expect(await addToGroup.handler(studentsEvent)).toMatchObject(
      studentsEvent
    );
  });
  test(`Should add lecturer to group`, async () => {
    expect(await addToGroup.handler(lecturerEvent)).toMatchObject(
      lecturerEvent
    );
  });
  test(`Should add lecturer to group`, async () => {
    expect(await addToGroup.handler(lecturerEvent)).toMatchObject(
      lecturerEvent
    );
  });
});
