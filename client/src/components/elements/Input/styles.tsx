import styled from "styled-components";

interface Props {
  error?: boolean;
}

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  padding-left: 8px;
`;

export const Field = styled.input<Props>`
  background-color: #eef1f7;
  border-radius: 8px;
  width: 100%;
  padding: 12px 15px;
  border: 0;
  border: 1.2px solid ${({ error }) => (error ? "#ff0033" : "#D0E0E4")};
  ::placeholder {
    color: #b9bdc3;
  }
  &:focus {
    border: 1.2px solid ${({ error }) => (error ? "#ff0033" : "#D0E0E4")};
    outline: none;
  }
`;
