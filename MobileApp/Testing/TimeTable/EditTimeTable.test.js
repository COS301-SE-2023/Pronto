import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EditTimetable from '../../screens/Timetable/EditTimetable';



describe('EditTimetable', () => {
    test("search input should filter the modules", () => {
        const { getByTestId, getAllByTestId } = render(<EditTimetable />);

        const searchInput = getByTestId("search-input");

        // Enter "COS 301" in the search input
        fireEvent.changeText(searchInput, "COS 301");

        // Get all the module cards
        const moduleCards = getAllByTestId(/module-card-.*/);

        // Check if only the module with code "COS 301" is displayed
        expect(moduleCards).toHaveLength(3);

    });


  // test if all the testIDs are present
    test("all testIDs are present", () => {
        const { getByTestId } = render(<EditTimetable />);

        const searchInput = getByTestId("search-input");
       // const closeModalButton = getByTestId("close-modal-button");
        const moduleCard = getByTestId("module-card-1");
        const addButton = getByTestId("add-module-button-1");

        expect(searchInput).toBeTruthy();
       // expect(closeModalButton).toBeTruthy();
        expect(moduleCard).toBeTruthy();
        expect(addButton).toBeTruthy();
    });

    //test if all the buttons are firing and test them by testId
    test("all buttons are firing", () => {
        const { getByTestId } = render(<EditTimetable />);

        const searchInput = getByTestId("search-input");
        const moduleCard = getByTestId("module-card-1");
        const addButton = getByTestId("add-module-button-1");


        fireEvent.press(addButton);
    });

});
