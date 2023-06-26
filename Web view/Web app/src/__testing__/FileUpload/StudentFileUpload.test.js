import React from 'react';
import { render, screen } from '@testing-library/react';
import StudentFileUploadPage from "../../Institution VIew/FileUpload/StudentFileUpload";
import {MemoryRouter} from "react-router-dom";

describe('StudentFileUploadPage', () => {

    beforeEach(() => {
        render(
            <MemoryRouter> <StudentFileUploadPage /></MemoryRouter>
        );
    });



    test('renders DragandDrop component', () => {

        const dragAndDropComponent = screen.getByTestId('drag-and-drop');
        expect(dragAndDropComponent).toBeInTheDocument();
    });
});