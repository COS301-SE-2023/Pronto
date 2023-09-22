const { SendCustomVerificationEmailCommand } = require("@aws-sdk/client-ses");

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
module.exports = { verifyEmailAddressOperation };
