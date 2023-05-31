import { Container } from "@mui/material";
import styled from "styled-components";

export const HeroContainer = styled(Container)`
  &&& {
    display: flex;
    align-items: center;
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
