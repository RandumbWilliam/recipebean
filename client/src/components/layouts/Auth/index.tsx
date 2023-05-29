import { WHITE_COLOUR } from "@styles/base/colours";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { AuthSection, NavLogo, NavLogoContainer, NavLogoLink } from "./styles";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Recipebean | Authentication</title>
      </Head>
      <NavLogoContainer>
        <Link href="/">
          <NavLogoLink>
            <NavLogo color={WHITE_COLOUR} />
          </NavLogoLink>
        </Link>
      </NavLogoContainer>
      <AuthSection>{children}</AuthSection>
    </>
  );
};

export default AuthLayout;
