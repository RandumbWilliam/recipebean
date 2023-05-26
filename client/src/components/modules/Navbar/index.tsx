import { Container } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../../elements/Button";
import {
  NavButtons,
  NavItem,
  NavLink,
  NavLogo,
  NavLogoLink,
  NavMenu,
  NavbarContainer,
  Profile,
  StyledContainer,
} from "./styles";

interface NavbarProps {}

const MenuLinks = [
  { item: "Recipes", url: "/recipe-app" },
  { item: "Planning", url: "/" },
  { item: "Shopping", url: "/" },
];

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY >= 65) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <NavbarContainer scrolled={scrolled}>
      <StyledContainer>
        <Link href="/">
          <NavLogoLink>
            <NavLogo scrolled={scrolled} color="#ff596d" />
          </NavLogoLink>
        </Link>
        <NavMenu>
          {MenuLinks.map((item, index) => (
            <NavItem key={index}>
              <Link href={item.url}>
                <NavLink>{item.item}</NavLink>
              </Link>
            </NavItem>
          ))}
        </NavMenu>
        <NavButtons>
          <Link href="/login">
            <a>
              <Button primary={false}>Log In</Button>
            </a>
          </Link>
          <Link href="/register">
            <a>
              <Button>Sign Up</Button>
            </a>
          </Link>
        </NavButtons>
      </StyledContainer>
    </NavbarContainer>
  );
};

export default Navbar;
