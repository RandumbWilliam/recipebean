import Button from "@components/elements/Button";
import { Container } from "@mui/material";
import styled from "styled-components";

export const AuthContainer = styled(Container)`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 130px;
    height: 100%;
  }
`;

export const AuthTitle = styled.h1`
  font-size: 35px;
  font-weight: 500;
  color: #ff596d;
`;

export const AuthCard = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 30px;
  width: 500px;
  height: 480px;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 40px;
`;

export const AuthSubmitButton = styled(Button)`
  width: 200px;
  margin: 15px 0;
`;

export const AuthErrorText = styled.span`
  color: #ff0033;
  display: flex;
  gap: 5px;
  align-items: center;
`;
