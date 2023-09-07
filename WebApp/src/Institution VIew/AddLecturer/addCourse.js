import { useState } from "react";
import {API} from "aws-amplify"
import Box from "@mui/material/Box";
import Select from 'react-select'
import Modal from "@mui/material/Modal";
import SearchableDropdown from "./searchableDropdown";
import { searchCourses } from "../../graphql/queries";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddModal(module) {

  const [open, setOpen] = useState(false);
  const [searchValue,setSearchValue]=useState("");
  const [offeredCourses, setOfferedCourses] = useState([]);
  const [courses,setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [removed, setRemoved] = useState([]);
  const [selected, setSelected] = useState();
  const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Grape', 'Lemon', 'Orange'];

  // const [options,setOptions] = useState([
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ])

  const handleOpen = async () => {
    setOpen(true)
    module.setModal(true)
    let courses = []
    try {
      for (let i = 0; i < module.courseData.length; i++) {
        if (module.courseData[i].lecturerId === null) {
          offeredCourses.push(module.courseData[i])
        }
      }
      setOfferedCourses(offeredCourses)
      setSelectedCourses(module.selectedCourses)

    } catch (e) {
      //alert("No courses found")
      console.log(e)
    }
  }

  const handleSearch = async(event)=>{ 
   // event.preventDefault()
    try{
        // let search=await API.graphql({
        //   query:searchCourses,
        //   variables: {
        //     filter: {
        //       and:[
        //         {  
        //           coursecode: {
        //             matchPhrasePrefix: searchValue
        //          } 
        //         },
        //         {
        //           lecturerId : { 
        //             eq : null
        //           }
        //         } 
        //       ]
        //     }
        //   }
        // })
        //setCourses(search.data.searchCourses.items);
        console.log(event);
    }catch(error){
      console.log(error);
    }
  }

  const handleClose = async () => {
    setOpen(false)
    module.setModal(false)

    //Remove deleted courses
    if (module.updateFlag === true) {
      if (removed.length > 0) {
        await module.removeCourses(removed, module.lecturerData)
      }
      //Add new courses
      let newcourses = []
      for (let i = 0; i < selectedCourses.length; i++) {
        if (selectedCourses[i].lecturerId === null) {
          newcourses.push(selectedCourses[i])
        }
      }
      await module.addCourses(module.lecturerData, newcourses)
      module.setOfferedCourses(offeredCourses)
    }
    else {
      module.setSelectedCourses(selectedCourses)
      module.setOfferedCourses(offeredCourses)
    }
    setOfferedCourses([])
    setSelectedCourses([])

  }

  const handleAdd = async (event) => {
    event.preventDefault()
    let index = -1
    if (selected !== null || selected !== undefined) {
      for (let i = 0; i < offeredCourses.length; i++) {
        if (offeredCourses[i].id === selected.id) {
          index = i
          break;
        }
      }
    }
    setSelectedCourses([...selectedCourses, selected])
    offeredCourses.splice(index, 1)
    setOfferedCourses(offeredCourses)

  }

  const handleRemove = async (index) => {
    const remove = [...removed, selectedCourses[index]]
    offeredCourses.push(selectedCourses[index])
    selectedCourses.splice(index, 1)
    setRemoved(remove)
    setOfferedCourses(offeredCourses)
    setSelectedCourses(selectedCourses)

  }

  const handleSelect = async (index) => {
    setSelected(offeredCourses[index])
  }

  return (
    <div className="form-row">
      <div className="form-group col-6">

        <button onClick={handleOpen}
          className="btn btn-danger"
          data-testid="submitButton">View</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <table
              className="table table-hover"
              style={{ alignItems: 'center' }}
              data-testid="coursesTable"
            >
              <thead>
                <tr>
                  <th scope="col">Course Code</th>
                </tr>
              </thead>
              <tbody>
                {selectedCourses.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>
                        {val.coursecode}
                      </td>
                      <td>
                        {val.coursename}
                      </td>
                      <td>
                        <button onClick={(e) => handleRemove(key)}
                          type="button"
                          className="btn btn-danger"
                          data-testid="removeButton"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  )
                }
                )}
              </tbody>
            </table>
            {/* <form onSubmit={(e) => handleAdd(e)}>
              <div className="form-row">
                <div className="form-group col-6">
                  <select
                    onChange={(e) => handleSelect(e.target.value)}
                    //value={selected}
                    className="custom-select">
                    <option key="{}"> </option>
                    {courses.map((val, key) => {
                      return (
                        <option key={val.coursecode}
                          value={key}>{val.coursecode}</option>
                      )

                    })

                    }
                  </select>
                </div>
                
                <button type="submit"
                  className="btn btn-danger"
                  data-testid="addButton">Add</button>
              </div>
            </form> */}
            {/* <div> */}
               <SearchableDropdown 
                courses={courses}
                selectedCourses={selectedCourses}
                setSelectedCourses={setSelectedCourses} 
                />
            {/* </div> */}
            <button
              onClick={handleClose}
              type="submit"
              className="btn btn-danger float-right"
              data-testid="submitCourses"
            >
              Done
            </button>
          </Box>
        </Modal>

      </div>
    </div>

  );
}