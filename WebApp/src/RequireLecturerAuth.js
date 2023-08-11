import { useLocation, Navigate } from 'react-router-dom';
import { Auth } from "aws-amplify";

export async function RequireLecturerAuth({ children }) {
  const location = useLocation();
  const { route } = await Auth.currentAuthenticatedUser({});;
  if (route !== 'authenticated'|| (route.signInUserSession.idToken.payload["cognito:groups"] != "lecturerUserGroup")) {
    return <Navigate to="/lecturer-login" state={{ from: location }} replace />;
  }
  return children;
}
