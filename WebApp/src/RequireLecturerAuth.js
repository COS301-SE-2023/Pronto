import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { Auth } from "aws-amplify";

export function RequireLecturerAuth({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkUserComplete, setCheckUserComplete] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser({});
        const group = user.signInUserSession.idToken.payload["cognito:groups"][0];

        if (group !== "lecturerUserGroup") {
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
        }
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setCheckUserComplete(true);
      }
    };

    checkUser();
  }, []);

  if (!checkUserComplete) {
    // Wait for checkUser to complete
    return null; // or loading indicator
  }

  if (!authenticated) {
    return <Navigate to="/lecturer-login" />;
  }

  return children;
}
