import React, {useState} from "react";
import LectureNavigation from "./LectureNavigation";
import "./LectureHome.css";

const LectureHomePage = () => {
  return (
    <div className="container">
      <LectureNavigation/>
      <div className="content">
        <h1 className="lechead">Modules</h1>
        <div className="subjects">
          <Link to="./PostReminder.js">
          <button className="content-button">COS341- Compiler Construction</button>
          </Link>
          <a href="/imperative">
          <button className="content-button">COS132- Imperative Programming</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LectureHomePage;