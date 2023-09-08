const DYNAMODB_CONSTANTS = Object.freeze({
  Record: {
    eventNames: {
      INSERT: "INSERT",
      MODIFY: "MODIFY",
      REMOVE: "REMOVE",
    },
  },
});

const DATASTREAM_EVENT_NAMES = Object.freeze({
  INSTITUDE_CREATED: "INSERT",
  INSTITUDE_UPDATED: "MODIFY",
  INSTITUDE_DELETED: "REMOVE",
});

const CAMPAIGN_NAME_SUFFIX = ":notifications:campaign";

module.exports = {
  DYNAMODB_CONSTANTS,
  DATASTREAM_EVENT_NAMES,
  CAMPAIGN_NAME_SUFFIX,
};
