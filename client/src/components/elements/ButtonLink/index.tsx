import Link from "next/link";
import React from "react";
import { StyledButtonLink } from "./styles";

interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: any;
  className?: string;
  link: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  className,
  link,
}) => {
  return (
    <Link href={link}>
      <StyledButtonLink className={className}>{children}</StyledButtonLink>
    </Link>
  );
};

export default ButtonLink;
