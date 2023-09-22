import React, { useState, useEffect } from "react";

import ScheduleUpload from '../Images/ScheduleUpload.png';
import HelpButton from '../../Components/HelpButton';
import UserManual from "../HelpFiles/Schedule.pdf";

import { Storage, Auth,API } from "aws-amplify";

import {coursesByInstitutionId,listAdmins} from "../../Graphql/queries.js"
import { useAdmin } from "../../ContextProviders/AdminContext";
import CourseReader from "./CourseReader.js"
import { ErrorModal } from "../../Components/ErrorModal";

function DropzoneComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [error,setError]=useState("");
  const [folderNameS3, setFolderNameS3] = useState("");
  const [activities,setActivities] = useState([]);
  const [courses,setCourses] =useState([]);
  const [loading,setLoading] =useState(false);
  const {admin,setAdmin} = useAdmin();

  useEffect(() => {
    //fetchUserData();
    fecthCourses();
  }, []);

  const fecthCourses = async()=>{
    try{
      let adminData=admin;
      if(admin===null){
        const user=await Auth.currentAuthenticatedUser();
          adminData = await API.graphql({
              query: listAdmins,
              variables: {
                filter: {
                  email: {
                    eq: user.attributes.email
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
  
      let course=await API.graphql({
        query:coursesByInstitutionId,
        variables:{
          institutionId:adminData.institutionId
        }
      })
      course=course.data.coursesByInstitutionId.items;
      let act=[];
      for(let i=0;i<course.length;i++){
        for(let j=0;j<course[i].activity.items.length;j++){
          act.push(course[i].activity.items[j]);
        }
      }
      console.log(course);
      setActivities(act);
      setCourses(course);
      console.log(act);
    }catch(error){
      console.log(error);
    }
  }

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
    <div style={{maxHeight:"80%"}}>
      <h6 style={{ marginBottom: "10px" }}>This page serves as the centralised platform for uploading your comprehensive university schedule, encompassing essential details such as venues, times, and more. Students will use this to create their timetable from the mobile app.</h6>
      <img src={ScheduleUpload} style={{ maxWidth: "300px", maxHeight: "200px" }} alt="ScheduleUpload" />
      {/* <div
        className="dropzone text-center"
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        style={{
          height: "100px",
          width: "100%",
          backgroundColor: "#f7f7f7",
          border: "1px solid #ddd",
          borderRadius: "50px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)", /* Increased shadow intensity */
      //     justifyContent: "center",
      //     alignItems: "center",
      //     display: "flex",
      //     cursor: "pointer",
      //   }}
      // >
      //   {selectedFile ? (
      //     <div>
      //       Selected File: {selectedFile.name}
      //       <button
      //         onClick={handleSubmit}
      //         className={"btn m-3"}
      //         style={{ backgroundColor: "#e32f45", color: "white" }}
      //       >
      //         Submit
      //       </button>
      //     </div>
      //   ) : (
      //     <div id={"dropzone"} onClick={handleClick}>
      //       Drag and drop your file here or{" "}
      //       <label htmlFor="fileInput" className="file-label">
      //         click here
      //       </label>{" "}
      //       to select a file.
      //     </div>
      //   )}
      // </div>
      // {
      //   selectedFile && (
      //     <div className="progress" style={{ marginTop: "5%", height: "30px" }}>
      //       <div
      //         className="progress-bar"
      //         role="progressbar"
      //         style={{ width: `${uploadProgress}%`, backgroundColor: "#e32f45" }}
      //         aria-valuenow={uploadProgress}
      //         aria-valuemin="0"
      //         aria-valuemax="100"
      //       >
      //         {uploadProgress}%
      //       </div>
      //     </div>
      //   )
      // }
      // {
      //   message && (
      //     <div style={{ marginTop: "5%", color: "green" }}>{message}</div>
      //   )
      // }
      // <input
      //   id="fileInput"
      //   type="file"
      //   accept=".xls, .xlsx"
      //   onChange={handleFileSelect}
      //   style={{ display: "none" }}
      // /> 
        }
        <table>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Activity</th>
              <th>Day</th>
              <th>Start</th>
              <th>End</th>
              <th>Venue</th>
            </tr>

          </thead>
          <tbody>
            {courses?.map((course,key)=>{
              return(
                course?.activity?.items?.map((activity,index)=>{
                  return(
                    <tr key={index}>
                      <td>{activity.course.coursecode}</td>
                      <td>{activity.activityname}</td>
                      <td>{activity.day}</td>
                      <td>{activity.start}</td>
                      <td>{activity.end}</td>
                      <td>{activity.venue}</td>
                    </tr>
                  )
                }
              )
            )
          })}
          </tbody>
        </table>
        <CourseReader 
          institutionId={admin?.institutionId}
          courses={courses}
          setCourses={setCourses}
          setLoading={setLoading}
              />

           { loading===true? 
              (
                <p style={{
                  color: "#e32f45",
                  opacity: 0.9,
                  fontWeight: "50",
                  fontSize: "50px",
                  display: "flex",
                  justifyContent: "center"
                }}>Loading</p> 
                 
              )
              : 
              ""}
          <div>
        <HelpButton pdfUrl={UserManual} />
      </div>
    </div >
  );
}

export default DropzoneComponent;
