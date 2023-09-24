import { useState } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import styled from "styled-components";
import { createAnnouncement, updateActivity } from '../../Graphql/mutations';
import { ErrorModal } from "../../Components/ErrorModal";
import { SuccessModal } from "../../Components/SuccessModal";

import { API } from 'aws-amplify';

export default function PostAccordion(course) {

  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [activity, setActivity] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [latLng, setLatLng] = useState("");
  const [lat, setLat] = useState(59.955413);
  const [lng, setLng] = useState(30.337844);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };



  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const defaultProps = {
    center: {
      lat: -25.753899044547356,
      lng: 28.23134724523217
    },
    zoom: 16
  };

  const handleAddVenue = async (event) => {
    event.preventDefault();
    try {
      if (activity === "" || activity === undefined || selectedLocation === "") {
        setError("Please pick an activity and location");
      }
      else {

        let coordinate = selectedLocation + ";" + latLng.lat + ";" + latLng.lng;
        let update = await API.graphql({
          query: updateActivity,
          variables: { input: { id: activity.id, coordinates: coordinate } }
        })
        setSuccessMessage("Venue updated successfully");
      }

    } catch (e) {
      console.log(e);
      setError("Something went wrong.Please try again later");
    }
  }

  const handleSelect = async (location, event) => {
    try {
      const results = await geocodeByAddress(location);
      const latLngValue = await getLatLng(results[0]); // Here is the coordinates
      setLatLng(latLngValue);
      setLat(latLngValue.lat);
      setLng(latLngValue.lng);

    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }

  };

  {
    /*Default location for the map*/
  }


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    libraries: course.libraries
  })


  const handleSubmit = async (event, type) => {
    try {
      event.preventDefault()
      let announcement = {
        courseId: course.course.id,
        body: body,
        title: title,
        date: date,
        year: new Date().getFullYear(),
        type: type
      };

      let mutation = await API.graphql({
        query: createAnnouncement,
        variables: { input: announcement },
      });

      setSuccessMessage("Announcement posted succesfully");
    } catch (error) {
      console.log(error);
      if (error.errors !== undefined) {
        let e = error.errors[0].message;

        if (e.search("Network") !== -1) {
          setError("Request failed due to network issues");
        }
      }
      else {
        setError("Something went wrong. Please try again later");
      }
    }
    setTitle("");
    setBody("");
    setDate("");
  }

  return (

    <div>
      {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
      {successMessage && <SuccessModal successMessage={successMessage} setSuccessMessage={setSuccessMessage}> {successMessage} </SuccessModal>}

      <div>
        {/* Post reminder dropdown */}
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} data-testid={'accordion1'} style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', borderRadius: "20px", marginBottom: "15px" }} >
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
            <form onSubmit={(e) => handleSubmit(e, "Reminder")}>
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
                <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Due Date: </label>
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
              <button style={{ borderRadius: "20px", height: "40px" }} className="post-button">Post</button>
            </form>
          </AccordionDetails>
        </Accordion>
      </div>

      <div>
        {/* Post assignment dropdown */}
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          data-testid={"accordion2"}
          style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', borderRadius: "20px", marginBottom: "15px" }}
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
            <form onSubmit={(e) => handleSubmit(e, "Due Assignment")}>
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
                <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Due Date: </label>
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
              <button style={{ borderRadius: "20px", height: "40px" }} className="post-button">Post</button>
            </form>
          </AccordionDetails>
        </Accordion>

      </div>

      <div>
        {/* Post venue dropdown */}
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', borderRadius: "20px", marginBottom: "15px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ "color": "#e32f45" }} />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold', textAlign: "center" }} >Update lecture venue</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <select
              onClick={(e) => setActivity(course.course.activity.items[e.target.value])}
              className="custom-select"
              placeholder="Select Activity"
            >
              <option value="">Select Activity</option>
              {course &&
                course.course &&
                course.course.activity &&
                course.course.activity.items
                  .slice() // Create a copy of the array to avoid modifying the original
                  .sort((a, b) => a.day.localeCompare(b.day)) // Sort by day
                  .map((val, key) => {
                    return (
                      <option
                        key={key}
                        value={key}
                      >
                        {val.day + " : " + val.activityname.replace("L", "Lecture ").replace("P", "Practical ").replace("T", "Tutorial ").replace("0", "") + " (" + val.start + "-" + val.end + ")"}
                      </option>
                    );
                  })}
            </select>

            {isLoaded ?
              (
                <form style={{ paddingTop: '15px' }} onSubmit={(e) => { handleAddVenue(e) }}>

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
                                  backgroundColor: suggestion.active ? '#f197a2' : '#fff',
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
                      <GoogleMap
                        mapContainerClassName="map"
                        center={{ lat: lat, lng: lng }}
                        zoom={18}
                      >
                        <Marker position={{ lat: lat, lng: lng }} />
                      </GoogleMap>

                    </div>
                  </div>
                  <button style={{ borderRadius: "20px", height: "40px", marginTop: "20px" }} className="post-button">Add venue</button>

                </form>
              )
              :
              <div>Loading map...</div>
            }
          </AccordionDetails>
        </Accordion>

      </div>


    </div >
  );
}
//add styling
const MapSuggestionsContainer = styled.div`
      max-width: 810px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 5px;
      padding: 5px;

      `;


