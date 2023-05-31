import Button from "@components/elements/Button";
import Profile from "@components/elements/Profile";
import SearchField from "@components/elements/SearchField";
import { useMyUserQuery } from "@generated/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  AuthenticatedContainer,
  Nav,
  NavButtons,
  NavItem,
  NavLink,
  NavLogo,
  NavLogoLink,
  NavMenu,
  NavbarContainer,
  SearchContainer,
} from "./styles";

interface NavbarProps {}

const MenuLinks = [
  { key: "recipes", label: "Recipes", url: "/" },
  { key: "planning", label: "Planning", url: "/" },
  { key: "shopping", label: "Shopping", url: "/" },
];

const AuthenticatedLinks = [
  { key: "cookbooks", label: "My Cookbooks", url: "/cookbooks" },
  { key: "ingredients", label: "My Ingredients", url: "/" },
  { key: "planner", label: "Planner", url: "/" },
];

const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
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

  console.log(router.pathname);

  return (
    <Nav scrolled={scrolled}>
      <NavbarContainer>
        {authenticated ? (
          <>
            <AuthenticatedContainer>
              <Link href="/">
                <NavLogoLink>
                  <NavLogo scrolled={scrolled} color="#ff596d" />
                </NavLogoLink>
              </Link>
              <NavMenu>
                {AuthenticatedLinks.map((item) => (
                  <NavItem key={item.key}>
                    <Link href={item.url} passHref>
                      <NavLink pathName={router.pathname}>{item.label}</NavLink>
                    </Link>
                  </NavItem>
                ))}
              </NavMenu>
            </AuthenticatedContainer>
            <AuthenticatedContainer>
              <SearchContainer>
                <SearchField />
              </SearchContainer>
              <Profile />
            </AuthenticatedContainer>
          </>
        ) : (
          <>
            <Link href="/">
              <NavLogoLink>
                <NavLogo scrolled={scrolled} color="#ff596d" />
              </NavLogoLink>
            </Link>
            <NavMenu>
              {MenuLinks.map((item) => (
                <NavItem key={item.key}>
                  <Link href={item.url} passHref>
                    <NavLink pathName={router.pathname}>{item.label}</NavLink>
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
          </>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
