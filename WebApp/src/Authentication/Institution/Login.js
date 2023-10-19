import React, { useState, useEffect } from "react";

import styled, { keyframes } from "styled-components";
import Select from "react-select";
import "./styles.css";
import ProntoLogo from "./ProntoLogo.png";
import { Auth, API, Storage } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { listAdmins, listInstitutions } from "../../Graphql/queries";
import { createAdminApplication } from "../../Graphql/mutations";
import { useAdmin } from "../../ContextProviders/AdminContext";
import MobileView from "../../Homepage/MobileView";

function Login() {
  const [signIn, toggle] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setsignInError] = useState("");
  const [signUpError, setsignUpError] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const [institutionName, setInstitutionName] = useState("")
  //sign up states
  const [name, setName] = useState("");

  const [signUpPassword, setSignUpPassword] = useState("");

  const navigate = useNavigate();


  //select institution
  const [institutionId, setInstitutionId] = useState("");

  const [loading, setLoading] = useState(false);
  // const [institutionName, setInstitutionName] = useState("");
  const [institutions, setInstitutions] = useState([])

  const { setAdmin } = useAdmin();

  const fetchAdmin = async () => {
    let fetchError = "This account has been deleted by the Super Admin."
    try {

      let adminData = await API.graphql({
        query: listAdmins,
        variables: {
          filter: {
            email: {
              eq: email
            }
          },

        },

      });
      if (adminData.data.listAdmins.items.length > 0 && adminData.data.listAdmins.items[0]._deleted===null && adminData.data.listAdmins.items[0].institution._deleted===null) {
        adminData = adminData.data.listAdmins.items[0];
        if (adminData.institution.logo !== null) {
          adminData.institution.logoUrl = await Storage.get(adminData.institution.logo, { validateObjectExistence: true, expires: 3600 });
        }

        setAdmin(adminData);
      }
      else {
        throw Error(fetchError);
      }

    } catch (error) {
      await Auth.signOut();
      throw Error(fetchError);
    }
  }


  // const fetchInstitutions = async () => {

  //   try {

  //     let inst = await API.graphql({
  //       query: listInstitutions,
  //       variables: {

  //       },
  //       authMode: "API_KEY"
  //     });
  //     inst = inst.data.listInstitutions.items;
  //     let institutionInfo = [];
  //     for (let j = 0; j < inst.length; j++) {
  //       let item = {
  //         value: inst[j].id,
  //         label: inst[j].name
  //       }
  //       institutionInfo.push(item);
  //     }
  //     setInstitutions(institutionInfo);
  //   } catch (error) {
  //   }
  // }

  // useEffect(() => {
  //   fetchInstitutions();
  // }, [])

  //function for signing in
  const onSignInPressed = async (event) => {
    if (loading) {
      return;
    }

    setLoading(true);
    event.preventDefault();

    // Add email validation check
    if (!emailIsValid) {
      setsignInError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    try {
      const signInObject = {
        username: email,
        password: password,
        validationData: {
          role: "Admin",
          // institutionId: institutionId
        }
      }

      const user = await Auth.signIn(signInObject);
      setsignInError("");
      //const newPassword = password
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        navigate("/institution/temporary-password", { state: { user: user } })
        // const loggedInUser = await Auth.completeNewPassword(
        //   user,
        //   newPassword,
        //   {
        //     family_name: "  "

        //   }
        // )

        // console.log(loggedInUser);
      }

      await fetchAdmin().then(() => navigate("/institution/dashboard"))
      //navigate("/institution/dashboard");
    } catch (e) {
      setLoading(false);
      setsignInError(e.message);
    }
    //setLoading(false);
  };


  //function for sign up
  const onSignUpPressed = async (event) => {
    event.preventDefault();
    const errors = []; // Create an array to hold error messages

    if (!nameIsValid) {
      errors.push("Please enter a university valid name.");
    }

    if (!emailIsValid) {
      errors.push("Please enter a valid email address.");
    }

    // if (!passwordIsValid) {
    //   errors.push(
    //     "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character (!@#$%^&*()?)."
    //   );
    // }
    // if (confirmPassword !== signUpPassword) {
    //   errors.push("Passwords do not match");
    // }

    if (errors.length > 0) {
      // Combine all error messages into a single string separated by <div> elements
      const errorMessage = errors.map((error, index) => (
        <div key={index}>{error}</div>
      ));
      setsignUpError(errorMessage);
      return;
    }

    setsignUpError(""); // Reset error message if all fields are valid

    if (loading) {
      return;
    }

    setLoading(true);

    try {

      const n = firstname + " " + lastname
      const application = {
        name: institutionName,
        firstname: n,
        email: email,
        status: "PENDING"
      }

      try {
        let apply = await API.graphql({
          query: createAdminApplication,
          variables: {
            input: application
          },
          authMode: "API_KEY"
        })
        console.log(apply);
      } catch (error) {
        console.log(error);
      }


      //await Auth.signUp(signInObject);

      setsignUpError("");
      navigate("/institution/confirm-email", { state: { email: email } });
    } catch (e) {
      console.log(e);

      //   let n=firstname+" "+lastname;
      //   const application = {
      //     name: institutionName,
      //     firstname: n,
      //     email: email,
      //     status: "PENDING"
      //   }

      //   try{
      //   await API.graphql({
      //     query: createAdminApplication,
      //     variables: {
      //       input: application
      //     },
      //     authMode: "API_KEY"
      //   })
      // }catch(error){
      //   console.log(error);
      // }
      // setsignUpError(e.message);
      //      setsignUpError("Your application has been sent")
    }
    setLoading(false);
  };

  //validate email input for sign in and sign up
  const [emailIsValid, setEmailIsValid] = useState(false);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = regex.test(value);
    setEmailIsValid(isValidEmail);
  };

  //validate password on sign up
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const validatePassword = (value) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()?])[A-Za-z\d!@#$%^&*()?]{8,}$/;
    const isValidPassword = regex.test(value);

    setPasswordIsValid(isValidPassword);

    setPasswordCriteria({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      digit: /\d/.test(value),
      specialChar: /[!@#$%^&*()?]/.test(value),
    });
  };

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  const [passwordIsFocused, setPasswordIsFocused] = useState(false);

  const handlePasswordFocus = () => {
    setPasswordIsFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordIsFocused(false);
  };

  //confirm password validation
  const [passwordMatch, setPasswordMatch] = useState(false);

  const validateConfirmPassword = (value) => {
    setPasswordMatch(value === signUpPassword);
  };

  //validate university name on signup
  const [nameIsValid, setNameIsValid] = useState(false);

  const validateName = (value) => {
    const regex = /[a-zA-Z]+/;
    const isValidName = regex.test(value);
    setNameIsValid(isValidName);
  };

  const isMobileView = window.innerWidth < 768;

  return (
    <div>
      {
        isMobileView ? (
          // Display a message for mobile users
          <MobileView />
        ) : (
          <Container>
            <SignUpContainer signin={signIn}>
              <Form>
                <Title
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  Create Institution Account
                </Title>
                <Input
                  type="text"
                  placeholder="Institution name"
                  value={institutionName}
                  onChange={(event) => {
                    setInstitutionName(event.target.value);
                    //validateEmail(event.target.value);
                  }}
                />
                <Input
                  type="text"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                    validateName(event.target.value);
                  }}
                  isValidName={nameIsValid}
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(event) => {
                    setLastName(event.target.value);
                    validateName(event.target.value);
                  }}
                />
                <Input
                  type="email"
                  placeholder="Adminsitration Email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    validateEmail(event.target.value);
                  }}
                  isValidEmail={emailIsValid}
                />
                {/*                 
                <StyledSelectInput
                  options={institutions}
                  defaultValue={institutionId}
                  onChange={handleInstitutionSelection}
                  placeholder="Select an Institution"
                  classNamePrefix="SelectInput"
                  autoComplete="on"
                  spellCheck="true"
                  isSelectionValid={isInstitudeSelected}
                ></StyledSelectInput> */}

                {/* <Input
                  type="password"
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={(event) => {
                    setSignUpPassword(event.target.value);
                    validatePassword(event.target.value);
                  }}
                  isValidPassword={passwordIsValid}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    validateConfirmPassword(event.target.value);
                  }}
                  passwordMatch={passwordMatch}
                /> */}
                {signUpError && <ErrorText>{signUpError}</ErrorText>}{" "}
                <Button onClick={onSignUpPressed}>
                  {loading ? "Applying..." : "Apply"}
                </Button>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {passwordIsFocused && (  //real time password criteria check
                    <>
                      <CriteriaMessage isValid={passwordCriteria.length}>
                        {passwordCriteria.length ? "✓" : "x"} Minimum 8 characters
                      </CriteriaMessage>
                      <CriteriaMessage isValid={passwordCriteria.uppercase}>
                        {passwordCriteria.uppercase ? "✓" : "x"} Uppercase character
                      </CriteriaMessage>
                      <CriteriaMessage isValid={passwordCriteria.lowercase}>
                        {passwordCriteria.lowercase ? "✓" : "x"} Lowercase character
                      </CriteriaMessage>
                      <CriteriaMessage isValid={passwordCriteria.digit}>
                        {passwordCriteria.digit ? "✓" : "x"} Digit
                      </CriteriaMessage>
                      <CriteriaMessage isValid={passwordCriteria.specialChar}>
                        {passwordCriteria.specialChar ? "✓" : "x"} Special character
                        (!@#$%^&*()?)
                      </CriteriaMessage>
                    </>
                  )}
                </div>
              </Form>
            </SignUpContainer>
            <SignInContainer signin={signIn}>
              <Form>
                <LogoContainer>
                  <img
                    src={ProntoLogo}
                    alt="Logo"
                    style={{
                      width: "50%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </LogoContainer>
                <Subtitle>Institution Login</Subtitle>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    validateEmail(event.target.value);
                  }}
                  isValidEmail={emailIsValid}
                />

                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <Button onClick={onSignInPressed}>
                  {" "}
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
                <Anchor href="/institution/forgot-password">
                  Forgot your password?
                </Anchor>
                <Anchor href="/institution/verification-code">
                  Verification Code
                </Anchor>
                {signInError && <ErrorText>{signInError}</ErrorText>}{" "}
              </Form>
            </SignInContainer>
            <OverlayContainer signin={signIn}>
              <Overlay signin={signIn}>
                <LeftOverlayPanel signin={signIn}>
                  <Title>Have an account?</Title>
                  <Paragraph>
                    Please sign in to access all of Pronto's features
                  </Paragraph>
                  <GhostButton onClick={() => toggle(true)}>Sign In</GhostButton>
                </LeftOverlayPanel>

                <RightOverlayPanel signin={signIn}>
                  <Title>No Account?</Title>
                  <Paragraph>
                    Click here to apply for an institution account
                  </Paragraph>
                  <GhostButton onClick={() => toggle(false)}>Apply</GhostButton>
                </RightOverlayPanel>
              </Overlay>
            </OverlayContainer>
          </Container>
        )}
    </div>
  );
}

