import { useState } from "react";

import { listCourses } from "../../Graphql/queries";
import { useAdmin } from "../../ContextProviders/AdminContext";

import { API } from "aws-amplify";

export default function SearchableDropdown(props) {

  const [courses, setCourses] = useState(props.courses);
  const { admin } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [course, setCourse] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);


  const handleInputChange = async (event) => {

    setSearchTerm(event.target.value);
    try {
      let courseList = await API.graphql({
        query: listCourses,
        variables: {
          filter: {
            // and: [
            //   {
            //     coursecode: { eq: event.target.value },

            //   },
            //   {
            //     institutionId: { eq: admin.institutionId }
            //   },
            //   {
            //     lecturerId: { eq: null }
            //   }
            // ]
            coursecode:{
              beginsWith:event.target.value
            }
          }
        }
      }
      )
      console.log(courseList);
      let c = [];
      courseList = courseList.data.listCourses.items.filter((a) => a.lecturerId === null && a._deleted===null && a.institutionId===admin.institutionId)

      for (let i = 0; i < courseList.length; i++) {
        if (selectedCourses.filter((a) => a.id !== courseList[i].id)) {
          c.push(courseList[i]);
        }
      }
      setCourses(c);
      setIsOpen(true);
      ;
    } catch (error) {
       console.log(error);
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

  const handleAdd = () => {

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
          style={{ border: "none" }}
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
          onClick={(e) => handleAdd(e)}
          type="submit"
          className="btn btn-danger"
          style={{ borderRadius: "20px", width: "100px", marginLeft: "20px" }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
