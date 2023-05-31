import React from "react";
import { StyledTextButton } from "./styles";

interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: any) => void;
}

const TextButton: React.FC<TextButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <StyledTextButton className={className} onClick={onClick}>
      {children}
    </StyledTextButton>
  );
};

export default TextButton;
