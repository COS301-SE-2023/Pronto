import React from 'react';
import { render,screen } from '@testing-library/react';
import FileUploadPage    from "../../Institution VIew/FileUpload/FileUploadPage";
import InstitutionNavigation from "../../Institution VIew/Navigation/InstitutionNavigation";
import DragandDrop from "../../Institution VIew/FileUpload/DragandDrop";
import {MemoryRouter} from "react-router-dom";

describe('FileUplaod', () => {
    test('renders InstitutionNavigation component', () => {
        render(
            <MemoryRouter> <InstitutionNavigation /></MemoryRouter>
           );

    });

    test('renders DragandDrop component', () => {
        render(<DragandDrop />);

    });


});