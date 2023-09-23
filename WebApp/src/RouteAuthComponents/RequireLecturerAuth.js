import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { Auth } from "aws-amplify";
import { SeesionExpireModal } from "../Components/SessionExpireModal";

export function RequireLecturerAuth({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkUserComplete, setCheckUserComplete] = useState(false);
  const [expired,setExpired] =useState(false)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser({});
        const group = user.signInUserSession.idToken.payload["cognito:groups"][0];

        if (group !== "lecturerUserGroup") {  //check if user is a lecturer, set authenticated to true if they are
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
        }
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setCheckUserComplete(true); // if user is logged in and a lecturer, set true which will grant access
      }
    };

    checkUser();
  }, []);

  if (!checkUserComplete) {
    // Wait for checkUser to complete
    return null; // or loading indicator
  }

  if (!authenticated) {
    return <Navigate to="/lecturer/login" />; //if not logged in or not a lecturer, take them to the lecturer login
  }

//Timer to log out user if inactive
let timeout;

const trackUserActivity= async()=>{
  clearTimeout(timeout);
  
  timeout = setTimeout(() => {
    
    
    Auth.signOut()
      .then(()=>{
        console.log("Session expired");
        setExpired(true);
        //setAuthenticated(false);
      })
      .catch(error=>{

      })
  }, 1 * 60 * 1000); // 30 minutes in milliseconds
}

// // Attach the event listener to the desired user activity events
 window.addEventListener('mousemove', trackUserActivity);
 window.addEventListener('keydown', trackUserActivity);


    return (
    <div>
      {expired && <SeesionExpireModal/>}
      {children};
    </div>
  )
}
