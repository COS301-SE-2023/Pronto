import * as React from 'react';
import LecturerNavigation from './LecturerNavigation';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../Institution VIew/Navigation/Navigation.css';
import {API,Auth} from 'aws-amplify'
import { listLecturers } from '../graphql/queries';

const PersonalInfoPage = () => {
    const [expanded, setExpanded] = React.useState(false);
    const[oldPassword,setOldPassword]=React.useState("")
    const[newPassword,setNewPassword]=React.useState("")
    const[confirmPassword,setConfirmPassword]=React.useState("")
    const[user,setUser]=React.useState("")

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSubmit =async()=>{ 

    }
    
    const fetchLecturer =async()=>{
        let u=await Auth.currentAuthenticatedUser()
        setUser(u.attributes)
        //  let lecturer_email=user.attributes.email
        // console.log(lecturer_email)
        // const lec=await API.graphql({ 
        //             query:listLecturers,
        //             variables:{ 
        //                 filter: { 
        //                    email: { 
        //                     eq : lecturer_email
        //                 }
        //              }
        //           },
        //         authMode:"API_KEY",
        //         })
        //  if(lec.data.listLecturers.items.length>0){     
        //   await setLecturer(lec.data.listLecturers.items[0])
        //  }
    }

    React.useEffect(()=> { 
        fetchLecturer()
    })
    return (
      <div style={{ display: 'inline-flex' }}>
        <nav style={{ width: '20%' }} data-testid='InstitutionNavigation'>
            {/* Navigation bar content */}
            <LecturerNavigation />
        </nav>
  
        <main style={{ width: '900px',marginTop: '30px' }}>
            <h1 className="moduleHead">Personal Information</h1>
            <table className="table table-sm">
                <tbody>
                    
                    <tr>
                    <td>Name:</td>
                    <td>{user.name}</td>
                    </tr>

                    <tr>
                    <td>Role:</td>
                    <td>Lecturer</td>
                    </tr>

                    <tr>
                    <td>Email address:</td>
                    <td>{user.email}</td>
                    </tr>
            
                </tbody>
            </table>

            <div>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} data-testid={'paccordion'}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{"color":"#e32f45"}} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                style={{"width": "100%"}}
                data-testid={'paccordionDrop'}
                >
                <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold',textAlign:"center" }} >
                    Change Password
                </Typography>
                
                </AccordionSummary>
                <AccordionDetails>
                <form onSubmit={e=>{handleSubmit(e)}}>
                <div className="form-group row">
                    <label htmlfor="colFormLabel" className="col-sm-2 col-form-label">Old password: </label>
                    <div className="col-sm-10">
                    <input
                     type="text" 
                     className="form-control" 
                     id="colFormLabel" 
                     data-testid="pword" 
                     required
                     value={oldPassword}
                     onChange={e=>setOldPassword(e.target.value)}></input>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlfor="colFormLabel" className="col-sm-2 col-form-label">New password: </label>
                    <div className="col-sm-10">
                    <input  
                    type="text"  
                    className="form-control" 
                    id="colFormLabel" 
                    data-testid="repword" 
                    required
                    value={newPassword}
                    onChange={(e=>{setNewPassword(e.target.value)})}></input>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlfor="colFormLabel" className="col-sm-2 col-form-label">Confirm password: </label>
                    <div className="col-sm-10">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="colFormLabel" 
                        data-testid="newpword"
                        value={confirmPassword}
                        onChange={e=>{setConfirmPassword(e.target.value)}}
                    ></input>
                    </div>
                </div>

                    <button className="post-button">Update</button>
                </form>
                </AccordionDetails>
                </Accordion>
            </div>

          
        </main>
  
      </div>
    );
  };
  
  export default PersonalInfoPage;