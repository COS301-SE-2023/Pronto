import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { Auth } from "aws-amplify";
import { SeesionExpireModal } from "../Components/SessionExpireModal";

export function RequireSuperAdminAuth({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkUserComplete, setCheckUserComplete] = useState(false);
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser({});
        const group = user.signInUserSession.idToken.payload["cognito:groups"][0];

        if (group !== "superUserGroup") { //if the user is not a super admin set authentication false
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
        }
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setCheckUserComplete(true); //if user is logged in and is a super admin, set true which will allow access
      }
    };

    checkUser();
  }, []);

  if (!checkUserComplete) {
    // Wait for checkUser to complete
    return null; // or loading indicator
  }

  if (!authenticated) {
    return <Navigate to="/404" /> //if not logged in or not a super admin, take them to the not found page
  }
  // Add an event listener to track user activity
  let timeout;

  const trackUserActivity = async () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      Auth.signOut()
        .then(() => {

          setExpired(true);
          //setAuthenticated(false);
        })
        .catch(error => {

        })
    }, 5 * 60 * 1000);
  }

  // // Attach the event listener to the desired user activity events
  window.addEventListener('mousemove', trackUserActivity);
  window.addEventListener('keydown', trackUserActivity);


  return (
    <div>
      {expired && <SeesionExpireModal />}
      {children}
    </div>
  )
}