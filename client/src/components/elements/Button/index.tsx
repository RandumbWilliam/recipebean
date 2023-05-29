import React from "react";
import { StyledButton } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: any;
  className?: string;
  primary?: boolean;
  pill?: boolean;
  disabled?: boolean;
  onClick?: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type = "button",
  primary = true,
  disabled = false,
  onClick,
}) => {
  return (
    <StyledButton
      className={className}
      type={type}
      primary={primary}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
