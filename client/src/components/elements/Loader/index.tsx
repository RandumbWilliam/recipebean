import React from "react";
import { Spinner, SpinnerFragment } from "./styles";

const Loader = () => {
  return (
    <Spinner>
      <SpinnerFragment />
      <SpinnerFragment />
      <SpinnerFragment />
      <SpinnerFragment />
    </Spinner>
  );
};

export default Loader;
