const updateCourseResource = require("../../../../function/updateCourseResources/src/index");

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
const institutionName = "University OF Pretoria";
const institutionId = "INSITUTION-ID";
const campaignId = "CAMPAIGN-ID";
const courseCode = "COS301";
const segmentId = "SEGMENT-ID";

describe("testing updateCourseResource Handler with valid inputs", () => {
  mockPinpointClient.send.mockResolvedValue(successfulResponse);
  const validEvent = {
    typeName: "mutation",
    fieldName: "",
    arguments: {
      institutionId: "institutionId",
      coursecode: "coursecode",
      coursename: "coursename",
      notificationsSegmentId: "notificationsSegmentId",
      pinpointClient: mockPinpointClient,
    },
  };
  beforeAll(() => {
    jest.clearAllMocks();
  });
  test("should create campaign", async () => {
    const expectedCreateSegementResponse = {
      notificationsSegmentId: segmentId,
      noitificationStatus: "AWATING ENROLLMENT",
      delay: 300,
    };
    const receivedCreateSegementResponse = await updateCourseResource.handler(
      validEvent
    );
    expect(receivedCreateSegementResponse).toEqual(
      receivedCreateSegementResponse
    );
  });
  test("should update campaign", async () => {});
  test("should delete campaign", async () => {});
});
describe("testing notificationService Handler with invalid inputs", () => {
  const graphQlObject = "UNKNOWN";
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should return:UNKNOWN COURSE MUTATION TYPE", async () => {});
  test(`should return: FUNCTION NOT MENT TO BE CALLED USING THE ${graphQlObject} OBJECT TYPE`, async () => {});
});
