import React, {useState} from "react";
import arrow from "../images/arrow.png";
import LectureNavigation from "./LectureNavigation";
import PostAccordion from "./PostAccordion";
import "./LectureHome.css";

const PostReminder = () => {
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
            <PostAccordion/>
            </div>
        </div>)
}

export default PostReminder;