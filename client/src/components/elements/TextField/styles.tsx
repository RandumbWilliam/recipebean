import InputBase from "@mui/material/InputBase";
import { SECONDARY_COLOUR } from "@styles/base/colours";
import styled from "styled-components";

export const StyledTextField = styled(InputBase)`
  font: inherit;
  width: 100%;
  border-bottom: 1px solid ${SECONDARY_COLOUR};
`;
