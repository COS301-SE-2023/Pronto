import React from 'react';
import { render, fireEvent, getByPlaceholderText, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ForgotPassword from '../../../Authentication/Institution/ForgotPassword';

// Mock the external dependencies
jest.mock('aws-amplify', () => ({
    Auth: {
        forgotPassword: jest.fn(),
        forgotPasswordSubmit: jest.fn(),
    },
}));
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));


describe('ForgotPassword', () => {
    test('renders the email input and "Get Code" button in step 1', () => {
        const {getByPlaceholderText, getByText} = render(<ForgotPassword/>);
        const emailInput = getByPlaceholderText('Email');
        const getCodeButton = getByText('Get Code');
        expect(emailInput).toBeInTheDocument();
        expect(getCodeButton).toBeInTheDocument();
    });



});