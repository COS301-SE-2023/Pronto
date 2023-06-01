import React from "react";
import PostReminder from "./LectureView/PostReminder";
import LectureHomePage from "./LectureView/LectureHomePage";
import Login from "./Authentication/LecturerLogin/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InstitutionHomePage from "./Institution VIew/InstitutionHomePage";
import AddLecturer from "./Institution VIew/AddLecturer/addLecturer";
import FileUploadPage from "./Institution VIew/FileUpload/FileUploadPage";
import StudentFileUploadPage from "./Institution VIew/FileUpload/StudentFileUpload";



const Home = () => {
  return (

        <div>
            <Router >
                    <Routes>


                        <Route path="/login" element={<Login/>} />
                        <Route path="/lecture-homepage" element={<LectureHomePage />} />

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
