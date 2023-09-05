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
module.exports = {
  SEGMENT_NAME_SUFFIX,
  PINPOINT_SEGMENT_DIMENSIONS,
};
