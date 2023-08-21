import { useState,useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GoogleMapReact from 'google-map-react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

import styled from "styled-components";
import { createAnnouncement,updateActivity } from '../../graphql/mutations';
import { API } from 'aws-amplify';
import { ErrorModal } from '../../ErrorModal'
import { useJsApiLoader } from "@react-google-maps/api";

export default function PostAccordion(course) {
  
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [activity,setActivity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const defaultProps = {
    center: {
      lat: -25.753899044547356,
      lng: 28.23134724523217
    },
    zoom: 16
  };

  const handleSelect = async(location,event) => {
    try{
      event.preventDefault();
      setSelectedLocation(location);
      console.log('Selected location:', location);
      

      // let newVenue = await API.graphql({
      //   query:updateActivity,
      //   variables:{input : {id:activity.id,coordinates:location}},
      //   authMode:"AMAZON_COGNITO_USER_POOLS"
      // });
      // console.log(newVenue);
      // setActivity("");
    }catch(error){

    }
    // Add your custom logic here to handle adding the value to the database

  };

  {
    /*Default location for the map*/
  }
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading</div>;

  }

  const handleSelectActivity = async(event)=>{
    try{
      if(event<course.course.activity.items.length && event>0 && event!==""){
        setActivity(course.course.activity.items[event]);
      }
    }catch(error){
      setError("Something went wrong.Please try again later");
     }
  }

  const handleSubmit = async (event,type) => {
    try {
      event.preventDefault()
      let announcement = {
        courseId: course.course.id,
        body: body,
        title: title,
        date: date,
        year: new Date().getFullYear(),
        type:type
      };

      let mutation = await API.graphql({
        query: createAnnouncement,
        variables: { input: announcement },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      setError("Announcement posted succesfully");
    } catch (error) {
      let e = error.errors[0].message;
      if (e.search("Not Authorized") !== -1) {
        setError("You are not authorized to perform this action.Please log out and log in");
      }
      else if (e.search("Network") !== -1) {
        setError("Request failed due to network issues");
      }
      else {
        setError("Something went wrong.Please try again later");
      }
    }
    setTitle("");
    setBody("");
    setDate("");
  }

  return (

    <div>
      {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} data-testid={'accordion1'}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#e32f45" }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{ width: "100%" }}
          data-testid={"accordionDrop1"}
        >
          <Typography
            sx={{
              width: "100%",
              flexShrink: 0,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Post reminder
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={(e) => handleSubmit(e,"Reminder")}>
            <div className="form-group row">
              <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Title: </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="title-col-2"
                  data-testid="title2"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}></input>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Body: </label>
              <div className='col-sm-10'>
                <textarea
                  type="text"
                  className="form-control"
                  id="body"
                  data-testid="body2"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}></textarea>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Date: </label>
              <div className="col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  id="date-col-2"
                  data-testid="date2"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}></input>
              </div>
            </div>
            <button className="post-button">Post</button>
          </form>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        data-testid={"accordion2"}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#e32f45" }} />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          data-testid={"accordionDrop2"}
        >
          <Typography
            sx={{
              width: "100%",
              flexShrink: 0,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Post due assignment
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={(e) => handleSubmit(e,"Due Assignment")}>
            <div className="form-group row">
              <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Title: </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="title-col"
                  data-testid="title2"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Information: </label>
              <div className='col-sm-10'>
                <textarea
                  type="text"
                  className="form-control"
                  id="information-col"
                  data-testid="body2"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Date: </label>
              <div className="col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  id="date-col"
                  data-testid="date2"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <button className="post-button">Post</button>
          </form>
        </AccordionDetails>
      </Accordion>


      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ "color": "#e32f45" }} />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold', textAlign: "center" }} >Update lecture venue</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <select 
                  onChange={e=>handleSelectActivity(e.target.value)}
                  className="custom-select">
                 <option ></option>
                   {course && course.course && course.course.activity && course.course.activity.items.map((val, key)=>{
                return( 
                  <option key={key}
                  value={key}>{val.activityname.replace("L","Lecture ").replace("P","Practical ").replace("T","Tutorial ").replace("0","")}</option>
                ) 
                   } 
                   ) 
                  }
             </select>   
          <form>
            <div className="form-group row">
              <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Venue: </label>
              <div className="col-sm-10">
                <PlacesAutocomplete
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  onSelect={handleSelect}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <input
                        {...getInputProps({
                          placeholder: 'Search Places...',
                          className: 'location-search-input form-control',
                        })}
                      />
                      <MapSuggestionsContainer>
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion, index) => {
                          const style = {
                            backgroundColor: suggestion.active ? '#e32f45' : '#fff',
                            cursor: 'pointer',
                            padding: '5px',
                          };
                          return (
                            <div key={index} {...getSuggestionItemProps(suggestion, { style })}>
                              {suggestion.description}
                            </div>
                          );
                        })}
                      </MapSuggestionsContainer>
                    </div>
                  )}
                </PlacesAutocomplete>
              </div>
            </div>

            <div className="map">
              <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                  yesIWantToUseGoogleMapApiInternals

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

      {/* <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        data-testid={"accordion4"}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#e32f45" }} />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
          data-testid={"accordionDrop4"}
        >
          <Typography
            sx={{
              width: "100%",
              flexShrink: 0,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Remove lecture venue
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="venue">
            IT 4-4
            <IconButton aria-label="delete" size="large" className="delete-btn">
              <DeleteIcon style={{ color: "#e32f45" }} />
            </IconButton>
          </div>
        </AccordionDetails>
      </Accordion> */}
    </div> 
  );
}
//add styling
const MapSuggestionsContainer = styled.div`
      max-width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 5px;
      padding: 5px;

      `;

