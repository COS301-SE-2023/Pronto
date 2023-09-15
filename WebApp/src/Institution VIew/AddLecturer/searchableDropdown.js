import {useState } from "react";

import { searchCourses } from "../../Graphql/queries";
import { useAdmin } from "../../ContextProviders/AdminContext";

import {API} from "aws-amplify";

export default function SearchableDropdown(props){

   const [courses,setCourses]=useState(props.courses); 
   const {admin}=useAdmin();
   const [searchTerm,setSearchTerm] =useState("");
   const [isOpen,setIsOpen] = useState(true);
   const [course,setCourse]=useState("");
   const [selectedCourses,setSelectedCourses] = useState([]); 


   const handleInputChange = async(event) => {
    
    setSearchTerm(event.target.value);
    try{
        let courseList=await API.graphql({
                    query:searchCourses,
                   variables:{ 
                           filter: {
                              and:[
                                   { 
                                    coursecode : {matchPhrasePrefix:event.target.value},
                                     
                                   },
                                   {
                                    institutionId:{eq:admin.institutionId}
                                   },
                                   {
                                     lecturerId: {eq:null}
                                   }
                              ]
                           }
                }
              }
              )
         let c=[];
         courseList=courseList.data.searchCourses.items.filter((a)=>a.lecturerId===null)     
         for(let i=0;i<courseList.length;i++){
          if(selectedCourses.filter((a)=>a.id!==courseList[i].id)){
            c.push(courseList[i]);
          }
         }
         setCourses(c);
         setIsOpen(true);
       ;
    }catch(error){
     
    }

  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectCourse = (course) => {
    setSearchTerm(course.coursecode);
    setIsOpen(false);
    setCourse(course);    
  };

  const handleAdd = ()=>{
    
    props.handleAdd(course);
    setCourse("");
    setSearchTerm("");
    setCourses([]);
    selectedCourses.push(course);
    setSelectedCourses(selectedCourses);
    setIsOpen(false);
  } 

    return (
      <div 
      className="form-row"
    
      > 
        <div 
          className="form-group col-6"
        > 
        <input
          type="text"
          placeholder="Type in Course Code..."
          className="form-control"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={toggleDropdown}
        />
        {isOpen && (
          <ul className="dropdown-list">
            {courses
            .map((val, index) => (
                <li key={index} onClick={() => handleSelectCourse(val)}>
                  {val?.coursecode}
                </li>
              ))}
          </ul>
        )}
        </div>
       <div className="form-group col-6">
        <button 
            onClick={(e)=>handleAdd(e)}
            type="submit"
            className="btn btn-danger"
            >
            Add
        </button>
        </div>
      </div>
    );
  }
