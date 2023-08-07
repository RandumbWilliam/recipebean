import { PRIMARY_COLOUR } from "@styles/base/colours";
import React from "react";
import { StyledTextButton } from "./styles";

interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: any) => void;
  disabled?: boolean;
  color?: string;
}

const TextButton: React.FC<TextButtonProps> = ({
  children,
  className,
  onClick,
  disabled = false,
  color = PRIMARY_COLOUR,
  type,
}) => {
  return (
    <StyledTextButton
      className={className}
      onClick={onClick}
      disabled={disabled}
      color={color}
      type={type}
    >
      {children}
    </StyledTextButton>
  );
};

export default TextButton;
