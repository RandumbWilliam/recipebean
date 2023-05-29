import { ONYX_20, PRIMARY_COLOUR } from "@styles/base/colours";
import styled from "styled-components";

interface Props {
  checked: boolean;
}

export const StyledCheckbox = styled.div``;

export const StyledLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${ONYX_20};
  cursor: pointer;
`;

export const StyledInput = styled.input<Props>`
  /* removing default appearance */
  -webkit-appearance: none;
  appearance: none;
  /* creating a custom design */
  width: 18px;
  height: 18px;
  border-radius: 4px;
  margin-right: 0.5em;
  border: 2px solid ${PRIMARY_COLOUR};
  outline: none;
  cursor: pointer;

  ${(props) =>
    props.checked &&
    `
    background-color: ${PRIMARY_COLOUR};
  `}
`;
