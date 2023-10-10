const {
  isUserAdminOrLecturer,
} = require("../../../../function/prontoAuthPreAuthentication/src/helpers/assertInstitutionInfo");
const ROLES = require("../../../../function/prontoAuthPreAuthentication/src/roles");
global.Request = jest.fn((input, options) => null);

describe("tests isUserAdminOrLecturer", () => {
  test("should throw: FAILED TO VALIDATE ADMIN or LECTURER USER ROLE TYPE", async () => {
    const getAndSetInstitutionDetails = jest
      .fn()
      .mockRejectedValue(new Error("Failed to retrieve institution details"));

    await expect(
      isUserAdminOrLecturer("admin@example.com", "institutionId", ROLES.Admin)
    ).rejects.toThrowError(
      "FAILED TO VALIDATE ADMIN or LECTURER USER ROLE TYPE"
    );
  });
});
