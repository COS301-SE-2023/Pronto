import React, {useState} from "react";
import LectureNavigation from "./LectureNavigation";
import PostReminder from "./PostReminder";
import "./LectureHome.css";

const LectureHomePage = () => {
  return (
    <div className="container">
      <LectureNavigation/>
      <div className="content">
        <h1 className="lechead">Modules</h1>
        <div className="subjects">
          <a href={PostReminder}>
          <button className="content-button">COS341- Compiler Construction</button>
          </a>
          <a href="/imperative">
          <button className="content-button">COS132- Imperative Programming</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LectureHomePage;