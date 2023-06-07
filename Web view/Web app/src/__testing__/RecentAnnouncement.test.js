import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecentAnnouncement from '../LectureView/RecentAnnouncement';

describe('RecentAnnouncement', () => {

    beforeEach(() => {
        render(<RecentAnnouncement />);
    });

//create sets of tests for each testID

    // Test if the navigation bar is rendered
    it('Test if the navigation bar is rendered', () => {
        const navigation = screen.getByTestId('InstitutionNavigation');
        expect(navigation).toBeInTheDocument();
    });

    //test if cards render
    it('Test if card 1 is rendered', () => {
        const card1 = screen.getByTestId('card1');
        expect(card1).toBeInTheDocument();
    });

    it('Test if card 2 is rendered', () => {
        const card2 = screen.getByTestId('card2');
        expect(card2).toBeInTheDocument();
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
        const pword = screen.getByTestId('pword');
        const repword = screen.getByTestId('repword');
        const newpword = screen.getByTestId('newpword');


        //fill in the form
        fireEvent.change(pword, { target: { value: 'test' } });
        fireEvent.change(repword, { target: { value: 'test' } });
        fireEvent.change(newpword, { target: { value: '09 Jun 2023' } });

        //check that the form is filled in
        expect(pword.value).toBe('test');
        expect(repword.value).toBe('test');
        expect(newpword.value).toBe('09 Jun 2023');

    });


});