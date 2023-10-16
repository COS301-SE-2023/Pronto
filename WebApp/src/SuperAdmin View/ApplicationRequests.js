import React, { useState, useEffect } from "react";
import SuperAdminNavigation from "./SuperAdminNavigation";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { API } from "aws-amplify";
import { listInstitutions } from "../Graphql/queries";
import { listAdminApplications } from "../Graphql/queries";
import {
  updateAdminApplication,
  createInstitution,
  createAdmin,
  updateInstitution,
  deleteAdminApplication,
} from "../Graphql/mutations";

export default function ApplicationRequests() {
  const [requests, setRequests] = useState([]);

  const processApplication = async (request, inst) => {
    console.debug({ request });

    const createAdminResponse = await addToAdminGroup(
      request.id,
      inst,
      request.email,
      request.firstname,
      request.lastname
    );
    console.debug({ createAdminResponse });

    if (
      !createAdminResponse ||
      !createAdminResponse.applicationInfo ||
      !createAdminResponse.applicationInfo.admin
    )
      throw new Error("failed to create admin");
    const { admin } = createAdminResponse.applicationInfo;
    console.debug({ inst });
    const createAdminReponse = await API.graphql({
      query: createAdmin,
      variables: {
        input: {
          email: request.email,
          firstname: request.firstname,
          lastname: request.lastname,
          userRole: "Admin",
          id: admin.id,
        },
      },
    });
    console.debug({ createAdminReponse });
    const updateInst = API.graphql({
      query: updateInstitution,
      variables: {
        input: {
          adminId: createAdminReponse.data.createAdmin.id,
          id: inst.id,
        },
      },
    });
    console.log(inst);
    console.debug({ admin });
    console.debug({ updateInst });
  };
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

      const request = requests[index];

      let inst = await API.graphql({
        query: listInstitutions,
        variables: {
          filter: {
            name: {
              eq: request.name,
            },
          },
        },
      });

      if (inst.data.listInstitutions.items.length > 0) {
        inst = inst.data.listInstitutions.items[0];
        const deleteAdminApplicationResponse = await API.graphql({
          query: deleteAdminApplication,
          variables: { input: { id: request.id, _version: request._version } },
        });
        console.debug({ deleteAdminApplicationResponse });
      } else {
        inst = await API.graphql({
          query: createInstitution,
          variables: {
            input: {
              name: request.institutionName,
            },
          },
        });

        await processApplication(request, inst.data.createInstitution);
      }
    } catch (acceptRequestError) {
      console.debug({ acceptRequestError });
    }
  };

  const getUserHelper = async (username) => {
    try {
      let apiName = "AdminQueries";
      let path = "/getUser";
      let myInit = {
        body: {
          username: "agilearchitectscapstone@gmail.com",
        },
        headers: {
          "Content-Type": "application/json",
          //Authorization: `AM`
        },
      };
      return await API.post(apiName, path, myInit);
    } catch (error) {
      console.log(error);
    }
  };
  const addToAdminGroup = async (
    applicationId,
    institution,
    email,
    firstname,
    lastname
  ) => {
    try {
      console.debug({
        id: applicationId,
        email: email,
        firstname: firstname,
        lastname: lastname,
        institutionId: institution.id,
        tempPassword: "October01!",
      });
      const updateAdminApplicationResponse = await API.graphql({
        query: updateAdminApplication,
        variables: {
          input: {
            id: applicationId,
            email: email,
            firstname: firstname,
            lastname: lastname,
            institutionId: institution.id,
            tempPassword: "October01!",
          },
        },
      });
      console.debug({ updateAdminApplicationResponse });
      return updateAdminApplicationResponse.data.updateAdminApplication;
    } catch (addToAdminGroupError) {
      console.log(addToAdminGroupError);
    }
  };

  const declineRequest = async (index) => {
    const updatedRequests = [...requests];
    try {
      await API.graphql({
        query: updateAdminApplication,
        variables: { input: { id: requests[index].id, status: "REJECTED" } },
      });

      updatedRequests.splice(index, 1);
      setRequests(updatedRequests);
    } catch (declineRequestError) {
      console.debug({ declineRequestError });
    }
  };

  const fetchRequests = async () => {
    console.log("waht");
    try {
      let r = await API.graphql({
        query: listAdminApplications,
      });
      setRequests(
        r.data.listAdminApplications.items.filter((item) => !item._deleted)
      );
      console.debug({ r });
    } catch (fetchRequestsError) {
      console.log({ fetchRequestsError });
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div style={{ display: "flex", maxHeight: "100vh" }}>
      <nav style={{ width: "20%" }}>
        <SuperAdminNavigation />
      </nav>

      <main style={{ width: "900px", marginTop: "30px" }}>
        <h1
          className="moduleHead"
          style={{ textShadow: "2px 2px 4px rgba(0, 0.3, 0.2, 0.3)" }}
        >
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
              <p className="card-text">
                {request.firstname +
                  " applied to be an admin for institution " +
                  request.name}
              </p>
              <p className="card-text">
                Contact them at{" "}
                <a
                  href={`mailto:${request.email}?subject=${encodeURIComponent(
                    "Pronto Admins"
                  )}&body=${encodeURIComponent(
                    "Hello " +
                      request.firstname +
                      " Your request has been (rejected/accepted)"
                  )}`}
                >
                  {" "}
                  {request.email}
                </a>
              </p>

              <div style={{ float: "right" }}>
                <CheckIcon
                  onClick={() => acceptRequest(index)}
                  style={{
                    cursor: "pointer",
                    color: "green",
                    marginRight: "10px",
                  }}
                />
                <CloseIcon
                  onClick={() => declineRequest(index)}
                  style={{ cursor: "pointer", color: "red" }}
                />
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
