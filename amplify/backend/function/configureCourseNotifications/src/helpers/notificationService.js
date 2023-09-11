const {
  SEGMENT_NAME_SUFFIX,
  PINPOINT_SEGMENT_DIMENSIONS,
} = require("./constants");
const {
  CreateSegmentCommand,
  UpdateSegmentCommand,
  DeleteSegmentCommand,
} = require("@aws-sdk/client-pinpoint");
const institution = {
  details: null,
  id: null,
};

const PINPOINT_APP_ID = process.env.PINPOINT_APP_ID;

const createCourseSegmentName = (institutionId, courseCode) => {
  formattedInstitutionName = institutionId.toLowerCase().replaceAll(" ", "+");
  formattedCourseCodeCode = courseCode.toLowerCase().replaceAll(" ", "+");
  return (
    formattedInstitutionName +
    ":" +
    formattedCourseCodeCode +
    SEGMENT_NAME_SUFFIX
  );
};

const setAndGetCreateSegmentCommandInput = (institutionId, courseCode) => {
  const moduleSegmentName = createCourseSegmentName(institutionId, courseCode);
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
  institutionId,
  courseCode,
  pinpointClient
) => {
  const createSegementCommandInput = setAndGetCreateSegmentCommandInput(
    institutionId,
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
      return {
        notificationsSegmentId: SegmentResponse.Id,
        noitificationStatus: "AWATING ENROLLMENT",
        delay: 300,
      };
    }
  } catch (createCourseSegmentOperationError) {
    console.debug(`ERROR SENDING CREATE SEGEMENT COMMAND FOR INSTITUDE WITH ID ${institutionId}, COURSE ${courseCode} \n
            INFO: ${createCourseSegmentOperationError}`);
    return {
      noitificationStatus: "CREATION FAILED",
    };
  }
};

const setAndGetUpdateSegmentCommandInput = (
  institutionId,
  courseCode,
  SegmentId
) => {
  const updateSegmentCommandInput = {
    SegmentId: SegmentId,
    ...setAndGetCreateSegmentCommandInput(institutionId, courseCode),
  };
  return updateSegmentCommandInput;
};

const updateCourseSegemntOperation = async (
  institutionId,
  courseCode,
  segmentId,
  pinpointClient
) => {
  const updateSegementCommandInput = setAndGetUpdateSegmentCommandInput(
    institutionId,
    courseCode,
    segmentId
  );
  const updateSegmentCommand = new UpdateSegmentCommand(
    updateSegementCommandInput
  );
  try {
    const updateSegmentCommandOutput = await pinpointClient.send(
      updateSegmentCommand
    );
    console.debug(`CREATE Segment Response: ${updateSegmentCommandOutput}`);
    const responseMetadata = updateSegmentCommandOutput.$metadata;
    const statusCode = responseMetadata.httpStatusCode;
    const segmentResponse = updateSegmentCommandOutput.SegmentResponse;
    if (statusCode === 200) {
      console.debug(`SEGEMENT UPDATED. SEGEMENT ID: ${segmentResponse.Id}`);
      return {
        notificationsSegmentId: segmentResponse.Id,
        noitificationStatus: "UPDATE COMPLETE",
      };
    }
  } catch (updateCourseSegmentOperationError) {
    console.debug(`ERROR SENDING UPDATE SEGEMENT COMMAND FOR INSTITUDE WITH ID ${institutionId},COURSE ${courseCode} \n
            INFO: ${updateCourseSegmentOperationError}`);
    return {
      noitificationStatus: "UPDATE FAILED",
    };
  }
};

const setAndGetDeleteSegmentCommandInput = (SegmentId) => {
  const updateSegmentCommandInput = {
    SegmentId: SegmentId,
    ApplicationId: PINPOINT_APP_ID,
  };
  return updateSegmentCommandInput;
};

const deleteCourseSegemntOperation = async (
  institutionId,
  courseCode,
  segmentId,
  pinpointClient
) => {
  const deleteSegmentCommandInput =
    setAndGetDeleteSegmentCommandInput(segmentId);
  const deleteSegmentCommand = new DeleteSegmentCommand(
    deleteSegmentCommandInput
  );
  try {
    const deleteSegmentCommandOutput = await pinpointClient.send(
      deleteSegmentCommand
    );
    console.debug(`DELETE Segment Response: ${deleteSegmentCommandOutput}`);
    const responseMetadata = deleteSegmentCommandOutput.$metadata;
    const statusCode = responseMetadata.httpStatusCode;
    const segmentResponse = deleteSegmentCommandOutput.SegmentResponse;
    if (statusCode === 200) {
      console.debug(`SEGEMENT DELETED. SEGEMENT ID: ${segmentResponse.Id}`);
      return {
        notificationsSegmentId: segmentResponse.Id,
        noitificationStatus: "DELETION COMPLETE",
      };
    }
  } catch (updateCourseSegmentOperationError) {
    console.debug(`ERROR SENDING DELETED SEGEMENT COMMAND FOR INSTITUDE WITH ID ${institutionId},COURSE ${courseCode} \n
            INFO: ${updateCourseSegmentOperationError}`);
    return {
      noitificationStatus: "DELETE FAILED",
    };
  }
};

module.exports = {
  createCourseSegmentName,
  setAndGetCreateSegmentCommandInput,
  createCourseSegmentOperation,
  setAndGetUpdateSegmentCommandInput,
  updateCourseSegemntOperation,
  setAndGetDeleteSegmentCommandInput,
  deleteCourseSegemntOperation,
};
