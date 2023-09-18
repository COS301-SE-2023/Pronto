import { useLocation } from "react-router-dom";

import LecturerNavigation from "../Navigation/LecturerNavigation";
import PostAccordion from "../Edit Module/PostAccordion";
import "../Dashboard/LectureHome.css";
import UserManual from "../HelpFiles/EditModuleInfo.pdf";
import HelpButton from '../../Components/HelpButton';
import manageImage from "../Images/Manage.png";

const PostReminder = () => {
  const state = useLocation()


  return (
    <div style={{ display: 'inline-flex' ,maxHeight:'100vh'}}>
      <nav style={{ width: '20%' }} >
        {/* Navigation bar content */}
        <LecturerNavigation />
      </nav>

      <main style={{ width: '900px', marginTop: '30px' }} >
        <h1 className="moduleHead">{state && state.state && state.state.coursecode}</h1>
        <div style={{ textAlign: 'center' }}>
          <p>This page allows you to post reminders, due dates or update lecture venues. Click on  a dropdown to get started!</p>
          <img src={manageImage} alt="ModulesImage" style={{ maxWidth: '100%', maxHeight: '200px' }} />

        </div>
        <PostAccordion
          course={state.state}
          libraries={["places"]} />
          <br/>
      </main>

      <div>
        <HelpButton pdfUrl={UserManual} /> {/* Help menu */}
      </div>

    </div>
  )
}

export default PostReminder;