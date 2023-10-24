const { SendMessagesCommand } = require("@aws-sdk/client-pinpoint");
const { NOTIFICATIONS_STATUS } = require("./constants");
const { createSubject, createHtmlPart, createTextPart } = require("./message");
const { getEndPointAddresses } = require("./getAddresseses");

const setAndGetSendMessagesCommandInput = (announcement, endpoints) => {
  const SendMessagesCommand = {
    ApplicationId: process.env.ANALYTICS_PRONTOANALYTICS_ID,
    MessageRequest: {
      Addresses: { endpoints },
      MessageConfiguration: {
        EmailMessage: {
          FromAddress: process.env.PRONTO_NOTIFICATIONS_EMAIL,
          SimpleEmail: {
            Subject: createSubject(announcement),
            HtmlPart: createHtmlPart(announcement),
            TextPart: createTextPart(announcement),
          },
        },
        SMSMessage: {
          MessageType: "TRANSACTIONAL",
          Body: JSON.stringify(announcement),
        },
      },
      // TemplateConfiguration: {
      //   EmailTemplate: {
      //     Name: process.env.EMAIL_TEMPLATE_NAME,
      //   },
      //   PushTemplate: {
      //     Name: process.env.PUSH_TEMPLATE_NAME,
      //   },
      //   SMSTemplate: {
      //     Name: process.env.SMS_TEMPLATE_NAME,
      //   },
      // },
    },
  };
  return SendMessagesCommand;
};

const processBatchsendMessageOperation = async (
  announcement,
  startIndex,
  batchSize,
  endpoints,
  messageDeliveredCount,
  pinpointClient
) => {
  const SIZE = Math.min(startIndex + batchSize, endpoints.length);
  for (let batchIndex = 0; batchIndex < SIZE; batchIndex + batchSize) {
    console.log(
      `Processing batch ${batchIndex + 1}-${
        endbatchIndex + batchSizeIndex
      }:, ${JSON.stringify(batch)}`
    );
    const batchEndPoints = endpoints.slice(batchIndex, batchIndex + batchSize);
    let batchProcessingErrorMessage = "";
    const sendMessageCommandInput = setAndGetSendMessagesCommandInput(
      announcement,
      batchEndPoints
    );
    const sendMessagesCommand = new SendMessagesCommand(
      sendMessageCommandInput
    );
    const sendMessagesCommandOutput = await pinpointClient.send(
      sendMessagesCommand
    );
    const { $metadata, MessageResponse } = sendMessagesCommandOutput.$metadata;
    console.debug(
      `SEND  MESSAGE RESPONSE: ${JSON.stringify(sendMessagesCommandOutput)}`
    );
    if ($metadata.httpStatusCode === 200)
      MessageResponse.Result.forEach((MessageResult) => {
        if (MessageResult.DeliveryStatus === "SUCCESSFUL")
          messageDeliveredCount++;
      });
    else if ($metadata.httpStatusCode !== 200)
      batchProcessingErrorMessage = `an error occured,notifications may have not been sent to all students.
    Please try again or contact your admin. `;
    if (batchIndex < addresses.length) {
      setTimeout(
        () =>
          console.log(
            `Processed batch ${batchIndex + 1}-${batchIndex + batchSize}:`
          ),
        1000
      );
    }
  }
  console.log("Processing complete.");
  return {
    EMAIL: NOTIFICATIONS_STATUS.SENT,
    SMS: NOTIFICATIONS_STATUS.SENT,
    announcement_Matrix: messageDeliveredCount,
    info: !batchProcessingErrorMessage
      ? "notifications have been sent to all enrolled students"
      : batchProcessingErrorMessage,
  };
};

const sendMessageOperation = async (sendMessageOperationInput) => {
  const { announcement, pinpointClient } = sendMessageOperationInput;
  let messageDeliveredCount = 0;
  try {
    const endpoints = getEndPointAddresses(announcement.courseId);
    await processBatchsendMessageOperation(
      announcement,
      0,
      100,
      endpoints,
      messageDeliveredCount,
      pinpointClient
    );
  } catch (sendMessagesError) {
    console.debug(
      `ERRO SENDING MESSAGES FOR ${announcement}. INFO: ${sendMessagesError}`
    );
    return {
      EMAIL: NOTIFICATIONS_STATUS.FAILED,
      SMS: NOTIFICATIONS_STATUS.FAILED,
      announcement_Matrix: 0,
      info: "an error occured, please try again or contact your admin",
    };
  }
};

module.exports = {
  sendMessageOperation,
  setAndGetSendMessagesCommandInput,
};
