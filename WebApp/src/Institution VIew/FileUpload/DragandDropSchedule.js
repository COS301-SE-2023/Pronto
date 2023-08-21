import React, { useState, useEffect } from "react";
import { Amplify, Storage, Auth } from "aws-amplify";
import ScheduleUpload from '../../images/ScheduleUpload.png';
import HelpButton from '../../HelpButton';
import UserManual from "../HelpFiles/InstitutionInstructions.pdf";

function DropzoneComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [folderNameS3, setFolderNameS3] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userInfo = await Auth.currentUserInfo();
      setUser(userInfo);
      let username = userInfo?.attributes?.name; // Get the name of the signed-in uni
      const words = username.split(/\s+/); // Split the name into words
      username = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Convert each word to camel case
        .join(""); // Join the words without spaces

      setFolderNameS3(username);
      setMessage("");
    } catch (error) {
      setMessage("Error fetching user data");
    }
  };

  const createFolder = async (folderName) => {
    try {
      const scheduleFilesKey = `${folderName}/Schedule/`;

      // List all files in the "Schedule" folder
      const fileList = await Storage.list(scheduleFilesKey);

      // Delete all files in the "Schedule" folder
      await Promise.all(
        fileList.map(async (file) => {
          await Storage.remove(file.key);
        })
      );

      // Add the new file to the "Schedule" folder
      await Storage.put(scheduleFilesKey + selectedFile.name, selectedFile, {
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
      try {
        const fileKey = `${folderNameS3}/Schedule/${selectedFile.name}`;
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginLeft: "10%", // Adjust this value to shift content to the right
      }}
    >
      <h6 style={{ marginBottom: "5px" }}>This page serves as the centralised platform for uploading your comprehensive university schedule, encompassing essential details such as venues, times, and more. Students will use this to create their timetable from the mobile app.</h6>
      <img src={ScheduleUpload} style={{ maxWidth: "300px", maxHeight: "200px" }} alt="ScheduleUpload" />
      <div
        className="dropzone text-center"
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        style={{
          height: "100px",
          width: "100%",
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
        accept=".xls, .xlsx"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <div>
        <HelpButton pdfUrl={UserManual} />
      </div>
    </div>
  );
}

export default DropzoneComponent;
