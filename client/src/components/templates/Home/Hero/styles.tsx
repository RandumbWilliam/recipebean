import { Container } from "@mui/material";
import styled from "styled-components";

export const HeroSection = styled.section`
  position: relative;
  height: 768px;

  &:after {
    content: "";
    position: absolute;
    height: 670px;
    width: 830px;
    right: 0;
    bottom: 0;
    background-color: #292929;
    clip-path: polygon(100% 0, 0 100%, 100% 100%);
  }
`;

export const StyledContainer = styled(Container)`
  &&& {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

export const HeroTitle = styled.h1`
  font-weight: 700;
  font-size: 72px;
  margin: 0;
`;

export const HeroParagraph = styled.p`
  font-size: 24px;
`;
