import React, { useState } from 'react';
import SuperAdminNavigation from './SuperAdminNavigation';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function ApplicationRequests() {
  const [requests, setRequests] = useState([
    'John Doe (john@example.com) requested to be an administrator for University A',
    'Jane Smith (jane@example.com) requested to be an administrator for University B',
  ]);

  const acceptRequest = (index) => {
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
  };

  const declineRequest = (index) => {
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
  };

  return (
    <div style={{ display: 'flex', maxHeight: '100vh' }}>
      <nav style={{ width: '20%' }}>
        <SuperAdminNavigation />
      </nav>

      <main style={{ width: '900px', marginTop: '30px' }}>
        <h1 className="moduleHead" style={{ textShadow: '2px 2px 4px rgba(0, 0.3, 0.2, 0.3)' }}>
          Application Requests
        </h1>

        {requests.map((request, index) => (
          <div className="card" key={index}>
            <div className="card-header">
              <div className="subjectCode">Application #{index + 1}</div>
              <div className="postDate">Date Applied</div>
            </div>
            <div className="card-body">
              <h5 className="card-title">University Name</h5>
              <p className="card-text">{request}</p>

              <div style={{ float: "right" }}>


                <CheckIcon
                  onClick={() => acceptRequest(index)}
                  style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }}
                />
                <CloseIcon
                  onClick={() => declineRequest(index)}
                  style={{ cursor: 'pointer', color: 'red' }}
                />

              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
