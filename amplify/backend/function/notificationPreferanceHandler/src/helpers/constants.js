const PINPOINT_CONSTANTS = Object.freeze({
  CHANNEL_TYPES: {
    EMAIL: "EMAIL",
    SMS: "SMS",
    PUSH: "PUSH",
  },

  ENDPOINT_STATUS: "ACTIVE",
});
const SES_CONSTANTS = Object.freeze({ EMAIL: "EMAIL" });
module.exports = { PINPOINT_CONSTANTS, SES_CONSTANTS };
