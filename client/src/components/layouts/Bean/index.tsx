import React from "react";
import Head from "next/head";
import Sidebar from "../../modules/Sidebar";
import { BeanContainer, BeanMain } from "./styles";

interface BeanProps {
  children: React.ReactNode;
}

const BeanLayout: React.FC<BeanProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Recipebean | My App</title>
      </Head>
      <BeanContainer>
        <Sidebar />
        <BeanMain>
          <div>{children}</div>
        </BeanMain>
      </BeanContainer>
    </>
  );
};

export default BeanLayout;
