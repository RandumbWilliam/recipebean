import React from "react";
import Loader from "../../elements/Loader";
import { Background, StyledLogo } from "./styles";

const Load = () => {
  return (
    <Background>
      <Loader />
      <StyledLogo />
    </Background>
  );
};

export default Load;
