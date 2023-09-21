import React, { useState } from 'react';
import SuperAdminNavigation from './SuperAdminNavigation';

// Import Material Icons
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function ApplicationRequests() {
  // Define the initial list of application requests
  const [requests, setRequests] = useState([
    'John Doe (john@example.com) requested to be an administrator for University A',
    'Jane Smith (jane@example.com) requested to be an administrator for University B',
  ]);

  // Function to accept a request
  const acceptRequest = (index) => {
    // Update the requests list by removing the accepted request
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
  };

  // Function to decline a request
  const declineRequest = (index) => {
    // Update the requests list by removing the declined request
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
  };

  return (
    <div style={{ textAlign: 'center', height: '100vh' }}>
      <h1 style={{ paddingTop: '20%' }}>Application Requests</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {requests.map((request, index) => (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", borderRadius: "20px", padding: '10px', width: '100%', boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)", height: "80px" }} key={index}>
            <div>
              <p>{request}</p>
            </div>
            <div style={{ marginLeft: "20px" }}>
              <CheckIcon onClick={() => acceptRequest(index)} style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }} />
              <CloseIcon onClick={() => declineRequest(index)} style={{ cursor: 'pointer', color: 'red' }} />
            </div>
          </div>
        ))}
      </div>
      <SuperAdminNavigation />
    </div >
  );
}
