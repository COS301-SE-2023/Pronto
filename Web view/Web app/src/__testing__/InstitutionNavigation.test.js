import {render, screen, cleanup, fireEvent} from "@testing-library/react";
import InstitutionNavigation from "../Institution VIew/Navigation/InstitutionNavigation";
import {BrowserRouter as Router} from "react-router-dom";
import { waitFor } from '@testing-library/react';
import React from "react";

describe('InstitutionNavigation', () => {
// get the list on the navigation bar and check that they are present by testID
    test('if the navigation bar has the correct links', () => {
        render(
            <Router>
                <InstitutionNavigation/>
            </Router>
        );
        const dashboard = screen.getByTestId('Dashboard');
        expect(dashboard).toBeInTheDocument();

        const uploadSchedule = screen.getByTestId('UploadSchedule');
        expect(uploadSchedule).toBeInTheDocument();

        const uploadStudentFiles = screen.getByTestId('UploadStudentFiles');
        expect(uploadStudentFiles).toBeInTheDocument();

        const addLecturer = screen.getByTestId('AddLecturer');
        expect(addLecturer).toBeInTheDocument();

        const editUniversityInfo = screen.getByTestId('EditUniversityInfo');
        expect(editUniversityInfo).toBeInTheDocument();
    });

// Test if the navigation bar list items are in the document
    test('if the navigation bar list items have an <a> tag', () => {
        render(
            <Router>
                <InstitutionNavigation/>
            </Router>
        );
        const dashboardLink = screen.getByTestId('dashboardLink');
        expect(dashboardLink).toBeInTheDocument();

        const uploadScheduleLink = screen.getByTestId('UploadScheduleLink');
        expect(uploadScheduleLink).toBeInTheDocument();

        const uploadStudentFilesLink = screen.getByTestId('UploadStudentFilesLink');
        expect(uploadStudentFilesLink).toBeInTheDocument();

        const addLecturerLink = screen.getByTestId('AddLecturerLink');
        expect(addLecturerLink).toBeInTheDocument();

        const editUniversityInfoLink = screen.getByTestId('EditUniversityInfoLink');
        expect(editUniversityInfoLink).toBeInTheDocument();
    });

//check that the <a> tags have the correct href
    test('if the <a> tags have the correct href', () => {
        render(
            <Router>
                <InstitutionNavigation/>
            </Router>
        );
        const dashboardLink = screen.getByTestId('dashboardLink');
        expect(dashboardLink).toHaveAttribute('href', '/dashboard');

        const uploadScheduleLink = screen.getByTestId('UploadScheduleLink');
        expect(uploadScheduleLink).toHaveAttribute('href', '/upload-schedule');

        const uploadStudentFilesLink = screen.getByTestId('UploadStudentFilesLink');
        expect(uploadStudentFilesLink).toHaveAttribute('href', '/upload-student-files');

        const addLecturerLink = screen.getByTestId('AddLecturerLink');
        expect(addLecturerLink).toHaveAttribute('href', '/add-lecturer');

        const editUniversityInfoLink = screen.getByTestId('EditUniversityInfoLink');
        expect(editUniversityInfoLink).toHaveAttribute('href', '/edit-university-info');
    });

// Test that uses fireEvent to check if the logout button is clickable and redirects to the login page by calling the logout function
    test('if the logout button is clickable', async () => {
        render(
            <Router>
                <InstitutionNavigation />
            </Router>
        );
        const logoutButton = screen.getByTestId('LogoutButton');
        fireEvent.click(logoutButton);
        await waitFor(() => expect(logoutButton).toBeInTheDocument());
    });

});
