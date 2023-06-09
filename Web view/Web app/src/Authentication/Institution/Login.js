import React, { useState } from "react";
import styled from "styled-components";
import "./styles.css";
import ProntoLogo from "./ProntoLogo.png";
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

    try {
      await Auth.signIn(email, password);
      setsignInError("");
      //navigate to lecturer home page
      navigate("/institution-homepage");
    } catch (e) {
      setsignInError(e.message);
    }
    setLoading(false);
  };

  //function for sign up
  const onSignUpPressed = async (event) => {
    event.preventDefault();
    if (confirmPassword !== signUpPassword) {
      setsignUpError("Passwords do not match");
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);

    try {
      await Auth.signUp({
        username: email,
        password: signUpPassword,
        attributes: {
          email: email,
          name: name,
          family_name: "",
          address: "",
        },
        clientMetadata: {
          role: "Admin",
        },
      });
      setsignUpError("");
      navigate("/institution-confirm-email", { state: { email: email } });
    } catch (e) {
      setsignUpError(e.message);
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

  //validate password on sign in
  const [passwordSignInIsValid, setPasswordSignInIsValid] = useState(false);
  const validateSignInPassword = (value) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValidSignInPassword = regex.test(value);

    setPasswordSignInIsValid(isValidSignInPassword);
  };

  //validate password on sign up
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const validatePassword = (value) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValidPassword = regex.test(value);

    setPasswordIsValid(isValidPassword);

    setPasswordCriteria({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      digit: /\d/.test(value),
      specialChar: /[@$!%*?&]/.test(value),
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
            Create Institution Account
          </Title>
          <Input
            type="text"
            placeholder="University Name"
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
            {passwordIsFocused && (
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
                  (@$!%*?&)
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
              validateSignInPassword(event.target.value);
            }}
            isValidSignInPassword={passwordSignInIsValid}
          />
          <Button onClick={onSignInPressed}>
            {" "}
            {loading ? "Signing in..." : "Sign in"}
          </Button>
          <Anchor href="/institution-forgot-password">
            Forgot your password?
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
  );
}

//styles

const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  display: relative;
  overflow: hidden;
  width: 700px;
  max-width: 100%;
  min-height: 400px;
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
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

const Input = styled.input`
  background-color: #eee;
  border: 0;
  border-radius: 25px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  &:focus {
    ${(props) =>
      props.isValidEmail ||
      props.isValidPassword ||
      props.isValidSignInPassword ||
      props.isValidName ||
      props.isValidSurname ||
      props.passwordMatch // Add the condition here
        ? `border: 2px solid green;`
        : `border: 1px solid #e32f45;`}
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
