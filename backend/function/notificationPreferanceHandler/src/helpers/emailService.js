const { SendCustomVerificationEmailCommand } = require("@aws-sdk/client-ses");

const isEmailAddressPatternValid = (enailAddress) => {
  const emailAddressPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailAddressPattern.test(enailAddress);
};
const verifyEmailAddressOperation = async (verifyEmailAddressRequst) => {
  console.log({ verifyEmailAddressRequst });
  const { user, sesClient } = verifyEmailAddressRequst;
  const emailAddress = user.emailAddress;
  if (!emailAddress) throw new Error("please enter a valid email address");
  try {
    console.log(`ATTEMPTING TO VERIFY EMAIL ADDRESS: ${emailAddress}`);
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
    console.error(`ERROR VERIFYING EMAIL: ${verifyEmailAddressOperationError}`);
    throw new Error("Email verification failed");
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
