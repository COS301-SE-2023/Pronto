const {
  createCampaignNames,
  createPinpointCampaignCommandInput,
} = require("../../../../function/updateInstitutionResources/src/updateNotifications");

const institutionName = "University OF Pretoria";

describe("Testing helper functions", () => {
  test("testing createCampaignNames", () => {
    formattedInstitutionName = institutionName
      .toLowerCase()
      .replaceAll(" ", "+");

    const expectedCampaignName =
      formattedInstitutionName + ":notifications:campaign";
    const receivedCampaignName = createCampaignNames(institutionName);
    expect(receivedCampaignName).toEqual(expectedCampaignName);
  });

  test("testing createPinpointCampaignCommandInput", () => {
    const campaignNames = createCampaignNames(institutionName);
    const expectedCampaignCommandInput = {
      WriteCampaignRequest: {
        Name: campaignNames.emailCampaignName,
        Description: `${institutionName} Notifications Campaign`,
        Schedule: {
          StartTime: "IMMEDIATE",
        },
        TemplateConfiguration: {
          EmailTemplate: { Name: process.env.EMAIL_TEMPLATE_NAME },
          PushTemplate: { Name: process.env.PUSH_TEMPLATE_NAME },
          SMSTemplate: { Name: process.env.SMS_TEMPLATE_NAME },
        },
      },
    };
  });
});
