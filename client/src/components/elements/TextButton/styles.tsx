import { ONYX_20, PRIMARY_COLOUR } from "@styles/base/colours";
import styled from "styled-components";

interface Props {
  disabled: boolean;
  color: string;
}

export const StyledTextButton = styled.button<Props>`
  color: ${(props) => (props.disabled ? ONYX_20 : props.color)};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;
