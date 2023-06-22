import { WHITE_COLOUR } from "@styles/base/colours";
import React from "react";
import Loader from "../Loader";
import { StyledButton } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: any;
  className?: string;
  primary?: boolean;
  pill?: boolean;
  disabled?: boolean;
  onClick?: any;
  fetching?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type = "button",
  primary = true,
  disabled = false,
  onClick,
  fetching = false,
}) => {
  return (
    <StyledButton
      className={className}
      type={type}
      primary={primary}
      disabled={disabled}
      onClick={fetching ? () => {} : onClick}
    >
      {fetching ? <Loader color={WHITE_COLOUR} size={18} /> : <>{children}</>}
    </StyledButton>
  );
};

export default Button;
