import React, { useEffect } from "react";
import EditModuleInfo from "./LectureView/Edit Module/EditModuleInfo";
import LectureHomePage from "./LectureView/Edit Module/LectureHomePage";
import LecturerLogin from "./Authentication/Lecturer/Login";
import LecturerForgotPassword from "./Authentication/Lecturer/ForgotPassword";
import LecturerConfirmEmail from "./Authentication/Lecturer/ConfirmEmail";
import InstitutionLogin from "./Authentication/Institution/Login";
import InstitutionForgotPassword from "./Authentication/Institution/ForgotPassword";
import InstitutionHomePage from "./Institution VIew/InstitutionHomePage";
import InstitutionSuccessfulApply from "./Authentication/Institution/SuccessfulApply";
import InstitutionConfirmEmail from "./Authentication/Institution/ConfirmEmail";
import AddLecturer from "./Institution VIew/AddLecturer/addLecturer";
import FileUploadPage from "./Institution VIew/FileUpload/FileUploadPage";
import EditUniversityInfo from "./Institution VIew/EditInformation/EditInfo";
import StudentFileUploadPage from "./Institution VIew/FileUpload/StudentFileUpload";
import RecentAnnouncement from "./LectureView/RecentAnnouncement";
import PersonalInformation from "./LectureView/Personal-info";
import NotFound from "./NotFound";
import InstitutionDashboard from "./Institution VIew/Dashboard/Dashboard";
import DashboardLecturer from "./LectureView/Dashboard/dashboardLecturer";
import { RequireLecturerAuth } from "./RequireLecturerAuth";
import { RequireAdminAuth } from "./RequireAdminAuth";
import HomePage from "./HomePage";
import { Amplify, Auth } from "aws-amplify";
import { Authenticator } from '@aws-amplify/ui-react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import config from "./aws-exports";


Auth.configure(config);
Amplify.configure(config);

function MyRoutes()
{
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage />} />

    {/*Lecturer login/register pages*/}
    <Route path="/lecturer/login" element={<LecturerLogin />} />
    <Route
      path="/lecturer/confirm-email"
      element={<LecturerConfirmEmail />}
    />
    <Route
      path="/lecturer/forgot-password"
      element={<LecturerForgotPassword />}
    />

    {/*Institution login/register pages*/}
    <Route path="/institution/login" element={<InstitutionLogin />} />
    <Route
      path="/institution/confirm-email"
      element={<InstitutionConfirmEmail />}
    />
    <Route
      path="/institution/successful-apply"
      element={<InstitutionSuccessfulApply />}
    />
    <Route
      path="/institution/forgot/password"
      element={<InstitutionForgotPassword />}
    />

    {/*Invalid page*/}
    <Route path="/404" element={<NotFound />} />
    <Route path="*" element={<Navigate to="/404" />} />

    {/*Protected admin routing*/}
    <Route
      path="/institution/dashboard"
      element={
        <RequireAdminAuth>
          <InstitutionDashboard />
        </RequireAdminAuth>
      }
    />
    <Route
      path="/institution/add-lecturer"
      element={
        <RequireAdminAuth>
          <AddLecturer />
        </RequireAdminAuth>
      }
    />
    <Route
      path="/institution/homepage"
      element={
        <RequireAdminAuth>
          <InstitutionHomePage />
        </RequireAdminAuth>
      }
    />
    <Route
      path="/institution/upload-schedule"
      element={
        <RequireAdminAuth>
          <FileUploadPage />
        </RequireAdminAuth>
      }
    />
    <Route
      path="/institution/upload-student-files"
      element={
        <RequireAdminAuth>
          <StudentFileUploadPage />
        </RequireAdminAuth>
      }
    />
    <Route
      path="/institution/edit-info"
      element={
        <RequireAdminAuth>
          <EditUniversityInfo />
        </RequireAdminAuth>
      }
    />

    {/*Protected lecturer routing*/}
    <Route
      path="/lecturer/dashboard"
      element={
        <RequireAdminAuth>
          <DashboardLecturer />
        </RequireAdminAuth>
      }
    />
    <Route
      path="/lecturer/homepage"
      element={
        <RequireLecturerAuth>
          <LectureHomePage />
        </RequireLecturerAuth>
      }
    />
    <Route
      path="/lecturer/edit-module"
      element={
        <RequireLecturerAuth>
          <EditModuleInfo />
        </RequireLecturerAuth>
      }
    />
    <Route
      path="/lecturer/announcement"
      element={
        <RequireLecturerAuth>
          <RecentAnnouncement />
        </RequireLecturerAuth>
      }
    />
    <Route
      path="/lecturer/personal-info"
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
  useEffect(() => {
    Amplify.configure(config);
  }, []);

  return (
    <Authenticator.Provider>
      <MyRoutes />
    </Authenticator.Provider>
  );
}
export default App;
