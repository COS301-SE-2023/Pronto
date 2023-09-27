const {
  isInstitideAdminOrLecturer,
} = require("../../../../function/prontoPreSignIn/src/helpers/assertInstitutionInfo");
const ROLES = require("../../../../function/prontoPreSignIn/src/roles");
global.Request = jest.fn((input, options) => null);

describe("tests isInstitideAdminOrLecturer", () => {
  test("should throw: FAILED TO VALIDATE ADMIN or LECTURER USER ROLE TYPE", async () => {
    const getAndSetInstitutionDetails = jest
      .fn()
      .mockRejectedValue(new Error("Failed to retrieve institution details"));

    await expect(
      isInstitideAdminOrLecturer(
        "admin@example.com",
        "institutionId",
        ROLES.Admin
      )
    ).rejects.toThrowError(
      "FAILED TO VALIDATE ADMIN or LECTURER USER ROLE TYPE"
    );
  });
});
