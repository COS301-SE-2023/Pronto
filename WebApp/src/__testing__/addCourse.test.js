import React from 'react';
import {render, fireEvent, act} from '@testing-library/react';
import AddModal from '../Institution View/AddLecturer/addCourse';
// Mock props
const mockUpdateFlag = true;
const mockLecturerData = {
    // Mock lecturer data
    id: 1,
    name: "John Doe",
    // Add other properties as needed
};

const mockAddCourses = jest.fn();
const mockRemoveCourses = jest.fn();
const mockCourseData = [
    {
        // Mock course data
        id: 101,
        coursecode: "CS101",
        coursename: "Introduction to Computer Science",
        lecturerId: null, // Mocking an unassigned lecturer
    },

];

const mockSetModal = jest.fn();
const mockSetCourses = jest.fn();
const mockSelectedCourses = [
    {
        // Mock selected courses
        id: 101,
        coursecode: "CS101",
        coursename: "Introduction to Computer Science",
        lecturerId: null,
    },

];

const mockOfferedCourses = [
    {
        // Mock offered courses
        id: 201,
        coursecode: "CS201",
        coursename: "Data Structures",
        lecturerId: null, // Mocking an unassigned lecturer
    },

];

const mockSetSelectedCourses = jest.fn();
const mockSetOfferedCourses = jest.fn();


// Mock the module object
const module = {
    updateFlag: mockUpdateFlag,
    lecturerData: mockLecturerData,
    addCourses: mockAddCourses,
    removeCourses: mockRemoveCourses,
    courseData: mockCourseData,
    selectedCourses: mockSelectedCourses,
    offeredCourses: mockOfferedCourses,
    setModal: mockSetModal,
    setCourses: mockSetCourses,
    setSelectedCourses: mockSetSelectedCourses,
    setOfferedCourses: mockSetOfferedCourses,
};

describe('AddModal Component', () => {
    it('renders without crashing', () => {
        const { getByTestId } = render(
            <AddModal {...module} />
        );


        //get the submit button and click it
       /* const submitButton = getByTestId('submitButton');
        fireEvent.click(submitButton);


        const modalElement = getByTestId('modal');
        expect(modalElement).toBeInTheDocument();*/
    });

    /*it('displays selected courses', () => {
        const { getByTestId } = render(
            <AddModal {...module} />
        );
        //get the submit button and click it
        const submitButton = getByTestId('submitButton');
        act(() => {
            fireEvent.click(submitButton);
        }); // This is needed to update the state of the component

        const coursesTable = getByTestId('coursesTable');
        expect(coursesTable).toBeInTheDocument();

    });

    it('adds a course when "Add" button is clicked', () => {
        const { getByTestId } = render(
            <AddModal {...module} />
        );

        //get the submit button and click it
        const submitButton = getByTestId('submitButton');
        act(() => {
            fireEvent.click(submitButton);
        }
        ); // This is needed to update the state of the component



    });

    

    it('closes the modal when "Done" button is clicked', () => {
        const { getByTestId } = render(
            <AddModal {...module} />
        );


        //get the submit button and click it
        const submitButton = getByTestId('submitButton');



    });*/
});
