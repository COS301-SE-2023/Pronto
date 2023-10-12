import React, { useState } from "react";
import styled from "styled-components";
import "./styles.css";
import ProntoLogo from "./ProntoLogo.png";
import { Auth } from "aws-amplify";
import { useLocation, useNavigate } from "react-router-dom";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const user = location.state.user;

  const onVerifyPressed = async (event) => {
    event.preventDefault();
    if(newPassword!==confirmPassword){
        setError("New Password does not match Confirm Password");
        return;
    }    
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      //await Auth.confirmSignUp(email, code, {clientMetadata: { role: "Lecturer" }});
      const loggedInUser = await Auth.completeNewPassword(
        user, 
        newPassword, 
        {
          family_name: "  "
        }
      )
      setError("");
      navigate("/institution/dashboard");
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <Container>
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
        <Subtitle>Change Passowrd</Subtitle>
        <Subtitle
          style={{
            fontSize: "1.1rem",
          }}
        >
          New Password
        </Subtitle>
        <Input
          type="password"
          //placeholder="Verificatio"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <Subtitle
          style={{
            fontSize: "1.1rem",
          }}
        >
          Confirm Password
        </Subtitle>
        <Input
          type="password"
          //placeholder="Verification Code"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        {error && <ErrorText>{error}</ErrorText>}

        <Button onClick={onVerifyPressed}>
          {loading ? "Changing..." : "Change Password"}
        </Button>
      </Form>
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

export default ChangePassword;
