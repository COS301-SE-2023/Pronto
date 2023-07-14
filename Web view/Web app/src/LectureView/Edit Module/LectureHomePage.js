import React, {useState,useEffect} from "react";
import LecturerNavigation from "../LecturerNavigation";
import "../LectureHome.css";
import { listCourses ,listLecturers,getLecturer} from "../../graphql/queries";
import  {API,Auth} from 'aws-amplify';
import {AddModal} from '../../ErrorModal'
import { Link } from "react-router-dom";
const LectureHomePage = () => {

  const [courses,setCourses]=useState([])
  const [lecturer,setLecturer]=useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const fetchCourses=async()=>{ 
    try{
      const user=await Auth.currentAuthenticatedUser()
      if(user===undefined){
        alert("Please log in")
      }
      else{
        let lecturer_email=user.attributes.email
        console.log(lecturer_email)
        const lec=await API.graphql({ 
                    query:listLecturers,
                    variables:{ 
                        filter: { 
                           email: { 
                            eq : "ndie2001@gmail.com"
                        }
                     }
                  },
                authMode:"AMAZON_COGNITO_USER_POOLS",
                })

        console.log(lec)
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
                authMode:"AMAZON_COGNITO_USER_POOLS",
                })
          console.log(courseList)
          
          courseList=courseList.data.listCourses.items 
          setCourses(courseList)
            
         }
        }
    }catch(error){
      setErrorMessage(error)
      console.log(error)
      return ( 
          <AddModal error={errorMessage}> 
          </AddModal>     
      )
    }
  }
  

  useEffect(() => {
        fetchCourses();
    }, [])
    
  return (
    <div style={{ display: 'inline-flex' }}>
      <nav style={{ width: '20%' }}>
          {/* Navigation bar content */}
          <LecturerNavigation />
      </nav>

      <main style={{ width: '900px',marginTop: '30px' }}>
        <h1 className="moduleHead">Courses</h1>
{/* 
        <a href="./edit-module">
        <button className="content-button">COS341- Compiler Construction</button>
        </a> */}
       <Link 
          to={'/edit-module'}  
          state={courses}>Learn More</Link>
          
{/* 
        <a href="./edit-module">
        <button className="content-button">COS132- Imperative Programming</button>
        </a> */}
        {  courses.map((val, key)=>{    
            return (
              // <a href="./edit-module" key={val.coursecode}> 
              //   <button className="content-button" key={val.coursecode}>{val.coursecode}</button>
              // </a>
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