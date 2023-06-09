import React, { useEffect, useState } from "react";
import EditModuleInfo from "./LectureView/Edit Module/EditModuleInfo";
import LectureHomePage from "./LectureView/Edit Module/LectureHomePage";
import LecturerLogin from "./Authentication/Lecturer/Login";
import LecturerForgotPassword from "./Authentication/Lecturer/ForgotPassword";
import LecturerConfirmEmail from "./Authentication/Lecturer/ConfirmEmail";
import InstitutionLogin from "./Authentication/Institution/Login";
import InstitutionForgotPassword from "./Authentication/Institution/ForgotPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InstitutionHomePage from "./Institution VIew/InstitutionHomePage";
import InstitutionSuccessfulApply from "./Authentication/Institution/SuccessfulApply";
import InstitutionConfirmEmail from "./Authentication/Institution/ConfirmEmail";
import AddLecturer from "./Institution VIew/AddLecturer/addLecturer";
import FileUploadPage from "./Institution VIew/FileUpload/FileUploadPage";
import StudentFileUploadPage from "./Institution VIew/FileUpload/StudentFileUpload";
import RecentAnnouncement from "./LectureView/RecentAnnouncement";
import PersonalInformation from "./LectureView/Personal-info";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";

Amplify.configure(config);

const Home = () => {
  //use this part to see if user is logged in or out and then determine what pages they can access
  //begin
  // const [user, setUser] = useState(undefined);
  // const checkUser = async () => {
  //   const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
  //  setUser(authUser);
  // };

  //useEffect(() => {
  //   checkUser();
  // }, []);

  //end
  useEffect(() => {
    Amplify.configure(config);
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          {/*Lecturer pages routing*/}
          <Route path="/lecturer-login" element={<LecturerLogin />} />
          <Route
            path="/lecturer-confirm-email"
            element={<LecturerConfirmEmail />}
          />
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
            path="/institution-confirm-email"
            element={<InstitutionConfirmEmail />}
          />
          <Route
            path="/institution-successful-apply"
            element={<InstitutionSuccessfulApply />}
          />
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
