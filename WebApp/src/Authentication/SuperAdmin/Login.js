import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import "../Institution/styles.css";
import ProntoLogo from "../Institution/ProntoLogo.png";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [signIn, toggle] = React.useState(true);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signInError, setsignInError] = useState("");
  const [signUpError, setsignUpError] = useState("");

  //sign up states
  const [name, setName] = React.useState("");

  const [signUpPassword, setSignUpPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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

    //add logic to sign into pronto admin account
    try {
      await Auth.signIn(email, password, { role: "SuperAdmin" });
      setsignInError("");
      navigate("/superadmin/admin-requests")
    } catch (e) {
      setLoading(false);
      setsignInError(e.message);
    }

    setLoading(false);
  };


  //function for sign up
  const onSignUpPressed = async (event) => {
    event.preventDefault();
    const errors = []; // Create an array to hold error messages

    if (!nameIsValid) {
      errors.push("Please enter a valid administrator name.");
    }

    if (!emailIsValid) {
      errors.push("Please enter a valid email address.");
    }

    if (!passwordIsValid) {
      errors.push(
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character (!@#$%^&*()?)."
      );
    }
    if (confirmPassword !== signUpPassword) {
      errors.push("Passwords do not match");
    }

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

    //add logic to create pronto admin account here


    alert("Sign Up Pressed");
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

  return (
    <Container>
      <SignUpContainer signin={signIn}>
        <Form>
          <Title
            style={{
              marginBottom: "20px",
            }}
          >
            Create Pronto Administrator Account
          </Title>
          <Input
            type="text"
            placeholder="Administrator Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              validateName(event.target.value);
            }}
            isValidName={nameIsValid}
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
          <Input
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
          />
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
          <Subtitle>Pronto Administrator Login</Subtitle>
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
              Click here to apply for a pronto admin account
            </Paragraph>
            <GhostButton onClick={() => toggle(false)}>Apply</GhostButton>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
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
  animation: ${slideIn} 0.8s ease-in-out;
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
`;

const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
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
  animation: ${slideIn} 0.8s ease-in-out;
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
  animation: ${slideIn} 0.8s ease-in-out;
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

export default Login;
