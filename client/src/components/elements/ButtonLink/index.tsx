import React from "react";
import { StyledButton } from "./styles";

interface ButtonLinkProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: any;
  className?: string;
  color?: string;
  disabled?: boolean;
  onClick?: any;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  className,
  type = "button",
  color = "#ff596d",
  disabled = false,
  onClick,
}) => {
  return (
    <StyledButton
      className={className}
      type={type}
      color={color}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default ButtonLink;
