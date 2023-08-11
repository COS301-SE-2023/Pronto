import { useLocation, Navigate } from 'react-router-dom';
import { Auth } from "aws-amplify";

const [user, setUser] = useState(undefined);
const [userGroup, setUserGroup] = useState(null);

export async function RequireAdminAuth({ children }) {
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
        return <Navigate to="/lecturer-login" state={{ from: location }} replace />;
    }
    return children;
  };