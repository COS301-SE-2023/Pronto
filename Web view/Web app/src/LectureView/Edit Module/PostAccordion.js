import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GoogleMapReact from 'google-map-react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {useState} from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

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
  const [address, setAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelect = (location) => {
    console.log('Selected location:', location);
    // Add your custom logic here to handle the selected location
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
              <div className="form-group row">
                <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Title: </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="colFormLabel" required></input>
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Body: </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="colFormLabel" required></input>
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Date: </label>
                <div className="col-sm-10">
                  <input type="date" className="form-control" id="colFormLabel"></input>
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
              <div className="form-group row">
                <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Title: </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="colFormLabel" required></input>
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Information: </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="colFormLabel"></input>
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Date: </label>
                <div className="col-sm-10">
                  <input type="date" className="form-control" id="colFormLabel" required></input>
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
              <div className="form-group row">
                <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Venue: </label>
                <div className="col-sm-10">
                  {/* Add google auto complete to complete the venue name when typing*/}
                  <PlacesAutocomplete
                      value={address}
                      onChange={setAddress}
                      onSelect={(location) => {
                        setSelectedLocation(location);
                        handleSelect(location);
                      }}
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                          <input {...getInputProps({ placeholder: "Type address" })} />
                          <div>
                            {loading ? <div>...loading</div> : null}
                            {suggestions.map(suggestion => {
                              const style = {
                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                              };
                              return (
                                  <div {...getSuggestionItemProps(suggestion, { style })}>
                                    {suggestion.description}
                                  </div>
                              );
                            })}
                          </div>
                        </div>
                    )}
                  </PlacesAutocomplete>

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