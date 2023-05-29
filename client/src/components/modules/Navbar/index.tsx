import Button from "@components/elements/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Nav,
  NavButtons,
  NavItem,
  NavLink,
  NavLogo,
  NavLogoLink,
  NavMenu,
  NavbarContainer,
} from "./styles";

interface NavbarProps {}

const MenuLinks = [
  { key: "recipes", label: "Recipes", url: "/" },
  { key: "planning", label: "Planning", url: "/" },
  { key: "shopping", label: "Shopping", url: "/" },
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
    <Nav scrolled={scrolled}>
      <NavbarContainer>
        <Link href="/">
          <NavLogoLink>
            <NavLogo scrolled={scrolled} color="#ff596d" />
          </NavLogoLink>
        </Link>
        <NavMenu>
          {MenuLinks.map((item) => (
            <NavItem key={item.key}>
              <Link href={item.url}>
                <NavLink>{item.label}</NavLink>
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
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
