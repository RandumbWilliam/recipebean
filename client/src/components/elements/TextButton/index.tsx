import React from "react";
import { StyledTextButton } from "./styles";

interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: any) => void;
  disabled?: boolean;
}

const TextButton: React.FC<TextButtonProps> = ({
  children,
  className,
  onClick,
  disabled = false,
}) => {
  return (
    <StyledTextButton
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledTextButton>
  );
};

export default TextButton;