//styles

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;


const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  display: relative;
  overflow: hidden;
  width: 100%; /* Make it 100% width */
  height: 100vh; /* Make it 100% viewport height */
`;

const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.5s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signin !== true
      ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `
      : null}
     
`;

const Subtitle = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
  align-items: center;
  text-align: center;
  margin-top: 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.5s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) => (props.signin !== true ? `transform: translateX(100%);` : null)}
`;

const Form = styled.form`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  animation: ${slideIn} 1s ease-in-out;
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  border-radius: 25px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  &:focus {
    ${(props) =>
    props.isValidEmail ||
      props.isValidPassword ||
      props.isValidName ||
      props.isValidSurname ||
      props.passwordMatch // Add the condition here
      ? `border: 2px solid green;`
      : `border: 1px solid grey`}
  }
`;

const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #e32f45;
  background-color: #e32f45;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  margin: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
  &:hover{
    cursor: pointer;
  }
`;

const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.5s ease-in-out;
  z-index: 100;
  ${(props) => (props.signin !== true ? `transform: translateX(-100%);` : null)}
  animation: ${slideIn} 1s ease-in-out;
`;

const Overlay = styled.div`
  background: #e32f45;
  background: -webkit-linear-gradient(to right, #e32f45, #e32f45);
  background: linear-gradient(to right, #e32f45, #e32f45);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
  ${(props) => (props.signin !== true ? `transform: translateX(50%);` : null)}
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
`;

