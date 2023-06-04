import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DropzoneComponent from './DragandDrop';

describe('DropzoneComponent', () => {
    it('renders without errors', () => {
        render(<DropzoneComponent />);
        expect(screen.getByTestId('dropzone')).toBeInTheDocument();
    });
    /*
        it('displays a message to drop files', () => {
            render(<DropzoneComponent />);
            expect(screen.getByText(/click here or drag and drop/i)).toBeInTheDocument();
        });

        //create a test that inputs a file into the drop-input
        it('should ', function () {

            const { getByTestId } = render(<DropzoneComponent />);
            const dropInput = getByTestId('drop-input');
            expect(dropInput).toBeInTheDocument();

            //input a file into the drop-input
            fireEvent.change(dropInput, { target: { files: ['test.pdf'] } });
            expect(dropInput.files[0]).toBe('test.pdf');

            //check if the testID 'thumbs-container' is in the document
            expect(screen.getByTestId('thumbs-container')).toBeInTheDocument();



        });*/


});
