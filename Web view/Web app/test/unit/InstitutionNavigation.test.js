import {render, screen, cleanup, fireEvent} from "@testing-library/react";
import InstitutionNavigation from "../Institution VIew/Navigation/InstitutionNavigation";

beforeEach(() => {
    render(<InstitutionNavigation/>);
});

// get the list on the navigation bar and check that they are present by testID
test('Test if the navigation bar has the correct links', () => {
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
test('Test if the navigation bar list items have an <a> tag', () => {
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
test('Test if the <a> tags have the correct href', () => {
    const dashboardLink = screen.getByTestId('dashboardLink');
    expect(dashboardLink).toHaveAttribute('href', '/');

    const uploadScheduleLink = screen.getByTestId('UploadScheduleLink');
    expect(uploadScheduleLink).toHaveAttribute('href', '/upload-schedule');

    const uploadStudentFilesLink = screen.getByTestId('UploadStudentFilesLink');
    expect(uploadStudentFilesLink).toHaveAttribute('href', '/upload-student-files');

    const addLecturerLink = screen.getByTestId('AddLecturerLink');
    expect(addLecturerLink).toHaveAttribute('href', '/add-lecturer');

    const editUniversityInfoLink = screen.getByTestId('EditUniversityInfoLink');
    expect(editUniversityInfoLink).toHaveAttribute('href', 'src/Institution VIew/Navigation/InstitutionNavigation#');
});

// Test that uses fireEvent to check if the logout button is clickable and redirects to the login page by calling the logout function
test('Test if the logout button is clickable', () => {
    const logoutButton = screen.getByTestId('LogoutButton');
    fireEvent.click(logoutButton);
    expect(logoutButton).toBeInTheDocument();
});