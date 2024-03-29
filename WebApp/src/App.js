import React, { useEffect } from "react";


import SuperAdminLogin from "./Authentication/SuperAdmin/Login";
import SuperApplicationRequest from "./SuperAdmin View/ApplicationRequests";
import SuperAdminViewInstitutions from "./SuperAdmin View/ViewInstitutions";

import LecturerLogin from "./Authentication/Lecturer/Login";
import LecturerForgotPassword from "./Authentication/Lecturer/ForgotPassword";
import LecturerConfirmEmail from "./Authentication/Lecturer/ConfirmEmail";

import InstitutionLogin from "./Authentication/Institution/Login";
import InstitutionForgotPassword from "./Authentication/Institution/ForgotPassword";
import InstitutionSuccessfulApply from "./Authentication/Institution/SuccessfulApply";
import InstitutionConfirmEmail from "./Authentication/Institution/ConfirmEmail";
import InstitutionTemporaryPassword from "./Authentication/Institution/TemporaryPassword"
import InstitutionVerificationCode from "./Authentication/Institution/VerficationCode"

import AddLecturer from "./Institution View/AddLecturer/addLecturer";
import FileUploadPage from "./Institution View/FileUpload/FileUploadPage";
import EditUniversityInfo from "./Institution View/EditInformation/EditInfo";
import StudentFileUploadPage from "./Institution View/FileUpload/StudentFileUpload";
import InstitutionDashboard from "./Institution View/Dashboard/Dashboard";

import EditModuleInfo from "./Lecturer View/Edit Module/EditModuleInfo";
import Modules from "./Lecturer View/Edit Module/Modules";
import RecentAnnouncement from "./Lecturer View/Announcements/RecentAnnouncement";
import PersonalInformation from "./Lecturer View/Personal Info/Personal-info";
import DashboardLecturer from "./Lecturer View/Dashboard/dashboardLecturer";

import { RequireLecturerAuth } from "./RouteAuthComponents/RequireLecturerAuth";
import { RequireAdminAuth } from "./RouteAuthComponents/RequireAdminAuth";
import { RequireSuperAdminAuth } from "./RouteAuthComponents/RequireSuperAdminAuth";
import NotFound from "./Error pages/NotFound";
import HomePage from "./Homepage/HomePage";

import { LecturerProvider } from "./ContextProviders/LecturerContext";
import { AdminProvider } from "./ContextProviders/AdminContext";
import { LecturerListProvider } from "./ContextProviders/LecturerListContext";
import { AnnouncementProvider } from "./ContextProviders/AnnouncementContext";
import { CourseProvider } from "./ContextProviders/CourseContext";

import { Amplify, Auth } from "aws-amplify";
import { Authenticator } from '@aws-amplify/ui-react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import config from "./Components/aws-exports";

Auth.configure(config);
Amplify.configure(config);

function MyRoutes() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/*Super Admin pages*/}
        <Route path="/ROYGBIV" element={<SuperAdminLogin />} />

        <Route path="/ROYGBIV/admin-requests"
          element={

            <RequireSuperAdminAuth>
              <SuperApplicationRequest />
            </RequireSuperAdminAuth>
          }
        />

        <Route path="/ROYGBIV/view-institutions"
          element={
            <RequireSuperAdminAuth>
              <SuperAdminViewInstitutions />
            </RequireSuperAdminAuth>
          }
        />

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
          path="/institution/forgot-password"
          element={<InstitutionForgotPassword />}
        />
        
        <Route
          path="/institution/temporary-password"
          element={<InstitutionTemporaryPassword />}
        />
        <Route
          path="/institution/verification-code"
          element={<InstitutionVerificationCode />}
        />

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
            <RequireLecturerAuth>
              <DashboardLecturer />
            </RequireLecturerAuth>
          }
        />
        <Route
          path="/lecturer/modules"
          element={
            <RequireLecturerAuth>
              <Modules />
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

        {/*Invalid page*/}
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

function App() {
  useEffect(() => {
    Amplify.configure(config);
  }, []);

  return (
    <CourseProvider>
    <LecturerProvider>
      <AnnouncementProvider>
        <AdminProvider>
          <LecturerListProvider>
            <Authenticator.Provider>
              <MyRoutes />
            </Authenticator.Provider>
          </LecturerListProvider>
        </AdminProvider>
      </AnnouncementProvider>
    </LecturerProvider>
    </CourseProvider>
  );
}
export default App;
