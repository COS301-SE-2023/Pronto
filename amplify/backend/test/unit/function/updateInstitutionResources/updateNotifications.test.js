const {
  createCampainNames,
} = require("../../../../function/updateInstitutionResources/src/updateNotifications");
const {
  CAMPAIN_NAME_SUFFIX,
} = require("../../../../function/updateInstitutionResources/src/constants");

describe("Testing helper functions", () => {
  test("testing createCampainNames", () => {
    const institutionName = "University OF Pretoria";
    formattedInstitutionName = institutionName
      .toLowerCase()
      .replaceAll(" ", "+");

    const expectedcampainNames = {
      emailCampainName: formattedInstitutionName + CAMPAIN_NAME_SUFFIX.EMAIL,
      smsCampainName: formattedInstitutionName + CAMPAIN_NAME_SUFFIX.SMS,
      pushCampainName:
        formattedInstitutionName + CAMPAIN_NAME_SUFFIX.PUSH_NOTIFICATIONS,
    };
    expect(createCampainNames(institutionName)).toEqual(expectedcampainNames);
  });
});
