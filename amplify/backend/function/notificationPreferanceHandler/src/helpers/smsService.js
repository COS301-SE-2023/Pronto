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

const getUpdateSmsEndpointCommandInput = async (smsEndPointRequest) => {
  if (!isPhoneNumberPatternValid(smsEndPointRequest.phoneNumber))
    throw new Error(
      "Invalid phone number pattern! Number should be follow the pattern +27123456789"
    );
  const numberValidateResponse = await validateMobilePhoneNumberOperation(
    smsEndPointRequest
  );
  if (!numberValidateResponse) throw new Error("number is not validated");
  const updateEndpointInput = {
    ApplicationId: projectId,
    EndpointId: endpointId,
    EndpointRequest: {
      ChannelType: PINPOINT_CONSTANTS.CHANNEL_TYPES.SMS,
      Address: smsEndPointRequest.phoneNumber,
      OptOut: "NONE",
      Location: {
        PostalCode: numberValidateResponse.ZipCode,
        City: numberValidateResponse.City,
        Country: numberValidateResponse.CountryCodeIso2,
      },
      Demographic: {
        Timezone: numberValidateResponse.Timezone,
      },
      Attributes: {},
      User: {
        UserAttributes: {},
        UserId: smsEndPointRequest.user.studentId,
      },
    },
  };
  return updateEndpointInput;
};

module.exports = { getUpdateSmsEndpointCommandInput };
