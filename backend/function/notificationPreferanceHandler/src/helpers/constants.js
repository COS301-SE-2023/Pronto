const PINPOINT_CONSTANTS = Object.freeze({
  CHANNEL_TYPES: {
    EMAIL: "EMAIL",
    SMS: "SMS",
    PUSH: "PUSH",
  },
  ENDPOINT_STATUS: "ACTIVE",
});

const NOTIFICATIONS_STATUS = Object.freeze({
  UPDATED: "UPDATED",
  DISABLED: "DISABLE",
  FAILED: "FAILED",
  OPERATIONAL: "OPERATIONAL",
});

const PHONE_TYPE = Object.freeze({
  MOBILE: 0,
});

const SES_CONSTANTS = Object.freeze({ EMAIL: "EMAIL" });
module.exports = {
  PINPOINT_CONSTANTS,
  SES_CONSTANTS,
  NOTIFICATIONS_STATUS,
  PHONE_TYPE,
};
