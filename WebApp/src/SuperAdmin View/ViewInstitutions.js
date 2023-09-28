import React, { useState } from 'react';
import SuperAdminNavigation from './SuperAdminNavigation';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./SuperAdmin.css";
import { createInstitution, createAdmin, updateInstitution, deleteInstitution } from "../Graphql/mutations";
import { listInstitutions, listAdmins } from '../Graphql/queries';
import IconButton from '@mui/material/IconButton'; // Import IconButton
import CloseIcon from '@mui/icons-material/Close'; // Import the close icon
import { Amplify, Auth, API } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useEffect } from 'react';

// Modal component for adding institutions
function AddInstitutionModal({ isOpen, onClose, institutions, setInstitutions }) {
    const [universityName, setUniversityName] = useState('');
    const [adminEmail, setAdminEmail] = useState('');
    const [groupName, setGroupName] = useState('');
    const [userName, setUserName] = useState('');
    const [universityID, setUniversityID] = useState('');

    const [admin, setAdmin] = useState('');



    const handleUniversityNameChange = (event) => {
        setUniversityName(event.target.value);
    };

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUserName(event.target.value);
        console.log(event);
    };

    const handleUniversityID = (event) => {
        setUniversityID(event.target.value);
    };

    const handleAddAdmin = async (event) => {
        setAdmin(event.target.value);
        //         let apiName = 'AdminQueries';
        //         let path = '/addUserToGroup';
        //             let myInit = {
        //                 body: {
        //                     "username" :event,
        //         "groupname": "adminUserGroup"
        //       }, 
        //       headers: {
        //         'Content-Type' : 'application/json',
        //         Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        //       } 
        //   }
        //   return await API.post(apiName, path, myInit);
    };





    const handleAdminEmailChange = (event) => {
        setAdminEmail(event.target.value);
    };

    const handleConfirmSignUp = async () => {
        alert("handleConfirmSignUp pressed");
        let apiName = 'AdminQueries';
        let path = '/confirmUserSignUp';
        let myInit = {
            body: {
                "username": "richard",
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
            }
        }
        return await API.post(apiName, path, myInit);
    }

    const handleDisableUser = async () => {
        alert("handleDisableUser pressed");
        let apiName = 'AdminQueries';
        let path = '/disableUser';
        let myInit = {
            body: {
                "username": "richard",
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
            }
        }
        return await API.post(apiName, path, myInit);
    }

    const handleRemoveFromUserGroup = async () => {
        alert("handleRemoveFromUserGroup pressed");
        let apiName = 'AdminQueries';
        let path = '/removeUserFromGroup';
        let myInit = {
            body: {
                "username": "richard",
                "groupname": "Editors"
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
            }
        }
        return await API.post(apiName, path, myInit);
    }

    const handleEnableUser = async () => {
        alert(" handleEnableUser pressed");
        let apiName = 'AdminQueries';
        let path = '/enableUser';
        let myInit = {
            body: {
                "username": "richard",
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
            }
        }
        return await API.post(apiName, path, myInit);
    }


    const handleGetUser = async () => {
        alert(" handleGetUser pressed");
        let apiName = 'AdminQueries';
        let path = '/getUser';
        let myInit = {
            body: {
                "username": "richard",
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
            }
        }
        return await API.post(apiName, path, myInit);
    }



    const handleAddInstitution = async (event) => {
        // Perform the action to add the institution with universityName and adminEmail
        // You can add your logic here
        event.preventDefault()
        try {
            let inst = {
                name: universityName,
            }
            let institutionList = await API.graphql({
                query: listInstitutions,
                variables: {
                    filter: {
                        name: {
                            eq: universityName
                        }
                    }
                }
            })
            if (adminEmail !== "") {
                let admins = await API.graphql({
                    query: listAdmins,
                    variables: {
                        filter: {
                            email: {
                                eq: adminEmail
                            }
                        }
                    }
                })

                if (admins.data.listAdmins.items.length > 0) {
                    return
                }
            }

            if (institutionList.data.listInstitutions.items.length > 0) {

                return;
            }

            let institution = await API.graphql({
                query: createInstitution,
                variables: {
                    input: inst
                }
            })

            institution = institution.data.createInstitution;

            let email = adminEmail === "" ? "email" : adminEmail;
            let admin = await API.graphql({
                query: createAdmin,
                variables: {
                    input: {
                        firstname: "",
                        lastname: "",
                        userRole: "Admin",
                        institutionId: institution.id,
                        email: email
                    }
                }
            })

            const u = {
                id: institution.id,
                adminId: admin.data.createAdmin.id
            }

            await API.graphql({
                query: updateInstitution,
                variables: {
                    input: u
                }
            })

            institutions.unshift(institution);
            setInstitutions(institutions);

        } catch (e) {

        }
        setAdminEmail("")
        setUniversityName("")
        // After adding the institution, close the modal
        onClose();
    };

    if (!isOpen) return null;

    return (

        <>
            {isOpen && <div className="modal-backdrop" />}
            <div className="modal">
                <div className="modal-content">
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton
                            aria-label="Close"
                            onClick={onClose}

                            style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'transparent', color: '#e32f45' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <h2>Add Institution</h2>
                    <TextField
                        label="University Name"
                        variant="outlined"
                        fullWidth
                        value={universityName}
                        onChange={handleUniversityNameChange}
                        style={{ marginBottom: "5%" }}
                    />
                    <TextField
                        label="Admin Email Address"
                        variant="outlined"
                        fullWidth
                        value={adminEmail}
                        onChange={handleAdminEmailChange}
                        style={{ marginBottom: "5%" }}
                    />
                    <TextField
                        label="University ID"
                        variant="outlined"
                        fullWidth
                        value={universityID}
                        onChange={handleUniversityID}
                        style={{ marginBottom: "5%" }}
                    />
                    <Button className="no-hover-color-change" onClick={handleAddInstitution} variant="contained" color="primary" style={{ marginBottom: "5%", borderRadius: "20px" }}>
                        Add Institution
                    </Button>

                    <h2> Add Admin</h2>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={userName}
                        onChange={handleUsernameChange}
                        style={{ marginBottom: "5%" }}
                    />
                    <TextField
                        label="GroupName"
                        variant="outlined"
                        fullWidth
                        value={groupName}
                        onChange={handleGroupNameChange}
                        style={{ marginBottom: "5%" }}
                    />
                    <Button className="no-hover-color-change" onClick={handleConfirmSignUp} variant="contained" color="primary" style={{ marginBottom: "5%", borderRadius: "20px" }}>
                        Confirm user sign up
                    </Button>

                    <Button className="no-hover-color-change" onClick={handleRemoveFromUserGroup} variant="contained" color="primary" style={{ marginBottom: "5%", borderRadius: "20px" }}>
                        Remove from user group
                    </Button>

                    <Button className="no-hover-color-change" onClick={handleEnableUser} variant="contained" color="primary" style={{ marginBottom: "5%", borderRadius: "20px" }}>
                        Enable user
                    </Button>

                    <Button className="no-hover-color-change" onClick={handleDisableUser} variant="contained" color="primary" style={{ marginBottom: "5%", borderRadius: "20px" }}>
                        Disable user
                    </Button>

                    <Button className="no-hover-color-change" onClick={handleGetUser} variant="contained" color="primary" style={{ marginBottom: "5%", borderRadius: "20px" }}>
                        Get user
                    </Button>

                    <Button className="no-hover-color-change" onClick={handleAddAdmin} variant="contained" color="primary" style={{ marginBottom: "5%", borderRadius: "20px" }}>
                        Add Admin
                    </Button>

                </div>
            </div>
        </>
    );
}

