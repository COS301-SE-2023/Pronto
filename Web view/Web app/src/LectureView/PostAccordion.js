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
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }}>
            Post reminder
          </Typography>
         
        </AccordionSummary>
        <AccordionDetails>
        <form>
          <div className = "postReminder">
            <div className="dropdown-title">
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" maxLength="50" required/>
            </div>
            <div className="dropdown-body">
                <label htmlFor="body">Body:
                    <textarea id="body" rows="6" cols="100" name="body" required></textarea>
                </label>
            </div>
            <div className="dropdown-date">
                <label htmlFor="date">Date: </label>
                <input type="date" id="date"/>
            </div>
          </div>

            <button className="post-button">Post</button>
        </form>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }}>Post due assignment</Typography>
          
        </AccordionSummary>
        <AccordionDetails>
        <form>
            <div className="assignment-title">
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" maxLength="50" required/>
            </div>
            <div className="assignment-info">
                <label htmlFor="body">Information:
                    <textarea id="body" rows="6" cols="68" name="body"></textarea>
                </label>
            </div>
            <div className="assignment-date">
                <label htmlFor="date">Date: </label>
                <input type="date" id="date" required/>
            </div>

            <button className="post-button">Post</button>
        </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}