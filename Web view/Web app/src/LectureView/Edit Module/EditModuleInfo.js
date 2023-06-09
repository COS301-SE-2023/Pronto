import React from "react";
import LecturerNavigation from "../LecturerNavigation";
import PostAccordion from "../Edit Module/PostAccordion";
import "../LectureHome.css";

const PostReminder = () => {
    return (
    <div style={{ display: 'inline-flex' }}>
      <nav style={{ width: '20%' }} data-testid={"LecturerNavigation"}>
          {/* Navigation bar content */}
          <LecturerNavigation />
      </nav>

      <main style={{ width: '900px',marginTop: '30px' }} data-testId={'editAccordion'}>
        <h1 className="moduleHead">COS341- Compiler Construction</h1>
        <PostAccordion />
      </main>

    </div>   
    )
}

export default PostReminder;