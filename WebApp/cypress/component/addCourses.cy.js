// Import your React component for testing
import AddModal from '../../src/Institution VIew/AddLecturer/addCourse'; // Replace with the actual path to your component


// Describe the test suite for the AddModal component
describe('AddModal Component', () => {

  it('opens and closes the modal', () => {

// Define mock data for the test
    const mockData = {
      updateFlag: true,
      lecturerData: {},
      addCourses: cy.stub(), // Mock addCourses function
      removeCourses: cy.stub(), // Mock removeCourses function
      courseData: [
        // Define your mock course data here
        {
          id: 1,
          coursecode: 'CS101',
          coursename: 'Introduction to Computer Science',
          lecturerId: null,
        },
        {
          id: 2,
          coursecode: 'CS102',
          coursename: 'Data Structures and Algorithms',
          lecturerId: 3,
        },
        // Add more mock courses as needed
      ],
      setIsModalOpened: cy.stub(), // Mock setIsModalOpened function
      setCourses: cy.stub(), // Mock setCourses function
      selectedCourses: [], // Define initial selected courses
      // Mock data for the 'offeredCourses' array
      offeredCourses: [
        {
          id: 1,
          coursecode: 'CS101',
          coursename: 'Introduction to Computer Science',
          lecturerId: null,
        },
        {
          id: 2,
          coursecode: 'CS102',
          coursename: 'Data Structures and Algorithms',
          lecturerId: null,
        },
        {
          id: 3,
          coursecode: 'CS201',
          coursename: 'Advanced Programming',
          lecturerId: null,
        },
        // Add more mock courses as needed
      ],
      setSelectedCourses: cy.stub(), // Mock setSelectedCourses function
      setOfferedCourses: cy.stub(), // Mock setOfferedCourses function
      setModal: cy.stub(), // Mock setModal function
    };
    // Render the AddModal component with mock data
    cy.mount(<AddModal {...mockData} />);

    //check that the view button is rendered
    cy.get('[data-testid="submitButton"]').should('be.visible');

    // Click the "View" button to open the modal
    cy.get('[data-testid="submitButton"]').click();

    // Check if the modal is opened
    cy.get('[data-testid="coursesTable"]').should('be.visible');

    //Check that the Done button is rendered
    cy.get('[data-testid="submitCourses"]').should('be.visible');

    cy.get('[data-testid="courseOption"]').first().select('CS101');


    // Click the "Add" button
    cy.get('[data-testid="addButton"]').click();


  });

  it('opens and closes the modal', () => {

// Define mock data for the test
    const mockData = {
      updateFlag: true,
      lecturerData: {}, // Define mock lecturer data as needed
      addCourses: cy.stub(), // Mock addCourses function
      removeCourses: cy.stub(), // Mock removeCourses function
      courseData: [
        // Define your mock course data here
        {
          id: 1,
          coursecode: 'CS101',
          coursename: 'Introduction to Computer Science',
          lecturerId: null,
        },
        {
          id: 2,
          coursecode: 'CS102',
          coursename: 'Data Structures and Algorithms',
          lecturerId: 3,
        },
        // Add more mock courses as needed
      ],
      setIsModalOpened: cy.stub(), // Mock setIsModalOpened function
      setCourses: cy.stub(), // Mock setCourses function
      selectedCourses: [], // Define initial selected courses
      // Mock data for the 'offeredCourses' array
      offeredCourses: [
        {
          id: 1,
          coursecode: 'CS101',
          coursename: 'Introduction to Computer Science',
          lecturerId: null,
        },
        {
          id: 2,
          coursecode: 'CS102',
          coursename: 'Data Structures and Algorithms',
          lecturerId: null,
        },
        {
          id: 3,
          coursecode: 'CS201',
          coursename: 'Advanced Programming',
          lecturerId: null,
        },
        // Add more mock courses as needed
      ],
      setSelectedCourses: cy.stub(), // Mock setSelectedCourses function
      setOfferedCourses: cy.stub(), // Mock setOfferedCourses function
      setModal: cy.stub(), // Mock setModal function
    };
    // Render the AddModal component with mock data
    cy.mount(<AddModal {...mockData} />);

    //check that the view button is rendered
    cy.get('[data-testid="submitButton"]').should('be.visible');

    // Click the "View" button to open the modal
    cy.get('[data-testid="submitButton"]').click();

    // Check if the modal is opened
    cy.get('[data-testid="coursesTable"]').should('be.visible');

    //Check that the Done button is rendered
    cy.get('[data-testid="submitCourses"]').should('be.visible');

    cy.get('[data-testid="courseOption"]').first().select('CS101');


    // Click the "Add" button
    cy.get('[data-testid="addButton"]').click();

    // Click the Remove button
    cy.get('[data-testid="removeButton"]').click();

    // check if courseTable has no rows
    cy.get('[data-testid="coursesTable"]').should('have.descendants', 'tr');

    //Click the "Done" button to close the modal
    cy.get('[data-testid="submitCourses"]').click();

    // Check if the modal is closed
    cy.get('[data-testid="modal"]').should('not.exist');



  });


});

