import { PRIMARY_COLOUR } from "@styles/base/colours";
import React from "react";
import Icon, { Icons } from "../Icon";
import { StyledIconButton } from "./styles";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  name: keyof typeof Icons;
  size?: number;
  color?: string;
  onClick?: (event: any) => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  className,
  onClick,
  name,
  size,
  color = PRIMARY_COLOUR,
}) => {
  return (
    <StyledIconButton className={className} onClick={onClick}>
      <Icon name={name} size={size} color={color} />
    </StyledIconButton>
  );
};

export default IconButton;
