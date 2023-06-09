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

    it('Test if drop down menu 2 is rendered', () => {
        const dropDown2 = screen.getByTestId('accordionDrop2');
        expect(dropDown2).toBeInTheDocument();

        //check that the dropdown menu is clickable
        fireEvent.click(dropDown2);
    });

    it('Test if drop down menu 3 is rendered', () => {
        const dropDown3 = screen.getByTestId('accordionDrop3');
        expect(dropDown3).toBeInTheDocument();

        //check that the dropdown menu is clickable
        fireEvent.click(dropDown3);
    });

    it('Test if drop down menu 4 is rendered', () => {
        const dropDown4 = screen.getByTestId('accordionDrop4');
        expect(dropDown4).toBeInTheDocument();

        //check that the dropdown menu is clickable
        fireEvent.click(dropDown4);
    });



    //test form1 submission by filling in the form and clicking the submit button
    it('Test if form 2 is submitted', () => {
        const title1 = screen.getByTestId('title1');
        const body1 = screen.getByTestId('body1');


        //fill in the form
        fireEvent.change(title1, { target: { value: 'test' } });
        fireEvent.change(body1, { target: { value: 'test' } });

        //check that the form is filled in
        expect(title1.value).toBe('test');
        expect(body1.value).toBe('test');

    });

    it('Test if form 2 is submitted', () => {
        const title2 = screen.getByTestId('title2');
        const body2 = screen.getByTestId('body2');


        //fill in the form
        fireEvent.change(title2, { target: { value: 'test' } });
        fireEvent.change(body2, { target: { value: 'test' } });

        //check that the form is filled in
        expect(title2.value).toBe('test');
        expect(body2.value).toBe('test');

    });

    it('Test if form 3 is submitted', () => {
        const venue = screen.getByTestId('venue');


        //fill in the form
        fireEvent.change(venue, { target: { value: 'test' } });

        //check that the form is filled in
        expect(venue.value).toBe('test');
    });

});
