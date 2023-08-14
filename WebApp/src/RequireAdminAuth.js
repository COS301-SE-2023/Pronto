import {useState, useEffect} from "react";
import { useLocation, Navigate } from 'react-router-dom';
import { Auth } from "aws-amplify";

export function RequireAdminAuth({ children }) {

  const [user, setUser] = useState(undefined);
  const [userGroup, setUserGroup] = useState(null);
  const location = useLocation();

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({});
      const group =
        authUser.signInUserSession.idToken.payload["cognito:groups"];
      setUser(authUser);
      setUserGroup(group);
      
      if( (!user) || (userGroup !== "adminUserGroup") ){
        return <Navigate to="/institution-login" state={{ from: location }} replace />;
      }
      
    } catch (e) {
      setUser(null);
    }
  };
  useEffect(() => {
    checkUser();
  },[]);

  return children;
};