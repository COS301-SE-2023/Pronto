const updateCourseResource = require("../../../../function/updateCourseResources/src/index");

const institutionName = "University OF Pretoria";
const institutionId = "INSITUTION-ID";
const campaignId = "CAMPAIGN-ID";
const courseCode = "COS301";
const segmentId = "SEGMENT-ID";

const unsuccessfulResponse = {
  $metadata: {
    httpStatusCode: 404,
  },
};
const successfulResponse = {
  $metadata: {
    httpStatusCode: 200,
  },
  SegmentResponse: { Id: "SEGMENT-ID" },
};
jest.mock("@aws-sdk/client-pinpoint", () => {
  return {
    PinpointClient: class {
      send() {
        return Promise.resolve(successfulResponse);
      }

      promise() {
        return Promise.resolve({});
      }
    },
    CreateSegmentCommand: class {},
    UpdateSegmentCommand: class {},
    DeleteSegmentCommand: class {},
  };
});

describe("testing updateCourseResource Handler with valid inputs", () => {
  const validEvent = {
    typeName: "mutation",
    fieldName: "createCourse",
    arguments: {
      institutionId: institutionId,
      coursecode: courseCode,
      coursename: "coursename",
      notificationsSegmentId: segmentId,
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
      expectedCreateSegementResponse
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
