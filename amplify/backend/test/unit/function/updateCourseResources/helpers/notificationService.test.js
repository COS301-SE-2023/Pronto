const {
  createCourseSegmentName,
  setAndGetCreateSegmentCommandInput,
  createCourseSegmentOperation,
  setAndGetUpdateSegmentCommandInput,
  updateCourseSegemntOperation,
  setAndGetDeleteSegmentCommandInput,
  deleteCourseSegemntOperation,
} = require("../../../../../function/updateCourseResources/src/helpers/notificationService");

const institutionName = "University OF Pretoria";
const institutionId = "INSITUTION-ID";
const campaignId = "CAMPAIGN-ID";
const courseCode = "COS301";
const segmentId = "SEGMENT-ID";
const mockPinpointClient = {
  send: jest.fn(),
};
describe("Testing Notification service helper functions", () => {
  test("testing createCourseSegmentName", () => {
    const formattedInstitutionName = institutionName
      .toLowerCase()
      .replaceAll(" ", "+");
    const formattedCourseCodeCode = courseCode
      .toLowerCase()
      .replaceAll(" ", "+");
    const expectedCourseCodeSegmentName =
      formattedInstitutionName +
      ":" +
      formattedCourseCodeCode +
      ":notifications:segment";
    const receivedCourseCodeSegmentName = createCourseSegmentName(
      institutionName,
      courseCode
    );
    expect(receivedCourseCodeSegmentName).toEqual(
      expectedCourseCodeSegmentName
    );
  });
  test("testing setAndGetCreateSegmentCommandInput", () => {
    const expectedSegmentCommandInput = {
      WriteSegmentRequest: {
        Name: createCourseSegmentName(institutionName, courseCode),
        SegmentGroups: {
          Groups: [
            {
              Dimensions: [
                {
                  Attributes: {
                    Values: [courseCode],
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
                      Values: ["EMAIL"],
                      DimensionType: "INCLUSIVE",
                    },
                  },
                },
                {
                  Attributes: {
                    Values: [courseCode],
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
                      Values: ["SMS"],
                      DimensionType: "INCLUSIVE",
                    },
                  },
                },
                {
                  Attributes: {
                    Values: [courseCode],
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
                      Values: ["PUSH"],
                      DimensionType: "INCLUSIVE",
                    },
                  },
                },
              ],
              Type: "ANY",
            },
          ],
          Include: "ANY",
        },
      },
    };
    const receivedSegmentCommandInput = setAndGetCreateSegmentCommandInput(
      institutionName,
      courseCode
    );
    expect(receivedSegmentCommandInput).toEqual(expectedSegmentCommandInput);
  });
  test("testing setAndGetUpdateSegmentCommandInput", () => {
    const expectedSegmentCommandInput = {
      SegmentId: segmentId,
      ...setAndGetCreateSegmentCommandInput(institutionId, courseCode),
    };
    const receivedSegmentCommandInput = setAndGetUpdateSegmentCommandInput(
      institutionId,
      courseCode,
      segmentId
    );
    expect(receivedSegmentCommandInput).toEqual(expectedSegmentCommandInput);
  });
  test("testing setAndGetDeleteSegmentCommandInput", () => {
    const expectedSegmentCommandInput = {
      SegmentId: segmentId,
    };
    const receivedSegmentCommandInput =
      setAndGetDeleteSegmentCommandInput(segmentId);
    expect(receivedSegmentCommandInput).toEqual(expectedSegmentCommandInput);
  });
});

describe("testing failed operations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should fail to create segment", async () => {
    mockPinpointClient.send.mockRejectedValue({
      createCourseSegmentOperationError: "should fail to create segment",
    });
    const expectedCreateOperationResponse = {
      noitificationStatus: "CREATION FAILED",
    };
    const receivedCreateOperationResponse = await createCourseSegmentOperation(
      institutionId,
      courseCode,
      mockPinpointClient
    );
    expect(receivedCreateOperationResponse).toEqual(
      expectedCreateOperationResponse
    );
  });
});
describe("testing successful operations", () => {
  test("should create segment", () => {
    mockPinpointClient.send.mockRejectedValue({});
  });
});
