import * as React from 'react';
import '../Institution VIew/Navigation.css';
import logo from '../images/logo.jpg';
import {Person} from "@mui/icons-material";


export default function LecturerNavigation() {
    return (
        <div className={'grid'}>
            <nav className="vertical-navbar col-4 p-4" >

                <div className="top">
                    <img src={logo} alt="Logo" className="logo offset-3" width={'130px'} height={'130px'}/>
                    
                    <div className="lecturer">Stefan Gruner</div>
                </div>

                <ul className="navbar-nav">

                    <li className="nav-item text-center">
                        <a href="/lecture-homepage" className="nav-link">
                            <b>Edit Module Information</b>
                        </a>
                    </li>
                    <li className="nav-item text-center">
                        <a href="#" className="nav-link">
                           <b>Recent Announcements</b>
                        </a>
                    </li>
                    <li className="nav-item text-center">
                        <a href="#" className="nav-link p-2">
                            <b>Add Lecture Venue</b>
                        </a>
                    </li>
                    <li className="nav-item text-center">
                        <a href="#" className="nav-link">
                            <b>Edit Personal Information</b>
                        </a>
                    </li>

                    <li className="nav-item text-center">
                        <a href="#" className="nav-link">
                            <button className={'btn btn-danger btn-lg btn-block'}>Log Out</button>
                        </a>
                    </li>

                </ul>

            </nav>

        </div>

            );
}
