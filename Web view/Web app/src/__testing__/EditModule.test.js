import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditModule from '../LectureView/Edit Module/EditModuleInfo';

describe('EditModule', () => {

    beforeEach(() => {
        render(<EditModule />);
    });
//create sets of tests for each testID

    // Test if the navigation bar is rendered
    it('Test if the navigation bar is rendered', () => {
        const navigation = screen.getByTestId('InstitutionNavigation');
        expect(navigation).toBeInTheDocument();
    });

    it('Test if the accordion is rendered', () => {
        const navigation = screen.getByTestId('editAccordion');
        expect(navigation).toBeInTheDocument();
    });
});
