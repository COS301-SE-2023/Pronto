const {
  SEGMENT_NAME_SUFFIX,
  PINPOINT_SEGMENT_DIMENSIONS,
  DATASTREAM_EVENT_NAMES,
} = require("./constants");
const { CreateSegmentCommand } = require("@aws-sdk/client-pinpoint");

const PINPOINT_APP_ID = process.env.PINPOINT_APP_ID;

const createCourseSegmentName = (institutionName, courseCode) => {
  formattedInstitutionName = institutionName.toLowerCase().replaceAll(" ", "+");
  formattedCourseCodeCode = courseCode.toLowerCase().replaceAll(" ", "+");
  return (
    formattedInstitutionName +
    ":" +
    formattedCourseCodeCode +
    SEGMENT_NAME_SUFFIX
  );
};

const setAndGetCreatePinpointSegmentCommandInput = (
  institutionName,
  courseCode
) => {
  const moduleSegmentName = createCourseCodeSegmentName(
    institutionName,
    courseCode
  );
  const emailSegmentGroupDimensions = {
    Attributes: {
      Values: [courseCode],
      AttributeType: PINPOINT_SEGMENT_DIMENSIONS.ATTRIBUTES.ATTRIBUTE_TYPE,
    },
    Behavior: PINPOINT_SEGMENT_DIMENSIONS.BEHAVIOUR,
    Demographic: PINPOINT_SEGMENT_DIMENSIONS.EMAIL_DEMOGRAPHIC,
  };
  const smsSegmentGroupDimensions = {
    Attributes: {
      Values: [courseCode],
      AttributeType: PINPOINT_SEGMENT_DIMENSIONS.ATTRIBUTES.ATTRIBUTE_TYPE,
    },
    Behavior: PINPOINT_SEGMENT_DIMENSIONS.BEHAVIOUR,
    Demographic: PINPOINT_SEGMENT_DIMENSIONS.SMS_DEMOGRAPHIC,
  };
  const pushSegmentGroupDimensions = {
    Attributes: {
      Values: [courseCode],
      AttributeType: PINPOINT_SEGMENT_DIMENSIONS.ATTRIBUTES.ATTRIBUTE_TYPE,
    },
    Behavior: PINPOINT_SEGMENT_DIMENSIONS.BEHAVIOUR,
    Demographic: PINPOINT_SEGMENT_DIMENSIONS.PUSH_DEMOGRAPHIC,
  };
  const studentsSegmentGroup = {
    Dimensions: [
      emailSegmentGroupDimensions,
      smsSegmentGroupDimensions,
      pushSegmentGroupDimensions,
    ],
    Type: PINPOINT_SEGMENT_DIMENSIONS.SEGMENT_GROUPS.STUDENT_GROUP.TYPE,
  };
  const writeSegmentRequest = {
    Name: moduleSegmentName,
    SegmentGroups: {
      Groups: [studentsSegmentGroup],
      Include: PINPOINT_SEGMENT_DIMENSIONS.SEGMENT_GROUPS.INCLUDE,
    },
  };
  const createSegmentCommandInput = {
    ApplicationId: PINPOINT_APP_ID,
    WriteSegmentRequest: writeSegmentRequest,
  };
  return createSegmentCommandInput;
};

const createCourseSegmentOperation = async (
  institutionName,
  courseCode,
  pinpointClient
) => {
  const createSegementCommandInput = setAndGetCreatePinpointSegmentCommandInput(
    institutionName,
    courseCode
  );
  const createSegmentCommand = new CreateSegmentCommand(
    createSegementCommandInput
  );
  try {
    const createSegementCommandOutput = await pinpointClient.send(
      createSegmentCommand
    );
    console.debug(`CREATE Segment Response: ${createSegementCommandOutput}`);
    const responseMetadata = createSegementCommandOutput.$metadata;
    const statusCode = responseMetadata.httpStatusCode;
    const SegmentResponse = createSegementCommandOutput.SegmentResponse;
    if (statusCode === 200) {
      console.debug(`SEGEMENT CREATED. SEGEMENT ID: ${SegmentResponse.Id}`);
      return true;
    }
  } catch (createCourseSegmentError) {
    console.debug(`ERROR SENDING CREATE SEGEMENT COMMAND FOR ${institutionName} ${courseCode} COURSE\n
            INFO: ${createCourseSegmentError}`);
    return false;
  }
};

const setAndGetUpdatePinpointSegmentCommandInput = () => {};
const updateCourseSegmentOperation = () => {};

const setAndGetDeletePinpointSegmentCommandInput = () => {};
const deleteCourseSegmentOperation = () => {};

const updateCourseResources = async (updateRequest) => {
  switch (updateRequest.UpdateOption) {
    case DATASTREAM_EVENT_NAMES.COURSE_CREATED:
      console.debug("COURSE CREATED");
      //create student segment group
      //create segment, add groups
      //get institution campain
      //add segement
      //WRITE segmentIDs WRITE to institutionDB, on COURSETABLE
      //Update notifications status on course table
      const createSegmentCommandInput =
        setAndGetCreatePinpointSegmentCommandInput(
          updateRequest.institutionName,
          updateRequest.courseCode
        );
      try {
        const createSegmentResponse = await updateRequest.pinpointClient.send(
          createSegmentCommandInput
        );
      } catch (error) {}
      break;
    case DATASTREAM_EVENT_NAMES.COURSE_UPDATED:
      try {
      } catch (error) {}
      break;
    case DATASTREAM_EVENT_NAMES.COURSE_DELETED:
      try {
      } catch (error) {}
      break;
    default:
      throw new Error();
  }
};
module.exports = {
  createCourseSegmentName,
  setAndGetCreatePinpointSegmentCommandInput,
  createCourseSegmentOperation,
  updateCourseSegmentOperation,
  deleteCourseSegmentOperation,
};
