import { InputBase } from "@mui/material";
import { ONYX_10, ONYX_20 } from "@styles/base/colours";
import styled from "styled-components";

interface Props {
  error?: boolean;
}

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  justify-content: center;
`;

export const Label = styled.label`
  color: ${ONYX_20};
`;

export const Description = styled.p`
  color: ${ONYX_20};
`;

export const Adornment = styled.div`
  position: absolute;
  right: 15px;
`;

export const Field = styled(InputBase)<Props>`
  font: inherit;
  border-radius: 8px;
  width: 100%;
  padding: 7px 16px;
  border: 0;
  background-color: transparent;
  border: 1px solid ${({ error }) => (error ? "#ff0033" : ONYX_20)};

  & input {
    padding: 0;
    height: auto;
  }

  ::placeholder {
    color: ${ONYX_10};
  }

  &:focus {
    border: 1px solid ${({ error }) => (error ? "#ff0033" : ONYX_20)};
    outline: none;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`;