export default function ViewInstitutions() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [institutions, setInstitutions] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchInstitutions = async () => {
        console.log("RAN")
        try {
            let a = await API.graphql({
                query: listInstitutions,
                variables: {},
                authMode: "API_KEY"
            })
            setInstitutions(a.data.listInstitutions.items);
        } catch (e) {
            console.log(e);
        }
    }
    const handleDelete = async (institution, index) => {
        try {
            await API.graphql({
                query: deleteInstitution,
                variables: { input: { id: institution.id } }
            })

            const rows = [...institutions];
            rows.splice(index, 1);
            setInstitutions(rows);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchInstitutions();
    }, [])

    return (
        <div style={{ display: 'flex', maxHeight: '100vh', position: 'relative' }}>
            <nav style={{ width: '20%' }}>
                {/* Navigation bar content */}
                <SuperAdminNavigation />
            </nav>

            <main style={{ width: '900px', marginTop: '30px' }}>
                <h1 className="moduleHead" style={{ textShadow: '2px 2px 4px rgba(0, 0.3, 0.2, 0.3)' }}>
                    View Institutions
                </h1>

                {institutions.map((institution, index) => (
                    <div className="card" key={index}>
                        {/* <div className="card-header">
                            <div className="subjectCode">Institution Application</div>
                            <div className="postDate">{institution.dateApplied}</div>
                        </div> */}
                        <div className="card-body">
                            <h5 className="card-title">Institution Name: {institution?.name}</h5>
                            <p className="card-text">Admin Email Address: {institution?.admin?.email && institution.admin.email !== "email" ? institution.admin.email : ""}</p>

                            <Button
                                aria-haspopup="true"
                                variant="contained"
                                disableElevation
                                onClick={() => handleDelete(institution, index)}
                                style={{ float: 'right', backgroundColor: '#e32f45', borderRadius: '20px' }}
                            >
                                Delete
                            </Button>

                        </div>
                    </div>
                ))}

                {/* Button positioned at the bottom right corner */}
                <div style={{ position: 'absolute', right: "-25%", bottom: '-10%' }}>
                    <Button
                        aria-haspopup="true"
                        variant="contained"
                        disableElevation
                        style={{ backgroundColor: '#e32f45', borderRadius: '20px' }}
                        onClick={() => openModal(setInstitutions, institutions)}
                    >
                        Add Institutions/Super Admins
                    </Button>
                </div>

                {/* Render the modal component */}
                <AddInstitutionModal isOpen={isModalOpen} onClose={closeModal} institutions={institutions} setInstitutions={setInstitutions} />


            </main>
        </div>
    );
}
