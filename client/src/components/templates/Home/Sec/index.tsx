import { Grid } from "@mui/material";
import React from "react";
import { SecSection, StyledContainer, SecTitle, SecParagraph } from "./styles";

interface SecProps {
  align?: "left" | "right";
  backgroundColor?: "white" | "grey";
  title: string;
  paragraph: string;
}

const Left: React.FC<SecProps> = ({ title, paragraph }) => {
  return (
    <>
      <Grid item md={6}>
        <SecTitle>{title}</SecTitle>
        <SecParagraph>{paragraph}</SecParagraph>
      </Grid>
      <Grid item md={6}>
        <p>IMAGE</p>
      </Grid>
    </>
  );
};

const Right: React.FC<SecProps> = ({ title, paragraph }) => {
  return (
    <>
      <Grid item md={6}>
        <p>IMAGE</p>
      </Grid>
      <Grid item md={6}>
        <SecTitle>{title}</SecTitle>
        <SecParagraph>{paragraph}</SecParagraph>
      </Grid>
    </>
  );
};

const render = (title: string, paragraph: string) => {
  return {
    left: <Left title={title} paragraph={paragraph} />,
    right: <Right title={title} paragraph={paragraph} />,
  };
};

const Sec: React.FC<SecProps> = ({
  align = "left",
  backgroundColor = "white",
  title,
  paragraph,
}) => {
  return (
    <SecSection backgroundColor={backgroundColor}>
      <StyledContainer>
        <Grid container>{render(title, paragraph)[align]}</Grid>
      </StyledContainer>
    </SecSection>
  );
};

export default Sec;
