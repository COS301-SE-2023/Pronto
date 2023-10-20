import React, { useState, useEffect } from 'react';
import SuperAdminNavigation from './SuperAdminNavigation';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { ErrorModal } from "../Components/ErrorModal";
import {SuccessModal} from "../Components/SuccessModal";
import { API, Auth } from "aws-amplify";
import {  listAdmins, listInstitutions } from '../Graphql/queries';
import { listAdminApplications } from '../Graphql/queries';
import { updateAdmin, updateAdminApplication, createInstitution, createAdmin, updateInstitution } from '../Graphql/mutations';

export default function ApplicationRequests() {

  const [requests, setRequests] = useState([]);
  const [error,setError]=useState("");
  const [successMessage,setSuccessMessage]=useState("");

  const acceptRequest = async (index) => {
    const updatedRequests = [...requests];

    try {
      
      updatedRequests.splice(index, 1);
      setRequests(updatedRequests);

      let request = requests[index];
      let institution = {
        name: request.name
      }


      let inst=await API.graphql({
        query:listInstitutions,
        variables:{
          filter:{
            name:{
              eq:request.name
            }
          }
        }
      })
      
      if(inst.data.listInstitutions.items.length>0){
          inst=inst.data.listInstitutions.items[0];
      }
      else{
          inst = await API.graphql({
            query: createInstitution,
           variables: { input: institution }
        })

     
      inst=inst.data.createInstitution;
    }
  

     let admin = await API.graphql({
      query:listAdmins,
      variables:{
        filter:{
          email:{
            eq:request.email
          }
        }
      }
     })
    
     if(admin.data.listAdmins.items.length>0){
       admin=admin.data.listAdmins.items[0];
       let updatedAdmin={
        id:admin.id,
        institutionId:inst.id,
        _version:admin._version
       }
       try{

            let update=await API.graphql({
              query:updateAdmin,
              variables:{input:updatedAdmin}
            })
          
       }catch(e){
          
       }
     }
     else{
      let adminname=request.firstname.split(" ");
      let a = {
        firstname: "  ",
        userRole: "Admin",
        lastname: "  ",
        institutionId: inst.id,
        email: request.email
      }
     
      admin = await API.graphql({
        query: createAdmin,
        variables: { input: a }
      })
     
      admin=admin.data.createAdmin;
    }

      let update = {
        id: inst.id,
        adminId:admin.id,
        _version: inst._version,
        lectureremails:request.email
      }
     
      let f = await API.graphql({
        query: updateInstitution,
        variables: { input: update }
      })
 
      let g=await API.graphql({
        query: updateAdminApplication,
        variables: { input: { id: requests[index].id, status: "ACCEPTED",_version:requests[index]._version } }
      })
      
 
     const password=generateRandomString();
     const user= await Auth.signUp({
        username: request.email,
        password: password,
        attributes: {
          email: request.email,
          name: request.firstname,
          family_name: " ",
        },
        clientMetadata: {
          role: "Lecturer",
          institutionId: inst.id,
        },
      });
     
      setSuccessMessage("Admin account created");
     
   
    } catch (error) {
     
      setError("Something went wrong");
    }
  };

  const generateRandomString=()=>{
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    function getRandomChar(charSet) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      return charSet[randomIndex];
    }

    const randomLowercase = getRandomChar(lowercaseChars);
    const randomUppercase = getRandomChar(uppercaseChars);
    const randomNumber = getRandomChar(numbers);
    const randomSpecialChar = getRandomChar(specialChars);

    const remainingChars = lowercaseChars + uppercaseChars + numbers + specialChars;

    let generatedString = randomLowercase + randomUppercase + randomNumber + randomSpecialChar;

    for (let i = 0; i < 4; i++) {
      const randomChar = getRandomChar(remainingChars);
      generatedString += randomChar;
    }

    // Shuffle the generated string to randomize the order of characters
    generatedString = generatedString.split('').sort(() => Math.random() - 0.5).join('');

    return generatedString;
  }



  const declineRequest = async (index) => {
    const updatedRequests = [...requests];
    try {
     updatedRequests.splice(index, 1);
      setRequests(updatedRequests);
      let reject= await API.graphql({
        query: updateAdminApplication,
        variables: { input: { id: requests[index].id, status: "REJECTED" ,_version:requests[index]._version} }
      })
     

      
    } catch (error) {
     
    }
  };

  const fetchRequests = async () => {
    try {
      let r = await API.graphql({
        query: listAdminApplications,
        variables: {
          filter: {
            status: {
              eq: "PENDING"
            }
          }
        }
      })
      const inst = await API.graphql({
        query:listInstitutions,
        variables:{}
      })
    
       const ad = await API.graphql({
        query:listAdmins,
        variables:{}
      })
    
      setRequests(r.data.listAdminApplications.items.filter((item)=>item._deleted===null && item.status==="PENDING"));
 
         
    } catch (error) {
      
    }

  }
  useEffect(() => {
    fetchRequests();
  }, [])

  return (
    <div style={{ display: 'flex', maxHeight: '100vh' }}>
       {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
      {successMessage && <SuccessModal successMessage={successMessage} setSuccessMessage={setSuccessMessage}> {successMessage} </SuccessModal>}
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
              <h5 className="card-title">{request.name}</h5>
              <p className="card-text">{request.firstname + " applied to be an admin for institution " + request.name}</p>
              <p className='card-text'>Contact them at  <a href={`mailto:${request.email}?subject=${encodeURIComponent("Pronto Admins")}&body=${encodeURIComponent("Hello " + request.name + " Your request has been (rejected/accepted)")}`} > {request.email}</a></p>

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
