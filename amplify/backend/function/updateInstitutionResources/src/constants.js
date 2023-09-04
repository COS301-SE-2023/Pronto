const DYNAMODB_CONSTANTS = Object.freeze({
  Record: {
    eventNames: {
      INSERT: "INSERT",
      MODIFY: "MODIFY",
      REMOVE: "REMOVE",
    },
  },
});

const DATASTREAM_ACTIONS = Object.freeze({
  INSTITUDE_CREATED: 0,
  INSTITUDE_UPDATED: 1,
  MODULE_CODES_UPDATED: 2,
});

const CAMPAIGN_NAME_SUFFIX = Object.freeze({
  EMAIL: ":email:notifications:Campaign",
  SMS: ":sms:notifications:Campaign",
  PUSH_NOTIFICATIONS: ":push:notifications:Campaign",
});

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
  DYNAMODB_CONSTANTS,
  DATASTREAM_ACTIONS,
  CAMPAIGN_NAME_SUFFIX,
  SEGMENT_NAME_SUFFIX,
  PINPOINT_SEGMENT_DIMENSIONS,
};
