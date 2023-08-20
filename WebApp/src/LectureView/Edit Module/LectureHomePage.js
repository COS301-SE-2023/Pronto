import {useState,useEffect} from "react";
import LecturerNavigation from "../LecturerNavigation";
import "../LectureHome.css";
import {  listLecturers} from "../../graphql/queries";
import  {API,Auth} from 'aws-amplify';
import {ErrorModal} from '../../ErrorModal'
import { Link,useLocation } from "react-router-dom";
const LectureHomePage = () => {

  const state=useLocation();
  const [lecturer,setLecturer]=useState(state.state);
  const [error, setError] = useState('')

  const fetchCourses=async()=>{ 
    try{
      if(lecturer===null || lecturer===undefined || lecturer.courses===undefined){
        const user=await Auth.currentAuthenticatedUser();
        let lecturer_email=user.attributes.email;
        let lec=await API.graphql({ 
                    query:listLecturers,
                    variables:{ 
                        filter: { 
                           email: { 
                            eq : lecturer_email
                        }
                     }
                  },
                authMode:"AMAZON_COGNITO_USER_POOLS",
                });
                
         if(lec.data.listLecturers.items.length===0){
           throw Error();
          }
          setLecturer(lec);
          
        }
    }catch(error){
      console.log(error);
      if(error.errors!==undefined){
         let e=error.errors[0].message;
          if(e.search("Not Authorized")!==-1){ 
            setError("You are not authorized to perform this action.Please log out and log in");
          }
          else if(e.search("Network")!==-1){
            setError("Request failed due to network issues");
          }
          else{ 
            setError("Something went wrong.Please try again later");
          }
    }else{
      setError("Your request could not be processed at this time");
    }

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
          <LecturerNavigation props={lecturer}/>
      </nav>

      <main style={{ width: '900px',marginTop: '30px' }}>
        <h1 className="moduleHead">Courses</h1>
          {lecturer && lecturer.courses && lecturer.courses.items.map((val, key)=>{    
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