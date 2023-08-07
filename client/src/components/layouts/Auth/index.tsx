import { BREAKPOINT_LAPTOP } from "@styles/base/breakpoints";
import { PRIMARY_COLOUR, WHITE_COLOUR } from "@styles/base/colours";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { AuthSection, NavLogo, NavLogoContainer, NavLogoLink } from "./styles";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const isMobile = useMediaQuery(`(min-width: ${BREAKPOINT_LAPTOP})`);

  return (
    <>
      <Head>
        <title>Recipebean</title>
      </Head>
      <NavLogoContainer>
        <Link href="/">
          <NavLogoLink>
            <NavLogo color={isMobile ? WHITE_COLOUR : PRIMARY_COLOUR} />
          </NavLogoLink>
        </Link>
      </NavLogoContainer>
      <AuthSection>{children}</AuthSection>
    </>
  );
};

export default AuthLayout;
