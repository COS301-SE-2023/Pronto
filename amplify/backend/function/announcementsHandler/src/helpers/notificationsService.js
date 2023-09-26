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
  sendMessageOperationInput,
  startIndex,
  batchSize,
  endpoints,
  messageDeliveredCount,
  pinpointClient
) => {
  const endIndex = Math.min(startIndex + batchSize, endpoints.length);
  const batch = endpoints.slice(startIndex, endIndex);
  console.log(`Processing batch ${startIndex + 1}-${endIndex}:`, batch);
  let batchProcessingErrorMessage;
  const sendMessageCommandInput = setAndGetSendMessagesCommandInput(
    course,
    announcement,
    endpoints
  );
  const sendMessagesCommand = new SendMessagesCommand(sendMessageCommandInput);
  const sendMessagesCommandOutput = await pinpointClient.send(
    sendMessagesCommand
  );
  const { $metadata, MessageResponse } = sendMessagesCommandOutput.$metadata;
  console.debug(
    `SEND  MESSAGE RESPONSE: ${JSON.stringify(sendMessagesCommandOutput)}`
  );
  if ($metadata.httpStatusCode !== 200)
    (batchProcessingErrorMessage = `an error occured,notifications may have not been sent to all students.
      Please try again or contact your admin. `),
      MessageResponse.Result.map((MessageResult) => {
        if (MessageResult.DeliveryStatus === "SUCCESSFUL")
          messageDeliveredCount++;
      });
  if (endIndex < addresses.length) {
    setTimeout(() => {
      processBatch(sendMessageOperationInput, endIndex, batchSize);
    }, 1000);
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
  const endpoints = getEndPointAddresses(announcement.courseId);
  let messageDeliveredCount = 0;
  try {
    await processBatchsendMessageOperation(
      sendMessageOperationInput,
      0,
      100,
      endpoints,
      messageDeliveredCount,
      pinpointClient
    );
  } catch (sendMessagesError) {
    console.debug(
      `ERRO SENDING MESSAGES FOR ${course.id}. INFO: ${sendMessagesError}`
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
