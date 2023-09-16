import React from "react";
import styled from "styled-components";
import "./styles.css";
import ProntoLogo from "./ProntoLogo.png";
import { useNavigate } from "react-router-dom";

function SuccessfulApply() {
  const navigate = useNavigate();
  const onHomeClick = () => {
    navigate("/institution/login");
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
        <Subtitle>Succesfully applied</Subtitle>
        <Subtitle
          style={{
            fontSize: "1.1rem",
          }}
        >
          You have succesfully applied for an institution account! We will
          review your application and contact you after your application has
          been reviewed.
        </Subtitle>

        <Button onClick={onHomeClick}>Back to home</Button>
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

export default SuccessfulApply;
