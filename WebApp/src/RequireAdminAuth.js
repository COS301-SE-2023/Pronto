import { useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { Auth } from "aws-amplify";


export function RequireAdminAuth({ children }) {

  let User = null;
  let Group = null; //I used let instead of const so that we can make these variables global whilst 
                    // also being able to assign them values in the async function. with the if statement
                     // in the try, the way it is, these could be declared const within the try, but i have
                     //left them here global incase we put the if statement outside the try again.

  const checkUser = async () => {
    try {
      User = await Auth.currentAuthenticatedUser({});
      Group = User.signInUserSession.idToken.payload["cognito:groups"][0];

      console.log({ User });
      console.log({ Group })

      if ((!{User}) || ({Group} != "adminUserGroup")) {
        return <Navigate to="/institution-login"/>;
      }
      else 
      {
        return {children}; //else returns children here now so that it doesnt automatically get returned
      }
    } catch (e) {
      console.log("catch ran");
      console.log(e.message);
      return <Navigate to="/institution-login" />; //if an error is caught return to the login
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

};