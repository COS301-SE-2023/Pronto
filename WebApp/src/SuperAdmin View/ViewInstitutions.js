import React, { useState } from 'react';
import SuperAdminNavigation from './SuperAdminNavigation';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./SuperAdmin.css";
import IconButton from '@mui/material/IconButton'; // Import IconButton
import CloseIcon from '@mui/icons-material/Close'; // Import the close icon

// Modal component for adding institutions
function AddInstitutionModal({ isOpen, onClose }) {
    const [universityName, setUniversityName] = useState('');
    const [adminEmail, setAdminEmail] = useState('');

    const handleUniversityNameChange = (event) => {
        setUniversityName(event.target.value);
    };

    const handleAdminEmailChange = (event) => {
        setAdminEmail(event.target.value);
    };

    const handleAddInstitution = () => {
        // Perform the action to add the institution with universityName and adminEmail
        // You can add your logic here

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
                    <Button className="no-hover-color-change" onClick={handleAddInstitution} variant="contained" color="primary" style={{ marginBottom: "5%", borderRadius: "20px" }}>
                        Add Institution
                    </Button>
                </div>
            </div>
        </>
    );
}

export default function ViewInstitutions() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const institutions = [
        {
            name: 'Tuks',
            adminEmail: 'example@example.com',
            dateApplied: '2023-09-21',
        },
        {
            name: 'University B',
            adminEmail: 'admin@example.com',
            dateApplied: '2023-09-20',
        },
    ];

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
                        <div className="card-header">
                            <div className="subjectCode">Institution Application</div>
                            <div className="postDate">{institution.dateApplied}</div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Institution Name: {institution.name}</h5>
                            <p className="card-text">Admin Email Address: {institution.adminEmail}</p>

                            <Button
                                aria-haspopup="true"
                                variant="contained"
                                disableElevation
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
                        onClick={openModal}
                    >
                        Add Institutions
                    </Button>
                </div>

                {/* Render the modal component */}
                <AddInstitutionModal isOpen={isModalOpen} onClose={closeModal} />
            </main>
        </div>
    );
}
