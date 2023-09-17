const { NOTIFICATIONS_STATUS } = require("./constants");

const getEndPoints = /* GraphQL */ `
  query MyQuery {
    getCourse(id: $input) {
      enrollments(limit: 100) {
        items {
          student {
            preference {
              enpointID
              type
            }
          }
        }
      }
    }
  }
`;

const setAndGetSendMessagesCommandInput = (course, announcement, endpoints) => {
  const SendMessagesCommand = {
    ApplicationId: "",
    MessageRequest: {
      MessageConfiguration: {
        EmailMessage: {
          SimpleEmail: {
            HtmlPart: { Charset: "UTF-8", Data: "" },
            Subject: { Charset: "UTF-8", Data: "" },
            TextPart: { Charset: "UTF-8", Data: "" },
          },
          Substitutions: { ...announcement },
          ReplyToAddresses: ["no-reply@pronto.app"],
          FromAddress: process.env.PRONTO_NOTIFICATIONS_EMAIL,
        },
        APNSMessage: {}, //to be implemented
        SMSMessage: {}, //to be implemented
      },
    },
    Endpoints: endpoints,
    //   Endpoints: {
    //     [endpointId]: {
    //       //append array of endpoints
    //       Context: { ...course },
    //     },
    //   },
    TemplateConfiguration: {
      EmailTemplate: {
        Name: process.env.EMAIL_TEMPLATE_NAME,
      },
      PushTemplate: {
        Name: process.env.PUSH_TEMPLATE_NAME,
      },
      SMSTemplate: {
        Name: process.env.SMS_TEMPLATE_NAME,
      },
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
    const sendMessagesCommandOutput = await pinpointClient.send();
    const responseMetadata = sendMessagesCommandOutput.$metadata;
    if (responseMetadata.httpStatusCode === 200)
      return { EMAIL: NOTIFICATIONS_STATUS.SENT };
  } catch (sendMessagesError) {
    console.debug(
      `ERRO SENDING MESSAGES FOR ${course.id}. INFO: ${sendMessagesError}`
    );
    return { EMAIL: NOTIFICATIONS_STATUS.FAILED };
  }
};

module.exports = {
  sendMessageOperation,
  setAndGetSendMessagesCommandInput,
};
