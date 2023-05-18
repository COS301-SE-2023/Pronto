import React from 'react';
import { render } from '@testing-library/react-native';
import SettingsComponent from '../../components/SettingsComponent';

describe('SettingsComponent', () => {
    const settingsOptions = [
        {
            title: 'Option 1',
            subTitle: 'SubTitle 1',
            onPress: jest.fn(),
        },
        {
            title: 'Option 2',
            subTitle: 'SubTitle 2',
            onPress: jest.fn(),
        },
    ];

    //tests that the component renders correctly and matches the snapshot
    test('renders correctly', () => {
        const { toJSON } = render(<SettingsComponent settingsOptions={settingsOptions} />);
        expect(toJSON()).toMatchSnapshot(); //checks if the component matches the snapshot
    });

    //renders the SettingsComponent with the correct number of options
    test('renders the correct number of options', () => {
        const { getAllByTestId } = render(<SettingsComponent settingsOptions={settingsOptions} />);
        expect(getAllByTestId('option').length).toBe(settingsOptions.length);
    });

    //renders the SettingsComponent with the correct title for each option
    test('renders the correct title for each option', () => {
        const { getAllByTestId } = render(<SettingsComponent settingsOptions={settingsOptions} />);
        getAllByTestId('option-title').forEach((title, index) => {
            expect(title.props.children).toBe(settingsOptions[index].title);
        });
    });

    //renders the SettingsComponent with the correct subtitle for each option
    test('renders the correct subtitle for each option', () => {
        const { getAllByTestId } = render(<SettingsComponent settingsOptions={settingsOptions} />);
        getAllByTestId('option-subtitle').forEach((subtitle, index) => {
            expect(subtitle.props.children).toBe(settingsOptions[index].subTitle);
        });
    });


});
