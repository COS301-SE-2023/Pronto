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
                        <img src={logo} alt="Logo" className="logo offset-3" width={'120px'} height={'120px'}/>
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

                        <a href="src/Institution VIew/Navigation/InstitutionNavigation#" className="nav-link p-2">
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
                    <li className="nav-item text-center">
                        <a href="src/Institution VIew/Navigation/InstitutionNavigation#" className="nav-link">
                            <button className={'btn btn-danger btn-lg btn-block'}>Log Out</button>
                        </a>
                    </li>

                </ul>

            </nav>


        </div>

            );
}
