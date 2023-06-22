import { PRIMARY_COLOUR } from "@styles/base/colours";
import React from "react";
import { Spinner, SpinnerFragment } from "./styles";

interface LoaderProps {
  color?: string;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({
  color = PRIMARY_COLOUR,
  size = 64,
}) => {
  return (
    <Spinner color={color} size={size}>
      <SpinnerFragment color={color} size={size} />
      <SpinnerFragment color={color} size={size} />
      <SpinnerFragment color={color} size={size} />
      <SpinnerFragment color={color} size={size} />
    </Spinner>
  );
};

export default Loader;
