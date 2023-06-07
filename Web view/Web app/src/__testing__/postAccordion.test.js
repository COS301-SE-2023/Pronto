import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostAccordion from '../LectureView/Edit Module/PostAccordion';

describe('PostAccordion', () => {

    beforeEach(() => {
        render(<PostAccordion />);
    });
//create sets of tests for each testID

    //test if accordions render
    it('Test if Accordion 1 is rendered', () => {
        const accordion1 = screen.getByTestId('accordion1');
        expect(accordion1).toBeInTheDocument();
    });

    it('Test if Accordion 2 is rendered', () => {
        const accordion2 = screen.getByTestId('accordion2');
        expect(accordion2).toBeInTheDocument();
    });

    it('Test if Accordion 3 is rendered', () => {
        const accordion3 = screen.getByTestId('accordion3');
        expect(accordion3).toBeInTheDocument();
    });

    it('Test if Accordion 4 is rendered', () => {
        const accordion4 = screen.getByTestId('accordion4');
        expect(accordion4).toBeInTheDocument();
    });

    //test the dropdowns
    it('Test if drop down menu 1 is rendered', () => {
        const dropDown1 = screen.getByTestId('accordionDrop1');
        expect(dropDown1).toBeInTheDocument();

        //check that the dropdown menu is clickable
        fireEvent.click(dropDown1);
    });

    it('Test if drop down menu 1 is rendered', () => {
        const dropDown1 = screen.getByTestId('accordionDrop1');
        expect(dropDown1).toBeInTheDocument();

        //check that the dropdown menu is clickable
        fireEvent.click(dropDown1);
    });


});
