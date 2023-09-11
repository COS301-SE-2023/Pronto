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
const successfulResponse = {
  $metadata: {
    httpStatusCode: 200,
  },
  SegmentResponse: { Id: segmentId },
};
const unsuccessfulResponse = {
  $metadata: {
    httpStatusCode: 404,
  },
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

describe("testing failed Notification service operations", () => {
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

  test("should fail to update segment", async () => {
    mockPinpointClient.send.mockRejectedValue({
      createCourseSegmentOperationError: "should fail to update segment",
    });
    const expectedUpdateOperationResponse = {
      noitificationStatus: "UPDATE FAILED",
    };
    const receivedUpdateOperationResponse = await updateCourseSegemntOperation(
      institutionId,
      courseCode,
      mockPinpointClient
    );
    expect(receivedUpdateOperationResponse).toEqual(
      expectedUpdateOperationResponse
    );
  });
  test("should fail to delete segment", async () => {
    mockPinpointClient.send.mockRejectedValue({
      createCourseSegmentOperationError: "should fail to delete segment",
    });
    const expectedDeleteOperationResponse = {
      noitificationStatus: "DELETE FAILED",
    };
    const receivedDeleteOperationResponse = await deleteCourseSegemntOperation(
      institutionId,
      courseCode,
      segmentId,
      mockPinpointClient
    );
    expect(receivedDeleteOperationResponse).toEqual(
      expectedDeleteOperationResponse
    );
  });
});
describe("testing successful Notification service operations", () => {
  beforeAll(() => {
    jest.clearAllMocks();
    mockPinpointClient.send.mockResolvedValue(successfulResponse);
  });
  test("should create segment", async () => {
    const expectedCreateSegementResponse = {
      notificationsSegmentId: segmentId,
      noitificationStatus: "AWATING ENROLLMENT",
      delay: 300,
    };
    const receivedCreateSegementResponse = await createCourseSegmentOperation(
      institutionId,
      courseCode,
      mockPinpointClient
    );
    expect(receivedCreateSegementResponse).toEqual(
      expectedCreateSegementResponse
    );
  });
  test("should update segment", async () => {
    const expectedCreateSegementResponse = {
      notificationsSegmentId: segmentId,
      noitificationStatus: "UPDATE COMPLETE",
    };
    const receivedCreateSegementResponse = await updateCourseSegemntOperation(
      institutionId,
      courseCode,
      segmentId,
      mockPinpointClient
    );
    expect(receivedCreateSegementResponse).toEqual(
      expectedCreateSegementResponse
    );
  });
  test("should delete segment", async () => {
    const expectedCreateSegementResponse = {
      notificationsSegmentId: segmentId,
      noitificationStatus: "DELETION COMPLETE",
    };
    const receivedCreateSegementResponse = await deleteCourseSegemntOperation(
      institutionId,
      courseCode,
      segmentId,
      mockPinpointClient
    );
    expect(receivedCreateSegementResponse).toEqual(
      expectedCreateSegementResponse
    );
  });
});
