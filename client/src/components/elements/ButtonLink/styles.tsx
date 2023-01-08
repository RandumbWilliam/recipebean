import styled from "styled-components";

interface Props {
  color: string;
  disabled: boolean;
}

export const StyledButton = styled.button<Props>`
  font-weight: 600;
  color: ${(props) => props.color};
  background: none;
  border: none;
  cursor: pointer;
  outline: inherit;
  padding: 0;
`;
