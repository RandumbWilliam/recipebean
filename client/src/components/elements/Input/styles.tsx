import styled from "styled-components";

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

export const Field = styled.input`
  background-color: #eef1f7;
  border-radius: 50vh;
  width: 100%;
  padding: 12px 15px;
  border: 0;
  ::placeholder {
    color: #b9bdc3;
  }
  &:focus {
    border: none;
    outline: none;
  }
`;
