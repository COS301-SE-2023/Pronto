const { SendMessagesCommand } = require("@aws-sdk/client-pinpoint");
const { NOTIFICATIONS_STATUS } = require("./constants");
const { createSubject, createHtmlPart, createTextPart } = require("./message");

const getEndPoints = /* GraphQL */ `
  query MyQuery {
    getCourse(id: $input) {
      enrollments() {
        items {
          student {
            preference {
              endpointID
              type
            }
          }
        }
      }
    }
  }
`;

const setAndGetSendMessagesCommandInput = (announcement, endpoints) => {
  const SendMessagesCommand = {
    ApplicationId: process.env.ANALYTICS_PRONTONOTIFICATIONS_ID,
    MessageRequest: {
      Addresses: {
        ["bandisamasilela@gmail.com"]: {
          ChannelType: "EMAIL",
        },
        ["andilengwenya2001@gmail.com"]: {
          ChannelType: "EMAIL",
        },
      },
      MessageConfiguration: {
        EmailMessage: {
          FromAddress: process.env.PRONTO_NOTIFICATIONS_EMAIL,
          SimpleEmail: {
            Subject: createSubject(announcement),
            HtmlPart: createHtmlPart(announcement),
            TextPart: createTextPart(announcement),
          },
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
  const { announcement, pinpointClient } = sendMessageOperationInput;
  const endpoints = {};
  const sendMessageCommandInput = setAndGetSendMessagesCommandInput(
    announcement,
    endpoints
  );
  const sendMessagesCommand = new SendMessagesCommand(sendMessageCommandInput);
  try {
    const sendMessagesCommandOutput = await pinpointClient.send(
      sendMessagesCommand
    );
    const responseMetadata = sendMessagesCommandOutput.$metadata;
    console.debug(
      `SEND  MESSAGE RESPONSE: ${JSON.stringify(sendMessagesCommandOutput)}`
    );
    console.debug(
      JSON.stringify(sendMessagesCommandOutput.MessageResponse.Result)
    );
    if (responseMetadata.httpStatusCode === 200)
      return { EMAIL: NOTIFICATIONS_STATUS.SENT };
  } catch (sendMessagesError) {
    console.debug(
      `ERRO SENDING MESSAGES FOR ${announcement}. INFO: ${sendMessagesError}`
    );
    return { EMAIL: NOTIFICATIONS_STATUS.FAILED };
  }
};

module.exports = {
  sendMessageOperation,
  setAndGetSendMessagesCommandInput,
};
