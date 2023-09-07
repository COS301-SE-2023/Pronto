import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SearchableDropdown from "./searchableDropdown";
import { selectClasses } from "@mui/material";

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
  const [offeredCourses, setOfferedCourses] = useState([]);
  const [courses,setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [removed, setRemoved] = useState([]);
  const [selected, setSelected] = useState();
  

  const handleOpen = async () => {
    setOpen(true)
    module.setModal(true)
    //console.log(module.selectedCourses)
    let courses = []
    try {
      for (let i = 0; i < module.selectedCourses.length; i++) {
        selectedCourses.push(module.selectedCourses[i]);
      }
      setSelectedCourses(selectedCourses);
    } catch (e) {
      //alert("No courses found")
      console.log(e)
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
    
    console.log(event);
    let added=false;
      for (let i = 0; i < selectedCourses.length; i++) {
        if (selectedCourses[i].id === event.id) {
          added=true;
          break;
        }
      }
      
    if(!added){
   
      selectedCourses.push(event);
      setSelectedCourses(selectedCourses);
      setOfferedCourses([]);
    }
    console.log(selectedCourses);
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
                        {val?.coursecode}
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
               <SearchableDropdown 
                courses={courses}
                selectedCourses={selectedCourses}
                setSelectedCourses={setSelectedCourses} 
                handleAdd={handleAdd}
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