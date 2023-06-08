import React from "react";
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleGetCode = async (e) => {
    try {
      e.preventDefault();
      await Auth.forgotPassword(email);
      setStep(2);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVerifyCode = async (e) => {
    try {
      e.preventDefault();
      await Auth.forgotPasswordSubmit(email, code, password);
      setStep(3);
      setError("");
    } catch (error) {
      setError(error.message);
    }
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
          />
          {error && <ErrorText>{error}</ErrorText>}{" "}
          {/* Render error text area if error exists */}
          <Button onClick={handleGetCode}>Get Code</Button>
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
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {error && <ErrorText>{error}</ErrorText>}{" "}
          {/* Render error text area if error exists */}
          <Button onClick={handleVerifyCode}>Verify Code</Button>
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

export default ForgotPassword;
