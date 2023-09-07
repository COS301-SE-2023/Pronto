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
   const {selectedCourses} =props.selectedCourses;
   const {setSelectedCourses} =props.setSelectedCourses;
   const [course,setCourse]=useState("");

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
    console.log(course);
  };

  const handleAdd = ()=>{
    let added=false
    for(let i=0;i<selectedCourses.length;i++){
        if(selectedCourses[i].coursecode===course.coursecode){
            added=true;
            break;
        }
    }
    if(!added){
        selectedCourses.push(course);
        setSelectedCourses(selectedCourses);
        setCourse("");
        setSearchTerm("");
        setIsOpen(true);
    }
  } 

    return (
      <div>
         <div>  
        <input
          type="text"
          placeholder="Type in Course Code..."
          value={searchTerm}
          onChange={handleInputChange}
          onClick={toggleDropdown}
        />
        {isOpen && (
          <ul >
            {courses.filter((c)=>c.lecturerId===null && c.institutionId===admin.institutionId).map((val, index) => (
                <li key={index} onClick={() => handleSelectCourse(val)}>
                  {val?.coursecode}
                </li>
              ))}
          </ul>
        )}
        </div> 
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
