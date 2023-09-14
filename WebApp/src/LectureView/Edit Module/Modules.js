import { useState, useEffect } from "react";
import LecturerNavigation from "../LecturerNavigation";
import "../LectureHome.css";
import { listLecturers, getLecturer } from "../../graphql/queries";
import { API, Auth } from 'aws-amplify';
import { ErrorModal } from "../../Error pages/ErrorModal";
import { Link } from "react-router-dom";
import UserManual from "../HelpFiles/EditModuleInfo.pdf";
import HelpButton from '../../HelpButton';
import { useLecturer } from "../../ContextProviders/LecturerContext";
import moduleImage from "./Courses.png";

const Modules = () => {

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false); // Add loading state

  const { lecturer, setLecturer } = useLecturer();

  const fetchCourses = async () => {
    try {
      if (lecturer === null) {
        setLoading(true);
        const user = await Auth.currentAuthenticatedUser()
        let lecturer_email = user.attributes.email
        const lec = await API.graphql({
          query: listLecturers,
          variables: {
            filter: {
              email: {
                eq: lecturer_email
              }
            }
          },
        })
        if (lec.data.listLecturers.items.length > 0) {
          setLecturer(lec.data.listLecturers.items[0])
        }
      }
      // }
    } catch (error) {
      setError("Something went wrong. Please try again later")
    }
    finally {
      setLoading(false); // Set loading to false when fetching completes
    }
  }


  // useEffect(() => {
  //   fetchCourses();
  // }, [])

  return (
    <div style={{ display: 'inline-flex', maxHeight: '100vh' }}>
      {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
      <nav style={{ width: '20%' }}>

        <LecturerNavigation />
      </nav>

      <main style={{ width: '900px', marginTop: '30px' }}>


        <h1 className="moduleHead" style={{ textShadow: "2px 2px 4px rgba(0, 0.3, 0.2, 0.3)" }}>Courses</h1>
        {/* Add your explanatory image and text here */}
        <div style={{ textAlign: 'center' }}>
          <p>This page allows you to manage your registered modules. Click on a module to post reminders, due dates or update lecture venues.</p>
          <img src={moduleImage} alt="ModulesImage" style={{ maxWidth: '100%', maxHeight: '300px' }} />

        </div>

        {loading ? (
          <p style={
            {
              color: "#e32f45",
              opacity: 0.9,
              fontWeight: "50",
              fontSize: "50px",
              display: "flex",
              justifyContent: "center"
            }
          }>Fetching your courses...</p>
        ) : (
          lecturer?.courses?.items?.length === 0 ?

            (
              <div>
                <p style={
                  {
                    color: "#e32f45",
                    opacity: 0.9,
                    fontWeight: "50",
                    fontSize: "50px",
                    display: "flex",
                    justifyContent: "center"
                  }
                }>You have no courses</p>
                {/* <br/>
          <p style={ 
            {
              color: "#e32f45",
              opacity: 0.9,
              fontWeight: "50",
              fontSize: "25px",
              display: "flex",
              justifyContent: "center"

            }
          }>Contact your institution's admin</p> */}
              </div>
            )
            :
            (
              lecturer?.courses?.items?.map((val, key) => (
                <Link to={'/lecturer/edit-module'} state={val} key={val.coursecode}>
                  <button className="content-button" key={val.coursecode}>
                    {val.coursecode} <span style={{ float: "right", marginRight: 50, color: "#e32f45" }}>&#x2192;</span>
                  </button>
                </Link>
              ))
            )
        )}
        <br />
      </main>

      <div>
        <HelpButton pdfUrl={UserManual} />
      </div>
    </div>
  );
};

export default Modules;