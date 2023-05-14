import InputBase from "@mui/material/InputBase";
import styled from "styled-components";

interface Props {
  error?: boolean;
}

export const TextFieldContainer = styled.div`
  width: 100%;
`;

export const StyledTextField = styled(InputBase)<Props>`
  width: 100%;
  height: 40px;
  font-size: 14px;
  background-color: #eef1f7;
  border-radius: 8px;
  padding: 12px 15px;
  border: 1.2px solid ${({ error }) => (error ? "#ff0033" : "#D0E0E4")};
  ::placeholder {
    color: #b9bdc3;
  }
  &:focus {
    border: 1.2px solid ${({ error }) => (error ? "#ff0033" : "#D0E0E4")};
    outline: none;
  }
  & > .MuiInputBase-input {
    padding: 0;
  }
`;
