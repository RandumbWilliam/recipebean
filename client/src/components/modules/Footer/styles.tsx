import { Container } from "@mui/material";
import styled from "styled-components";
import Logo from "../../elements/Logo";

export const FooterContainer = styled.footer`
  background-color: #ffffff;
  height: 250px;
  display: flex;
  align-items: center;
`;

export const StyledContainer = styled(Container)`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const FooterLogo = styled(Logo)`
  height: 90px;
  width: auto;
`;

export const FooterCopyright = styled.p`
  font-size: 20px;
`;
