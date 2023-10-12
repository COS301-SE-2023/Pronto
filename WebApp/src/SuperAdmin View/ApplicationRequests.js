import React, { useState, useEffect } from 'react';
import SuperAdminNavigation from './SuperAdminNavigation';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { API, Auth } from "aws-amplify";
import { getInstitution, listInstitutions } from '../Graphql/queries';
import { listAdminApplications } from '../Graphql/queries';
import { updateAdmin, updateAdminApplication, createInstitution, createAdmin, updateInstitution } from '../Graphql/mutations';

export default function ApplicationRequests() {

  const [requests, setRequests] = useState([]);


  const acceptRequest = async (index) => {
    const updatedRequests = [...requests];

    try {
      // let admin = await API.graphql({
      //   query: getInstitution,
      //   variables: { id: requests[index].firstname }
      // })
      // admin = admin.data.getInstitution.admin;
      // admin.email = requests[index].email;
      // await API.graphql({
      //   query: updateAdmin,
      //   variables: { input: admin }
      // })
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
          //console.log(inst);
      }
      else{
          inst = await API.graphql({
              query: createInstitution,
              variables: { input: institution }
            })

          //console.log(inst);
          inst=inst.data.createInstitution;
        }
      const newAdmin = await addToAdminGroup(inst, request.email, request.firstname);
      console.log(newAdmin)

      let a = {
        firstname: " ",
        userRole: "Admin",
        lastname: " ",
        institutionId: inst.id,
        email: request.email
      }
      console.log(a);
      let admin = await API.graphql({
        query: createAdmin,
        variables: { input: a }
      })
      console.log(admin)
      let update = {
        id: inst.id,
        adminId:admin.data.createAdmin.id,
        _version: inst._version
      }
      console.log(update)
      let f = await API.graphql({
        query: updateInstitution,
        variables: { input: update }
      })
      //  const user= await getUserHelper()
        console.log(f);
      let g=await API.graphql({
        query: updateAdminApplication,
        variables: { input: { id: requests[index].id, status: "ACCEPTED",_version:requests[index]._version } }
      })
      console.log(g);
 
      const group= await addUserToGroup(requests[index].email);
      console.log(group);
    } catch (error) {
      console.log(error);
    }
  };

   const addUserToGroup = async (username) => {
        let apiName = 'AdminQueries';
        let path = '/addUserToGroup';
        let myInit = {
            body: {
                "username": username,
                "groupname": "adminUserGroup"
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
            }
        }
        return await API.post(apiName, path, myInit);
    }
  const getUserHelper = async (username) => {
    try {
      let apiName = 'AdminQueries';
      let path = '/getUser';
      let myInit = {
        body: {
          "username": "agilearchitectscapstone@gmail.com",
        },
        headers: {
          'Content-Type': 'application/json',
          //Authorization: `AM`
        }
      }
      return await API.post(apiName, path, myInit);
    } catch (error) {
      console.log(error);
    }
  }
  const addToAdminGroup = async (institution, email, name) => {
    try {
      let apiName = "AdminQueries";
      let path = "/createInstitutionAdmin";
      let n = name.replace(" ", "")
      let myInit = {
        body: {
          "email": email,
          "institutionId": institution.id,
          "Password": "October01!",
          name: n
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        }
      };
      return API.post(apiName, path, myInit);
    } catch (error) {
      console.log(error);
    }
  }

  const declineRequest = async (index) => {
    const updatedRequests = [...requests];
    try {
       updatedRequests.splice(index, 1);
      setRequests(updatedRequests);
      let rejected=await API.graphql({
        query: updateAdminApplication,
        variables: { input: { id: requests[index].id, status: "REJECTED",_version:requests[index]._version } }
      })
    } catch (error) {
      console.log(error)
    }
  };

  const fetchRequests = async () => {
    try {
      let r = await API.graphql({
        query: listAdminApplications,
        variables: {
          filter: {
            // status: {
            //   eq: "PENDING"
            // }
          }
        }
      })
      setRequests(r.data.listAdminApplications.items.filter((item)=>item._deleted===null && item.status==="PENDING"));
      //setRequests(r.data.listAdminApplications.items);
      //console.log(r);   
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    fetchRequests();
  }, [])

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
