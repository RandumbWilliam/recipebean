import { PRIMARY_COLOUR } from "@styles/base/colours";
import React from "react";
import Icon, { Icons } from "../Icon";
import { StyledIconButton } from "./styles";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  name: keyof typeof Icons;
  size?: number;
  onClick?: (event: any) => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  className,
  onClick,
  name,
  size,
}) => {
  return (
    <StyledIconButton className={className} onClick={onClick}>
      <Icon name={name} size={size} color={PRIMARY_COLOUR} />
    </StyledIconButton>
  );
};

export default IconButton;
