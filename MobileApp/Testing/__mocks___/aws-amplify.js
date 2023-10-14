// __mocks__/aws-amplify.js


const Auth = {
    confirmSignUp: jest.fn(),
    resendSignUp: jest.fn(),
    signIn: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    currentAuthenticatedUser: jest.fn(),
    forgotPassword: jest.fn(),
    forgotPasswordSubmit: jest.fn(),
    currentSession: jest.fn(),
    verifyCurrentUserAttribute: jest.fn(),
    verifyCurrentUserAttributeSubmit: jest.fn(),
};

module.exports = {
    Auth
};
