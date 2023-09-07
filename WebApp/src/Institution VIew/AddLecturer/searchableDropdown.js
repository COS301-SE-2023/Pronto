// SearchableDropdown.js
import React, { Component,useState } from "react";
import { searchCourses } from "../../graphql/queries";
import {API} from "aws-amplify";
import { useAdmin } from "../../ContextProviders/AdminContext";

export default function SearchableDropdown(props){

   const [courses,setCourses]=useState(props.courses); 
   const {admin,setAdmin}=useAdmin();
   const [searchTerm,setSearchTerm] =useState("");
   const [isOpen,setIsOpen] = useState(true);
   const selectedCourses =props.selectedCourses;
   const setSelectedCourses =props.setSelectedCourses;
   const [course,setCourse]=useState("");

//    console.log(props.selectedCourses);
//    console.log(selectedCourses);
   const handleInputChange = async(event) => {
    
    setSearchTerm(event.target.value);
    try{
        let courseList=await API.graphql({
                    query:searchCourses,
                   variables:{ 
                           filter: {
                                and: [
                                    { coursecode: { matchPhrasePrefix: event.target.value } },
                                    { institutionId : {eq: admin.institutionId}},
                                    { lecturerId : {eq:null} }
                                ]
                            }
                        }
                })
        setCourses(courseList.data.searchCourses.items);
    }catch(error){
        console.log(error)
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
    // let added=false
    // for(let i=0;i<props.selectedCourses.length;i++){
    //     if(props.selectedCourses[i].coursecode===course.coursecode){
    //         added=true;
    //         break;
    //     }
    // }
    // if(!added){
    //     props.selectedCourses.push(course);
    //     props.setSelectedCourses(selectedCourses);
    //     setCourse("");
    //     setSearchTerm("");
    //     setIsOpen(true);
    // }
    props.handleAdd(course);
    setCourse("");
    setSearchTerm("");
    setIsOpen(true)
  } 

    return (
      <div className="searchable-dropdown"> 
         {/* <div>   */}
        <input
          type="text"
          placeholder="Type in Course Code..."
          value={searchTerm}
          onChange={handleInputChange}
          onClick={toggleDropdown}
        />
        {isOpen && (
          <ul className="dropdown-list">
            {courses
            //.filter((c)=>c.lecturerId===null && c.institutionId===admin.institutionId)
            .map((val, index) => (
                <li key={index} onClick={() => handleSelectCourse(val)}>
                  {val?.coursecode}
                </li>
              ))}
          </ul>
        )}
        {/* </div>  */}
        <button 
            onClick={(e)=>handleAdd(e)}
            type="submit"
            className="btn btn-danger"
            >
            Add
        </button>
         
      </div>
    );
  }
