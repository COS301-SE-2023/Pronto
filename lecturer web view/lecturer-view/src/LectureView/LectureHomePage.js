import React, {useState} from "react";
import arrow from "../images/arrow.png";
import LectureNavigation from "./LectureNavigation";
import "./LectureHome.css";

const LectureHomePage = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownClick, setDropdownClick] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [dropdownClick2, setDropdownClick2] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        setDropdownClick(!dropdownClick);
    };

    const toggleDropdown2 = () => {
        setDropdownOpen2(!dropdownOpen2);
        setDropdownClick2(!dropdownClick2);
    };

    return (
        <div className="container">
            <LectureNavigation/>
            <div className="content">
                <h1 className="lechead">COS341- Compiler Construction</h1>
                <div className="subjects">
                    <div className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
                        <button className="dropdown-button" onClick={toggleDropdown}>
                            Post a reminder
                            <img src={arrow} className={!dropdownClick ? 'arrowup' : 'arrowdown'} alt="Logo" width="30"
                                 height="35"/>
                        </button>
                        {dropdownOpen && (<div className="dropdown-menu">
                                <form>
                                    <div className="dropdown-title">
                                        <label htmlFor="title">Title: </label>
                                        <input type="text" id="title" maxLength="50" required/>
                                    </div>
                                    <div className="dropdown-body">
                                        <label htmlFor="body">Body:
                                            <textarea id="body" rows="6" cols="60" name="body" required></textarea>
                                        </label>
                                    </div>
                                    <div className="dropdown-date">
                                        <label htmlFor="date">Date: </label>
                                        <input type="date" id="date"/>
                                    </div>

                                    <button className="post-button">Post</button>
                                </form>
                            </div>)}
                    </div>
                </div>

                <div className="space"></div>
                <div className="subjects">
                    <div className={`dropdown ${dropdownOpen2 ? 'open' : ''}`}>
                        <button className="dropdown-button" onClick={toggleDropdown2}>
                            Post an upcoming assignment
                            <img src={arrow} className={!dropdownClick2 ? 'arrowup2' : 'arrowdown2'} alt="Logo"
                                 width="30" height="35"/>
                        </button>
                        {dropdownOpen2 && (<div className="dropdown-menu">

                                <form>
                                    <div className="dropdown-title">
                                        <label htmlFor="title">Title: </label>
                                        <input type="text" id="title" maxLength="50" required/>
                                    </div>
                                    <div className="dropdown-description">
                                        <label htmlFor="body">Extra info (optional)
                                            <textarea id="body" rows="6" cols="60" name="body"></textarea>
                                        </label>
                                    </div>
                                    <div className="dropdown-date">
                                        <label htmlFor="date">Date: </label>
                                        <input type="date" id="date" required/>
                                    </div>

                                    <button className="post-button">Post</button>
                                </form>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>)
}

export default LectureHomePage;