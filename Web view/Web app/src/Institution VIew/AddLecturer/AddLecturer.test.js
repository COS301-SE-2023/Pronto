import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddLecturer from './AddLecturer';

describe('AddLecturer', () => {

    beforeEach(() => {
        render(<AddLecturer />);
    });
//create sets of tests for each testID

    // Test if the navigation bar is rendered
    it('Test if the navigation bar is rendered', () => {
        const navigation = screen.getByTestId('InstitutionNavigation');
        expect(navigation).toBeInTheDocument();
    });

    //check that the submit button is rendered
    it('Test if the submit button is rendered', () => {
        const submitButton = screen.getByTestId('submitButton');
        expect(submitButton).toBeInTheDocument();

        //check that the submit button is clickable
        fireEvent.click(submitButton);

    });

    //test the search bar
    it('Test if the search bar is rendered', () => {
        const searchBar = screen.getByTestId('searchInput');
        expect(searchBar).toBeInTheDocument();

        //check that input is accepted
        fireEvent.change(searchBar, { target: { value: 'test' } });
        expect(searchBar.value).toBe('test');

        //test the search button
        const searchButton = screen.getByTestId('searchButton');
        expect(searchButton).toBeInTheDocument();

        //check that the search button is clickable
        fireEvent.click(searchButton);


    });


    //test the dropdown filter
    it('Test if the drop down menu is rendered', () => {
        const dropDown = screen.getByTestId('filterSelect');
        expect(dropDown).toBeInTheDocument();

        //check that the dropdown menu is clickable
        fireEvent.click(dropDown);
    });

    //test the table
    it('Test if the table is rendered', () => {
        const table = screen.getByTestId('lecturersTable');
        expect(table).toBeInTheDocument();

    });

    //test a form submission by filling in the form and clicking the submit button
    it('Test if the form is submitted', () => {
        const firstName = screen.getByTestId('firstName');
        const lastName = screen.getByTestId('lastName');
        const email = screen.getByTestId('email');


        //fill in the form
        fireEvent.change(firstName, { target: { value: 'test' } });
        fireEvent.change(lastName, { target: { value: 'test' } });
        fireEvent.change(email, { target: { value: 'test' } });

        //check that the form is filled in
        expect(firstName.value).toBe('test');
        expect(lastName.value).toBe('test');
        expect(email.value).toBe('test');
        
    });


});
