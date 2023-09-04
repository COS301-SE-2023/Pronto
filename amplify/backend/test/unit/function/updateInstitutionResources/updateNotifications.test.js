const {
  createCampaignNames,
  createModuleSegmentName,
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
    const actualCampaignNames = createCampaignNames(institutionName);
    expect(actualCampaignNames).toEqual(expectedCampaignNames);
  });
  test("testing createModuleSegmentName", () => {
    const formattedInstitutionName = institutionName
      .toLowerCase()
      .replaceAll(" ", "+");
    const formattedModuleCode = moduleCode.toLowerCase().replaceAll(" ", "+");
    const expectedModuleSegmentName =
      formattedInstitutionName +
      ":" +
      formattedModuleCode +
      ":notifications:segment";
    const actualModuleSegmentName = createModuleSegmentName(
      institutionName,
      moduleCode
    );
    expect(expectedModuleSegmentName).toEqual(actualModuleSegmentName);
  });
});
