import Logo from "@components/elements/Logo";
import { BREAKPOINT_TABLET } from "@styles/base/breakpoints";
import styled from "styled-components";

export const AuthSection = styled.section`
  display: flex;
  height: 100vh;
  min-height: 768px;
`;

export const NavLogoContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 20px;

  @media (min-width: ${BREAKPOINT_TABLET}) {
    top: 40px;
    left: 80px;
  }
`;

export const NavLogoLink = styled.a`
  width: 250px;
`;

export const NavLogo = styled(Logo)`
  height: 45px;
  width: auto;
  transition: 0.3s;
  cursor: pointer;
`;
