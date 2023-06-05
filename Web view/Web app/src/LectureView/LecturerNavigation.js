import * as React from 'react';
import '../Institution VIew/Navigation/Navigation.css';
import logo from '../images/logo.jpg';

export default function LecturerNavigation() {
    return (
      <div className={"grid"}>
        <nav className="vertical-navbar col-4 p-4">
          <div className="top">
            <img
              src={logo}
              alt="Logo"
              className="logo offset-2 img-fluid mr-1"
              width={"175px"}
              height={"155px"}
            />
            <div className="lecturer-name">Stefan Gruner</div>
          </div>
          <ul className="navbar-nav">
            
            <li className="nav-item text-center">
              <a href="/lecture-homepage" className="nav-link">
                <b>Edit Module Information</b>
              </a>
            </li>
            <li className="nav-item text-center">
              <a href="recent-announcement" className="nav-link">
                <b>Recent Announcements</b>
              </a>
            </li>
            <li className="nav-item text-center">
              <a href="personal-info" className="nav-link">
                <b>Edit Personal Information</b>
              </a>
            </li>
          </ul>
        </nav>
        <div className="logoutbtn fixed-bottom col-2 p-4 ml-4">
          <button className={"btn btn-danger btn-lg btn-block"} style={{"border-radius":"25px"}} >Log Out</button>
        </div>
      </div>
    );
}
