import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ConfirmEmail from '../../screens/Login/ConfirmEmail';
import { Alert } from 'react-native';
import expect from 'expect';

// Import the mocked Auth object from the manual mock
import { Auth } from '../__mocks___/aws-amplify'; // Assuming this is the path to your manual mock

// Import the code to mock AsyncStorage
import MockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => MockAsyncStorage);

// Mock the other dependencies as you've done before
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useRoute: () => ({
        params: { email: 'test@example.com' },
    }),
}));

jest.mock('aws-amplify', () => ({
    Auth: {
        confirmSignUp: jest.fn(),
        resendSignUp: jest.fn(),
    },
}));

describe("ConfirmEmail", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("handles successful verification", async () => {
        const mockNavigate = jest.fn();
        const mockAlert = jest.spyOn(Alert, "alert");
        const mockConfirmSignUp = Auth.confirmSignUp.mockResolvedValue();

        const { getByTestId, getByPlaceholderText, getByText } = render(
            <ConfirmEmail navigation={{ navigate: mockNavigate }} />
        );

        // ... simulate user entering code and pressing verification button
        fireEvent.changeText(getByPlaceholderText("Code"), "123456");
        fireEvent.press(getByTestId("verify-button"));

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith("Login")
        );


        // Ensure Alert.alert was called with appropriate arguments for success
        expect(mockAlert).toHaveBeenCalledWith("Success", "Login to access your account.");

        // Reset the mocks for further testing
        mockNavigate.mockReset();
        mockConfirmSignUp.mockReset();
        mockAlert.mockReset();
    });


});