import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecentAnnouncement from '../LectureView/RecentAnnouncement';
import {MemoryRouter} from "react-router-dom";

describe('RecentAnnouncement', () => {

    beforeEach(() => {
        render(<MemoryRouter><RecentAnnouncement /></MemoryRouter>);
    });

    test('renders institution navigation', () => {
        const institutionNavigation = screen.getByTestId('institution-navigation');
        expect(institutionNavigation).toBeInTheDocument();
    });

    test('renders announcement cards with options', () => {
        const announcementCard1 = screen.getByTestId('announcement-card1');
        const announcementCard2 = screen.getByTestId('announcement-card2');
        const optionsButton1 = screen.getByTestId('options-button1');
        const optionsButton2 = screen.getByTestId('options-button2');

        expect(announcementCard1).toBeInTheDocument();
        expect(announcementCard2).toBeInTheDocument();
        expect(optionsButton1).toBeInTheDocument();
        expect(optionsButton2).toBeInTheDocument();
    });

    test('opens and closes options menu for announcement card 1', () => {
        const optionsButton1 = screen.getByTestId('options-button1');
        fireEvent.click(optionsButton1);
        const optionsMenu1 = screen.getByTestId('options-menu1');


        expect(optionsMenu1).toBeInTheDocument();


    });

    test('opens and closes options menu for announcement card 2', () => {
        const optionsButton2 = screen.getByTestId('options-button2');
        fireEvent.click(optionsButton2);

        const optionsMenu2 = screen.getByTestId('options-menu2');


        expect(optionsMenu2).toBeInTheDocument();
        fireEvent.click(optionsButton2);

    });

    //provide a test from RecentAnnouncement.js that will test the values that have not been tested yet
    test('test if the announcement card 1 has the correct title', () => {
        const announcementCard1 = screen.getByTestId('announcement-card1');
        expect(announcementCard1).toHaveTextContent('COS13222/05/2023No class from Thursday 1 JunePlease note that due to the completion of the syllabus in this morning\'s lecture, there will be no class tomorrow or from here forth:)Options');

    });

});
