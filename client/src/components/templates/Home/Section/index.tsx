import { Grid } from "@mui/material";
import React from "react";
import {
  SectionContainer,
  SectionParagraph,
  SectionSection,
  SectionTitle,
} from "./styles";

interface SectionProps {
  align?: "left" | "right";
  backgroundColor?: "white" | "grey";
  title: string;
  paragraph: string;
}

const Left: React.FC<SectionProps> = ({ title, paragraph }) => {
  return (
    <>
      <Grid item md={6}>
        <SectionTitle>{title}</SectionTitle>
        <SectionParagraph>{paragraph}</SectionParagraph>
      </Grid>
      <Grid item md={6}>
        <p>IMAGE</p>
      </Grid>
    </>
  );
};

const Right: React.FC<SectionProps> = ({ title, paragraph }) => {
  return (
    <>
      <Grid item md={6}>
        <p>IMAGE</p>
      </Grid>
      <Grid item md={6}>
        <SectionTitle>{title}</SectionTitle>
        <SectionParagraph>{paragraph}</SectionParagraph>
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

const Section: React.FC<SectionProps> = ({
  align = "left",
  backgroundColor = "white",
  title,
  paragraph,
}) => {
  return (
    <SectionSection backgroundColor={backgroundColor}>
      <SectionContainer>
        <Grid container>{render(title, paragraph)[align]}</Grid>
      </SectionContainer>
    </SectionSection>
  );
};

export default Section;
