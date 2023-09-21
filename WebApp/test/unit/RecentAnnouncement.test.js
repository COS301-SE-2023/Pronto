import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecentAnnouncement from '../Lecture View/RecentAnnouncement';

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

});