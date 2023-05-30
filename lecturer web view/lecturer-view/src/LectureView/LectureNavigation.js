import React from "react";
import logo from "../images/logo.jpg";
import "../App.css";
const LectureNavigation = () => {

    return(
            <div className="navbar">
                <div className="logo">
                    <img src={logo} alt="Logo" width="228" height="222" />
                </div>
                <div className="lecturer">Stefan Gruner</div>

                <div className="buttons">
                    <a href="./edit-module.js">
                        <button>Edit module information</button>
                    </a>

                    <a href="/recent-announcements">
                        <button>Recent announcements</button>
                    </a>

                    <a href="/add-venue">
                        <button>Add lecture venue</button>
                    </a>

                    <a href="/edit-personal">
                        <button>Edit personal information</button>
                    </a>
                </div>

                <div className="logout">
                    <a href="/logout">
                        <button className="logout-button">Logout</button>
                    </a>
                </div>
            </div>
    )
}

export default LectureNavigation;