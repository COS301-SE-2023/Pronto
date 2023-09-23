import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { Auth } from "aws-amplify";
import { SeesionExpireModal } from "../Components/SessionExpireModal";

export function RequireAdminAuth({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkUserComplete, setCheckUserComplete] = useState(false);
  const [expired,setExpired] =useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser({});
        const group = user.signInUserSession.idToken.payload["cognito:groups"][0];

        if (group !== "adminUserGroup") { //if the user is not an admin set authentication false
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
        }
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setCheckUserComplete(true); //if user is logged in and is an admin, set true which will allow access
      }
    };

    checkUser();
  }, []);

  if (!checkUserComplete) {
    // Wait for checkUser to complete
    return null; // or loading indicator
  }

  if (!authenticated) {
    return <Navigate to="/institution/login" />; //if not logged in or not an admin, take them to the admin login
  }

  // Add an event listener to track user activity
let timeout;

const trackUserActivity= async()=>{
  clearTimeout(timeout);
  console.log("Start");
  timeout = setTimeout(() => {
    
    
    Auth.signOut()
      .then(()=>{
      
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
