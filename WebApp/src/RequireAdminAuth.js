import {useState} from "react";
import { useLocation, Navigate } from 'react-router-dom';
import { Auth } from "aws-amplify";

export async function RequireAdminAuth({ children }) {
  const [user, setUser] = useState(undefined);
  const [userGroup, setUserGroup] = useState(null);
    const location = useLocation();
    try {
      const authUser = await Auth.currentAuthenticatedUser({});
      const group =
        authUser.signInUserSession.idToken.payload["cognito:groups"];
      setUser(authUser);
      setUserGroup(group);
    } catch (e) {
      setUser(null);
    }
    if( (!user) || (userGroup != "adminUserGroup") ){
        return <Navigate to="/institution-login" state={{ from: location }} replace />;
    }
    return children;
  };