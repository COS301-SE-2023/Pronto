import React from 'react';
import { render } from '@testing-library/react-native';
import AboutScreen from '../../screens/Settings/About';
import expect from "expect";

describe('AboutScreen', () => {
    it('renders correctly', () => {
        const { getByText,getByTestId } = render(<AboutScreen />);

        const heading = getByText('About Pronto');
        const text1 = getByTestId('intro');
        expect(text1).toBeTruthy();

        const text2 = getByTestId('mission');
        expect(text2).toBeTruthy();

        const keyFeatures1 = getByTestId('keyFeatures1');
        expect(keyFeatures1).toBeTruthy();

        const keyFeatures2 = getByTestId('keyFeatures2');
        expect(keyFeatures2).toBeTruthy();

        const keyFeatures3 = getByTestId('keyFeatures3');
        expect(keyFeatures3).toBeTruthy();

        const keyFeatures4 = getByTestId('keyFeatures4');
        expect(keyFeatures4).toBeTruthy();

        const keyFeatures5 = getByTestId('keyFeatures5');
        expect(keyFeatures5).toBeTruthy();

        const message = getByTestId('message');
        expect(message).toBeTruthy();


        const subheading = getByText('Key Features:');
        const listItem1 = getByText('1. Schedule Management: Load and track your lecture schedules, assignment due dates, test schedules, and examination dates all in one place.');
        const listItem2 = getByText('2. Reminders and Notifications: Set up personalized reminders for upcoming tasks and receive notifications to ensure you stay on top of your academic responsibilities.');

        expect(heading).toBeTruthy();
        expect(subheading).toBeTruthy();
        expect(listItem1).toBeTruthy();
        expect(listItem2).toBeTruthy();

    });


    it('matches snapshot', () => {
        const { toJSON } = render(<AboutScreen />);
        expect(toJSON()).toMatchSnapshot();
    });
});
