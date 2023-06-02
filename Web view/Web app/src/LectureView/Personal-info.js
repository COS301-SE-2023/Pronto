import * as React from 'react';
import LecturerNavigation from './LecturerNavigation';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../Institution VIew/Navigation/Navigation.css';

const PersonalInfoPage = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
      <div style={{ display: 'inline-flex' }}>
        <nav style={{ width: '20%' }}>
            {/* Navigation bar content */}
            <LecturerNavigation />
        </nav>
  
        <main style={{ width: '900px',marginTop: '30px' }}>
            <h1 className="moduleHead">Personal Information</h1>
            <table class="table table-sm">
                <tbody>
                    
                    <tr>
                    <td>Name:</td>
                    <td>Stefan Gruner</td>
                    </tr>

                    <tr>
                    <td>Role:</td>
                    <td>Lecturer</td>
                    </tr>

                    <tr>
                    <td>Email address:</td>
                    <td>Stefan.Gruner@up.ac.za</td>
                    </tr>
            
                </tbody>
            </table>

            <div>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{"color":"#e32f45"}} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                style={{"width": "100%"}}
                >
                <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold',textAlign:"center" }} >
                    Change Password
                </Typography>
                
                </AccordionSummary>
                <AccordionDetails>
                <form>
                <div class="form-group row">
                    <label for="colFormLabel" class="col-sm-2 col-form-label">Old password: </label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="colFormLabel" required></input>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="colFormLabel" class="col-sm-2 col-form-label">New password: </label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="colFormLabel" required></input>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="colFormLabel" class="col-sm-2 col-form-label">Confirm password: </label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="colFormLabel"></input>
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