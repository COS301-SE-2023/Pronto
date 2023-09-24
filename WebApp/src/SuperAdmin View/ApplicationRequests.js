import React, { useState } from 'react';
import SuperAdminNavigation from './SuperAdminNavigation';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import {API} from "aws-amplify";
import { getInstitution ,listAdminApplications} from '../Graphql/queries';
import { updateAdmin,updateAdminApplication } from '../Graphql/mutations';

export default function ApplicationRequests() {
  
  const [requests,setRequests]=useState([]);
  

  const acceptRequest = async(index) => {
    const updatedRequests = [...requests];
    
    try{
       let admin=await API.graphql({
        query:getInstitution,
        variables:{id:requests[index].firstname}
       })
       admin=admin.data.getInstitution.admin;
       admin.email=requests[index].email;
       await API.graphql({
        query:updateAdmin,
        variables:{input:admin}
       })
          await API.graphql({
            query:updateAdminApplication,
            variables:{input:{id:requests[index].id,status:"ACCEPTED"}}
          })
        updatedRequests.splice(index, 1);
        setRequests(updatedRequests);  
    }catch(error){
      console.log(error);
    }
  };

  const declineRequest = async(index) => {
    const updatedRequests = [...requests];
    try{
      await API.graphql({
            query:updateAdminApplication,
            variables:{input:{id:requests[index].id,status:"REJECTED"}}
          })
      
      updatedRequests.splice(index, 1);
      setRequests(updatedRequests);
    }catch(error){
      console.log(error)
    }
  };

  const fetchRequests=async()=>{
    try{
      let r=await API.graphql({
        query:listAdminApplications,
        variables:{
          filter:{
            status:{
              eq:"PENDING"
            }
          }
        }
      })
      setRequests(r.data.listAdminApplications.items);
    
    }catch(error){
      console.log(error)
    }

  }
  useEffect(()=>{
    fetchRequests();
  },[])

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
              <div className="postDate">{request.createdAt.split("T")[0]}</div>
            </div>
            <div className="card-body">
              <h5 className="card-title">{request.lastname}</h5>
              <p className="card-text">{request.name+ " applied to be an admin"}</p>
               <p className='card-text'>Contact them at <a href="mailto:">{request.email}</a></p>
            
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
