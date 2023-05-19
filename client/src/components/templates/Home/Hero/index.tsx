import { Grid } from "@mui/material";
import React from "react";
import { HeroContainer, HeroParagraph, HeroSection, HeroTitle } from "./styles";

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <HeroSection>
      <HeroContainer>
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
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;
