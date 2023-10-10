import React, { useState, useEffect } from "react";
import ScheduleUpload from '../Images/ScheduleUpload.png';
import HelpButton from '../../Components/HelpButton';
import UserManual from "../HelpFiles/Schedule.pdf";
import { listAdmins,coursesByInstitutionId } from "../../Graphql/queries";
import CourseReader from "./CourseReader"
import { useAdmin } from "../../ContextProviders/AdminContext";
import { ErrorModal } from "../../Components/ErrorModal";
import { useCourse } from "../../ContextProviders/CourseContext";
import { Storage, Auth, API } from "aws-amplify";

function DropzoneComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [folderNameS3, setFolderNameS3] = useState("");
  const { admin, setAdmin } = useAdmin();
  const [error, setError] = useState("");
   const { course, setCourse } = useCourse();
  // const [activities, setActvities] = useState([]);

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

  useEffect(() => {
    fetchUserData();
    //fetchCourses();
  }, []);


  //use this function to download excel template
  const downloadExcelFile = async () => {
    try {



      const url = await Storage.get("Template/TemplateSchedule.csv", {
        level: "public"
      });


      // Create an anchor element to trigger the download
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "TemplateSchedule.csv"; // Specify the desired file name
      anchor.click();
    } catch (error) {
      //console.error("Error downloading Excel file", error);
      setError("Error downloading Excel file");
      console.log(error);
    }
  };




  const fetchCourses = async () => {
     try {
       let adminInfo = admin;
       if (admin === null) {
         let user = await Auth.currentAuthenticatedUser();
         let adminEmail = user.attributes.email;
         adminInfo = await API.graphql({
           query: listAdmins,
           variables: {
             filter: {
               email: {
                 eq: adminEmail
               }
             }
           }
         })
         adminInfo = adminInfo.data.listAdmins.items[0];
         setAdmin(adminInfo);
       }
       if (course.length === 0) {
         let courseList = await API.graphql({
           query: coursesByInstitutionId,
           variables: {
             institutionId: adminInfo.institutionId,
           }
         })
 
         console.log(courseList)
         courseList = courseList.data.coursesByInstitutionId.items;
         setCourse(courseList.filter((item)=>item._deleted===null));
       }
 
     } catch (error) {
        console.log(error);
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
    <div>
      {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
      <h6 style={{ marginBottom: "10px" }}>This page serves as the centralised platform for uploading your comprehensive university schedule, encompassing essential details such as venues, times, and more. Students will use this to create their timetable from the mobile app.</h6>
      <img src={ScheduleUpload} style={{ maxWidth: "300px", maxHeight: "200px" }} alt="ScheduleUpload" />
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
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
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
      {
        selectedFile && (
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
        )
      }
      {
        message && (
          <div style={{ marginTop: "5%", color: "green" }}>{message}</div>
        )
      }
      <input
        id="fileInput"
        type="file"
        accept=".xls, .xlsx, .csv"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      <p style={{ marginTop: "50px" }}>...or download template to get started</p>
      <button
        onClick={downloadExcelFile}
        className="btn m-3"
        style={{ backgroundColor: "#e32f45", color: "white", borderRadius: "20px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)", transition: "transform 0.3s" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Download template
      </button>
      {/* <div>
        <table>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Day</th>
              <th>Activity</th>
              <th>Start</th>
              <th>End</th>
              <th>Venue</th>
            </tr>
          </thead>
          <tbody>
            {activities?.items?.map((activity,index)=>{
              return(
                <tr key={index}>
                  <td>{activity?.course?.coursecode}</td>
                  <td>{activity?.activityname}</td>
                  <td>{activity?.day}</td>
                  <td>{activity?.start}</td>
                  <td>{activity?.end}</td>
                  <td>{activity?.venue}</td>
                </tr>
              )
            })}
        </tbody>
        </table>
      </div> */}
      {/* <div>
        <CourseReader institutionId={admin?.institutionId}
                      course={course}
                      setCourse={setCourse}
                      />
      </div>  */}
      < div >
        < HelpButton pdfUrl={UserManual} />
      </div>
    </div >
  );
}

export default DropzoneComponent;
