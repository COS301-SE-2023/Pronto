// Importing necessary libraries and dependencies
import React, { useState, useEffect } from "react";
import { Amplify, Storage } from "aws-amplify";

// Folder name for S3 bucket
let folderNameS3 = "UniversityOfPretoria";

function DropzoneComponent() {
  // State variables
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");

  // Function to create a folder in S3 bucket
  const createFolder = async (folderName) => {
    try {
      const folderKey = `${folderName}/`; // Include the trailing slash ("/") to indicate it's a folder
      await Storage.put(folderKey, "", {
        contentType: "application/octet-stream", // Set the content type to a generic value
      });
    } catch (error) {
      setMessage("Error creating folder: " + error);
    }
  };

  // Configure Amplify library and AWS settings
  useEffect(() => {
    Amplify.configure({
      Auth: {
        identityPoolId: "",
        region: "us-east-1",
      },
      Storage: {
        AWSS3: {
          bucket: "",
          region: "us-east-1",
          keyPrefix: `${folderNameS3}/`,
        },
      },
    });
  }, []);

  // Function to handle file selection from input
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Function to handle file drop into the dropzone
  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (selectedFile) {
      // Perform file saving logic here
      createFolder(folderNameS3);

      try {
        const fileKey = `${folderNameS3}/${selectedFile.name}`;
        await Storage.put(fileKey, selectedFile, {
          progressCallback: ({ loaded, total }) => {
            const progress = Math.round((loaded / total) * 100);
            setUploadProgress(progress);
            setMessage("Uploading file: " + selectedFile.name);
          },
        });

        setMessage("File successfully uploaded: " + selectedFile.name);
      } catch (error) {
        setMessage("Error uploading file");
      }

      // Reset the selected file and upload progress
      setSelectedFile(null);
      setUploadProgress(0);
    }
  };

  // Function to handle drag over event
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to handle drag enter event
  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  // Function to handle click event on the dropzone
  const handleClick = (event) => {
    event.preventDefault();
    document.getElementById("fileInput").click();
  };

  // Render the component
  return (
      <div>
        <div
            className="dropzone text-center"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            style={{
              height: "100px",
              border: "1px dashed",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
            data-testid="dropzone" // Added data-testid for testing
        >
          {selectedFile ? (
              <div>
                Selected File: {selectedFile.name}
                <button
                    onClick={handleSubmit}
                    className={"btn m-3"}
                    style={{ backgroundColor: "#e32f45", color: "white" }}
                >
                  Submit
                </button>
              </div>
          ) : (
              <div id={"dropzone"} onClick={handleClick}>
                Drag and drop your file here or{" "}
                <label htmlFor="fileInput" className="file-label">
                  click here
                </label>{" "}
                to select a file.
              </div>
          )}
        </div>
        {selectedFile && (
            <div className="progress" style={{ marginTop: "5%", height: "30px" }}>
              <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${uploadProgress}%`, backgroundColor: "#e32f45" }}
                  aria-valuenow={uploadProgress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  data-testid="progress-bar" // Added data-testid for testing
              >
                {uploadProgress}%
              </div>
            </div>
        )}
        {message && (
            <div style={{ marginTop: "5%", color: "green" }} data-testid="message"> // Added data-testid for testing
              {message}
            </div>
        )}
        <input
            id="fileInput"
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            style={{ display: "none" }}
            data-testid="file-input" // Added data-testid for testing
        />
      </div>
  );
}

export default DropzoneComponent;
