const {
  createCampaignNames,
  createModuleSegmentName,
  createModuleSegmentCommandInput,
} = require("../../../../function/updateInstitutionResources/src/updateNotifications");

const institutionName = "University OF Pretoria";
const moduleCode = "COS301";

describe("Testing helper functions", () => {
  test("testing createCampaignNames", () => {
    formattedInstitutionName = institutionName
      .toLowerCase()
      .replaceAll(" ", "+");

    const expectedCampaignNames = {
      emailCampaignName:
        formattedInstitutionName + ":email:notifications:Campaign",
      smsCampaignName: formattedInstitutionName + ":sms:notifications:Campaign",
      pushCampaignName:
        formattedInstitutionName + ":push:notifications:Campaign",
    };
    const receivedCampaignNames = createCampaignNames(institutionName);
    expect(receivedCampaignNames).toEqual(expectedCampaignNames);
  });
});