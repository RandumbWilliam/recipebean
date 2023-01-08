import { Grid } from "@mui/material";
import React from "react";
import { useMyUserQuery } from "../../../../generated/graphql";
import {
  HeroSection,
  StyledContainer,
  HeroTitle,
  HeroParagraph,
} from "./styles";

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <HeroSection>
      <StyledContainer>
        <Grid container>
          <Grid item>
            <HeroTitle>
              The Ultimate
              <br />
              Cookbook!
            </HeroTitle>
            <HeroParagraph>
              The all-in-one app for recipe saving,
              <br />
              meal planning, and grocery lists.
            </HeroParagraph>
          </Grid>
        </Grid>
      </StyledContainer>
    </HeroSection>
  );
};

export default Hero;
