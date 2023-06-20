import Profile from "@components/elements/Profile";
import SearchField from "@components/elements/SearchField";
import { useMyUserQuery } from "@generated/graphql";
import { BREAKPOINT_TABLET } from "@styles/base/breakpoints";
import { PRIMARY_COLOUR, WHITE_COLOUR } from "@styles/base/colours";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  AuthNavContainer,
  Nav,
  NavLogo,
  NavLogoLink,
  NavMenu,
  NavbarContainer,
  SearchContainer,
} from "./styles";

interface NavbarProps {
  alternate?: boolean;
  scrolled?: boolean;
}

const AuthenticatedLinks = [
  { key: "cookbooks", label: "My Cookbooks", url: "/cookbooks" },
  { key: "ingredients", label: "My Ingredients", url: "/" },
  { key: "planner", label: "Planner", url: "/" },
];

const AuthNav: React.FC<NavbarProps> = ({ alternate, scrolled }) => {
  const router = useRouter();
  const isMobile = useMediaQuery(`(min-width: ${BREAKPOINT_TABLET})`);
  const [searchValue, setSearchValue] = useState("");
  const [{ data, fetching }] = useMyUserQuery();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue !== "") {
      router.push(`/search?query=${searchValue}`);
      setSearchValue("");
    }
  };

  return (
    <Nav scrolled={scrolled} alternate={alternate}>
      <NavbarContainer scrolled={scrolled}>
        <AuthNavContainer>
          <Link href="/cookbooks" passHref>
            <NavLogoLink>
              <NavLogo
                scrolled={scrolled}
                color={alternate && !scrolled ? WHITE_COLOUR : PRIMARY_COLOUR}
              />
            </NavLogoLink>
          </Link>
          {/* <NavMenu alternate={alternate} scrolled={scrolled}>
                {AuthenticatedLinks.map((item) => (
                  <NavItem key={item.key}>
                    <Link href={item.url} passHref>
                      <NavLink pathName={router.pathname}>{item.label}</NavLink>
                    </Link>
                  </NavItem>
                ))}
              </NavMenu> */}
        </AuthNavContainer>
        <AuthNavContainer>
          {isMobile && (
            <SearchContainer>
              <form onSubmit={handleSubmit}>
                <SearchField
                  alternate={alternate && !scrolled}
                  value={searchValue}
                  onChange={handleSearch}
                />
              </form>
            </SearchContainer>
          )}
          <Profile user={data?.myUser} fetching={fetching} />
        </AuthNavContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default AuthNav;
