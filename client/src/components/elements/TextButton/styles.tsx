import { ONYX_20, PRIMARY_COLOUR } from "@styles/base/colours";
import styled from "styled-components";

interface Props {
  disabled: boolean;
}

export const StyledTextButton = styled.button<Props>`
  color: ${(props) => (props.disabled ? ONYX_20 : PRIMARY_COLOUR)};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;
