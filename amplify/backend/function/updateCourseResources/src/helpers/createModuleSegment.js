const createModuleSegmentName = (institutionName, moduleCode) => {
  formattedInstitutionName = institutionName.toLowerCase().replaceAll(" ", "+");
  formattedModuleCode = moduleCode.toLowerCase().replaceAll(" ", "+");
  return (
    formattedInstitutionName + ":" + formattedModuleCode + SEGMENT_NAME_SUFFIX
  );
};

const createModuleSegmentCommandInput = (institutionName, moduleCode) => {
  const moduleSegmentName = createModuleSegmentName(
    institutionName,
    moduleCode
  );
  const emailSegmentGroupDimensions = {
    Attributes: {
      Values: [moduleCode],
      AttributeType: PINPOINT_SEGMENT_DIMENSIONS.ATTRIBUTES.ATTRIBUTE_TYPE,
    },
    Behavior: PINPOINT_SEGMENT_DIMENSIONS.BEHAVIOUR,
    Demographic: PINPOINT_SEGMENT_DIMENSIONS.EMAIL_DEMOGRAPHIC,
  };
  const smsSegmentGroupDimensions = {
    Attributes: {
      Values: [moduleCode],
      AttributeType: PINPOINT_SEGMENT_DIMENSIONS.ATTRIBUTES.ATTRIBUTE_TYPE,
    },
    Behavior: PINPOINT_SEGMENT_DIMENSIONS.BEHAVIOUR,
    Demographic: PINPOINT_SEGMENT_DIMENSIONS.SMS_DEMOGRAPHIC,
  };
  const pushSegmentGroupDimensions = {
    Attributes: {
      Values: [moduleCode],
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

const updateCourseResources = async (UpdateOption) => {
  switch (UpdateOption) {
    case DATASTREAM_ACTIONS.COURSE_CREATED:
      //create lecturer segement group for module
      //create student segment group
      //create segment, add groups
      //get institution campain
      //add segement
      //WRITE segmentIDs WRITE to institutionDB, on COURSETABLE
      //Update notifications status on course table
      break;
    default:
      break;
  }
};
module.exports = { createModuleSegmentName, createModuleSegmentCommandInput };
