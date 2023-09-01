import * as React from "react";
import "./Navigation.css";
import logo from "../../images/logo.jpg";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

export default function InstitutionNavigation() {
  const navigate = useNavigate();
  const onSignOut = async (event) => {
    event.preventDefault();
    try {
      await Auth.signOut();
      //navigate to lecturer login
      navigate("/institution-login");
    } catch (e) {
      console.log(e.message);
    }
  };

    return (
        <div className={'grid'}>
            <nav className="vertical-navbar col-4 p-4" >
                <div className="top">
                <img
                src={logo}
                alt="Logo"
                className="logo offset-2 img-fluid mr-1"
                width={"175px"}
                height={"155px"}
                data-testid={'UniversityImage'}
                />
                </div>
                <ul className="navbar-nav">
        
                    <li className="nav-item text-center" data-testid={'Dashboard'}>
                        <a href="/dashboard" className="nav-link" data-testid={'dashboardLink'}>
                            <b>Dashboard</b>
                        </a>
                    </li>
                    <li className="nav-item text-center" data-testid={'UploadSchedule'}>
                        <a href="/upload-schedule" className="nav-link" data-testid={'UploadScheduleLink'}>
                           <b>Upload Schedule</b>
                        </a>
                    </li>
                    <li className="nav-item text-center" data-testid={'UploadStudentFiles'}>
                        <a href="/upload-student-files" className="nav-link p-2" data-testid={'UploadStudentFilesLink'}>
                            <b>Upload Student Files</b>

                        </a>
                    </li>
                    <li className="nav-item text-center" data-testid={'AddLecturer'}>
                        <a href="/add-lecturer" className="nav-link" data-testid={'AddLecturerLink'}>
                            <b>Add/Remove Lecturer</b>
                        </a>
                    </li>
                    <li className="nav-item text-center" data-testid={'EditUniversityInfo'}>
                        <a href="/edit-university-info" className="nav-link" data-testid={'EditUniversityInfoLink'}>
                            <b>Edit University Info</b>
                        </a>
                    </li>

                </ul>

            </nav>
            <div className="logoutbtn fixed-bottom col-2 p-4 ml-4">
                <button className={"btn btn-danger btn-lg btn-block"} style={{borderRadius:"25px"}} data-testid={'LogoutButton'} onClick={onSignOut}>Log Out</button>
            </div>
        </div>

            );
}
