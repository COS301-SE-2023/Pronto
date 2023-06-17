import React, { useState } from 'react';

function DropzoneComponent() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = event => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleFileDrop = event => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = () => {
        if (selectedFile) {
            // Perform file saving logic here
            console.log('Saving file:', selectedFile.name);
            // Reset the selected file
            setSelectedFile(null);
        }
    };

    const handleDragOver = event => {
        event.preventDefault();
    };

    const handleDragEnter = event => {
        event.preventDefault();
    };

    //when user clicks on the div with id dropzone, it will open file manager to select file and then input it
    //to the input with id fileInput
    const handleClick = () => {
        alert('clicked');
        document.getElementById('fileInput').click();
    }

    return (
        <div>
            <div
                className="dropzone text-center"
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                style={{ height: '100px', border: '1px dashed',justifyContent: 'center', alignItems: 'center', display: 'flex' }}
            >
                {selectedFile ? (
                    <div>
                        Selected File: {selectedFile.name}
                        <button onClick={handleSubmit} className={'btn btn-primary m-3'}>Submit</button>
                    </div>
                ) : (
                    <div
                        id={
                            'dropzone'
                        }
                        onClick={handleClick}
                    >
                        Drag and drop your file here or{' '}

                        <label htmlFor="fileInput" className="file-label">
                            click here
                        </label>{' '}
                        to select a file.
                    </div>
                )}
            </div>
            <input
                id="fileInput"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />
        </div>
    );
}

export default DropzoneComponent;
