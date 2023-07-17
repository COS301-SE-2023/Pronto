import React, { useState, useEffect } from "react";
import { Amplify, Storage, Auth } from "aws-amplify";

function DropzoneComponent() {
  useEffect(() => {
    getUniversityName();
  }, []);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [folderNameS3, setFolderNameS3] = useState("");

  const getUniversityName = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      let username = user.name; // Get the name of the signed-in uni

      //process name to be camel case and remove spaces
      username = username.replace(/\s+/g, ""); // Remove spaces
      username = username.charAt(0).toUpperCase() + username.slice(1); // Convert to camel case

      console.log(username);

      setFolderNameS3(username);
      setMessage("");
    } catch (e) {
      setMessage(e.message);
    }
  };

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

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Same logic but for dropping file
  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  // When submit is pressed
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

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  // When user clicks on the div with id dropzone, it will open the file manager to select a file and then input it to the input with id fileInput
  const handleClick = (event) => {
    event.preventDefault();
    document.getElementById("fileInput").click();
  };

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
          >
            {uploadProgress}%
          </div>
        </div>
      )}
      {message && (
        <div style={{ marginTop: "5%", color: "green" }}>{message}</div>
      )}
      <input
        id="fileInput"
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default DropzoneComponent;
