const { PhoneNumberValidateCommand } = require("@aws-sdk/client-pinpoint");
const { PINPOINT_CONSTANTS } = require("./constants");

const isPhoneNumberPatternValid = (phoneNumber) => {
  const mobilePhoneNumberPattern = /^\+\d+$/;
  return mobilePhoneNumberPattern.test(phoneNumber);
};

const validateMobilePhoneNumberOperation = async (
  validateMobilePhoneNumberOperation
) => {
  const phoneNumberValidateCommandInput = {
    NumberValidateRequest: {
      IsoCountryCode: validateMobilePhoneNumberOperation.IsoCountryCode,
      PhoneNumber: validateMobilePhoneNumberOperation.phoneNumber,
    },
  };
  const phoneNumberValidateCommand = new PhoneNumberValidateCommand(
    phoneNumberValidateCommandInput
  );
  const pinpointClient = validateMobilePhoneNumberOperation.pinpointClient;
  try {
    const phoneNumberValidateCommandOutput = await pinpointClient.send(
      phoneNumberValidateCommand
    );
    const { $metadata, NumberValidateResponse } =
      phoneNumberValidateCommandOutput;
    return { NumberValidateResponse: NumberValidateResponse, error: null };
  } catch (phoneNumberValidateError) {
    console.debug(`ERROR VALIDATING PHONE NUMBER: ${phoneNumberValidateError}`);
    throw new Error("failed to verify phone number");
  }
};

