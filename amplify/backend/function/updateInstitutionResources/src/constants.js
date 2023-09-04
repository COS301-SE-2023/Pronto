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
module.exports = { DYNAMODB_CONSTANTS, DATASTREAM_ACTIONS };
