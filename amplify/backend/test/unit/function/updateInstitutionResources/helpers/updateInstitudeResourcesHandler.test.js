const {
  updateInstitudeResourcesHandler,
} = require("../../../../../function/updateInstitutionResources/src/helpers/updateInstitudeResourcesHandler");

const institutionName = "University OF Pretoria";
const institutionId = "INSITUTION-ID";
const campaignId = "CAMPAIGN-ID";
const mockPinpointClient = {
  send: jest.fn(),
};
const successfulResponse = {
  $metadata: {
    httpStatusCode: 200,
  },
};
const unsuccessfulResponse = {
  $metadata: {
    httpStatusCode: 404,
  },
};
describe("testing successful updateInstitudeResourcesHandler operations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("creates campain", async () => {
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
    const createCampaignCommandSuccessfulResponse = {
      $metadata: {
        httpStatusCode: 200,
      },
      CampaignResponse: { Id: "NEW-CAMPAIGN-ID" },
    };
    mockPinpointClient.send.mockResolvedValue(
      createCampaignCommandSuccessfulResponse
    );
    const createCampaignRequest = {
      record: {
        dynamodb: {
          NewImage: { name: institutionName, id: institutionId },
        },
        eventName: "INSERT",
      },
      pinpointClient: mockPinpointClient,
    };
    const expectedIsCampainCreated = true;
    const receivedIsCampainCreated = await updateInstitudeResourcesHandler(
      createCampaignRequest
    );
    expect(receivedIsCampainCreated).toEqual(expectedIsCampainCreated);
  });
  test("updates campain", async () => {
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
    const updateCampaignRequest = {
      record: {
        dynamodb: {
          NewImage: { name: institutionName, id: institutionId },
          OldImage: { name: "NEW NAME", id: institutionId },
        },
        eventName: "MODIFY",
      },
      pinpointClient: mockPinpointClient,
    };
    const expectedIsCampainUpdated = true;
    const receivedIsCampainUpdated = await updateInstitudeResourcesHandler(
      updateCampaignRequest
    );
    expect(receivedIsCampainUpdated).toEqual(expectedIsCampainUpdated);
  });
  test("deletes campain", async () => {
    mockPinpointClient.send.mockResolvedValue(successfulResponse);
    const deleteCampaignRequest = {
      record: {
        dynamodb: {
          OldImage: { name: "NEW NAME", id: institutionId },
        },
        eventName: "REMOVE",
      },
      pinpointClient: mockPinpointClient,
    };
    const expectedIsCampainDeleted = true;
    const receivedIsCampainDeleted = await updateInstitudeResourcesHandler(
      deleteCampaignRequest
    );
    expect(receivedIsCampainDeleted).toEqual(expectedIsCampainDeleted);
  });
});

describe("testing failed updateInstitudeResourcesHandler operations", () => {
  test("fails to campain", async () => {});
  test("fails to update campain", async () => {
    mockPinpointClient.send.mockRejectedValue(successfulResponse);
    const deleteCampaignRequest = {
      record: {
        dynamodb: {
          OldImage: { name: "NEW NAME", id: institutionId },
        },
        eventName: "REMOVE",
      },
      pinpointClient: mockPinpointClient,
    };
    const expectedIsCampainDeleted = false;
    const receivedIsCampainDeleted = await updateInstitudeResourcesHandler(
      deleteCampaignRequest
    );
    expect(receivedIsCampainDeleted).toEqual(expectedIsCampainDeleted);
  });
  test("fails to delete campain", async () => {
    mockPinpointClient.send.mockRejectedValue({});
    const deleteCampaignRequest = {
      record: {
        dynamodb: {
          OldImage: { name: "NEW NAME", id: institutionId },
        },
        eventName: "REMOVE",
      },
      pinpointClient: mockPinpointClient,
    };
    const expectedIsCampainDeleted = false;
    const receivedIsCampainDeleted = await updateInstitudeResourcesHandler(
      deleteCampaignRequest
    );
    expect(receivedIsCampainDeleted).toEqual(expectedIsCampainDeleted);
  });
});
