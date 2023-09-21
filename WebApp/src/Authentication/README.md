# User Roles
Pronto's users are grouped into the groups according to their roles.For authentication to succeed the users role must be passed in so the may be assigned to a user group
```js

const ROLES={
  Lecture: "Lecturer",
  Student: "Student",
  Admin: "Admin",
};
```

#  Sign up
Sign up takes in the username (which is the user's email address in this case) , a password and clientMetada. The password must be at least 8 characters long ,contain at least one lowercase one uppercase ,one number and one special character.When the sign up is called a cloud function is triggered before the authenitcation service.This function triggered pre sign up reads the users role and instituion id from the client metadata passed.Thus in addition to the username and password client metatdata must also be passed in.The json below describes the structure of the sign in object.

```js
    const signUpObject={
        username:"email",
        password:"password",
        clientMetada:{
           role:"role",
           institutionId:"institutionId"
        }
    };
    await Auth.signUp(signObject);
```

# Confirm Sign up
If sign up is successful then the function confirm sign up will be called. Confirm sign up expects a username(once again the email) , a verification code (sent by Amazon Cognito ) and once again the the user's role. A cloud function is also triggered on sign up (postConfirmSignUp) and if no errors are thrown it assigns the user to a user group based on the role since their email has been confirmes 

```js
    const confirmSignUpObject={
        username:"email",
        password:"password",
        clientMetadata:{
            role:"role"
        }
    }
   await Auth.confirmSignUp(confirmSignUpObject)
```    

# Sign in
The sign in function takes a username(email) , a password and validation data which serves a similar purpose to the client metadata passed  in on sign up. A pre authentication function is triggered before a users request is handled by the authentication service. 

```js
   const signInObject={
        username:"email",
        password:"password",
        validationData:{
            role:"role",
            institutionId:"institutionId"
        }
   }
   await Auth.signIn(signInObject)
 
```