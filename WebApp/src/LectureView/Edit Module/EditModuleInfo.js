import React, { useEffect } from "react";
import LecturerNavigation from "../LecturerNavigation";
import PostAccordion from "../Edit Module/PostAccordion";
import "../LectureHome.css";
import { useLocation } from "react-router-dom";
import UserManual from "../HelpFiles/LecturerInstructions.pdf";
import HelpButton from '../../HelpButton';

const PostReminder = (props) => {
  const state = useLocation()
  const p = async () => {
    if (state.state === null) {
      let s = {
        coursecode: ""
      }
      state.state = s
    }

  }
  useEffect(() => {
    p();
  }, [])

  return (
    <div style={{ display: 'inline-flex' }}>
      <nav style={{ width: '20%' }} >
        {/* Navigation bar content */}
        <LecturerNavigation />
      </nav>

      <main style={{ width: '900px', marginTop: '30px' }} >
        <h1 className="moduleHead">{state.state.coursecode}</h1>
        <PostAccordion
          course={state.state} />
      </main>

      <div>
        <HelpButton pdfUrl={UserManual} />
      </div>

    </div>
  )
}

export default PostReminder;