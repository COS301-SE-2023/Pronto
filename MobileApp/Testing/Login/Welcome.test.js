import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from "../../screens/Login/Welcome";

describe('WelcomeScreen', () => {
    it('renders correctly', () => {
        const { getByText, getByTestId } = render(<WelcomeScreen />);

        const title = getByText('Make your first step into university easier');
        const description = getByText('Create customised timetables, find your way around campus and get notified of upcoming events');
        const loginButton = getByText('Login');
        const registerButton = getByText('Register');

        expect(title).toBeTruthy();
        expect(description).toBeTruthy();
        expect(loginButton).toBeTruthy();
        expect(registerButton).toBeTruthy();
        expect(getByTestId('image-background')).toBeTruthy();
    });

    it('navigates to Login screen when Login button is pressed', () => {
        const navigationMock = { navigate: jest.fn() };
        const { getByText } = render(<WelcomeScreen navigation={navigationMock} />);
        const loginButton = getByText('Login');

        fireEvent.press(loginButton);

        expect(navigationMock.navigate).toHaveBeenCalledWith('Login');
    });

    it('navigates to Register screen when Register button is pressed', () => {
        const navigationMock = { navigate: jest.fn() };
        const { getByText } = render(<WelcomeScreen navigation={navigationMock} />);
        const registerButton = getByText('Register');

        fireEvent.press(registerButton);

        expect(navigationMock.navigate).toHaveBeenCalledWith('Register');
    });

    it('matches snapshot', () => {
        const { toJSON } = render(<WelcomeScreen />);

        expect(toJSON()).toMatchSnapshot();
    });
});
