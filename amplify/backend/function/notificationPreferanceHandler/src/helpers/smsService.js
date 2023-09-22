const { PhoneNumberValidateCommand } = require("@aws-sdk/client-pinpoint");
const { PINPOINT_CONSTANTS } = require("./constants");

const isPhoneNumberPatternValid = (phoneNumber) => {
  const mobilePhoneNumberPattern = /^\+\d+$/;
  return mobilePhoneNumberPattern.test(phoneNumber);
};

