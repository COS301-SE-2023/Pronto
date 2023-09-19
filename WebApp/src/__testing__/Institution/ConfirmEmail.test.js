import React from 'react';
import {render, fireEvent, act} from '@testing-library/react';
import ConfirmEmail from "../../Authentication/Institution/ConfirmEmail";
import {BrowserRouter} from "react-router-dom";



describe("ConfirmEmail Component", () => {

    it("test that verification is present and value can be changed", async () => {
        const { getByTestId,getByText, getByPlaceholderText } = render(<BrowserRouter><ConfirmEmail /></BrowserRouter>);

        // Mock email and code
        const email = "test@example.com";
        const code = "123456";

        // Fill in the code input field
        const codeInput = getByTestId("VerificationCode");
        fireEvent.change(codeInput, { target: { value: code } });

    });

    it("test that auth functionality works", async () => {
        const { getByTestId,getByText, getByPlaceholderText } = render(<BrowserRouter><ConfirmEmail /></BrowserRouter>);

        // Mock email and code
        const email = "test@example.com";
        const code = "123456";

        // Fill in the code input field
        const codeInput = getByTestId("VerificationCode");
        act(() => {
            fireEvent.change(codeInput, { target: { value: code } });
        });

        // Click the 'Verify Code' button
        const verifyButton = getByText("Verify Code");
        act(() => {
            fireEvent.click(verifyButton);
        });
           });

    //This test will check the logo, subtitle and input field are present
    it("test that logo, subtitle and input field are present", async () => {
        const { getByTestId,getByText, getByPlaceholderText } = render(<BrowserRouter><ConfirmEmail /></BrowserRouter>);

        // Check logo is present
        const logo = getByTestId("Logo");
        expect(logo).toBeInTheDocument();

        // Check subtitle is present
        const subtitle = getByTestId("Subtitle");
        expect(subtitle).toBeInTheDocument();

        // Check input field is present
        const codeInput = getByTestId("VerificationCode");
        expect(codeInput).toBeInTheDocument();
    });

    //This test will check if the button is present and can be clicked
    it("test that button is present and can be clicked", async () => {
        const { getByTestId,getByText, getByPlaceholderText } = render(<BrowserRouter><ConfirmEmail /></BrowserRouter>);

        // Check button is present
        const verifyButton = getByTestId("btnVerify");
        expect(verifyButton).toBeInTheDocument();

        // Click the 'Verify Code' button
        act(() => {
            fireEvent.click(verifyButton);
        });
    });


});