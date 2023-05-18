import React from "react";
import { render } from '@testing-library/react-native';

//import University Page create extensive UI tests

import UniversityPage from "../../screens/University_Page/University";
import expect from "expect";

describe('UniversityPage', () => {
    //create tests for the UI and test that all the buttons are clickable
    test('should render UniversityPage component', async () => {
        const {getByText} = render(<UniversityPage/>);
        const universityPage = getByText('Which university would you like to attend?');
        expect(universityPage).toBeTruthy();
    });

    //test that the picker is clickable
    test('should render UniversityPage component', async () => {
        const {getByTestId} = render(<UniversityPage/>);
        const universityPicker = getByTestId('universityPicker');
        expect(universityPicker).toBeTruthy();
    });

    //test that the arrow button is clickable
    test('should render UniversityPage component', async () => {
        const {getByTestId} = render(<UniversityPage/>);
        const arrowButton = getByTestId('arrowButton');
        expect(arrowButton).toBeTruthy();
    });

});