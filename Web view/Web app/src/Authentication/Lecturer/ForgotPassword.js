import React, { useState } from "react";
import styled from "styled-components";
import "./styles.css";
import ProntoLogo from "./ProntoLogo.png";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [step, setStep] = React.useState(1);
  const navigate = useNavigate();

  //validate email
  const [emailIsValid, setEmailIsValid] = useState(false);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = regex.test(value);
    setEmailIsValid(isValidEmail);
  };

  //validation of new passwords
  //validating password for sign up
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

  //validating confirm password
  const [passwordMatch, setPasswordMatch] = useState(false);

  const validateConfirmPassword = (value) => {
    setPasswordMatch(value === password);
  };

  const handlePasswordFocus = () => {
    setPasswordIsFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordIsFocused(false);
  };

  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validateConfirmPassword(e.target.value);
  };

  const handleGetCode = async (e) => {
    try {
      e.preventDefault();
      if (loading) {
        return;
      }
      setLoading(true);
      await Auth.forgotPassword(email);
      setStep(2);
      setError("");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const [signUpError, setsignUpError] = useState("");

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setsignUpError("Passwords do not match");
      return;
    }

    try {
      e.preventDefault();
      if (loading) {
        return;
      }
      setLoading(true);
      await Auth.forgotPasswordSubmit(email, code, password);
      setStep(3);
      setError("");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleResetPassword = () => {
    navigate("/lecturer-login");
  };

  return (
    <Container>
      {step === 1 && (
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
          <Subtitle>Forgot Password</Subtitle>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            isValidEmail={emailIsValid}
          />
          {error && <ErrorText>{error}</ErrorText>}{" "}
          {/* Render error text area if error exists */}
          <Button onClick={handleGetCode}>
            {loading ? "Sending code..." : "Get Code"}
          </Button>
        </Form>
      )}

      {step === 2 && (
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
          <Subtitle>Verify Code</Subtitle>
          <Input
            type="text"
            placeholder="Verification Code"
            value={code}
            onChange={handleCodeChange}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            isValidPassword={passwordIsValid}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            passwordMatch={passwordMatch}
          />
          {error && <ErrorText>{error}</ErrorText>}{" "}
          {/* Render error text area if error exists */}
          {signUpError && <ErrorText>{signUpError}</ErrorText>}{" "}
          <Button onClick={handleVerifyCode}>
            {" "}
            {loading ? "Verifying..." : "Verify Code"}
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
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
      )}

      {step === 3 && (
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
          <Subtitle>Your password has been succesfully reset</Subtitle>

          <Button onClick={handleResetPassword}>Go to login</Button>
        </Form>
      )}
    </Container>
  );
}

// styles...
const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 700px;
  max-width: 100%;
  min-height: 400px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

export default ForgotPassword;
