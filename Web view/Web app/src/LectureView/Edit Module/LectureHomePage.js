import React, {useState,useEffect} from "react";
import LecturerNavigation from "../LecturerNavigation";
import "../LectureHome.css";
import { listCourses ,listLecturers,getLecturer} from "../../graphql/queries";
import  {API,Auth} from 'aws-amplify';
import {ErrorModal} from '../../ErrorModal'
import { Link } from "react-router-dom";
const LectureHomePage = () => {

  const [courses,setCourses]=useState([])
  const [lecturer,setLecturer]=useState('')
  const [error, setError] = useState('')

  const fetchCourses=async()=>{ 
    try{
      const user=await Auth.currentAuthenticatedUser()
      if(user===undefined){
        setError("You are not logged in! Please click on the logout button and log in to use Pronto")
      }
      else{
        let lecturer_email=user.attributes.email
        console.log(lecturer_email)
        const lec=await API.graphql({ 
                    query:listLecturers,
                    variables:{ 
                        filter: { 
                           email: { 
                            eq : lecturer_email
                        }
                     }
                  },
                authMode:"API_KEY",
                })

        // console.log(lec)
        // const query=await API.graphql({
        //     query:getLecturer,
        //     variables:{id},
        //     authMode:"API_KEY",
        // })
        // console.log(query)
        if(lec.data.listLecturers.items.length>0){     
          await setLecturer(lec.data.listLecturers.items[0])
          console.log(lec)
            let courseList=await API.graphql({ 
                    query:listCourses,
                    variables:{ 
                        filter: { 
                           lecturerId: { 
                            eq : lec.data.listLecturers.items[0].id
                        }
                     }
                  },
                authMode:"API_KEY",
                })
          console.log(courseList)
          
          courseList=courseList.data.listCourses.items 
          setCourses(courseList)
            
         }
        }
    }catch(error){
         let e=error.errors[0].message
          if(e.search("Not Authorized")!==-1){ 
            setError("You are not authorized to perform this action.Please log out and log in")
          }
          else if(e.search("Network")!==-1){
            setError("Request failed due to network issues")
          }
          else{ 
            setError("Something went wrong.Please try again later")
          }
          console.log(error)
    }
  }
  

  useEffect(() => {
        fetchCourses();
    }, [])
    
  return (
    <div style={{ display: 'inline-flex' }}>
      {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
      <nav style={{ width: '20%' }}>
          {/* Navigation bar content */}
          <LecturerNavigation />
      </nav>

      <main style={{ width: '900px',marginTop: '30px' }}>
        <h1 className="moduleHead">Courses</h1>
          {courses.map((val, key)=>{    
              return (
                <Link 
                  to={'/edit-module'}  
                  state={val}
                  key={val.coursecode}>        
                      <button   
                        className="content-button" 
                        key={val.coursecode}>
                          {val.coursecode}    
                      </button>
                </Link>
                  )
            })} 
      </main>
    </div>
  );
};

export default LectureHomePage;