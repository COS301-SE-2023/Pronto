import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormControl } from '@mui/material'

export default function PostAccordion() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{"color":"#e32f45"}} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{"width": "100%"}}
        >
          <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold',textAlign:"center" }} >
            Post reminder
          </Typography>
         
        </AccordionSummary>
        <AccordionDetails>
        <form>
          <div class="form-group row">
            <label for="title" class="col-sm-2 col-form-label">Title: </label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="colFormLabel" required></input>
            </div>
          </div>

          <div class="form-group row">
            <label for="body" class="col-sm-2 col-form-label">Body: </label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="colFormLabel" required></input>
            </div>
          </div>

          <div class="form-group row">
            <label for="date" class="col-sm-2 col-form-label">Date: </label>
            <div class="col-sm-10">
              <input type="date" class="form-control" id="colFormLabel"></input>
            </div>
          </div>

            <button className="post-button">Post</button>
        </form>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{"color":"#e32f45"}}/>}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold',textAlign:"center" }}  >Post due assignment</Typography>
          
        </AccordionSummary>
        <AccordionDetails>
        <form>
          <div class="form-group row">
            <label for="title" class="col-sm-2 col-form-label">Title: </label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="colFormLabel" required></input>
            </div>
          </div>

          <div class="form-group row">
            <label for="body" class="col-sm-2 col-form-label">Information: </label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="colFormLabel"></input>
            </div>
          </div>

          <div class="form-group row">
            <label for="date" class="col-sm-2 col-form-label">Date: </label>
            <div class="col-sm-10">
              <input type="date" class="form-control" id="colFormLabel" required></input>
            </div>
          </div>

            <button className="post-button">Post</button>
        </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}