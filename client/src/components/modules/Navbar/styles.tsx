import Logo from "@components/elements/Logo";
import { Container } from "@mui/material";
import { BREAKPOINT_MOBILE, BREAKPOINT_TABLET } from "@styles/base/breakpoints";
import {
  PRIMARY_COLOUR,
  SECONDARY_COLOUR,
  WHITE_COLOUR,
} from "@styles/base/colours";
import styled from "styled-components";

interface NavProps {
  alternate?: boolean;
  scrolled?: boolean;
}

interface NavLinkProps {
  pathName: string;
}

interface MobileProps {
  open: boolean;
}

export const Nav = styled.nav<NavProps>`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.scrolled ? "rgba(255,254,253,.98)" : "transparent"};
  z-index: 1000;
`;

export const NavbarContainer = styled(Container)<NavProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;

  @media (min-width: ${BREAKPOINT_TABLET}) {
    height: ${(props) => (props.scrolled ? "80px" : "130px")};
    transition: 0.3s;
  }
`;

export const AuthNavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const NavLogoLink = styled.a`
  z-index: 1;
`;

export const NavLogo = styled(Logo)<NavProps>`
  height: 35px;
  width: auto;
  transition: 0.3s;
  cursor: pointer;

  @media (min-width: ${BREAKPOINT_TABLET}) {
    height: ${(props) => (props.scrolled ? "45px" : "55px")};
  }
`;

export const NavMenu = styled.ul<NavProps>`
  display: flex;
  align-items: center;
  margin: 0 auto;
  list-style: none;
  color: ${(props) =>
    props.alternate && !props.scrolled ? WHITE_COLOUR : SECONDARY_COLOUR};
`;

export const NavItem = styled.li`
  position: relative;
  margin: 0 12px;
`;

export const NavLink = styled.a<NavLinkProps>`
  cursor: pointer;
  font-size: 18px;
  font-weight: 300;
  padding: 0 12px;

  ${(props) =>
    props.href === props.pathName &&
    `
      color: ${PRIMARY_COLOUR};
      &:before {
        background: none repeat scroll 0 0 transparent;
        bottom: 0;
        content: "";
        display: block;
        height: 2px;
        left: 50%;
        position: absolute;
        background: ${PRIMARY_COLOUR};
        width: 100%;
        left: 0;
      }
  `}

  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: ${PRIMARY_COLOUR};
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  &:hover:after {
    width: 100%;
    left: 0;
  }
`;

export const NavButtons = styled.div`
  button {
    margin: 0 5px;
  }

  @media (min-width: ${BREAKPOINT_MOBILE}) {
    display: none;
  }

  @media (min-width: ${BREAKPOINT_TABLET}) {
    display: block;
  }
`;

export const AuthenticatedContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const SearchContainer = styled.div`
  width: 100%;
  padding: 0 24px;

  @media (min-width: ${BREAKPOINT_TABLET}) {
    width: 250px;
    padding: 0;
  }
`;

export const MobileButton = styled.div`
  z-index: 1;

  @media (min-width: ${BREAKPOINT_TABLET}) {
    display: none;
  }
`;

export const MobileMenu = styled.div<MobileProps>`
  z-index: 1;
  background-color: ${WHITE_COLOUR};
  display: ${(props) => (props.open ? "flex" : "none")};
  gap: 12px;
  flex-direction: column;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100%;
  padding-top: 120px;

  @media (min-width: ${BREAKPOINT_TABLET}) {
    display: none;
  }
`;
