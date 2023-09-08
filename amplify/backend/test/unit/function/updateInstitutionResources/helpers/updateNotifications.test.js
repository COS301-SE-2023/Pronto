const {
  createCampaignName,
  createPinpointCampaignCommandInput,
} = require("../../../../../function/updateInstitutionResources/src/helpers/updateInstitudeResources");

const institutionName = "University OF Pretoria";

describe("Testing helper functions", () => {
  test("testing createCampaignName", () => {
    formattedInstitutionName = institutionName
      .toLowerCase()
      .replaceAll(" ", "+");

    const expectedCampaignName =
      formattedInstitutionName + ":notifications:campaign";
    const receivedCampaignName = createCampaignName(institutionName);
    expect(receivedCampaignName).toEqual(expectedCampaignName);
  });

  test("testing createPinpointCampaignCommandInput", () => {
    const campaignName = createCampaignName(institutionName);
    const expectedCampaignCommandInput = {
      WriteCampaignRequest: {
        Name: campaignName,
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
    console.table(expectedCampaignCommandInput);
    const receivedCampaignCommandInput =
      createPinpointCampaignCommandInput(institutionName);
    expect(receivedCampaignCommandInput).toEqual(expectedCampaignCommandInput);
  });
});
