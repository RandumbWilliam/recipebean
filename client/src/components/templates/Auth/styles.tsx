import Button from "@components/elements/Button";
import { Container } from "@mui/material";
import styled from "styled-components";

export const AuthSection = styled.section`
  height: 100vh;
  min-height: 768px;
  background-color: #f5f7f9;
`;

export const StyledContainer = styled(Container)`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
  width: 485px;
  height: 480px;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 40px;
`;

export const SubmitButton = styled(Button)`
  width: 120px;
  margin: 15px 0;
`;
