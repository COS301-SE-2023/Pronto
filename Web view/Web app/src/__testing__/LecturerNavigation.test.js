import {render, screen, cleanup, fireEvent} from "@testing-library/react";
import LecturerNavigation from "../LectureView/LecturerNavigation";

beforeEach(() => {
    render(<LecturerNavigation/>);
});

// get the list on the navigation bar and check that they are present by testID
test('Test if the navigation bar has the correct links', () => {
    const editmodule = screen.getByTestId('EditModuleInfo');
    expect(editmodule).toBeInTheDocument();

    const announcements = screen.getByTestId('RecentAnnouncements');
    expect(announcements).toBeInTheDocument();

    const personal = screen.getByTestId('EditPersonalInfo');
    expect(personal).toBeInTheDocument();
});

// Test if the navigation bar list items are in the document
test('Test if the navigation bar list items have an <a> tag', () => {
    const editmoduleLink = screen.getByTestId('EditModuleInfoLink');
    expect(editmoduleLink).toBeInTheDocument();

    const announcementsLink = screen.getByTestId('RecentAnnouncementsLink');
    expect(announcementsLink).toBeInTheDocument();

    const personalLink = screen.getByTestId('EditPersonalInfoLink');
    expect(personalLink).toBeInTheDocument();
});

//check that the <a> tags have the correct href
test('Test if the <a> tags have the correct href', () => {

    const editmoduleLink = screen.getByTestId('EditModuleInfoLink');
    expect(editmoduleLink).toHaveAttribute('href', '/lecture-homepage');

    const announcementsLink = screen.getByTestId('RecentAnnouncementsLink');
    expect(announcementsLink).toHaveAttribute('href', '/recent-announcement');

    const personalLink = screen.getByTestId('EditPersonalInfoLink');
    expect(personalLink).toHaveAttribute('href', '/personal-info');
});

// Test that uses fireEvent to check if the logout button is clickable and redirects to the login page by calling the logout function
test('Test if the logout button is clickable', () => {
    const logoutButton = screen.getByTestId('LogoutButton');
    fireEvent.click(logoutButton);
    expect(logoutButton).toBeInTheDocument();
});