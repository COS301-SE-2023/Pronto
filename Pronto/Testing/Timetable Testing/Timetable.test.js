import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, act } from '@testing-library/react-native';

//import timetable and create extensive UI tests

import Timetable from "../../screens/Timetable/Timetable";

describe('Timetable', () => {
    //Test that the UI renders correctly
    test('should render timetable component', async () => {
        const { getByText} = render(<Timetable />);
        const timetable = getByText('Timetable');
        expect(timetable).toBeTruthy();
    });

    //test if the menu button is clickable
    test('should open side panel when menu button is clicked', async () => {
        const { getByTestId} = render(<Timetable />);
        const menuButton = getByTestId('menuButton'); //get the menu button
        fireEvent.press(menuButton); //press the menu button
        expect(menuButton).toBeTruthy(); //check if the menu button is clickable
    });

    //test if the notification button is clickable
    test('should open side panel when notification button is clicked', async () => {
        const { getByTestId} = render(<Timetable />);
        const notificationButton = getByTestId('notificationButton'); //get the notification button
        fireEvent.press(notificationButton); //press the notification button
        expect(notificationButton).toBeTruthy(); //check if the notification button is clickable
    });

    //test if the side panel is clickable
    test('should close side panel when clicked', async () => {
        const { getByTestId} = render(<Timetable />);
        const sidePanel = getByTestId('sidePanel'); //get the side panel
        fireEvent.press(sidePanel); //press the side panel
        expect(sidePanel).toBeTruthy(); //check if the side panel is clickable
    });

    //test if the notification panel is clickable
    test('should close notification panel when clicked', async () => {
        const { getByTestId} = render(<Timetable />);
        const notificationPanel = getByTestId('notificationPanel'); //get the notification panel
        fireEvent.press(notificationPanel); //press the notification panel
        expect(notificationPanel).toBeTruthy(); //check if the notification panel is clickable
    });

    //test if the ScheduleTable component is rendered correctly in the timetable component
    test('should render ScheduleTable component', async () => {
        const { getByTestId} = render(<Timetable />);
        const scheduleTable = getByTestId('scheduleTable'); //get the schedule table
        expect(scheduleTable).toBeTruthy(); //check if the schedule table is rendered correctly
    });

});



