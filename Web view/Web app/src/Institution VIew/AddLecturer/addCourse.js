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
  const[offeredCourses,setOfferedCourses]=useState([]);
  const[selectedCourses,setSelectedCourses]=useState([])
  const[removed,setRemoved]=useState([])
  const[selected,setSelected]=useState()

  const handleOpen = async() =>{ 
      setOpen(true) 
      module.setModal(true)      
      let courses=[]
      for(let i = 0  ;i< module.offeredCourses.length;i++){
        if(module.offeredCourses[i].lecturerId===null){ 
            courses.push(module.offeredCourses[i])
          } 
      }
      setOfferedCourses(courses)
      setSelectedCourses(module.selectedCourses)

  }

  const handleClose = async() => {  
     setOpen(false) 
     //module.setCourses()
     module.setModal(false)
     
     //Remove deleted courses
      if(module.updateFlag===true){
        if(removed.length>0){
          await module.removeCourses(removed,module.lecturerData)
        }
     
        //Add new courses
        let newcourses=[]
        // for(let i=0;i<courses.length;i++){
        //   if(courses[i].coursecode!=="" ){
        //     if(module.courseData.find(course=>course.coursecode===courses[i].coursecode)===undefined){
        //       newcourses.push(courses[i])
        //     }
        //   }
        //}
        let courseList=await module.findCourses(newcourses)
       
        if(newcourses.length>courseList.length)
             alert("Course(s) not found")
       
        if(courseList.length>0){
          await module.addCourses(module.lecturerData,courseList)
        }

        module.setCourses([])
      }
      // else { 
      //   module.setCourses(courses)
      // }
      
     // setCourses([])
     module.setCourses(offeredCourses)
}

const handleAdd = async(event) => {
  event.preventDefault()
  let index=-1
  console.log(offeredCourses)
  console.log(selected)
  if(selected!==null || selected!==undefined){
    for(let i=0;i<offeredCourses.length;i++){
      if(offeredCourses[i].id===selected.id){ 
        index=i
        break;
      }
    }
  } 
  setSelectedCourses([...selectedCourses,selected])
  offeredCourses.splice(index,1)
  setOfferedCourses(offeredCourses)

    //event.target.reset()
}

const handleRemove = async(index) => {
    const remove=[...removed]
  //  remove.push(courses[index])
    setRemoved(remove)
    //const rows = [...courses]
    //rows.splice(index, 1)
    //setCourses( rows )
  }

  const handleSelect = async(index)=>{
      // for(let i=0;i<offeredCourses.length;i++){
      //   if(offeredCourses[i].coursecode===event.target.value)
      //       setSelected(offeredCourses[i])
      // }
      console.log(index)
      setSelected(offeredCourses[index])
      //console.log(value) 
     // event.target.reset()
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
              </tr>
            </thead>
            <tbody>
              { selectedCourses.map((val, key)=>{    
                  return (
                    <tr key={key}>
                      <td>   
                          {val.coursecode}
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
             <select 
                  onChange={(e)=>handleSelect(e.target.value)}
                  //value={selected}
                  className="custom-select">

               { offeredCourses.map((val, key)=>{
                return( 
                  <option key={val.coursecode}
                  value={key}>{val.coursecode}</option>
                )
                
              })

              }
             </select>
             {/* <select
                //value={selected}
                className="custom-select"
                id="inputGroupSelect01"
                //data-testid="filterSelect"
              >
                  <option >Filter by</option> 
                  <option  >First Name</option>
                  <option >Last Name</option>
                  <option  >Email</option>
            </select> */}
              </div>
              <button type="submit" 
               className="btn btn-primary" 
                data-testid="addButton">Add</button>
              </div> 
          </form>
          <button 
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