const preSignIn = require("../../../../function/prontoAuthPreAuthentication/src/index");
const ROLES = require("../../../../function/prontoAuthPreAuthentication/src/roles");
const {
  isUserAdminOrLecturer,
} = require("../../../../function/prontoAuthPreAuthentication/src/helpers/assertInstitutionInfo");
const adminEvent = require("../../../../function/prontoAuthPreAuthentication/src/events/admin.event.json");
const lecturerEvent = require("../../../../function/prontoAuthPreAuthentication/src/events/lecturers.event.json");
const studentsEvent = require("../../../../function/prontoAuthPreAuthentication/src/events/students.event.json");
const preAuth = require("../../../../function/prontoAuthPreAuthentication/src/index");
global.Request = jest.fn((input, options) => null);

const institutionDetails = {
  admin: {
    id: "someAdminId",
    email: "admin_test@up.ac.za",
  },
  lectureremails: ["someLecturerEmail1", "someLecturerEmail2"],
  domains: ["tuks.co.za", "up.ac.za"],
};

jest.mock(
  "../../../../function/prontoAuthPreAuthentication/src/helpers/assertInstitutionInfo",
  () => {
    return {
      isUserAdminOrLecturer: jest.fn(),
    };
  }
);

describe("testing presignIn inputs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should throw: Invalid User Role or Role not provided", async () => {
    const invalidRoleEvent = JSON.parse(JSON.stringify(adminEvent));
    invalidRoleEvent.request.validationData.role = "";

    await expect(preSignIn.handler(invalidRoleEvent)).rejects.toThrowError(
      "Invalid User Role or Role not provided"
    );
  });

  test("should throw: Invalid or empty email address", async () => {
    const invalidRoleEvent = JSON.parse(JSON.stringify(adminEvent));
    invalidRoleEvent.request.userAttributes = "";

    await expect(preSignIn.handler(invalidRoleEvent)).rejects.toThrowError(
      "Invalid or empty email address"
    );
  });

  test(`should throw: Cannot authenticate user from this app client: 
      Students Should use the mobile app and Admin/Lectures should use the web app`, async () => {
    const invalidStudentEvent = { ...studentsEvent };
    invalidStudentEvent.callerContext.clientId =
      adminEvent.callerContext.clientId;
    await expect(preSignIn.handler(studentsEvent)).rejects.toThrowError(
      /Cannot authenticate user from this app client/
    );
  });
});

describe("testing preSignIn operation error handling", () => {
  test(`should throw: Only admins/lecturer are allowed to use the web app\n
      Please Use the mobile if you are student, or sign up as a lecturer/admin
      Request for an account as an Institute admin\n
      Or contact your Institute admin if you are a lecture\n
      More details on: http://prontotimetable.co.za`, async () => {
    isUserAdminOrLecturer.mockReturnValueOnce(false);
    await expect(preSignIn.handler(adminEvent)).rejects.toThrowError(
      `Only admins/lecturer are allowed to use the web app\n
      Please Use the mobile if you are student, or sign up as a lecturer/admin
      Request for an account as an Institute admin\n
      Or contact your Institute admin if you are a lecture\n
      More details on: http://prontotimetable.co.za`
    );
  });
});

describe("testing valid inputs", () => {
  test("should return the event", async () => {
    isUserAdminOrLecturer.mockReturnValueOnce(true);
    expect(await preSignIn.handler(adminEvent)).toBe(adminEvent);
  });
});
