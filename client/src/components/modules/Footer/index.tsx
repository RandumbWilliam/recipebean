import React, { useEffect, useState } from "react";
import {
  FooterContainer,
  FooterCopyright,
  FooterLogo,
  StyledContainer,
} from "./styles";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY >= 65) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <FooterContainer>
      <StyledContainer>
        <FooterLogo />
        <FooterCopyright>
          © 2022 RecipeBean. All rights reserved.
        </FooterCopyright>
      </StyledContainer>
    </FooterContainer>
  );
};

export default Footer;
