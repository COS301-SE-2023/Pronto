const preSignIn = require("../../../../function/prontoPreSignIn/src/index");
const {
  isInstitideAdminOrLecturer,
} = require("../../../../function/prontoPreSignIn/src/helpers/assertInstitutionInfo");
const ROLES = require("../../../../function/prontoPreSignIn/src/roles");

const adminEvent = require("../../../../function/prontoPreSignIn/src/events/admin.event.json");
const lecturerEvent = require("../../../../function/prontoPreSignIn/src/events/lecturers.event.json");
const studentsEvent = require("../../../../function/prontoPreSignIn/src/events/students.event.json");
const preAuth = require("../../../../function/prontoPreSignIn/src/index");
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
    invalidRoleEvent.request.clientMetadata.role = "";

    await expect(preSignIn.handler(invalidRoleEvent)).rejects.toThrowError(
      "Invalid User Role or Role not provided"
    );
  });

  test("should throw: Invalid role", async () => {});



describe("testing preSignIn operation error handling", () => {
  test(`should throw: Institude does not have an admin,\n
    Please request for one on AgileArchitectsCapstone@gmail.com\n
    More info on: {path/to/pronto/web/about/institude/admin}`, () => {});
  test("should throw: Lecture email list was not provided, please contact your institution admin", () => {});
});
