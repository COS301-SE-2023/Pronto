import { useEffect} from "react";
import { useLocation, Navigate } from 'react-router-dom';
import { Auth } from "aws-amplify";


export function RequireAdminAuth({ children }) {

  const User = null;
  const UserGroup = null;
  const location = useLocation();

  const checkUser = async () => {
    try {
      const User = await Auth.currentAuthenticatedUser({});
      const UserGroup = User.signInUserSession.idToken.payload["cognito:groups"];
    } catch (e) {
      User = null;
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
    
  console.log(User);
  console.log(UserGroup);
  if( (!User) || (UserGroup !== "adminUserGroup") ){
    return <Navigate to="/institution-login" state={{ from: location }} replace />;
  }
  return children;
};