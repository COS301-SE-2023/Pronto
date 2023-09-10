const {
  updateInstitudeResources,
} = require("../../../../../function/updateInstitutionResources/src/helpers/updateInstitudeResourcesHandler");

const institutionName = "University OF Pretoria";
const institutionId = "INSITUTION-ID";
const campaignId = "CAMPAIGN-ID";
const mockPinpointClient = {
  send: jest.fn(),
};
describe("testing successful updateInstitudeResources operations", () => {
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
      eventName: "INSERT",
      record: {
        dynamodb: {
          NewImage: { name: institutionName, id: institutionId },
        },
        eventName: "INSERT",
      },
      pinpointClient: mockPinpointClient,
    };
    const expectedIsCampainCreated = true;
    const receivedIsCampainCreated = await updateInstitudeResources(
      createCampaignRequest
    );
    expect(receivedIsCampainCreated).toEqual(expectedIsCampainCreated);
  });
  test("updates campain", async () => {});
  test("deletes campain", async () => {});
});

describe("testing failed updateInstitudeResources operations", () => {
  test("fails to campain", async () => {});
  test("fails to update campain", async () => {});
  test("fails to delete campain", async () => {});
});
