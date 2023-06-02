import React from "react";
import EditModuleInfo from "./LectureView/EditModuleInfo";
import LectureHomePage from "./LectureView/LectureHomePage";
import Login from "./Authentication/LecturerLogin/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InstitutionHomePage from "./Institution VIew/InstitutionHomePage";
import AddLecturer from "./Institution VIew/AddLecturer/addLecturer";
import FileUploadPage from "./Institution VIew/FileUpload/FileUploadPage";
import StudentFileUploadPage from "./Institution VIew/FileUpload/StudentFileUpload";
import RecentAnnouncement from "./LectureView/RecentAnnouncement";
import PersonalInformation from "./LectureView/Personal-info";


const Home = () => {
  return (

    <div>
        <Router >
                <Routes>

                  {/*Lecturer pages routing*/}
                  <Route path="/login" element={<Login/>} />
                  <Route path="/lecture-homepage" element={<LectureHomePage />} />
                  <Route path="edit-module" element={<EditModuleInfo/>} />
                  <Route path="recent-announcement" element={<RecentAnnouncement/>} />
                  <Route path="personal-info" element={<PersonalInformation/>} />

                  {/*Institution pages routing*/}
                  <Route path="/add-lecturer" element={<AddLecturer />} />
                  <Route path="/institution-homepage" element={<InstitutionHomePage />} />
                  <Route path="/upload-schedule" element={<FileUploadPage />} />
                  <Route path="/upload-student-files" element={<StudentFileUploadPage />} />

                </Routes>
        </Router>
    </div>

  );
};

export default Home;
