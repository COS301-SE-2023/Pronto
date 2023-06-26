import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Autocomplete, GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function PostAccordion() {
  const [expanded, setExpanded] = React.useState(false);


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  {/*Default location for the map*/
  }
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: "",
    libraries: ['places']
  });

  if (!isLoaded) {
    return <div>Loading</div>
  }


  return (
      <div className={'mt-5'}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{"color": "#e32f45"}}/>}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              style={{"width": "100%"}}
          >
            <Typography sx={{width: '100%', flexShrink: 0, fontWeight: 'bold', textAlign: "center"}}>
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
              expandIcon={<ExpandMoreIcon style={{"color": "#e32f45"}}/>}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
          >
            <Typography sx={{width: '100%', flexShrink: 0, fontWeight: 'bold', textAlign: "center"}}>Post due
              assignment</Typography>

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
              expandIcon={<ExpandMoreIcon style={{"color": "#e32f45"}}/>}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
          >
            <Typography sx={{width: '100%', flexShrink: 0, fontWeight: 'bold', textAlign: "center"}}>Add lecture
              venue</Typography>

          </AccordionSummary>
          <AccordionDetails>
            <form>
              <div className={"form-group row"}>
                <label htmlFor="colFormLabel" className={"col-sm-2 col-form-label"}>Venue: </label>
                <div className={"col-sm-10"}>
                  <Autocomplete>
                    <input type="text" className={"form-control"} id="colFormLabel" required

                    ></input>
                  </Autocomplete>

                </div>
              </div>

              <div className="">
                <div style={{height: '50vh', width: '100%'}}>
                  {/* Map Component will go here*/}
                  <GoogleMap
                      center={{lat: -25.755270, lng: 28.232660}}
                      mapContainerStyle={{width: '100%', height: '100%'}}
                      zoom={15}
                      options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                      }}
                  >
                    <Marker position={{lat: -25.755270, lng: 28.232660}}/>
                  </GoogleMap>

                </div>
              </div>
              <button className="post-button mr-5">Add venue</button>

            </form>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === "panel4"} onChange={handleChange('panel4')}>
          <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{"color": "#e32f45"}}/>}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
          >
            <Typography sx={{width: '100%', flexShrink: 0, fontWeight: 'bold', textAlign: "center"}}>Remove
              lecture venue</Typography>

          </AccordionSummary>
          <AccordionDetails>

            <div className="venue">
              IT 4-4
              <IconButton aria-label="delete" size="large" className='delete-btn'>
                <DeleteIcon style={{"color": "#e32f45"}}/>
              </IconButton>
            </div>

          </AccordionDetails>
        </Accordion>

      </div>
  );
}