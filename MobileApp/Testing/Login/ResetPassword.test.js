import React from "react";
import {render, fireEvent, waitFor, act} from "@testing-library/react-native";
import ResetPassword from "../../screens/Login/ResetPassword";
import expect from "expect";

jest.mock("aws-amplify", () => ({
    Auth: {
        forgetPassword : jest.fn()}}));


describe("ResetPassword Component", () => {
    it("renders correctly", () => {
        const { getByTestId } = render(<ResetPassword />);
        expect(getByTestId("reset-password-title")).toBeTruthy();
        expect(getByTestId("reset-password-subtitle")).toBeTruthy();
        expect(getByTestId("email-input")).toBeTruthy();
        expect(getByTestId("send-code-button")).toBeTruthy();
        expect(getByTestId("back-to-sign-in-button")).toBeTruthy();

    });

    it("renders the `checkmark-icon` component when the `isTypingEmail` state variable is set to `true` and the email input is valid", () => {
        const { getByTestId } = render(<ResetPassword />);
        const sendCodeButton = getByTestId("send-code-button");

        fireEvent.changeText(getByTestId("email-input"), "u21598267@tuks.co.za");
        act(() => {
            fireEvent.press(sendCodeButton);
        });




    });




});
