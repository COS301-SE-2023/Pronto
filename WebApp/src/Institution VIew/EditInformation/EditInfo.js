import * as React from 'react';
import InstitutionNavigation from '../Navigation/InstitutionNavigation';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Auth,Storage} from 'aws-amplify'
import { ErrorModal } from '../../ErrorModal';
import '../Navigation/Navigation.css';

const EditInfoPage = () => {
    const [expanded, setExpanded] = React.useState(false);
    const[user,setUser]=React.useState(null);
    const[oldPassword,setOldPassword]=React.useState("");
    const[newPassword,setNewPassword]=React.useState("");
    const[userAttributes,setUserAttributes]=React.useState("")
    const[confirmPassword,setConfirmPassword]=React.useState("");
    const[error,setError]=React.useState("")
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [folderNameS3, setFolderNameS3] = React.useState("");
    const[message,setMessage]=React.useState("")
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSubmit =async(event)=>{ 
        event.preventDefault()
        try{
            Auth.changePassword(user, oldPassword, newPassword)
            setError("Password changed successfully")
        }catch(error){ 
            setError("Password change failed")
        }
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
    };

    const setAdmin = async()=>{
        let userInfo=await Auth.currentAuthenticatedUser()
        setUser(userInfo)
        setUserAttributes(userInfo.attributes)
        let username = userInfo?.attributes?.name; 
      const words = username.split(/\s+/); 
      username = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join(""); 
      
      setFolderNameS3(username);
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    
    };

  
    const handleFileDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
    };


    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleClick = (event) => {
        event.preventDefault();
        document.getElementById("fileInput").click();
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
    };

    const handleFileSubmit = async()=>{ 

    }

    React.useEffect(()=> { 
        setAdmin()
    },[]);

    return (
      <div style={{ display: 'inline-flex' }}>
         {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
        <nav style={{ width: '20%' }} data-testid='InstitutionNavigation'>
            {/* Navigation bar content */}
            <InstitutionNavigation />
        </nav>
  
        <main style={{ width: '900px',marginTop: '30px' }}>
            <h1 className="moduleHead">Edit University Information</h1>
            <table className="table table-sm">
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
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Old password: </label>
                            <div className="col-sm-10">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="colFormLabel1" 
                                    data-testid="pword" 
                                    required
                                    value={oldPassword}
                                    onChange={(e)=>setOldPassword(e.target.value)}></input>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">New password: </label>
                            <div className="col-sm-10">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="colFormLabel2" 
                                    data-testid="repword"   
                                    required
                                    value={newPassword}
                                    onChange={(e)=>setNewPassword(e.target.value)}></input>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Confirm password: </label>
                            <div className="col-sm-10">
                                <input  
                                    type="password" 
                                    className="form-control" 
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
            <div>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} data-testid={'paccordion2'}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{"color":"#e32f45"}} />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                        style={{"width": "100%"}}
                        data-testid={'paccordionDrop2'}
                    >  
                        <Typography     
                            sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold',textAlign:"center" }} >
                                Upload Logo
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            <div
                                className="dropzone text-center"
                                onDrop={handleFileDrop}
                                onDragOver={handleDragOver}
                                onDragEnter={handleDragEnter}
                                style={{
                                    height: "100px",
                                    border: "1px dashed",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                }}>
                                {selectedFile ? (
                                    <div>
                                        Selected File: {selectedFile.name}
                                        <button
                                            onClick={handleFileSubmit}
                                            className={"btn m-3"}
                                            style={{ backgroundColor: "#e32f45", color: "white" }}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                ) : (
                                    <div id={"dropzone"} onClick={handleClick}>
                                        Drag and drop your file here or{" "}
                                        <label htmlFor="fileInput" className="file-label">
                                          click here
                                    </label>{" "}
                                    to select a file.
                                </div>
                            )}
                        </div>
                        {selectedFile && (
                            <div className="progress" style={{ marginTop: "5%", height: "30px" }}>
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${uploadProgress}%`, backgroundColor: "#e32f45" }}
                                    aria-valuenow={uploadProgress}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    {uploadProgress}%
                                </div>
                            </div>
                        )}
                    {message && (
                        <div style={{ marginTop: "5%", color: "green" }}>{message}</div>
                    )}
                        <input
                            id="fileInput"
                            type="file"
                            accept=".png"
                            onChange={handleFileSelect}
                            style={{ display: "none" }}
                        />
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div>
                <Accordion expanded ={ expanded==='panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{"color":"#e32f45"}} />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        style={{"width": "100%"}}
                        data-testid={'paccordionDrop'}>
                        <Typography
                            sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold',textAlign:"center" }}>
                            Edit domains
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                    </AccordionDetails>
                </Accordion>
            </div>
            <div>
                <Accordion expanded ={ expanded==='panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{"color":"#e32f45"}} />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        style={{"width": "100%"}}
                        data-testid={'paccordionDrop'}>
                        <Typography
                            sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold',textAlign:"center" }}>
                            Edit Admin Information
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="card shadow">
                            <div className="card-body">
                                <form>
                                    <div className="form-row">
                                    {/* First name */}
                                        <div className="form-group col-6">
                                            <label htmlFor="name">First Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="admin-name"
                                                    //placeholder="John"
                                                    data-testid="adminfirstName"
                                                    required
                                                    //value={firstName}
                                                    //onChange={(e)=>setFirstName(e.target.value)}
                                                    />
                                        </div>

                                {/* Last name */}
                                        <div className="form-group col-6">
                                            <label htmlFor="lastname">Last Name</label>
                                                <input
                                                type="text"
                                                className="form-control"
                                                id="lastname"
                                                //placeholder="Doe"
                                                data-testid="adminlastName"
                                                required
                                                //value={lastName}
                                                //onChange={(e)=>setLastName(e.target.value)}
                                        />
                                        </div>
                                    </div>
                                     <button
                                        type="submit"
                                        className="btn btn-danger w-100"
                                        data-testid="editButton"
                                    >
                                        Edit
                                    </button>
                        </form>    
                        </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
           
        </main>
  
      </div>
    
    );
  };
  
  export default EditInfoPage;