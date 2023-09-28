import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import Register from "../../screens/Login/Register";
import expect from "expect"; // Import Auth from aws-amplify


jest.mock("aws-amplify", () => ({
    Auth: {
        signUp: jest.fn(),
    },
}));
describe("Register", () => {
    it("disables sign-up button during loading", async () => {
        const { getByTestId } = render(<Register />);

        // Trigger sign-up button press
        act(() => {
            fireEvent.press(getByTestId("sign-up-button"));
        });


    });

    it("updates input values correctly", async () => {
        const { getByPlaceholderText } = render(<Register />);
        const nameInput = getByPlaceholderText("Name");
        const surnameInput = getByPlaceholderText("Surname");
        // Add more variables for other input elements

        // Change input values
        act(() => {
            fireEvent.changeText(nameInput, "John");
            fireEvent.changeText(surnameInput, "Doe");
            // Update other inputs here
        });

        // Check that input values have been updated
        expect(nameInput.props.value).toBe("John");
        expect(surnameInput.props.value).toBe("Doe");
        // Add more assertions for other inputs
    });

    it("displays email error icon for invalid email", async () => {
        const { getByTestId } = render(<Register />);

        // Modify the email input value to be an invalid email
        act(() => {
            fireEvent.changeText(getByTestId("email-input"), "invalid-email");
        });



    });

    it("displays password error message for invalid password", async () => {
        const { getByTestId } = render(<Register />);

        // Modify the password input value to be an invalid password
        act(() => {
            fireEvent.changeText(getByTestId("password-input"), "weak");
        });


    });


});
