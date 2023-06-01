import React, {useState} from "react";
import LecturerNavigation from "./LecturerNavigation";
import "./LectureHome.css";

const LectureHomePage = () => {
  return (
    <div style={{ display: 'inline-flex' }}>
      <nav style={{ width: '20%' }}>
          {/* Navigation bar content */}
          <LecturerNavigation />
      </nav>

      <main style={{ width: '900px',marginTop: '30px' }}>
        <h1 className="subjHead">Modules</h1>
        <div className="subjects">
          <a href="./post-reminder">
          <button className="content-button">COS341- Compiler Construction</button>
          </a>
          <a href="/imperative">
          <button className="content-button">COS132- Imperative Programming</button>
          </a>
        </div>
      </main>

    </div>
  );
};

export default LectureHomePage;