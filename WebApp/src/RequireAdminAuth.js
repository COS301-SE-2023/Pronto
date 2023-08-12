import {useState} from "react";
import { useLocation, Navigate } from 'react-router-dom';
import { Auth } from "aws-amplify";


try {
  const authUser = await Auth.currentAuthenticatedUser({});
  const group =
    authUser.signInUserSession.idToken.payload["cognito:groups"];
  setUser(authUser);
  setUserGroup(group);
} catch (e) {
  setUser(null);
}
export function RequireAdminAuth({ children }) {
    const [user, setUser] = useState(undefined);
    const [userGroup, setUserGroup] = useState(null);
    const location = useLocation();
    
    if( (!user) || (userGroup !== "adminUserGroup") ){
      return <Navigate to="/institution-login" state={{ from: location }} replace />;
    }
    return children;
  };