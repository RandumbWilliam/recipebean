import { Container } from "@mui/material";
import styled from "styled-components";

export const HeroSection = styled.section`
  position: relative;
`;

export const HeroContainer = styled(Container)`
  &&& {
    display: flex;
    align-items: center;
    margin-top: 200px;
  }
`;

export const HeroTitle = styled.h1``;

export const HeroParagraph = styled.p`
  margin: 32px 0;
`;

export const HeroButtonText = styled.span`
  display: flex;
  align-items: center;
`;
