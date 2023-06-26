import React from 'react';
import {render, screen} from '@testing-library/react';
import EditModule from '../LectureView/Edit Module/EditModuleInfo';
import {MemoryRouter} from "react-router-dom";

describe('EditModule', () => {

    beforeEach(() => {
        render(
            <MemoryRouter>
                <EditModule/>
            </MemoryRouter>);
    });
//create sets of tests for each testID

    // Test if the navigation bar is rendered
    it('Test if the navigation bar is rendered', () => {
        const navigation = screen.getByTestId('LecturerNavigation');
        expect(navigation).toBeInTheDocument();
    });

    it('Test if the accordion is rendered', () => {
        const accordion = screen.getByTestId('editAccordion');
        expect(accordion).toBeInTheDocument();
    });
});
