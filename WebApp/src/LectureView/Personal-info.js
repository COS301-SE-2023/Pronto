import * as React from 'react';
import LecturerNavigation from './LecturerNavigation';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../Institution VIew/Navigation/Navigation.css';
import { Auth } from 'aws-amplify';
import { ErrorModal } from '../ErrorModal';

const PersonalInfoPage = () => {
    const [expanded, setExpanded] = React.useState(false);
    const [oldPassword, setOldPassword] = React.useState("")
    const [newPassword, setNewPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [user, setUser] = React.useState("")
    const [userAttributes, setUserAttributes] = React.useState("")
    const [error, setError] = React.useState("")
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            Auth.changePassword(user, oldPassword, newPassword)
            setError("Password change succesful")
        } catch (error) {
            setError("Password change failed")
        }
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
    }

    const fetchLecturer = async () => {
        let u = await Auth.currentAuthenticatedUser()
        setUser(u)
        setUserAttributes(u.attributes)
    }

    React.useEffect(() => {
        fetchLecturer()
    }, [])

    return (
        <div style={{ display: 'inline-flex' }}>
            {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
            <nav style={{ width: '20%' }} data-testid='InstitutionNavigation'>
                {/* Navigation bar content */}
                <LecturerNavigation />
            </nav>

            <main style={{ width: '900px', marginTop: '30px' }}>
                <h1 className="moduleHead">Personal Information</h1>
                <table className="table table-sm">
                    <tbody>

                        <tr>
                            <td>Name:</td>
                            <td>{String(userAttributes.name + userAttributes.family_name)}</td>
                        </tr>

                        <tr>
                            <td>Role:</td>
                            <td>Lecturer</td>
                        </tr>

                        <tr>
                            <td>Email address:</td>
                            <td>{userAttributes.email}</td>
                        </tr>

                    </tbody>
                </table>

                <div>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} data-testid={'paccordion'} style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', borderRadius: "20px" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ "color": "#e32f45" }} />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            style={{ "width": "100%" }}
                            data-testid={'paccordionDrop'}
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

        </div>
    );
};

export default PersonalInfoPage;