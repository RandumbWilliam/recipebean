import React from "react";
import {
  StyledContainer,
  Header,
  SectionTitle,
  SectionActions,
} from "./styles";

interface SectionProps {
  header: string;
  children: JSX.Element | null;
  actions?: JSX.Element | null;
}

const Section: React.FC<SectionProps> = ({ header, children, actions }) => {
  return (
    <StyledContainer>
      <Header>
        <SectionTitle>{header}</SectionTitle>
        {actions && <SectionActions>{actions}</SectionActions>}
      </Header>
      {children}
    </StyledContainer>
  );
};

export default Section;
