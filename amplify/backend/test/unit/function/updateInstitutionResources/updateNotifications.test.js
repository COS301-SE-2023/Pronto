const {
  createCampaignNames,
} = require("../../../../function/updateInstitutionResources/src/updateNotifications");
const {
  CAMPAIGN_NAME_SUFFIX,
} = require("../../../../function/updateInstitutionResources/src/constants");

describe("Testing helper functions", () => {
  test("testing createCampaignNames", () => {
    const institutionName = "University OF Pretoria";
    formattedInstitutionName = institutionName
      .toLowerCase()
      .replaceAll(" ", "+");

    const expectedCampaignNames = {
      emailCampaignName: formattedInstitutionName + CAMPAIGN_NAME_SUFFIX.EMAIL,
      smsCampaignName: formattedInstitutionName + CAMPAIGN_NAME_SUFFIX.SMS,
      pushCampaignName:
        formattedInstitutionName + CAMPAIGN_NAME_SUFFIX.PUSH_NOTIFICATIONS,
    };
    const actualCampaignNames = createCampaignNames(institutionName);
    expect(actualCampaignNames).toEqual(expectedCampaignNames);
  });
});
