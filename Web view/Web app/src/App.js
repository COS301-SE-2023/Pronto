import React from "react";
import EditModuleInfo from "./LectureView/EditModuleInfo";
import LectureHomePage from "./LectureView/LectureHomePage";
import LecturerLogin from "./Authentication/Lecturer/Login";
import LecturerForgotPassword from "./Authentication/Lecturer/ForgotPassword";
import InstitutionLogin from "./Authentication/Institution/Login";
import InstitutionForgotPassword from "./Authentication/Institution/ForgotPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InstitutionHomePage from "./Institution VIew/InstitutionHomePage";
import AddLecturer from "./Institution VIew/AddLecturer/addLecturer";
import FileUploadPage from "./Institution VIew/FileUpload/FileUploadPage";
import StudentFileUploadPage from "./Institution VIew/FileUpload/StudentFileUpload";
import RecentAnnouncement from "./LectureView/RecentAnnouncement";
import PersonalInformation from "./LectureView/Personal-info";

const Home = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/*Lecturer pages routing*/}
          <Route path="/lecturer-login" element={<LecturerLogin />} />
          <Route
            path="/lecturer-forgot-password"
            element={<LecturerForgotPassword />}
          />
          <Route path="/lecture-homepage" element={<LectureHomePage />} />
          <Route path="edit-module" element={<EditModuleInfo />} />
          <Route path="recent-announcement" element={<RecentAnnouncement />} />
          <Route path="personal-info" element={<PersonalInformation />} />

          {/*Institution pages routing*/}
          <Route path="/institution-login" element={<InstitutionLogin />} />
          <Route
            path="/institution-forgot-password"
            element={<InstitutionForgotPassword />}
          />
          <Route path="/add-lecturer" element={<AddLecturer />} />
          <Route
            path="/institution-homepage"
            element={<InstitutionHomePage />}
          />
          <Route path="/upload-schedule" element={<FileUploadPage />} />
          <Route
            path="/upload-student-files"
            element={<StudentFileUploadPage />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default Home;
