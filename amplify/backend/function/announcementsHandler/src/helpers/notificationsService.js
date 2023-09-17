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
  const { course, announcement, students } = sendMessageOperationInput;
  
};
