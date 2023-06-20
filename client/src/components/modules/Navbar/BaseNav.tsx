import Button from "@components/elements/Button";
import IconButton from "@components/elements/IconButton";
import { PRIMARY_COLOUR, WHITE_COLOUR } from "@styles/base/colours";
import Link from "next/link";
import React, { useState } from "react";
import {
  MobileButton,
  MobileMenu,
  Nav,
  NavButtons,
  NavLogo,
  NavLogoLink,
  NavbarContainer,
} from "./styles";

interface NavbarProps {
  alternate?: boolean;
  scrolled?: boolean;
}

const MenuLinks = [
  { key: "recipes", label: "Recipes", url: "/" },
  { key: "planning", label: "Planning", url: "/" },
  { key: "shopping", label: "Shopping", url: "/" },
];

const BaseNav: React.FC<NavbarProps> = ({ alternate, scrolled }) => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <Nav scrolled={scrolled} alternate={alternate}>
        <NavbarContainer scrolled={scrolled}>
          <Link href="/">
            <NavLogoLink>
              <NavLogo scrolled={scrolled} color={PRIMARY_COLOUR} />
            </NavLogoLink>
          </Link>
          {/* <NavMenu>
              {MenuLinks.map((item) => (
                <NavItem key={item.key}>
                  <Link href={item.url} passHref>
                    <NavLink pathName={router.pathname}>{item.label}</NavLink>
                  </Link>
                </NavItem>
              ))}
            </NavMenu> */}
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

          {/* Mobile Button */}
          <MobileButton>
            {mobileMenu ? (
              <IconButton
                name="Cross"
                size={24}
                onClick={() => setMobileMenu(!mobileMenu)}
              />
            ) : (
              <IconButton
                name="Hamburger"
                size={28}
                onClick={() => setMobileMenu(!mobileMenu)}
              />
            )}
          </MobileButton>
        </NavbarContainer>
      </Nav>
      {/* Mobile Menu */}
      <MobileMenu open={mobileMenu}>
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
      </MobileMenu>
    </>
  );
};

export default BaseNav;
