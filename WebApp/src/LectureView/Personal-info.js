import { useState, useEffect } from 'react';
import LecturerNavigation from './LecturerNavigation';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../Institution VIew/Navigation/Navigation.css';
import { Auth, API } from 'aws-amplify'
import { ErrorModal } from '../ErrorModal';
import { SuccessModal } from "../SuccessModal"
import { listLecturers } from '../graphql/queries';
import UserManual from "./HelpFiles/PersonalInfo.pdf";
import HelpButton from '../HelpButton';
import { useLecturer } from '../ContextProviders/LecturerContext';
import personalInformationImage from "./EditPersonalInfo.png";

const PersonalInfoPage = () => {
    const [expanded, setExpanded] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [user, setUser] = useState();
    const [successMessage, setSuccessMessage] = useState("");
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    const { lecturer, setLecturer } = useLecturer();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            if (newPassword === confirmPassword) {
                const user = await Auth.currentAuthenticatedUser();
                Auth.changePassword(user, oldPassword, newPassword);
                setSuccessMessage("Password change succesful");
            }
            else {
                setError("New password does not match confirm password");
            }
        } catch (error) {
            setError("Password change failed")
        }
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
    }

    const fetchUser = async () => {
        try {
            let u = await Auth.currentAuthenticatedUser();
            setUser(u);
        } catch (error) {
            setError("Something went wrong");
        }
    }

    // const fetchLecturer = async () => {
    //     let u = await Auth.currentAuthenticatedUser()
    //     if (lecturer !== null) {
    //         const user = await Auth.currentAuthenticatedUser();
    //         let lecturer_email = user.attributes.email;
    //         let lec = await API.graphql({
    //             query: listLecturers,
    //             variables: {
    //                 filter: {
    //                     email: {
    //                         eq: lecturer_email
    //                     }
    //                 }
    //             },
    //             authMode: "AMAZON_COGNITO_USER_POOLS",
    //         });
    //         setLecturer(lec.data.listLecturers.items[0]);
    //     }

    // }

    useEffect(() => {
        //  fetchLecturer()
        //fetchUser();
    }, [])

    return (

        <div style={{ display: 'inline-flex' }}>
            {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
            {successMessage && <SuccessModal successMessage={successMessage} setSuccessMessage={setSuccessMessage}> {successMessage} </SuccessModal>}
            <nav style={{ width: '20%' }} data-testid='InstitutionNavigation'>
                {/* Navigation bar content */}
                <LecturerNavigation />
            </nav>

            <main style={{ width: '900px', marginTop: '30px' }}>
                <h1 className="moduleHead" style={{ textShadow: "2px 2px 4px rgba(0, 0.3, 0.2, 0.3)" }}>Personal Information</h1>
                <div style={{ textAlign: 'center' }}>
                    <p>This page allows you to edit the information we have stored for you. Click on  a dropdown to get started!</p>
                    <img src={personalInformationImage} alt="ModulesImage" style={{ maxWidth: '100%', maxHeight: '200px' }} />

                </div>
                <table className="table table-sm">
                    <tbody>

                        <tr>
                            <td>Name:</td>
                            <td>{lecturer && (lecturer.firstname + " " + lecturer.lastname)}</td>
                        </tr>

                        <tr>
                            <td>Role:</td>
                            <td>Lecturer</td>
                        </tr>

                        <tr>
                            <td>Email address:</td>
                            <td>{lecturer && (lecturer.email)}</td>
                        </tr>

                        <tr>
                            <td>Institution Name:</td>
                            <td>{lecturer && (lecturer.institution?.name)}</td>
                        </tr>

                    </tbody>
                </table>

                <div>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} data-testid={'paccordion'} style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', borderRadius: "20px", marginBottom: "15px" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ "color": "#e32f45" }} />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            style={{ "width": "100%" }}
                            data-testid={'paccordionDropNmae'}
                        >
                            <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold', textAlign: "center" }} >
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
                                            id="old-password"
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
                                            id="new-password"
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
                                            id="confirm-password"
                                            data-testid="newpword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        ></input>
                                    </div>
                                </div>

                                <button className="post-button">Update</button>
                            </form>
                        </AccordionDetails>
                    </Accordion>
                </div>

            </main>

            <div>
                <HelpButton pdfUrl={UserManual} />
            </div>
        </div>
    );
};

export default PersonalInfoPage;