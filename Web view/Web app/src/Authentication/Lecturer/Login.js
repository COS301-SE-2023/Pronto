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
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSignInPressed = async (event) => {
    if (loading) {
      return;
    }

    setLoading(true);
    event.preventDefault();
    try {
      const response = await Auth.signIn(email, password);
      setsignInError("");
      //navigate to lecturer home page
      navigate("/lecture-homepage");
    } catch (e) {
      setsignInError(e.message);
    }
    setLoading(false);
  };

  const onSignUpPressed = async (event) => {
    event.preventDefault();
    try {
      // const response = await Auth.signIn(email, password);
      // setsignUpError("");
    } catch (e) {
      //  setsignUpError(e.message);
    }
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
            Create Lecturer Account
          </Title>
          <Input type="text" placeholder="Name" />
          <Input type="text" placeholder="Surname" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm Password" />
          {signUpError && <ErrorText>{signUpError}</ErrorText>}{" "}
          {/* Render error text area if error exists */}
          <Button>Sign Up</Button>
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
          <Subtitle>Lecturer Login</Subtitle>
          {/* input fields for lecturers login*/}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button onClick={onSignInPressed}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
          <Anchor href="/lecturer-forgot-password">
            Forgot your password?
          </Anchor>
          {signInError && <ErrorText>{signInError}</ErrorText>}{" "}
          {/* Render error text area if error exists */}
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
            <Paragraph>Click here to verify a lecturer account</Paragraph>
            <GhostButton onClick={() => toggle(false)}>Sign Up</GhostButton>
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

export default Login;
