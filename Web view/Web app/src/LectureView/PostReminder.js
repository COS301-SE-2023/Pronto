import React, {useState} from "react";
import LecturerNavigation from "./LecturerNavigation";
import PostAccordion from "./PostAccordion";
import "./LectureHome.css";

const PostReminder = () => {
    return (
    <div style={{ display: 'inline-flex' }}>
      <nav style={{ width: '20%' }}>
          {/* Navigation bar content */}
          <LecturerNavigation />
      </nav>

      <main style={{ width: '1200px',marginTop: '30px' }}>
        <h1 className="moduleHead">COS341- Compiler Construction</h1>
        <PostAccordion/>
      </main>

    </div>   
    )
}

export default PostReminder;