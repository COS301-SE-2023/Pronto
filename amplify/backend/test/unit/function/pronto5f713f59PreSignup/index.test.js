const adminEvent = require("../../../../function/prontoAuthPostConfirmation/src/events/admin.event.json");
const lecturerEvent = require("../../../../function/prontoAuthPostConfirmation/src/events/lecturers.event.json");
const studentsEvent = require("../../../../function/prontoAuthPostConfirmation/src/events/students.event.json");
const preAuth = require("../../../../function/pronto5f713f59PreSignup/src/index");

jest.mock(
  "../../../../function/pronto5f713f59PreSignup/src/assertInstitutionInfo",
  () => ({
    isLectureEmailPartOfInstitution: jest.fn(() => Promise.resolve(false)),
    isAdminAllocated: jest.fn(() => Promise.resolve(true)),
  })
);
describe("Input Validation and Error handling", () => {
  test(`should throw "User role not provided on ClientMetadata"`, async () => {
    const eventWithNullRole = {
      request: {
        clientMetadata: {},
      },
    };
    await expect(preAuth.handler(eventWithNullRole)).rejects.toThrow(
      /^User role not provided on ClientMetadata$/
    );
  });
  test('should throw "Invalid User Role"', async () => {
    const studentEventWithAdminInvalidRole = JSON.parse(
      JSON.stringify(studentsEvent)
    );
    studentEventWithAdminInvalidRole.request.clientMetadata.role =
      "invalidRole";
    await expect(
      preAuth.handler(studentEventWithAdminInvalidRole)
    ).rejects.toThrow(/Invalid User Role/);
  });
  test('should throw "Unrecognised user pool app client ID"', async () => {
    const studentEventWithAdminInvalidClientId = JSON.parse(
      JSON.stringify(studentsEvent)
    );
    studentEventWithAdminInvalidClientId.request.callerContext.clientId =
      "Invalid";
    console.table(studentEventWithAdminInvalidClientId);
    await expect(
      preAuth.handler(studentEventWithAdminInvalidClientId)
    ).rejects.toThrow(/Unrecognised user pool app client ID/);
  });
  test(`should throw "Cannot authenticate users from this app client: Students Should use the mobile app and Admin/Lectures should use the web app"`, async () => {
    const studentEventWithAdminRole = JSON.parse(JSON.stringify(studentsEvent));
    studentEventWithAdminRole.request.clientMetadata.role = "Admin";
    await expect(preAuth.handler(studentEventWithAdminRole)).rejects.toThrow(
      "Cannot authenticate users from this app client: Students Should use the mobile app and Admin/Lectures should use the web app"
    );
  });
  test('should throw "Institution has an admin already. institutionId"', async () => {
    await expect(preAuth.handler(adminEvent)).rejects.toThrow(
      /Institution has an admin already. institutionId/
    );
  });
  test('should throw "Lecturer email is not part of the Institution"', async () => {
    await expect(preAuth.handler(lecturerEvent)).rejects.toThrow(
      /Lecturer email is not part of the Institution/
    );
  });
});

describe("testing returned values", () => {
  test("should return event", async () => {
    expect(await preAuth.handler(studentsEvent)).toMatchObject(studentsEvent);
  });
});
