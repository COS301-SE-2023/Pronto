import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GoogleMapReact from 'google-map-react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function PostAccordion() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const defaultProps = {
    center: 
    {
      lat:-25.753899044547357,
      lng: 28.23134724523217
    },
    zoom: 16
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
            <label for="colFormLabel" class="col-sm-2 col-form-label">Title: </label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="colFormLabel" required></input>
            </div>
          </div>

          <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Body: </label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="colFormLabel" required></input>
            </div>
          </div>

          <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Date: </label>
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
            <label for="colFormLabel" class="col-sm-2 col-form-label">Title: </label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="colFormLabel" required></input>
            </div>
          </div>

          <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Information: </label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="colFormLabel"></input>
            </div>
          </div>

          <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Date: </label>
            <div class="col-sm-10">
              <input type="date" class="form-control" id="colFormLabel" required></input>
            </div>
          </div>

            <button className="post-button">Post</button>
        </form>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{"color":"#e32f45"}}/>}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold',textAlign:"center" }}  >Add lecture venue</Typography>
          
        </AccordionSummary>
        <AccordionDetails>
        <form>
          <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Venue: </label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="colFormLabel" required></input>
            </div>
          </div>

          <div className = "map">
            <div style={{ height: '50vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
              >
                <AnyReactComponent
                  lat={59.955413}
                  lng={30.337844}
                  text="My Marker"
                />
              </GoogleMapReact>
            </div>
          </div>
          <button className="post-button">Add venue</button>

        </form>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{"color":"#e32f45"}}/>}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold',textAlign:"center" }}  >Remove lecture venue</Typography>
          
        </AccordionSummary>
        <AccordionDetails>

        <div className = "venue">
          IT 4-4
          <IconButton aria-label="delete" size="large" className='delete-btn'>
            <DeleteIcon style={{"color":"#e32f45"}}/>
          </IconButton>
        </div>

        </AccordionDetails>
      </Accordion>

    </div>
  );
}