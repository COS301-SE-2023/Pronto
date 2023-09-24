import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { Auth } from "aws-amplify";

export function RequireSuperAdminAuth({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkUserComplete, setCheckUserComplete] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser({});
        const group = user.signInUserSession.idToken.payload["cognito:groups"][0];

        if (group !== "superAdminUserGroup") { //if the user is not a super admin set authentication false
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
    return <Navigate to="/404" />; //if not logged in or not a super admin, take them to the not found page
  }

  return children;
}
