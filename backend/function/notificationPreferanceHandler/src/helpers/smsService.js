const { PhoneNumberValidateCommand } = require("@aws-sdk/client-pinpoint");
const { PINPOINT_CONSTANTS, PHONE_TYPE } = require("./constants");

const isPhoneNumberPatternValid = (phoneNumber) => {
  const mobilePhoneNumberPattern = /^\+27\d{9}/; //only SA Phone numbers are allowed
  return mobilePhoneNumberPattern.test(phoneNumber);
};

const validateMobilePhoneNumberOperation = async (
  validateMobilePhoneNumberRequest
) => {
  const phoneNumberValidateCommandInput = {
    ApplicationId: process.env.ANALYTICS_PRONTOANALYTICS_ID,
    NumberValidateRequest: {
      IsoCountryCode: process.env.ISO_COUNTRY_CODE,
      PhoneNumber: validateMobilePhoneNumberRequest.phoneNumber,
    },
  };
  const phoneNumberValidateCommand = new PhoneNumberValidateCommand(
    phoneNumberValidateCommandInput
  );
  const pinpointClient = validateMobilePhoneNumberRequest.pinpointClient;
  try {
    const phoneNumberValidateCommandOutput = await pinpointClient.send(
      phoneNumberValidateCommand
    );
    console.debug(
      `VALIDATE PHONE NUMBER RESPONSE: ${JSON.stringify(
        phoneNumberValidateCommandOutput
      )}`
    );
    const { $metadata, NumberValidateResponse } =
      phoneNumberValidateCommandOutput;
    if (
      $metadata.httpStatusCode === 200 &&
      NumberValidateResponse.PhoneTypeCode === PHONE_TYPE.MOBILE
    )
      return NumberValidateResponse;
    return null;
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
  console.table(smsEndPointRequest);
  if (!numberValidateResponse) throw new Error("number is not validated");
  const updateEndpointInput = {
    ApplicationId: process.env.ANALYTICS_PRONTOANALYTICS_ID,
    EndpointId: smsEndPointRequest.user.studentId,
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
