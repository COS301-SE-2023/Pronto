const {
  createCampaignName,
  setAndGetPinpointCampaignCommandInput,
  setAndGetPinpointUpdateCampaignCommandInput,
  setAndGetPinpointDeleteCampaignCommandInput,
  createCampainOperation,
  updateCamapaignOperation,
  deleteCampaignOperation,
} = require("../../../../../function/updateInstitutionResources/src/helpers/updateInstitudeResources");
const { PinpointClient } = require("@aws-sdk/client-pinpoint");
jest.mock("@aws-sdk/client-pinpoint", () => {
  return {
    PinpointClient: class {
      send() {
        return Promise.resolve({});
      }
    },
  };
});

const institutionName = "University OF Pretoria";
const institutionId = "INSITUTION-ID";
const campaignId = "CAMPAIGN-ID";
describe("Testing helper functions command inputs", () => {
  test("testing createCampaignName", () => {
    formattedInstitutionName = institutionName
      .toLowerCase()
      .replaceAll(" ", "+");

    const expectedCampaignName =
      formattedInstitutionName + ":notifications:campaign";
    const receivedCampaignName = createCampaignName(institutionName);
    expect(receivedCampaignName).toEqual(expectedCampaignName);
  });

  test("testing setAndGetPinpointCampaignCommandInput", () => {
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
    const receivedCampaignCommandInput =
      setAndGetPinpointCampaignCommandInput(institutionName);
    expect(receivedCampaignCommandInput).toEqual(expectedCampaignCommandInput);
  });
  test("testing setAndGetPinpointUpdateCampaignCommandInput", () => {
    const campaignId = "CAMPAIGN-ID";
    const campaignName = createCampaignName(institutionName);
    const expectedUpdateCampaignCommandInput = {
      CampaignId: campaignId,
      Name: campaignName,
      WriteCampaignRequest: {
        Description: `${institutionName} Notifications Campaign`,
      },
    };
    const receivedUpdateCampaignCommandInput =
      setAndGetPinpointUpdateCampaignCommandInput(institutionName, campaignId);
    expect(receivedUpdateCampaignCommandInput).toEqual(
      expectedUpdateCampaignCommandInput
    );
  });
  test("testing setAndGetPinpointDeleteCampaignCommandInput", () => {
    const campaignId = "CAMPAIGN-ID";
    const expectedDeleteCampaignCommandInput = {
      CampaignId: campaignId,
    };
    const receivedDeleteCampaignCommandInput =
      setAndGetPinpointDeleteCampaignCommandInput(campaignId);
    expect(receivedDeleteCampaignCommandInput).toEqual(
      expectedDeleteCampaignCommandInput
    );
  });
});

describe("testing createCampainOperation", () => {
  test("create Campaign request successful", () => {});
  test("create Campaign request failed", () => {});
});
describe("testing updateCamapaignOperation", () => {
  const successfulResponse = {
    ResponseMetadata: {
      httpStatusCode: 200,
    },
  };
  const unsuccessfulResponse = {
    ResponseMetadata: {
      httpStatusCode: 404,
    },
  };
  const mockPinpointClient = {
    send: jest.fn(),
  };
  test("should update Campaign request successfully", async () => {
    global.Request = jest.fn((input, options) => null);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            ok: true,
            body: { data: { updateInstitution: { name: institutionName } } },
          }),
      })
    );
    mockPinpointClient.send.mockResolvedValue(successfulResponse);
    const expected = true;
    const received = await updateCamapaignOperation(
      institutionName,
      institutionId,
      campaignId,
      mockPinpointClient
    );
    expect(received).toEqual(expected);
  });
  test("should fail to update Campaign", async () => {
    global.Request = jest.fn((input, options) => null);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            ok: true,
            body: { data: { updateInstitution: { name: institutionName } } },
          }),
      })
    );
    mockPinpointClient.send.mockResolvedValue(unsuccessfulResponse);
    const expected = false;
    const received = await updateCamapaignOperation(
      institutionName,
      institutionId,
      campaignId,
      mockPinpointClient
    );
    expect(received).toEqual(expected);
  });
});
describe("testing deleteCampaignOperation", () => {
  const successfulResponse = {
    ResponseMetadata: {
      httpStatusCode: 200,
    },
  };
  const unsuccessfulResponse = {
    ResponseMetadata: {
      httpStatusCode: 404,
    },
  };
  const mockPinpointClient = {
    send: jest.fn(),
  };
  test("should delete Campaign request successfully", async () => {
    mockPinpointClient.send.mockResolvedValue(successfulResponse);
    const expected = true;
    const received = await deleteCampaignOperation(
      institutionId,
      campaignId,
      mockPinpointClient
    );
    expect(received).toEqual(expected);
  });
  test("should fail to delete Campaign", async () => {
    mockPinpointClient.send.mockResolvedValue(unsuccessfulResponse);
    const expected = false;
    const received = await deleteCampaignOperation(
      institutionId,
      campaignId,
      mockPinpointClient
    );
    expect(expected).toEqual(received);
  });
});
