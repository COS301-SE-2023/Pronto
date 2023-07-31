import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AddLecturer from '../../src/Institution VIew/AddLecturer/addLecturer';

describe('AddLecturer', () => {
    it('renders the InstitutionNavigation component', () => {
        render(
            <Router>
                <AddLecturer />
            </Router>
        );
        expect(screen.getByTestId('InstitutionNavigation')).toBeInTheDocument();
    })

    it('renders the form inputs', () => {
        render(
            <Router>
                <AddLecturer />
            </Router>
        );
        expect(screen.getByTestId('firstName')).toBeInTheDocument();
        expect(screen.getByTestId('lastName')).toBeInTheDocument();
        expect(screen.getByTestId('email')).toBeInTheDocument();
    });

    it('updates the form inputs', () => {
        render(
            <Router>
                <AddLecturer />
            </Router>
        );
        fireEvent.change(screen.getByTestId('firstName'), { target: { value: 'Jane' } });
        fireEvent.change(screen.getByTestId('lastName'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByTestId('email'), { target: { value: 'jane.doe@up.ac.za' } });

        expect(screen.getByTestId('firstName').value).toBe('Jane');
        expect(screen.getByTestId('lastName').value).toBe('Doe');
        expect(screen.getByTestId('email').value).toBe('jane.doe@up.ac.za');
    });

});
