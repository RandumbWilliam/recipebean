import { ONYX_10, ONYX_20 } from "@styles/base/colours";
import { FONT_SIZE_18 } from "@styles/base/typography";
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

export const Adornment = styled.div`
  position: absolute;
  right: 15px;
`;

export const Field = styled.input<Props>`
  line-height: 20px;
  border-radius: 8px;
  font-size: ${FONT_SIZE_18};
  width: 100%;
  padding: 13px 16px;
  border: 0;
  background-color: transparent;
  border: 1px solid ${({ error }) => (error ? "#ff0033" : ONYX_20)};
  ::placeholder {
    color: ${ONYX_10};
  }
  &:focus {
    border: 1.2px solid ${({ error }) => (error ? "#ff0033" : ONYX_20)};
    outline: none;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`;
