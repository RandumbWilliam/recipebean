import InputBase from "@mui/material/InputBase";
import { ONYX_10, WHITE_COLOUR } from "@styles/base/colours";
import styled from "styled-components";

interface Props {
  alternate?: boolean;
}

export const StyledInputBase = styled(InputBase)<Props>`
  font: inherit;
  width: 100%;
  padding: 0 14px;
  border-radius: 50vh;
  border: 1px solid ${(props) => (props.alternate ? WHITE_COLOUR : ONYX_10)};

  ${(props) =>
    props.alternate &&
    `
    color: ${WHITE_COLOUR};
    & ::placeholder {
      color: ${WHITE_COLOUR};
    }
  `}
`;
