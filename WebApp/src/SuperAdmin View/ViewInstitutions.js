import React from 'react';
import SuperAdminNavigation from './SuperAdminNavigation';
import Button from '@mui/material/Button';

export default function ViewInstitutions() {
    // Define an array of mock institutions
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

    return (
        <div style={{ display: 'flex', maxHeight: '100vh' }}>
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
            </main>
        </div>
    );
}
