import { useState, useEffect } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import '../Navigation/Navigation.css';
import InstitutionNavigation from '../Navigation/InstitutionNavigation';
import { ErrorModal } from "../../Components/ErrorModal";
import { SuccessModal } from '../../Components/SuccessModal';
import { updateInstitution } from '../../Graphql/mutations';
import HelpButton from '../../Components/HelpButton';
import UserManual from "../HelpFiles/EditInfo.pdf";
import { useAdmin } from '../../ContextProviders/AdminContext';
import EditUniInfoImage from "../Images/EditUniInfoImage.png";
import CloseIcon from '@mui/icons-material/Close';
import TickIcon from '@mui/icons-material/Check';

import { Auth, Storage, API } from 'aws-amplify'

const EditInfoPage = () => {
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [folderNameS3, setFolderNameS3] = useState("");
    const [message, setMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [domain, setDomain] = useState("");

    const [showFileModal, setShowFileModal] = useState(false);
    const [logoPreview, setLogoPreview] = useState(null);

    const { admin, setAdmin } = useAdmin();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            if (newPassword === confirmPassword) {
                Auth.changePassword(user, oldPassword, newPassword);
                setSuccessMessage("Password changed successfully");
            } else {
                setError("New password does not match confirm password");
            }
        } catch (error) {
            setError("Password change failed")
        }
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
    };

    const fecthUser = async () => {
        let userInfo = await Auth.currentAuthenticatedUser()
        let username = userInfo?.attributes?.name;
        const words = username.split(/\s+/);
        username = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
        setUser(userInfo);
        setFolderNameS3(username);
    }

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        // Create a preview URL for the selected image
        const previewURL = URL.createObjectURL(file);
        setLogoPreview(previewURL);
        setShowFileModal(true); // Show the file upload modal when a file is selected
    };


    const handleAddDomain = async (event) => {
        event.preventDefault()
        if (admin.institution.domains.indexOf(domain) === -1) {
            admin.institution.domains.push(domain);
        }
        setDomain("")
    }

    const handleRemoveDomain = async (event, key) => {
        event.preventDefault();
        admin.institution.domains.splice(key, 1);
    }

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

    const handleDomainEdit = async (event) => {
        event.preventDefault();
        try {
            let logoUrl = null;
            if (admin.institution.logoUrl !== undefined && admin.institution.logoUrl !== null) {
                logoUrl = admin.institution.logoUrl;
            };

            let inst = {
                id: admin.institution.id,
                domains: admin.institution.domains,
            };
            let update = await API.graphql({
                query: updateInstitution,
                variables: { input: inst },
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });
            update.data.updateInstitution.logoUrl = logoUrl;
            let newAdmin = admin;
            newAdmin.institution = update.data.updateInstitution;
            setAdmin(newAdmin);
            setSuccessMessage("Domains updated successfully");

        } catch (error) {
            setSuccessMessage("Something went wrong");
        }
    }

    const handleFileSubmit = async (event) => {
        setShowFileModal(false);
        if (selectedFile) {
            try {
                const fileKey = `${folderNameS3}/Logo/${selectedFile.name}`;
                let path = await Storage.put(fileKey, selectedFile, {
                    contentType: "image/png",
                    progressCallback: ({ loaded, total }) => {
                        const progress = Math.round((loaded / total) * 100);
                        setUploadProgress(progress);
                        setMessage("Uploading file: " + selectedFile.name);
                    },
                });

                let inst = {
                    id: admin.institution.id,
                    logo: fileKey
                };
                let update = await API.graphql({
                    query: updateInstitution,
                    variables: { input: inst },
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                });

                let newAdmin = admin;
                newAdmin.institution = update.data.updateInstitution;
                try {
                    newAdmin.institution.logoUrl = await Storage.get(newAdmin.institution.logo, { validateObjectExistence: true, expires: 3600 });
                } catch (error) {

                }
                setAdmin(newAdmin);
                setMessage("File successfully uploaded: " + selectedFile.name);
            } catch (error) {
                setMessage("Error uploading file");
            }

            // Reset the selected file and upload progress
            setSelectedFile(null);
            setUploadProgress(0);
            window.location.reload()
        }
    }

    useEffect(() => {
        //fetchAdminInfo()
        fecthUser();
    }, []);

    const handleCloseModal = () => {
        // Close the modal when the "X" icon is clicked
        setSelectedFile(null);
        setShowFileModal(false);
    };

    return (
        <div style={{ display: 'inline-flex', maxHeight: "100vh" }}>
            {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
            {successMessage && <SuccessModal successMessage={successMessage} setSuccessMessage={setSuccessMessage}> {successMessage} </SuccessModal>}

            {showFileModal && (
                <div className="file-upload-modal">
                    <CloseIcon className="close-icon" onClick={handleCloseModal} />
                    <h2>Logo Preview</h2>
                    <h6>This is how the logo will appear in the navigation menu for lecturers and for your account.</h6>
                    <h6>We recommend a size of: <span style={{ color: "#e32f45" }}>500x500</span> for the best fit</h6>
                    <img
                        src={logoPreview}
                        alt="Logo"
                        className="logo offset-2 img-fluid mr-4.5"
                        style={{ width: "155px", height: "155px" }}
                        data-testid={'UniversityImage'}
                    />

                    <button style={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "20px" }} onClick={handleFileSubmit}>Accept
                        <TickIcon style={{ fontSize: "20px", marginLeft: "10px" }} />
                    </button>
                </div>
            )}
            <div>
                <HelpButton pdfUrl={UserManual} />
            </div>

            <nav data-testid='InstitutionNavigation'>
                {/* Navigation bar content */}
                <InstitutionNavigation />
            </nav>

            <main
                style={{
                    width: '1200px',
                    marginTop: '0%',
                    marginLeft: '25%',
                    transition: 'filter 0.3s ease', // Add a transition for a smoother effect
                }}
                className={showFileModal ? 'blur-background' : ''}
            >
                <h1 className="moduleHead" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}> Edit University Information</h1>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <h6 style={{ marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", marginBottom: "30px" }}>Use this to change your accounts password, upload a logo, or edit email the domains of valid accounts for the institution.</h6>
                    <img
                        src={EditUniInfoImage}
                        alt="Edit Information"
                        style={{ width: "200px", height: "200px" }}
                    />
                </div>
                <table className="table table-sm">
                    <tbody>

                        <tr>
                            <td>Institution name:</td>
                            <td>{user !== null ? user.attributes.name : " "}</td>
                        </tr>

                        <tr>
                            <td>Role:</td>
                            <td>Admin</td>
                        </tr>

                        <tr>
                            <td>Email address:</td>
                            <td>{user != null ? user.attributes.email : " "}</td>
                        </tr>

                    </tbody>
                </table>

                <div>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} data-testid={'paccordion'} style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', borderRadius: "20px", marginBottom: "15px" }} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ "color": "#e32f45" }} />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            style={{ "width": "100%" }}
                            data-testid={'paccordionDrop'}
                        >
                            <Typography
                                sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold', textAlign: "center" }} >
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
                                            onChange={(e) => setOldPassword(e.target.value)}></input>
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
                                            onChange={(e) => setNewPassword(e.target.value)}></input>
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
                                            onChange={(e) => setConfirmPassword(e.target.value)}></input>
                                    </div>
                                </div>

                                <button className="post-button button-no-border">Update</button>
                            </form>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} data-testid={'paccordion2'} style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', borderRadius: "20px", marginBottom: "15px" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ "color": "#e32f45" }} />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                            style={{ "width": "100%" }}
                            data-testid={'paccordionDrop2'}
                        >
                            <Typography
                                sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold', textAlign: "center" }} >
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
                                        height: "80px",
                                        width: "100%",
                                        backgroundColor: "#f7f7f7",
                                        border: "1px dashed #ddd",
                                        borderRadius: "20px",

                                        justifyContent: "center",
                                        alignItems: "center",
                                        display: "flex",
                                        cursor: "pointer",
                                    }}>
                                    {selectedFile ? (
                                        <div>
                                            Selected File: {selectedFile.name}
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
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', borderRadius: "20px", marginBottom: "15px" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ "color": "#e32f45" }} />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            style={{ "width": "100%" }}
                            data-testid={'paccordionDrop'}>
                            <Typography
                                sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold', textAlign: "center" }}>
                                Edit domains
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <table
                                className="table table-hover"
                                style={{ alignItems: 'center' }}
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">Domain</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admin && admin.institution && admin?.institution?.domains?.map((key, val) => {
                                        return (
                                            <tr key={val}>
                                                <td>{key}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleRemoveDomain(e, val)}
                                                        className="btn btn-danger"
                                                        style={{ borderRadius: "20px", width: "100px" }}
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    )}
                                </tbody>
                            </table>
                            <form onSubmit={handleAddDomain}>
                                <div className="form-row">
                                    <div className="form-group col-6">
                                        {/* <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Enter domain here: </label> */}
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="colFormLabel5"
                                            data-testid="domain"
                                            value={domain}
                                            required
                                            onChange={(e) => setDomain(e.target.value)}></input>
                                    </div>
                                    <div className='form-group col-6'>
                                        <button
                                            type="submit"
                                            className="btn btn-danger"
                                            style={{ borderRadius: "20px", width: "100px" }}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>

                            </form>
                            <button
                                type="submit"
                                onClick={handleDomainEdit}
                                className="btn btn-danger"
                                style={{ borderRadius: "20px", width: "100px" }}
                            >
                                Done
                            </button>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <br />
            </main >
        </div >

    );
};

export default EditInfoPage;