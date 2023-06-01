import * as React from 'react';
import './Navigation.css';
import logo from '../images/logo.jpg';
import {Person} from "@mui/icons-material";


export default function InstitutionNavigation() {
    return (
        <div className={'grid'}>
            <nav className="vertical-navbar col-4 " style={{"backgroundColor": "gray"}}>
                <ul className="navbar-nav">
                    <li className="nav-item ">
                        <img src={logo} alt="Logo" className="logo offset-3" width={'120px'} height={'120px'}/>
                    </li>
                    <li className="nav-item text-center">
                        <a href="#" className="nav-link">
                            <b>Dashboard</b>
                        </a>
                    </li>
                    <li className="nav-item text-center">
                        <a href="#" className="nav-link">
                           <b>Upload Schedule</b>
                        </a>
                    </li>
                    <li className="nav-item text-center">

                        <a href="#" className="nav-link p-2">
                            <b>Upload Student Files</b>

                        </a>
                    </li>
                    <li className="nav-item text-center">
                        <a href="#" className="nav-link">
                            <b>Add/Remove Lecturer</b>
                        </a>
                    </li>
                    <li className="nav-item text-center">
                        <a href="#" className="nav-link">
                            <b>Edit University Info</b>
                        </a>
                    </li>
                    <li className="nav-item text-center">
                        <a href="#" className="nav-link">
                            <button className={'btn btn-danger btn-lg btn-block'}>Log Out</button>
                        </a>
                    </li>
                    <div style={{'backgroundColor': '#e32f45', 'height':'2px', 'width': '100%'}}></div>
                </ul>

            </nav>


        </div>

            );
}
