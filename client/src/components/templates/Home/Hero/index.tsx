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
      <Grid container spacing={{ xs: 6, sm: 2, md: 6, lg: 12 }}>
        <Grid
          item
          display="flex"
          direction="column"
          justifyContent="center"
          sx={{
            alignItems: { xs: "center", sm: "flex-start" },
            textAlign: { xs: "center", sm: "left" },
          }}
          sm={5}
        >
          <HeroTitle>The Ultimate Cooking App</HeroTitle>
          <HeroParagraph>
            Meet the all-in-one cookbook app for recipe saving, meal planning,
            grocery shopping, and dietary details.
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
        <Grid
          item
          display="flex"
          direction="column"
          justifyContent="center"
          sm={7}
        >
          <Image src={HeroImage} alt="Hero Image" />
        </Grid>
      </Grid>
    </HeroContainer>
  );
};

export default Hero;
