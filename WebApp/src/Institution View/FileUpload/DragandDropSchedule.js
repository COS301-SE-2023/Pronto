import React, { useState, useEffect } from "react";
import ScheduleUpload from '../Images/ScheduleUpload.png';
import HelpButton from '../../Components/HelpButton';
import UserManual from "../HelpFiles/Schedule.pdf";
import CourseReader from "./CourseReader"
import { useAdmin } from "../../ContextProviders/AdminContext";
import { ErrorModal } from "../../Components/ErrorModal";
import { Storage, Auth } from "aws-amplify";

function DropzoneComponent() {

  const { admin, setAdmin } = useAdmin();
  const [user,setUser]=useState("")
  const [error, setError] = useState("");
  const[message,setMessage]=useState("");
  const [downloadingTemplate, setDownloadingTemplate] = useState(false);


  const fetchUserData = async () => {
    try {
      const userInfo = await Auth.currentUserInfo();
      setUser(userInfo);
      let username = userInfo?.attributes?.name; // Get the name of the signed-in uni
      const words = username.split(/\s+/); // Split the name into words
      username = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Convert each word to camel case
        .join(""); // Join the words without spaces

      //setFolderNameS3(username);
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

    setDownloadingTemplate(true);
    try {
      const url = await Storage.get("Template/TemplateSchedule.csv", {
        level: "public"
      });


      // Create an anchor element to trigger the download
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "TemplateSchedule.csv"; // Specify the desired file name
      anchor.click();
      setDownloadingTemplate(false);
    } catch (error) {
      
      setDownloadingTemplate(false);
      setError("Error downloading Excel file");
     
    }
  };


  return (
    <div style={{maxHeight:"100%"}}>
      {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
      <h6 style={{ marginBottom: "10px" }}>This page serves as the centralised platform for uploading your comprehensive university schedule, encompassing essential details such as venues, times, and more. Students will use this to create their timetable from the mobile app.</h6>
      <img src={ScheduleUpload} style={{ maxWidth: "300px", maxHeight: "200px" }} alt="ScheduleUpload" />

      <p style={{ marginTop: "10px" }}>Download template to get started</p>
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
        disabled={downloadingTemplate}
      >

        {downloadingTemplate ? 'Downloading...' : 'Download template'}
      </button>
      
      <div>
        <CourseReader 
          institutionId={admin?.institutionId}
    
                      />
      </div> 
      < div >
        < HelpButton pdfUrl={UserManual} />
      </div>
    </div >
  );
}

export default DropzoneComponent;
