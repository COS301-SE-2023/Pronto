const preSignIn = require("../../../../function/prontoAuthPreAuthentication/src/index");
const {
  isUserAdminOrLecturer,
} = require("../../../../function/prontoAuthPreAuthentication/src/helpers/assertInstitutionInfo");
const ROLES = require("../../../../function/prontoAuthPreAuthentication/src/roles");

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

describe("testing presignIn inputs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should throw: Invalid User Role or Role not provided", async () => {
    const invalidRoleEvent = { ...adminEvent };
    invalidRoleEvent.request.validationData.role = "";

    await expect(preSignIn.handler(invalidRoleEvent)).rejects.toThrowError(
      "Invalid User Role or Role not provided"
    );
  });
  test("should throw: Invalid email address. Email = ", async () => {
    await expect(
      isUserAdminOrLecturer("", "", ROLES.Admin)
    ).rejects.toThrowError("Invalid email address. Email = ");
  });
  test("should throw: Invalid role", async () => {});

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
  test(`should throw: Institude does not have an admin,\n
    Please request for one on AgileArchitectsCapstone@gmail.com\n
    More info on: {path/to/pronto/web/about/institude/admin}`, () => {});
  test("should throw: Lecture email list was not provided, please contact your institution admin", () => {});
});
