const { NOTIFICATIONS_STATUS } = require("./constants");
const { createSubject, createHtmlPart, createTextPart } = require("./message");
const { getEndPointAddresses } = require("./getAddresseses");

const setAndGetSendMessagesCommandInput = (announcement, endpoints) => {
  const addresses = getEndPointAddresses(announcement.courseId);
  const SendMessagesCommand = {
    ApplicationId: "",
    MessageRequest: {
      Addresses: { addresses },
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

const sendMessageOperation = async (sendMessageOperationInput) => {
  const { course, announcement, pinpointClient } = sendMessageOperationInput;
  const endpoints = {};
  const sendMessageCommandInput = setAndGetSendMessagesCommandInput(
    course,
    announcement,
    endpoints
  );
  try {
    const sendMessagesCommandOutput = await pinpointClient.send(
      sendMessagesCommand
    );
    const { $metadata, MessageResponse } = sendMessagesCommandOutput.$metadata;
    console.debug(
      `SEND  MESSAGE RESPONSE: ${JSON.stringify(sendMessagesCommandOutput)}`
    );
    if ($metadata.httpStatusCode !== 200) {
      return {
        EMAIL: NOTIFICATIONS_STATUS.FAILED,
        SMS: NOTIFICATIONS_STATUS.FAILED,
        announcement_Matrix: 0,
        info: "an error occured, please try again or contact your admin",
      };
    }
    let messageDeliveredCount = 0;
    MessageResponse.Result.map((MessageResult) => {
      if (MessageResult.DeliveryStatus === "SUCCESSFUL")
        messageDeliveredCount++;
    });
    return {
      EMAIL: NOTIFICATIONS_STATUS.SENT,
      SMS: NOTIFICATIONS_STATUS.SENT,
      announcement_Matrix: messageDeliveredCount,
      info: "sent to all channels successfuly",
    };
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
