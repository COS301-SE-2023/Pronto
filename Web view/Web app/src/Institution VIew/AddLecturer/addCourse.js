import { useState} from 'react';
import Box from '@mui/material/Box';
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

export default function AddModal(module) {

  const [open, setOpen] = useState(false);
  const[courses,setCourses]=useState([{coursecode:"",coursename:""}]);
  const[removed,setRemoved]=useState([])

  const handleOpen = async() =>{ 
      setOpen(true) 
      module.setModal(true)

      //Adding new lecturer with courses
      if(module.updateFlag===false){  
       
        if(module.courseData===undefined || module.courseData.length===0){ 
            setCourses([{coursename:"",coursecode:""}])
           
         }
         else if(module.courseData[module.courseData.length-1].coursecode!==""){ 
            setCourses([...module.courseData,{coursecode:"",coursename:""}])
           
         } 
      }
      else{ 
      
        if(module.lecturerData.courses===undefined || module.lecturerData.courses.length===0){
            setCourses([{coursecode:"",coursename:""}])
      
        }
        else if(module.lecturerData.courses[module.lecturerData.courses.length-1].coursecode!==""){ 
            setCourses([...module.lecturerData.courses,{coursecode:"",coursename:""}])
           
        }
      }

      
  }

  const handleClose = async() => {  
     setOpen(false) 
     module.setCourses(courses)
     module.setModal(false)
     
     //Remove deleted courses
      if(module.updateFlag===true){
        if(removed.length>0){
          await module.removeCourses(removed,module.lecturerData)
        }
     
        //Add new courses
        let newcourses=[]
        for(let i=0;i<courses.length;i++){
          if(courses[i].coursecode!=="" ){
            if(module.courseData.find(course=>course.coursecode===courses[i].coursecode)===undefined){
              newcourses.push(courses[i])
            }
          }
        }
        let courseList=await module.findCourses(newcourses)
       
        if(newcourses.length>courseList.length)
             alert("Course(s) not found")
       
        if(courseList.length>0){
          await module.addCourses(module.lecturerData,courseList)
        }

        module.setCourses([])
      }
      else { 
        module.setCourses(courses)
      }
      
      setCourses([])
}

const handleAdd = async(event) => {
  event.preventDefault()
  const course = {
      coursename: "",
      coursecode: ""
    };
    setCourses([...courses,course])
    event.target.reset()
  };

const handleRemove = async(index) => {
    const remove=[...removed]
    remove.push(courses[index])
    setRemoved(remove)
    const rows = [...courses]
    rows.splice(index, 1)
    setCourses( rows )
  }

  const handleNameChange= async(index,event) => { 
    if(courses[index]===undefined){
      courses[index]={
        coursecode:"",
        coursename:""
      }
    }
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

  const handleCodeChange = async(index,event)=> {  
    if(courses[index]===undefined){
      courses[index]={
        coursecode:"",
        coursename:""
      }
    }
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
      className="btn btn-primary"
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
              required
              onChange={(e)=>handleCodeChange(courses.length-1,e)}
              className="form-control"
              /> 
              </div>
              <div className="form-group col-6">
             <input 
              type="text"
              name="coursename"
              defaultValue=""
              required
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