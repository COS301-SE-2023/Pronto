const updateCourseResource = require("../../../../function/configureCourseNotifications/src/index");

const institutionName = "University OF Pretoria";
const institutionId = "INSITUTION-ID";
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
  beforeAll(() => {
    jest.clearAllMocks();
  });
  test("should create segment", async () => {
    const validCreateCourseEvent = {
      typeName: "mutation",
      fieldName: "createCourse",
      arguments: {
        institutionId: institutionId,
        coursecode: courseCode,
        coursename: "coursename",
        notificationsSegmentId: segmentId,
      },
    };
    const expectedCreateSegementResponse = {
      notificationsSegmentId: segmentId,
      noitificationStatus: "AWATING ENROLLMENT",
      delay: 300,
    };
    const receivedCreateSegementResponse = await updateCourseResource.handler(
      validCreateCourseEvent
    );
    expect(receivedCreateSegementResponse).toEqual(
      expectedCreateSegementResponse
    );
  });
  test("should update segment", async () => {
    const validUpdateCourseEvent = {
      typeName: "mutation",
      fieldName: "updateCourse",
      arguments: {
        institutionId: institutionId,
        coursecode: courseCode,
        coursename: "coursename",
        notificationsSegmentId: segmentId,
      },
    };
    const expectedUpdateSegementResponse = {
      notificationsSegmentId: segmentId,
      noitificationStatus: "UPDATE COMPLETE",
    };
    const receivedUpdateSegementResponse = await updateCourseResource.handler(
      validUpdateCourseEvent
    );
    expect(receivedUpdateSegementResponse).toEqual(
      expectedUpdateSegementResponse
    );
  });
  test("should delete segment", async () => {
    const validDeleteCourseEvent = {
      typeName: "mutation",
      fieldName: "deleteCourse",
      arguments: {
        institutionId: institutionId,
        coursecode: courseCode,
        coursename: "coursename",
        notificationsSegmentId: segmentId,
      },
    };
    const expectedDeleteSegementResponse = {
      notificationsSegmentId: segmentId,
      noitificationStatus: "DELETION COMPLETE",
    };
    const receivedDeleteSegementResponse = await updateCourseResource.handler(
      validDeleteCourseEvent
    );
    expect(receivedDeleteSegementResponse).toEqual(
      expectedDeleteSegementResponse
    );
  });
});
describe("testing notificationService Handler with invalid inputs", () => {
  const graphQlObject = "UNKNOWN";
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test(`should return: FUNCTION NOT MENT TO BE CALLED USING THE ${graphQlObject} OBJECT TYPE`, async () => {
    const eventWithInvalidType = {
      typeName: "INVALID-TYPE",
      fieldName: "deleteCourse",
      arguments: {
        institutionId: institutionId,
        coursecode: courseCode,
        coursename: "coursename",
        notificationsSegmentId: segmentId,
      },
    };
    const expectedResponse =
      "FUNCTION NOT MENT TO BE CALLED USING THE INVALID-TYPE OBJECT TYPE";
    const receivedResponse = await updateCourseResource.handler(
      eventWithInvalidType
    );
    expect(receivedResponse).toEqual(expectedResponse);
  });
  test("should return:UNKNOWN COURSE MUTATION TYPE", async () => {
    const eventWithInvalidField = {
      typeName: "mutation",
      fieldName: "INVALID-MUTATION-FIELD-NAME",
      arguments: {
        institutionId: institutionId,
        coursecode: courseCode,
        coursename: "coursename",
        notificationsSegmentId: segmentId,
      },
    };
    const expectedResponse = "UNKNOWN COURSE MUTATION TYPE";
    const receivedResponse = await updateCourseResource.handler(
      eventWithInvalidField
    );
    expect(receivedResponse).toEqual(expectedResponse);
  });
});
