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
  INSTITUDE_CREATED: "INSERT",
  INSTITUDE_UPDATED: "MODIFY",
  INSTITUDE_DELETED: "REMOVE",
});

const CAMPAIGN_NAME_SUFFIX = ":notifications:campaign";

module.exports = {
  DYNAMODB_CONSTANTS,
  DATASTREAM_ACTIONS,
  CAMPAIGN_NAME_SUFFIX,
};
