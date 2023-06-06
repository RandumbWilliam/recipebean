import Head from "next/head";
import React from "react";
import Navbar from "../../modules/Navbar";
import { AlternateBackground, Section } from "./styles";

interface BaseLayoutProps {
  children: React.ReactNode;
  alternate?: boolean;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, alternate }) => {
  return (
    <>
      <Head>
        <title>Recipebean</title>
      </Head>
      <Navbar alternate={alternate} />
      <Section>{children}</Section>
      {alternate && <AlternateBackground />}
    </>
  );
};

export default BaseLayout;
