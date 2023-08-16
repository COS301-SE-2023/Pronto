import { useState, useEffect } from "react";
import { useLocation, Navigate } from 'react-router-dom';
import { Auth } from "aws-amplify";


export function RequireAdminAuth({ children }) {

  const [user, setUser] = useState(undefined);
  const [userGroup, setUserGroup] = useState(null);
  const location = useLocation();

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({});


      setUser(authUser);

      const group = authUser.signInUserSession.idToken.payload["cognito:groups"][0];
      setUserGroup(group);
      console.log({ authUser });
      console.log({ group })

    } catch (e) {
      setUser(null);
      console.log("catch ran");
      console.log(e.message);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);


  console.log(userGroup)

  if ((!user) || (userGroup !== "adminUserGroup")) {
    return <Navigate to="/institution-login" state={{ from: location }} replace />;
  }

  return children;
};