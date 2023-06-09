import { ONYX_20, PRIMARY_COLOUR } from "@styles/base/colours";
import styled from "styled-components";
import Icon from "../Icon";

interface Props {
  checked: boolean;
}

export const StyledCheckbox = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${ONYX_20};
  cursor: pointer;
`;

export const CheckmarkIcon = styled(Icon)<Props>`
  visibility: ${(props) => (props.checked ? "visible" : "hidden")};
`;

export const StyledInput = styled.input.attrs({ type: "checkbox" })`
  -webkit-appearance: none;
  appearance: none;
`;

export const Indicator = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 2px solid ${PRIMARY_COLOUR};
  outline: none;
  cursor: pointer;
  margin-right: 0.5em;
  ${(props) => props.checked && `background-color: ${PRIMARY_COLOUR};`}
`;