const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signin !== true ? `transform: translateX(0);` : null)}
  animation: ${slideIn} 1s ease-in-out;
`;

const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signin !== true ? `transform: translateX(20%);` : null)}
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

const ErrorText = styled.p`
  font-size: 12px;
  color: red;
  margin-top: 5px;
`;

const CriteriaMessage = styled.span`
  display: inline-block;
  margin-right: 10px;
  font-size: 12px;
  color: ${({ isValid }) => (isValid ? "green" : "inherit")};
`;

const StyledSelectInput = styled(Select)`
  width: 100%;

  .SelectInput__control {
    background-color: #eee;
    border: none;
    border-radius: 25px;
    margin: 8px 0;
  }

  .SelectInput__control--is-focused {
    border: ${({ isSelectionValid }) =>
    isSelectionValid ? "2px solid green;" : "2px solid #e32f45;"}
    box-shadow: none;
  }

  .SelectInput__control:hover {
    border-color: #eee;
  }

  .SelectInput__menu {
    background-color: #eee;
  }

  .SelectInput__option:hover {
    background-color: #ec7281;
  }

  .SelectInput__option--is-selected {
    background-color: #e32f45;
  }

  .SelectInput__single-value .SelectInput__control--is-focused {
    background-color: purple;
  }
`;


export default Login;
