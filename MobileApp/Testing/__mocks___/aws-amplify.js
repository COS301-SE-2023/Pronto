// __mocks__/aws-amplify.js
// __mocks__/aws-amplify.js
import MockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
    __esModule: true,
    default: MockAsyncStorage,
}));

const Auth = {
    confirmSignUp: jest.fn(),
    resendSignUp: jest.fn(),
};

module.exports = {
    Auth
};
