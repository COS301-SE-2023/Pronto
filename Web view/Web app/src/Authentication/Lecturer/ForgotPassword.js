import React from "react";
import styled from "styled-components";
import "./styles.css";
import ProntoLogo from "./ProntoLogo.png";

function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [step, setStep] = React.useState(1);

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

  const handleGetCode = () => {
    // TODO: Implement code retrieval functionality
    // You can add your code here to send a verification code to the provided email
    // Once the code is sent, you can proceed to the next step by calling `setStep(2)`
    setStep(2);
  };

  const handleVerifyCode = () => {
    // TODO: Implement code verification functionality
    // You can add your code here to verify the entered code
    // Once the code is verified, you can proceed to the next step by calling `setStep(3)`
    setStep(3);
  };

  const handleResetPassword = () => {
    // TODO: Implement password reset functionality
    // You can add your code here to reset the password
    // Once the password is reset, you can redirect the user to another page
    // or perform any other necessary actions
    console.log("Password reset successful!");
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
          <Subtitle>Reset Password</Subtitle>

          <Input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={handlePasswordChange}
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />

          <Button onClick={handleResetPassword}>Reset Password</Button>
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

export default ForgotPassword;
