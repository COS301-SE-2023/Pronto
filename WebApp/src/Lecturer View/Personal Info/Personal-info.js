import { useState, useEffect } from 'react';
import LecturerNavigation from '../Navigation/LecturerNavigation';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../Institution View/Navigation/Navigation.css';
import { Auth, API } from 'aws-amplify'
import { ErrorModal } from "../../Components/ErrorModal";
import { SuccessModal } from "../../Components/SuccessModal"
import UserManual from "../HelpFiles/PersonalInfo.pdf";
import HelpButton from '../../Components/HelpButton';
import { useLecturer } from '../../ContextProviders/LecturerContext';
import personalInformationImage from "../Images/EditPersonalInfo.png";
import { listLecturers } from '../../Graphql/queries';

const PersonalInfoPage = () => {
    const [expanded, setExpanded] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { lecturer, setLecturer } = useLecturer();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [passwordIsValid, setPasswordIsValid] = useState(false);

    const validatePassword = (value) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()?])[A-Za-z\d!@#$%^&*()?]{8,}$/;
        const isValidPassword = regex.test(value);

        setPasswordIsValid(isValidPassword);
    };
    const newPasswordSet = (password) => {
        let isValidPassword = validatePassword(password);
        setNewPassword(password);
        setPasswordIsValid(isValidPassword);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            if (passwordIsValid) {
                if (newPassword === confirmPassword) {
                    const user = await Auth.currentAuthenticatedUser();
                    Auth.changePassword(user, oldPassword, newPassword);
                    setSuccessMessage("Password change succesful");
                }
                else {
                    setError("New password does not match confirm password");
                }
            } else {
                setError("New password is too weak.Please ensure your password is at least 8 characters long and  includes at least one lowercase letter, one uppercase letter, one number and one special character")
            }
        } catch (error) {
            setError("Password change failed")
        }
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
    }


    // const fetchUser = async () => {
    //     try {
    //         let u = await Auth.currentAuthenticatedUser();
    //         setUser(u);
    //     } catch (error) {
    //         setError("Something went wrong");
    //     }
    // }

    const fetchLecturer = async () => {
        await Auth.currentAuthenticatedUser()
        if (lecturer !== null) {
            const user = await Auth.currentAuthenticatedUser();
            let lecturer_email = user.attributes.email;
            let lec = await API.graphql({
                query: listLecturers,
                variables: {
                    filter: {
                        email: {
                            eq: lecturer_email
                        }
                    }
                },
            });
            setLecturer(lec.data.listLecturers.items[0]);
        }
    }


    useEffect(() => {
        fetchLecturer()
        //fetchUser();
    }, [])


    return (

        <div style={{ display: 'inline-flex', maxHeight: "100vh" }}>
            {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
            {successMessage && <SuccessModal successMessage={successMessage} setSuccessMessage={setSuccessMessage}> {successMessage} </SuccessModal>}
            <nav style={{ width: '20%' }} data-testid='InstitutionNavigation'>
                {/* Navigation bar content */}
                <LecturerNavigation />
            </nav>

            <main style={{ width: '900px', marginTop: '30px' }}>
                <h1 className="moduleHead">Personal Information</h1>
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

                                <button style={{ borderRadius: "20px", height: "40px" }} className="post-button">Update</button>
                            </form>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <br />
            </main>

            <div>
                <HelpButton pdfUrl={UserManual} />
            </div>
        </div>
    );
};

export default PersonalInfoPage;