import Logo from "@components/elements/Logo";
import { Container } from "@mui/material";
import { PRIMARY_COLOUR } from "@styles/base/colours";
import Image from "next/image";
import styled from "styled-components";

interface Props {
  scrolled: boolean;
}

interface NavLinkProps {
  pathName: string;
}

export const Nav = styled.nav<Props>`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  height: ${(props) => (props.scrolled ? "80px" : "130px")};
  background: ${(props) =>
    props.scrolled ? "rgba(255,254,253,.98)" : "transparent"};
  transition: 0.3s;
  z-index: 1000;
`;

export const NavbarContainer = styled(Container)`
  &&& {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const NavLogoLink = styled.a``;

export const NavLogo = styled(Logo)<Props>`
  height: ${(props) => (props.scrolled ? "45px" : "60px")};
  width: auto;
  transition: 0.3s;
  cursor: pointer;
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  margin: 0 auto;
  list-style: none;
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
`;

export const AuthenticatedContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const SearchContainer = styled.div`
  width: 250px;
`;
