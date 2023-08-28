import LecturerNavigation from "../LecturerNavigation";
import PostAccordion from "../Edit Module/PostAccordion";
import "../LectureHome.css";
import { useLocation } from "react-router-dom";
import UserManual from "../HelpFiles/EditModuleInfo.pdf";
import HelpButton from '../../HelpButton';


const PostReminder = () => {
  const state = useLocation()


  return (
    <div style={{ display: 'inline-flex' }}>
      <nav style={{ width: '20%' }} >
        {/* Navigation bar content */}
        <LecturerNavigation />
      </nav>

      <main style={{ width: '900px', marginTop: '30px' }} >
        <h1 className="moduleHead">{state && state.state && state.state.coursecode}</h1>
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