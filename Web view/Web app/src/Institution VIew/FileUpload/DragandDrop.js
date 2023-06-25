import React, { useState, useEffect } from "react";
import { Amplify, Storage } from "aws-amplify";
import config from "../../aws-exports";

const createFolder = async (folderName) => {
  try {
    const folderKey = `${folderName}/`; // Include the trailing slash ("/") to indicate it's a folder
    await Storage.put(folderKey, "", {
      contentType: "application/octet-stream", // Set the content type to a generic value
    });
    console.log(`Successfully created folder: ${folderName}`);
  } catch (error) {
    console.error(`Error creating folder: ${error}`);
  }
};
function DropzoneComponent() {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        identityPoolId: "us-east-1:6b251f24-2cc0-4073-9c2e-f44ec6fff42a",
        region: "us-east-1",
      },
      Storage: {
        AWSS3: {
          bucket: "institution-file-upload",
          region: "us-east-1",
          keyPrefix: "UniversityOfPretoria/",
        },
      },
    });
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  //same logic but for dropping file
  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  //when submit is pressed
  const handleSubmit = async () => {
    if (selectedFile) {
      // Perform file saving logic here
      console.log("Saving file:", selectedFile.name);
      createFolder("UniversityOfPretoria");

      try {
        const result = await Storage.put(
          selectedFile.name,
          "UniversityOfPretoria/" + selectedFile
        );
        console.log("File uploaded successfully:", result);
      } catch (error) {
        console.error("Error uploading file:", error);
      }

      // Reset the selected file
      setSelectedFile(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  //when user clicks on the div with id dropzone, it will open file manager to select file and then input it
  //to the input with id fileInput
  const handleClick = (event) => {
    //prevent default
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
              className={"btn  m-3"}
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
