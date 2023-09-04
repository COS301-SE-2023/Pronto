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

const CAMPAIN_NAME_SUFFIX = Object.freeze({
  EMAIL: ":email:notifications:Campaign",
  SMS: ":sms:notifications:Campaign",
  PUSH_NOTIFICATIONS: ":push:notifications:Campaign",
});
module.exports = {
  DYNAMODB_CONSTANTS,
  DATASTREAM_ACTIONS,
  CAMPAIN_NAME_SUFFIX,
};
