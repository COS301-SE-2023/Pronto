import { useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position:'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function AddModal(modules) {

  const [open, setOpen] = useState(false);
  const[courses,setCourses]=useState([{coursecode:"",coursename:""}]);
  
  const handleOpen = () =>{ 
     setOpen(true) 
     modules.setModal(true)
    // console.log(module.courseData)
     if(modules.courseData==null || modules.courseData.length===0){
       setCourses([{coursecode:"",coursename:""}])
       console.log(courses)
       }
       else{
          setCourses(modules.courseData)
          console.log(courses)
        }
  }
  const handleClose = () => {  
     setOpen(false) 
     modules.setModal(false)
     modules.setCourses(courses.slice(0,courses.length))
  }

  

const handleAdd = (event) => {
  event.preventDefault()
  const course = {
      coursename: "",
      coursecode: ""
    };
    setCourses([...courses,course])
    event.target.reset()
  };


const handleRemove = (index) => {
    const rows = [...courses]
    rows.splice(index, 1)
    setCourses( rows )
  }

  const handleNameChange= (index,event) => { 
      if(courses.length<=index){
         courses[index]= { 
            coursename:"",
            coursecode:""
         }
      }
    
      courses[index]= { 
      coursename:event.target.value,
      coursecode:courses[index].coursecode
      
    }
      setCourses(courses)
  }

  const handleCodeChange =(index,event)=> { 
    if(courses.length<=index){
         courses[index]= { 
            coursename:"",
            coursecode:""
         }
      }
    
    courses[index]= { 
        coursename:courses[index].coursename,
        coursecode:event.target.value
    }
      setCourses(courses)
  }
   
  return (
    <div className="form-row">                            
      <div className="form-group col-6">
      
      <button onClick={handleOpen}  
      className="btn btn-primary "
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
                <th scope="col">Course Name</th>
              </tr>
            </thead>
            <tbody>
              { courses.slice(0,courses.length-1).map((val, key)=>{    
                  return (
                    <tr key={key}>
                      <td>   
                          {val.coursecode}
                      </td>
                      <td>
                        {val.coursename}
                      </td>
                      <td>
                        <button onClick={(e)=>handleRemove(key)}
                          type="button" 
                          className="btn btn-danger" 
                          data-testid="removeButton"
                         >
                          Remove
                        </button>
                      </td>
                    </tr>
                    )}
                  )}         
            </tbody>
          </table>
          <form onSubmit={(e)=>handleAdd(e)}>
            <div className="form-row">
              <div className="form-group col-6">
            <input 
              type="text"
              name="coursecode"
              defaultValue=""
              onChange={(e)=>handleCodeChange(courses.length-1,e)}
              className="form-control"
              /> 
              </div>
              <div className="form-group col-6">
             <input 
              type="text"
              name="coursename"
              defaultValue=""
              onChange={(e)=>handleNameChange(courses.length-1,e)}
              className="form-control"
              />  
              </div>
              <button type="submit" 
               className="btn btn-primary" 
                data-testid="addButton">Add</button>
              </div> 
          </form>
          <button onClick={handleClose}
            type="submit" 
            className="btn btn-primary float-right"
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