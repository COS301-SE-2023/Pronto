import * as React from 'react';
import './Navigation.css';
import logo from '../../images/logo.jpg';
//import {Person} from "@mui/icons-material";


export default function InstitutionNavigation() {
    return (
        <div className={'grid'}>
            <nav className="vertical-navbar col-4 p-4" >
                <ul className="navbar-nav">
                    <li className="nav-item ">
                        <img src={logo} alt="Logo" className="logo offset-2 img-fluid mr-3" width={'175px'} height={'155px'}/>
                    </li>
                    <li className="nav-item text-center">
                        <a href="src/Institution VIew/Navigation/InstitutionNavigation#" className="nav-link">
                            <b>Dashboard</b>
                        </a>
                    </li>
                    <li className="nav-item text-center">
                        <a href="/upload-schedule" className="nav-link">
                           <b>Upload Schedule</b>
                        </a>
                    </li>
                    <li className="nav-item text-center">

                        <a href="/upload-student-files" className="nav-link p-2">
                            <b>Upload Student Files</b>

                        </a>
                    </li>
                    <li className="nav-item text-center">
                        <a href="/add-lecturer" className="nav-link">
                            <b>Add/Remove Lecturer</b>
                        </a>
                    </li>
                    <li className="nav-item text-center">
                        <a href="src/Institution VIew/Navigation/InstitutionNavigation#" className="nav-link">
                            <b>Edit University Info</b>
                        </a>
                    </li>


                </ul>

            </nav>
            <div className="logoutbtn fixed-bottom col-2 p-4 ml-4">
                <button className={"btn btn-danger btn-lg btn-block"}>Log Out</button>
            </div>

        </div>

            );
}
