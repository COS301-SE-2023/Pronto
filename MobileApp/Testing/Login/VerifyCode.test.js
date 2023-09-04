import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import {NavigationContainer, useRoute} from "@react-navigation/native";
import VerifyCode from "../../screens/Login/VerifyCode";
import { Auth } from "../__mocks___/aws-amplify";
import expect from "expect";
import {getByGestureTestId} from "react-native-gesture-handler/jest-utils";
import {Alert} from "react-native";

jest.mock("aws-amplify", () => ({
    Auth: {
        forgotPasswordSubmit: jest.fn()
    }
}));

jest.mock("@react-navigation/native", () => {
    return {
        ...jest.requireActual("@react-navigation/native"),
        useRoute: () => ({ params: { email: "test@example.com" } })
    };
});

describe("VerifyCode", () => {
    it("renders correctly", () => {
        const { getByPlaceholderText, getByTestId } = render(
            <NavigationContainer>
                <VerifyCode />
            </NavigationContainer>
        );

        const codeInput = getByPlaceholderText("Code");
        const newPasswordInput = getByPlaceholderText("New Password");
        const confirmPasswordInput = getByPlaceholderText("Confirm New Password");
        const resetButton = getByTestId("reset-button"); // Update this to match your actual test ID

        expect(codeInput).toBeDefined();
        expect(newPasswordInput).toBeDefined();
        expect(confirmPasswordInput).toBeDefined();
        expect(resetButton).toBeDefined();
    });

    it("validates password input", () => {
        const { getByPlaceholderText, getByTestId } = render(
            <NavigationContainer>
                <VerifyCode />
            </NavigationContainer>
        );

        const newPasswordInput = getByPlaceholderText("New Password");
        fireEvent.changeText(newPasswordInput, "Strong@Password123");
        expect(getByTestId('new-password').props.value).toEqual("Strong@Password123");

        const confirmPasswordInput = getByPlaceholderText("Confirm New Password");
        fireEvent.changeText(confirmPasswordInput, "Strong@Password123");
        expect(getByTestId('confirm-new-password').props.value).toEqual("Strong@Password123");
    });

    it("navigates back to sign in on press", () => {
        const mockNavigation = {
            navigate: jest.fn(),
        };

        const { getByTestId } = render(
            <NavigationContainer>
                <VerifyCode navigation={mockNavigation} />
            </NavigationContainer>
        );

        const backButton = getByTestId('back-to-sign-in');
        fireEvent.press(backButton);

        expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
    });

    it("validates password input", () => {
        const { getByPlaceholderText, getByTestId } = render(
            <NavigationContainer>
                <VerifyCode />
            </NavigationContainer>
        );

        const newPasswordInput = getByPlaceholderText("New Password");

        fireEvent.changeText(newPasswordInput, "Strong@Password123");
        expect(getByTestId('new-password').props.value).toEqual("Strong@Password123");

        const confirmPasswordInput = getByPlaceholderText("Confirm New Password");
        fireEvent.changeText(confirmPasswordInput, "Strong@Password123");
        expect(getByTestId('confirm-new-password').props.value).toEqual("Strong@Password123");
    });

    it("displays password match status", () => {
        const { getByPlaceholderText, getByTestId } = render(
            <NavigationContainer>
                <VerifyCode />
            </NavigationContainer>
        );

        const confirmPasswordInput = getByPlaceholderText("Confirm New Password");

        fireEvent.changeText(confirmPasswordInput, "Strong@Password123");
        expect(getByTestId('confirm-new-password').props.value).toEqual("Strong@Password123");

        fireEvent.changeText(confirmPasswordInput, "InvalidPassword");
        expect(getByTestId('confirm-new-password').props.value).toEqual("InvalidPassword");
    });

    it("navigates to Login on 'Back to sign in' press", () => {
        const mockNavigation = {
            navigate: jest.fn(),
        };

        const { getByTestId } = render(
            <NavigationContainer>
                <VerifyCode navigation={mockNavigation} />
            </NavigationContainer>
        );

        const backButton = getByTestId('back-to-sign-in');
        fireEvent.press(backButton);

        expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
    });

    it("handles reset password action", async () => {
        const mockNavigate = jest.fn();
        const mockAlert = jest.spyOn(Alert, 'alert');
        const mockForgotPasswordSubmit = Auth.forgotPasswordSubmit.mockResolvedValue();

        const { getByTestId, getByPlaceholderText } = render(
            <NavigationContainer>
                <VerifyCode navigation={{ navigate: mockNavigate }} />
            </NavigationContainer>
        );

        fireEvent.changeText(getByPlaceholderText("Code"), "123456");
        fireEvent.changeText(getByPlaceholderText("New Password"), "Strong@Password123");
        fireEvent.changeText(getByPlaceholderText("Confirm New Password"), "Strong@Password123");

        fireEvent.press(getByTestId('reset-button'));

        // Wait for navigation and other asynchronous actions to complete
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('Login');


            // Ensure Alert.alert was called with appropriate arguments for success
            expect(mockAlert).toHaveBeenCalledWith("Success", "Password successfully changed!");
        });

        // Reset the mocks for further testing
        mockNavigate.mockReset();
        mockForgotPasswordSubmit.mockReset();
        mockAlert.mockReset();
    });
});
