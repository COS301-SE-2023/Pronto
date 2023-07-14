import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Autocomplete, GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { createAnnouncement,updateAnnouncement } from '../../graphql/mutations';
import { API } from 'aws-amplify';
import {ErrorModal} from '../../ErrorModal'
export default function PostAccordion(course) {
  const [expanded, setExpanded] = React.useState(false);
  const[announcement,setAnnouncement]=React.useState("")
  const[title,setTitle]=React.useState("")
  const[body,setBody]=React.useState("")
  const[date,setDate]=React.useState("")
  const[error,setError]=React.useState("")
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

  const handleSubmit = async(event)=>{ 
        try{
          event.preventDefault()
          let announcement={ 
            courseId:course.course.id,
            description:body,
            start:title,
            end:"",
            date:date,
            venue:"",
          } 
          let mutation= await API.graphql({
            query:createAnnouncement,
            variables:{input:announcement},
            authMode:"AMAZON_COGNITO_USER_POOLS",
          })
          setError("Announcement posted succesfully")
        }catch(error){ 
          let e=error.errors[0].message
          if(e.search("Not Authorized")!==-1){ 
            setError("You are not authorized to perform this action.Please log out and log in")
          }
          else if(e.search("Network")!==-1){
            setError("Request failed due to network issues")
          }
          else{ 
            setError("Something went wrong.Please try again later")
          
          }
          console.log(error)
        }
        setTitle("") 
        setBody("")
        setDate("")
        
  }

  return (
    
    <div>
       {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} data-testid={'accordion1'}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{"color":"#e32f45"}} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{"width": "100%"}}
          data-testid={'accordionDrop1'}
        >
          <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold',textAlign:"center" }} >
            Post reminder
          </Typography>
         
        </AccordionSummary>
        <AccordionDetails>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Title: </label>
            <div className="col-sm-10">
              <input  
                type="text" 
                className="form-control" 
                id="colFormLabel"  
                data-testid="title2" 
                required
                value={title} 
                onChange={(e)=>setTitle(e.target.value)}></input>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Body: </label>
            <div className='col-sm-10'>
              <textarea 
                type="text"  
                className="form-control"  
                id="colFormLabel" 
                data-testid="body2" 
                value={body}
                onChange={(e)=>setBody(e.target.value)}></textarea>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Date: </label>
            <div className="col-sm-10">
              <input 
               type="date"  
               className="form-control"  
               id="colFormLabel"   
               data-testid="date2" 
               required 
               value={date}
               onChange={(e)=>setDate(e.target.value)}></input>
            </div>
          </div>
            <button className="post-button">Post</button>
        </form>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} data-testid={'accordion2'}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{"color":"#e32f45"}}/>}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          data-testid={'accordionDrop2'}
        >
          <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold',textAlign:"center" }}  >Post due assignment</Typography>
          
        </AccordionSummary>
        <AccordionDetails>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Title: </label>
            <div className="col-sm-10">
              <input  
                type="text" 
                className="form-control" 
                id="colFormLabel"  
                data-testid="title2" 
                required
                value={title} 
                onChange={(e)=>setTitle(e.target.value)}></input>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Information: </label>
            <div className='col-sm-10'>
              <textarea 
                type="text"  
                className="form-control"  
                id="colFormLabel" 
                data-testid="body2" 
                value={body}
                onChange={(e)=>setBody(e.target.value)}></textarea>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Date: </label>
            <div className="col-sm-10">
              <input 
               type="date"  
               className="form-control"  
               id="colFormLabel"   
               data-testid="date2" 
               required 
               value={date}
               onChange={(e)=>setDate(e.target.value)}></input>
            </div>
          </div>

            <button className="post-button">Post</button>
        </form>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} data-testid={'accordion3'}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{"color":"#e32f45"}}/>}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          data-testid={'accordionDrop3'}
        >
          <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold',textAlign:"center" }}  >Add lecture venue</Typography>
          
        </AccordionSummary>
        <AccordionDetails>
        <form>
          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Venue: </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="colFormLabel" data-testid="venue" required></input>
            </div>
          </div>

          <div className = "map">
            <div style={{ height: '50vh', width: '100%' }}>
              {/* <GoogleMapReact
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
              </GoogleMapReact> */}
            </div>
          </div>
          <button className="post-button">Add venue</button>

        </form>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} data-testid={'accordion4'}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{"color":"#e32f45"}}/>}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
          data-testid={'accordionDrop4'}
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