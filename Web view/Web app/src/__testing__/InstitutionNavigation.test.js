import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InstitutionNavigation from '../Institution VIew/Navigation/InstitutionNavigation';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('aws-amplify', () => ({
    Auth: {
        signOut: jest.fn().mockResolvedValue({}),
    },
}));

describe('InstitutionNavigation', () => {
    beforeEach(() => {
        render(<InstitutionNavigation />);
    });

    test('renders the logo image', () => {
        const logoImage = screen.getByTestId('UniversityImage');
        expect(logoImage).toBeInTheDocument();
        expect(logoImage.src).toContain('logo.jpg');
    });

    test('renders navigation links', () => {
        const dashboardLink = screen.getByTestId('dashboardLink');
        expect(dashboardLink).toHaveTextContent('Dashboard');
        expect(dashboardLink.href).toContain('/');

        const uploadScheduleLink = screen.getByTestId('UploadScheduleLink');
        expect(uploadScheduleLink).toHaveTextContent('Upload Schedule');
        expect(uploadScheduleLink.href).toContain('/upload-schedule');

        const uploadStudentFilesLink = screen.getByTestId('UploadStudentFilesLink');
        expect(uploadStudentFilesLink).toHaveTextContent('Upload Student Files');
        expect(uploadStudentFilesLink.href).toContain('/upload-student-files');

        const addLecturerLink = screen.getByTestId('AddLecturerLink');
        expect(addLecturerLink).toHaveTextContent('Add/Remove Lecturer');
        expect(addLecturerLink.href).toContain('/add-lecturer');

        const editUniversityInfoLink = screen.getByTestId('EditUniversityInfoLink');
        expect(editUniversityInfoLink).toHaveTextContent('Edit University Info');
        expect(editUniversityInfoLink.href).toContain('http://localhost/src/Institution%20VIew/Navigation/InstitutionNavigation#');
    });




});
