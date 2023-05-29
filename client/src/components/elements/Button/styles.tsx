import {
  BRINK_PINK_60,
  DISABLED_COLOUR,
  PRIMARY_COLOUR,
  WHITE_COLOUR,
} from "@styles/base/colours";
import styled from "styled-components";

interface Props {
  primary: boolean;
  disabled: boolean;
}

export const StyledButton = styled.button<Props>`
  background-color: ${(props) =>
    props.primary ? PRIMARY_COLOUR : "transparent"};
  border-radius: 8px;
  border: ${(props) =>
    props.primary ? "none" : `2px solid ${PRIMARY_COLOUR}`};
  color: ${(props) => (props.primary ? WHITE_COLOUR : PRIMARY_COLOUR)};
  cursor: pointer;
  padding: 8px 24px;
  height: 48px;
  box-sizing: border-box;
  transition: color 100ms;

  &:hover {
    background-color: ${(props) =>
      props.primary ? BRINK_PINK_60 : PRIMARY_COLOUR};
    ${(props) =>
      !props.primary &&
      `
        color: ${WHITE_COLOUR};
    `}
  }

  ${(props) =>
    props.disabled &&
    `
    background-color: ${props.primary && DISABLED_COLOUR};
    color: ${!props.primary && DISABLED_COLOUR};
    border-color:  ${!props.primary && DISABLED_COLOUR};
    cursor: default;

    &:hover {
      background-color: ${props.primary ? DISABLED_COLOUR : "transparent"};
      color: ${!props.primary && DISABLED_COLOUR};
    }
  `}
`;
