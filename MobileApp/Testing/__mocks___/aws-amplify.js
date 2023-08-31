// __mocks__/aws-amplify.js

const Auth = {
    confirmSignUp: jest.fn(),
    resendSignUp: jest.fn(),
};

module.exports = {
    Auth
};