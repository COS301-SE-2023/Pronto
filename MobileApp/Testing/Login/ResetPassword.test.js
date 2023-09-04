import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
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




});
