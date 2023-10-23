import React, { useState, useEffect } from "react";

import FileUpload from '../Images/FileUpload.png';
import HelpButton from '../../Components/HelpButton';
import UserManual from "../HelpFiles/StudentFiles.pdf";
import { useAdmin } from "../../ContextProviders/AdminContext";
import { Storage, Auth, API } from "aws-amplify";
import { listAdmins } from "../../Graphql/queries";

function DropzoneComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [folderNameS3, setFolderNameS3] = useState("");
  const { admin, setAdmin } = useAdmin();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userInfo = await Auth.currentUserInfo();
      setUser(userInfo);
      let adminData = admin
      if (admin === null) {
        let user = await Auth.currentAuthenticatedUser();
        let adminEmail = user.attributes.email
        adminData = await API.graphql({
          query: listAdmins,
          variables: {
            filter: {
              email: {
                eq: adminEmail
              }
            },
          },
        });
        if (adminData.data.listAdmins.items.length > 0) {
          adminData = adminData.data.listAdmins.items[0];
          if (adminData.institution.logo !== null) {
            adminData.institution.logoUrl = await Storage.get(adminData.institution.logo, { validateObjectExistence: true, expires: 3600 });
          }
          setAdmin(adminData);
        }
      }
      let username = userInfo?.attributes?.name; // Get the name of the signed-in uni

      const words = adminData.institution.name.split(/\s+/);
      username = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Convert each word to camel case
        .join(""); // Join the words without spaces

      setFolderNameS3(username);
     
      setMessage("");
    } catch (error) {
      
      setMessage("Error fetching user data");
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
       
        const fileKey = `${folderNameS3}/StudentFiles/${selectedFile.name}`;
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
      <h6 style={{ marginBottom: "10px" }}>These files represent essential resources and materials that students enrolled in the university will be able to access directly from the mobile app.</h6>
      <img src={FileUpload} style={{ maxWidth: "300px", maxHeight: "200px" }} alt="FileUpload" />
      <div
        className="dropzone text-center"
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        style={{
          height: "100px",
          width: "100%",
          backgroundColor: "#f7f7f7",
          border: "1px solid #ddd",
          borderRadius: "50px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)", /* Increased shadow intensity */
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          cursor: "pointer",
          transition: "transform 0.3s"
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

      <div>
        <HelpButton pdfUrl={UserManual} />
      </div>
    </div>
  );
}

export default DropzoneComponent;
