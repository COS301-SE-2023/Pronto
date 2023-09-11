const SEGMENT_NAME_SUFFIX = ":notifications:segment";
const PINPOINT_SEGMENT_DIMENSIONS = Object.freeze({
  ATTRIBUTES: { ATTRIBUTE_TYPE: "INCLUSIVE" },
  BEHAVIOUR: {
    Recency: {
      Duration: "DAY_30",
      RecencyType: "ACTIVE",
    },
  },
  EMAIL_DEMOGRAPHIC: {
    Channel: {
      Values: ["EMAIL"],
      DimensionType: "INCLUSIVE",
    },
  },
  PUSH_DEMOGRAPHIC: {
    Channel: {
      Values: ["PUSH"],
      DimensionType: "INCLUSIVE",
    },
  },
  SMS_DEMOGRAPHIC: {
    Channel: {
      Values: ["SMS"],
      DimensionType: "INCLUSIVE",
    },
  },
  SEGMENT_GROUPS: {
    STUDENT_GROUP: {
      TYPE: "ANY",
    },
    INCLUDE: "ANY",
  },
});

const PINPOINT_CONSTANTS = Object.freeze({
  CampaignStatus: {
    COMPLETED: "COMPLETED",
    DELETED: "DELETED",
    EXECUTING: "EXECUTING",
    INVALID: "INVALID",
    PAUSED: "PAUSED",
    PENDING_NEXT_RUN: "PENDING_NEXT_RUN",
    SCHEDULED: "SCHEDULED",
  },
});

const GRAPHQL = Object.freeze({
  OBJECT_TYPES: { MUTATION: "mutation", QUERY: "Query" },
  FIELD_TYPES: {
    UPDATE_COURSE: "updateCourse",
    DELETE_COURSE: "deleteCourse",
    CREATE_COURSE: "createCourse",
  },
});

module.exports = {
  SEGMENT_NAME_SUFFIX,
  PINPOINT_SEGMENT_DIMENSIONS,
  PINPOINT_CONSTANTS,
  GRAPHQL,
};
