
import React, { useEffect, useState } from "react";
import EditModuleInfo from "./LectureView/Edit Module/EditModuleInfo";
import LectureHomePage from "./LectureView/Edit Module/LectureHomePage";
import LecturerLogin from "./Authentication/Lecturer/Login";
import LecturerForgotPassword from "./Authentication/Lecturer/ForgotPassword";
import LecturerConfirmEmail from "./Authentication/Lecturer/ConfirmEmail";
import InstitutionLogin from "./Authentication/Institution/Login";
import InstitutionForgotPassword from "./Authentication/Institution/ForgotPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InstitutionHomePage from "./Institution VIew/InstitutionHomePage";
import InstitutionSuccessfulApply from "./Authentication/Institution/SuccessfulApply";
import InstitutionConfirmEmail from "./Authentication/Institution/ConfirmEmail";
import AddLecturer from "./Institution VIew/AddLecturer/addLecturer";
import FileUploadPage from "./Institution VIew/FileUpload/FileUploadPage";
import EditUniversityInfo from "./Institution VIew/EditInformation/EditInfo";
import StudentFileUploadPage from "./Institution VIew/FileUpload/StudentFileUpload";
import RecentAnnouncement from "./LectureView/RecentAnnouncement";
import PersonalInformation from "./LectureView/Personal-info";
import { Amplify, Auth, Hub } from "aws-amplify";
import HomePage from "./HomePage";
import config from "./aws-exports";
import Dashboard from "./Institution VIew/Dashboard/Dashboard";
import DashboardLecturer from "./LectureView/Dashboard/dashboardLecturer";
import { RequireLecturerAuth } from "./RequireLecturerAuth";
import { RequireAdminAuth } from "./RequireAdminAuth";

Amplify.configure(config);

function MyRoutes()
{
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage />} />

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

      {/*Protected admin routing*/}
      <Route
        path="/dashboard"
        element={
          <RequireAdminAuth>
            <Dashboard />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/add-lecturer"
        element={
          <RequireAdminAuth>
            <AddLecturer />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/institution-homepage"
        element={
          <RequireAdminAuth>
            <InstitutionHomePage />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/upload-schedule"
        element={
          <RequireAdminAuth>
            <FileUploadPage />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/upload-student-files"
        element={
          <RequireAdminAuth>
            <StudentFileUploadPage />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/edit-university-info"
        element={
          <RequireAdminAuth>
            <EditUniversityInfo />
          </RequireAdminAuth>
        }
      />

      {/*Protected lecturer routing*/}
      <Route
        path="/lecture-homepage"
        element={
          <RequireLecturerAuth>
            <LectureHomePage />
          </RequireLecturerAuth>
        }
      />
      <Route
        path="/lecturer-dashboard"
        element={
          <RequireLecturerAuth>
            <DashboardLecturer />
          </RequireLecturerAuth>
        }
      />
      <Route
        path="edit-module"
        element={
          <RequireLecturerAuth>
            <EditModuleInfo />
          </RequireLecturerAuth>
        }
      />
      <Route
        path="recent-announcement"
        element={
          <RequireLecturerAuth>
            <RecentAnnouncement />
          </RequireLecturerAuth>
        }
      />
      <Route
        path="personal-info"
        element={
          <RequireLecturerAuth>
            <PersonalInformation />
          </RequireLecturerAuth>
        }
      />

    </Routes>
    </BrowserRouter>
  )
}

function App(){
  const [user, setUser] = useState(undefined);
  const [userGroup, setUserGroup] = useState(null);
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({});
      const group =
        authUser.signInUserSession.idToken.payload["cognito:groups"];
      setUser(authUser);
      setUserGroup(group);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    Amplify.configure(config);
  }, []);


  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === "signIn" || data.payload.event === "signOut") {
        checkUser();
      }
    };
    Hub.listen("auth", listener);
    return () => Hub.remove("auth", listener);
  }, []);
  return (
    <Authenticator.Provider>
      <MyRoutes />
    </Authenticator.Provider>
  );
}
export default App;
