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
    const receivedModuleSegmentName = createModuleSegmentName(
      institutionName,
      moduleCode
    );
    expect(receivedModuleSegmentName).toEqual(expectedModuleSegmentName);
  });
  test("testing createModuleSegmentCommandInput", () => {
    const expectedSegmentCommandInput = {
      WriteSegmentRequest: {
        Name: createModuleSegmentName(institutionName, moduleCode),
        Dimensions: {
          Attributes: {
            Values: moduleCode,
            AttributeType: "INCLUSIVE",
          },
          Behavior: {
            Recency: {
              Duration: "DAY_30",
              RecencyType: "ACTIVE",
            },
          },
          Demographic: {
            Channel: {
              Values: ["SMS", "EMAIL", "PUSH", "IN_APP"],
              DimensionType: "INCLUSIVE",
            },
          },
        },
      },
    };
    const receivedSegmentCommandInput = createModuleSegmentCommandInput(
      institutionName,
      moduleCode
    );
    expect(receivedSegmentCommandInput).toEqual(expectedSegmentCommandInput);
  });
});
