import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PersonalInfo from '../LectureView/Personal-info';

describe('PersonalInfo', () => {

    beforeEach(() => {
        render(<PersonalInfo />);
    });

//create sets of tests for each testID

    // Test if the navigation bar is rendered
    it('Test if the navigation bar is rendered', () => {
        const navigation = screen.getByTestId('InstitutionNavigation');
        expect(navigation).toBeInTheDocument();
    });

    //test if accordions render
    it('Test if change password Accordion is rendered', () => {
        const paccordion = screen.getByTestId('paccordion');
        expect(paccordion).toBeInTheDocument();
    });



    //test the dropdowns
    it('Test if drop down menu 1 is rendered', () => {
        const dropDown = screen.getByTestId('paccordionDrop');
        expect(dropDown).toBeInTheDocument();

        //check that the dropdown menu is clickable
        fireEvent.click(dropDown);
    });



    //test form1 submission by filling in the form and clicking the submit button
    it('Test if form 2 is submitted', () => {
        const title1 = screen.getByTestId('title1');
        const body1 = screen.getByTestId('body1');
        const date1 = screen.getByTestId('date1');


        //fill in the form
        fireEvent.change(title1, { target: { value: 'test' } });
        fireEvent.change(body1, { target: { value: 'test' } });
        fireEvent.change(date1, { target: { value: '09 Jun 2023' } });

        //check that the form is filled in
        expect(title1.value).toBe('test');
        expect(body1.value).toBe('test');
        expect(date1.value).toBe('09 Jun 2023');

    });

    it('Test if form 2 is submitted', () => {
        const title2 = screen.getByTestId('title2');
        const body2 = screen.getByTestId('body2');
        const date2 = screen.getByTestId('date2');


        //fill in the form
        fireEvent.change(title2, { target: { value: 'test' } });
        fireEvent.change(body2, { target: { value: 'test' } });
        fireEvent.change(date2, { target: { value: '09 Jun 2023' } });

        //check that the form is filled in
        expect(title2.value).toBe('test');
        expect(body2.value).toBe('test');
        expect(date2.value).toBe('09 Jun 2023');

    });

    it('Test if form 3 is submitted', () => {
        const venue = screen.getByTestId('venue');


        //fill in the form
        fireEvent.change(venue, { target: { value: 'test' } });

        //check that the form is filled in
        expect(venue.value).toBe('test');
    });

});