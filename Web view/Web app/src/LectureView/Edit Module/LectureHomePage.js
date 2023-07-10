import React, {useState} from "react";
import LecturerNavigation from "../LecturerNavigation";
import "../LectureHome.css";
import { listCourses } from "../../graphql/queries";

const LectureHomePage = () => {

  const [courses,setCourses]=useState([])

  return (
    <div style={{ display: 'inline-flex' }}>
      <nav style={{ width: '20%' }}>
          {/* Navigation bar content */}
          <LecturerNavigation />
      </nav>

      <main style={{ width: '900px',marginTop: '30px' }}>
        <h1 className="moduleHead">Modules</h1>

        <a href="./edit-module">
        <button className="content-button">COS341- Compiler Construction</button>
        </a>

        <a href="/imperative">
        <button className="content-button">COS132- Imperative Programming</button>
        </a>
        
      </main>

    </div>
  );
};

export default LectureHomePage;