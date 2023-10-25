const {
  isUserAdminOrLecturer,
} = require("../../../../function/prontoAuthPreAuthentication/src/helpers/assertInstitutionInfo");
const ROLES = require("../../../../function/prontoAuthPreAuthentication/src/roles");
global.Request = jest.fn((input, options) => null);

describe("tests isUserAdminOrLecturer", () => {
  test("should throw: Failed To retrieve email list details", async () => {
    await expect(
      isUserAdminOrLecturer("admin@example.com", ROLES.Admin)
    ).rejects.toThrowError("Failed To retrieve email list details");
  });
  test("should throw: Invalid email address. Email = ", async () => {
    await expect(isUserAdminOrLecturer(null, ROLES.Admin)).rejects.toThrowError(
      /Invalid email address. Email = /
    );
  });
});
