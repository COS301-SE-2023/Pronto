import React, {useState,useEffect} from "react";
import LecturerNavigation from "../LecturerNavigation";
import "../LectureHome.css";
import { listCourses ,listLecturers} from "../../graphql/queries";
import  {API,Auth} from 'aws-amplify';

const LectureHomePage = () => {

  const [courses,setCourses]=useState([])
  const [lecturer,setLecturer]=useState('')

  const fetchCourses=async()=>{ 
    try{
         const email=await Auth.currentAuthenticatedUser()
         if(email===undefined){
           alert("Please log in")
         }
         else{
          let user_email=email.email
         const lec=await API.graphql({ 
             query:listLecturers,
             variables:{ 
              filter: { 
                email: { 
                  eq : { 
                    user_email
                  }
                }
              }
             }
         }) 
         console.log(lec)
         setLecturer(lec.data.listLecturers.item[0])
         const courseList= await API.graphql({
           query:listCourses,
                    variables: { 
                    filter: { 
                        lecturerId : { 
                                        eq:lecturer.id
                                        }
                                    }
                            },
                    authMode:"AMAZON_COGNITO_USER_POOLS"
         })
        console.log(courseList)
        courseList=courseList.data.listCourses 
        setCourses([...courseList])
         }
    }catch(error){
      console.log(error)
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