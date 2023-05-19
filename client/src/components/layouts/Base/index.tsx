import Head from "next/head";
import React from "react";
import Footer from "../../modules/Footer";
import Navbar from "../../modules/Navbar";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Recipebean</title>
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default BaseLayout;
