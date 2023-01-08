import { Container } from "@mui/material";
import Link from "next/link";
import styled from "styled-components";
import Logo from "../../elements/Logo";

interface Props {
  scrolled: boolean;
}

export const NavbarContainer = styled.nav<Props>`
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

export const StyledContainer = styled(Container)`
  &&& {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const NavLogoLink = styled.a`
  width: 250px;
`;

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
  margin: 0 20px;
`;

export const NavLink = styled.a`
  cursor: pointer;
  font-size: 18px;
  font-weight: 300;

  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 1px;
    left: 50%;
    position: absolute;
    background: #ff596d;
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
    width: 100px;
  }
`;

export const Profile = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50vh;
  background-color: #696969;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
`;
