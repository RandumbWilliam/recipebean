import Navbar from "@components/modules/Navbar";
import Head from "next/head";
import React from "react";
import { AuthSection } from "./styles";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Recipebean | Authentication</title>
      </Head>
      <Navbar />
      <AuthSection>{children}</AuthSection>
    </>
  );
};

export default AuthLayout;
