import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PasswordCriteriaMessage from '../../screens/Login/PasswordCriteriaMessage';
import expect from "expect";

describe('PasswordCriteriaMessage', () => {
    it('does not render icon for criteria not met', () => {
        const criteria = {
            length: true,
            uppercase: false,
            lowercase: true,
            digit: false,
            specialChar: true,
        };
        const { queryByTestId } = render(<PasswordCriteriaMessage criteria={criteria} />);

        expect(queryByTestId('uppercase-icon')).toBeNull();
        expect(queryByTestId('digit-icon')).toBeNull();
        // Repeat for other criteria
    });

    it('renders each criteria text with correct icon when met', () => {
        const criteria = {
            length: true,
            uppercase: true,
            lowercase: true,
            digit: true,
            specialChar: true,
        };
        const { getByText, getByTestId } = render(<PasswordCriteriaMessage criteria={criteria} />);

        const lengthCriteria = getByTestId('length-icon');
        expect(lengthCriteria).toBeTruthy();

        const uppercaseCriteria = getByTestId('uppercase-icon');
        expect(uppercaseCriteria).toBeTruthy();

    });





});
