import * as React from 'react';
import InstitutionNavigation from '../Navigation/InstitutionNavigation';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Auth} from 'aws-amplify'
import '../Navigation/Navigation.css';

const EditInfoPage = () => {
    const [expanded, setExpanded] = React.useState(false);
    const[user,setUser]=React.useState(null);
    const[oldPassword,setOldPassword]=React.useState("");
    const[newPassword,setNewPassword]=React.useState("");
    const[userAttributes,setUserAttributes]=React.useState("")
    const[confirmPassword,setConfirmPassword]=React.useState("");
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSubmit =async(event)=>{ 
        event.preventDefault()
        try{
            //Auth.changePassword(user, oldPassword, newPassword)
            
        }catch(error){ 
        }
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
    };

    const setAdmin = async()=>{
        let u=await Auth.currentAuthenticatedUser()
        setUser(u)
        setUserAttributes(u.attributes)
    };

    React.useEffect(()=> { 
        setAdmin()
    },[])

    return (
      <div style={{ display: 'inline-flex' }}>
        <nav style={{ width: '20%' }} data-testid='InstitutionNavigation'>
            {/* Navigation bar content */}
            <InstitutionNavigation />
        </nav>
  
        <main style={{ width: '900px',marginTop: '30px' }}>
            <h1 className="moduleHead">Edit University Information</h1>
            <table class="table table-sm">
                <tbody>
                    
                    <tr>
                    <td>Institution name:</td>
                    <td>{userAttributes.name}</td>
                    </tr>

                    <tr>
                    <td>Role:</td>
                    <td>Admin</td>
                    </tr>

                    <tr>
                    <td>Email address:</td>
                    <td>{userAttributes.email}</td>
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
                        <Typography     
                            sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold',textAlign:"center" }} >
                                Change Password
                        </Typography>
                
                    </AccordionSummary>
                <AccordionDetails>
                    <form>
                    <div class="form-group row">
                        <label for="colFormLabel" class="col-sm-2 col-form-label">Old password: </label>
                        <div class="col-sm-10">
                            <input 
                                type="password" 
                                class="form-control" 
                                id="colFormLabel1" 
                                data-testid="pword" 
                                required
                                value={oldPassword}
                                onChange={(e)=>setOldPassword(e.target.value)}></input>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="colFormLabel" class="col-sm-2 col-form-label">New password: </label>
                        <div class="col-sm-10">
                            <input 
                                type="password" 
                                class="form-control" 
                                id="colFormLabel2" 
                                data-testid="repword"   
                                required
                                value={newPassword}
                                onChange={(e)=>setNewPassword(e.target.value)}></input>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="colFormLabel" class="col-sm-2 col-form-label">Confirm password: </label>
                        <div class="col-sm-10">
                            <input  
                                type="password" 
                                class="form-control" 
                                id="colFormLabel3" 
                                data-testid="newpword"
                                required
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}></input>
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
  
  export default EditInfoPage;