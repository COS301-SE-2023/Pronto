const adminEvent = require("../../../../function/prontoAuthPreSignup/src/events/admin.event.json");
const lecturerEvent = require("../../../../function/prontoAuthPreSignup/src/events/lecturers.event.json");
const studentsEvent = require("../../../../function/prontoAuthPreSignup/src/events/students.event.json");
const preAuth = require("../../../../function/prontoAuthPreSignup/src/index");

jest.mock(
  "../../../../function/prontoAuthPreSignup/src/assertInstitutionInfo",
  () => ({
    isLectureEmailPartOfInstitution: jest.fn(() => Promise.resolve(false)),
    isAdminAllocated: jest.fn(() => Promise.resolve(true)),
    isStudentEmailDomainPartOfInstitution: jest.fn(() =>
      Promise.resolve(false)
    ),
  })
);
describe("Input Validation and Error handling", () => {
  test(`should throw "Invalid User Role or Role not provided"`, async () => {
    const eventWithNullRole = {
      request: {
        clientMetadata: {},
      },
    };
    await expect(preAuth.handler(eventWithNullRole)).rejects.toThrow(
      /^Invalid User Role or Role not provided$/
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
    studentEventWithAdminInvalidClientId.callerContext.clientId = "Invalid";
    await expect(
      preAuth.handler(studentEventWithAdminInvalidClientId)
    ).rejects.toThrow(
      /^Cannot authenticate user from this app client. Unrecognised Client$/
    );
  });
  test(`should throw "Cannot authenticate user from this app client"`, async () => {
    const studentEventWithAdminRole = JSON.parse(JSON.stringify(studentsEvent));
    studentEventWithAdminRole.request.clientMetadata.role = "Admin";
    await expect(preAuth.handler(studentEventWithAdminRole)).rejects.toThrow(
      /^Cannot authenticate user from this app client/
    );
  });
});

describe("Testing client enforcement", () => {
  test('should throw "Institution has an admin already. institutionId"', async () => {
    await expect(preAuth.handler(adminEvent)).rejects.toThrow(
      /Institution has an admin already./
    );
  });
  test('should throw "Lecturer email is not part of the Institution"', async () => {
    await expect(preAuth.handler(lecturerEvent)).rejects.toThrow(
      /Lecturer email is not part of the Institution/
    );
  });
  test('should throw "The provided student email does not match the selected institutions student emails format." ', async () => {
    await expect(preAuth.handler(studentsEvent)).rejects.toThrow(
      /The provided student email does not match the selected institutions student emails format./
    );
  });
});
