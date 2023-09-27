const { SendCustomVerificationEmailCommand } = require("@aws-sdk/client-ses");

const isEmailAddressPatternValid = (enailAddress) => {
  const emailAddressPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailAddressPattern.test(enailAddress);
};
const verifyEmailAddressOperation = async (verifyEmailAddressRequst) => {
  console.table(verifyEmailAddressRequst);
  const { user, sesClient } = verifyEmailAddressRequst;
  const emailAddress = user.emailAddress;
  if (!emailAddress || !sesClient)
    throw new Error("NULL EMAIL ADDRESS OR SES CLIENT");
  try {
    console.debug(`ATTEMPTING TO VERIFY EMAIL ADDRESS: ${emailAddress}`);
    const sendCustomVerificationEmailCommandInput = {
      EmailAddress: emailAddress,
      TemplateName: "SampleTemplates",
      ConfigurationSetName: "pronto",
    };
    const sendCustomVerificationEmailCommand =
      new SendCustomVerificationEmailCommand(
        sendCustomVerificationEmailCommandInput
      );
    const VerifyDomainIdentityCommandOutput = await sesClient.send(
      sendCustomVerificationEmailCommand
    );
    const { $metadata } = VerifyDomainIdentityCommandOutput;
    if ($metadata.httpStatusCode === 200) return true;
  } catch (verifyEmailAddressOperationError) {
    console.debug(`ERROR VERIFYING EMAIL: ${verifyEmailAddressOperationError}`);
    return false;
  }
};

const getUpdateEmailEndpointCommandInput = (emailEndPointRequest) => {
  if (!isEmailAddressPatternValid(emailEndPointRequest.user.emailAddress))
    throw new Error(
      "email address is not provided or has an invalid email pattern"
    );
  const updateEndpointCommandInput = {
    ApplicationId: process.env.ANALYTICS_PRONTOANALYTICS_ID,
    EndpointId: emailEndPointRequest.user.studentId,
    EndpointRequest: {
      Address: emailEndPointRequest.user.emailAddress,
      ChannelType: PINPOINT_CONSTANTS.CHANNEL_TYPES.EMAIL,
      Demographic: {},
      EndpointStatus: PINPOINT_CONSTANTS.ENDPOINT_STATUS,
      Metrics: {},
      User: {
        UserAttributes: {},
        UserId: emailEndPointRequest.user.studentId,
      },
    },
  };
  return updateEndpointCommandInput;
};
module.exports = {
  verifyEmailAddressOperation,
  getUpdateEmailEndpointCommandInput,
};
