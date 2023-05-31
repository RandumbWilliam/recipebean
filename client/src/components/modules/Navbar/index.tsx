import CornProfilePicture from "@assets/avatars/Corn.jpg";
import Button from "@components/elements/Button";
import { useMyUserQuery } from "@generated/graphql";
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
  Profile,
  StyledImage,
} from "./styles";

interface NavbarProps {}

const MenuLinks = [
  { key: "recipes", label: "Recipes", url: "/" },
  { key: "planning", label: "Planning", url: "/" },
  { key: "shopping", label: "Shopping", url: "/" },
];

const AuthenticatedLinks = [
  { key: "cookbooks", label: "My Cookbooks", url: "/" },
  { key: "ingredients", label: "My Ingredients", url: "/" },
  { key: "planner", label: "Planner", url: "/" },
];

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [scrolled, setScrolled] = useState(false);
  const [{ data, fetching }] = useMyUserQuery();
  const authenticated = data?.myUser;

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
        {authenticated ? (
          <Profile>
            <StyledImage src={CornProfilePicture} alt="profile picture" />
          </Profile>
        ) : (
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
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
