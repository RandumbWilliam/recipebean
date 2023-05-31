import HeroImage from "@assets/Hero.png";
import Button from "@components/elements/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  HeroButtonText,
  HeroContainer,
  HeroParagraph,
  HeroTitle,
} from "./styles";

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <HeroContainer>
      <Grid container spacing={12}>
        <Grid
          item
          display="flex"
          direction="column"
          justifyContent="center"
          lg={5}
        >
          <HeroTitle>
            The Ultimate
            <br />
            Cooking App
          </HeroTitle>
          <HeroParagraph>
            Meet the all-in-one cookbook app for recipe saving,
            <br />
            meal planning, grocery shopping, and dietary details.
          </HeroParagraph>
          <Link href="/register">
            <a>
              <Button>
                <HeroButtonText>
                  Get Started <ChevronRightIcon fontSize="large" />
                </HeroButtonText>
              </Button>
            </a>
          </Link>
        </Grid>
        <Grid item lg={7}>
          <Image src={HeroImage} alt="Hero Image" />
        </Grid>
      </Grid>
    </HeroContainer>
  );
};

export default Hero;
