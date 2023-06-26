import {fireEvent, render,screen, getByTestId,waitFor} from "@testing-library/react";
import DropzoneComponent from "../../Institution VIew/FileUpload/DragandDrop";



describe("DropzoneComponent", () => {
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({}));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("renders dropzone component", () => {
        render(<DropzoneComponent />);
        const dropzone = screen.getByTestId("dropzone");
        expect(dropzone).toBeInTheDocument();
    });

    it("should select a file when clicked", () => {
        render(<DropzoneComponent />);
        const fileInput = screen.getByTestId("file-input");
        fireEvent.change(fileInput, {
            target: { files: [new File([], "test.pdf", { type: "application/pdf" })] },
        });
        expect(screen.getByText("Selected File: test.pdf")).toBeInTheDocument();
    });

    it("should display 'Drag and drop your file here or click here to select a file.' when no file is selected", () => {
        render(<DropzoneComponent />);
        const dropzoneTextContainer = screen.getByTestId("dropzone");
        const expectedText = "Drag and drop your file here or click here to select a file.";
        expect(dropzoneTextContainer).toHaveTextContent(expectedText);
    });

    it("should display upload progress when a file is selected", () => {
        render(<DropzoneComponent />);
        const fileInput = screen.getByTestId("file-input");
        fireEvent.change(fileInput, {
            target: { files: [new File([], "test.pdf", { type: "application/pdf" })] },
        });
        expect(screen.getByText("0%")).toBeInTheDocument();
    });

    it("should display success message when file upload is successful", async () => {
        render(<DropzoneComponent />);
        const fileInput = screen.getByTestId("file-input");
        fireEvent.change(fileInput, {
            target: { files: [new File([], "test.pdf", { type: "application/pdf" })] },
        });
        fireEvent.click(screen.getByText("Submit"));
        await waitFor(() => {
            const successMessage = screen.getByTestId("message");
        expect(successMessage).toBeInTheDocument();
        });
    });

});
