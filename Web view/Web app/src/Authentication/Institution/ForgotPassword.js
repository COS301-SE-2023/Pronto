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

export default ForgotPassword;
