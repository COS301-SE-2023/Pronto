import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import ConfirmEmail from "../../../Authentication/Institution/ConfirmEmail";
import {MemoryRouter} from "react-router-dom";

describe("ConfirmEmail", () => {

    beforeEach(() => {
        render(
            <MemoryRouter>
                <ConfirmEmail />
            </MemoryRouter>

        );
    })

    it("renders without errors", () => {


        // Check if the UI components are present
        expect(screen.getByTestId("confirm-email-container")).toBeInTheDocument();
        expect(screen.getByTestId("logo-image")).toBeInTheDocument();
        expect(screen.getByTestId("confirm-account-title")).toBeInTheDocument();
        expect(screen.getByTestId("confirmation-message")).toBeInTheDocument();
        expect(screen.getByTestId("verification-code-input")).toBeInTheDocument();
        expect(screen.getByTestId("verify-button")).toBeInTheDocument();
    });





});
