import React from "react";
import { AuthCard, AuthSection, AuthTitle, StyledContainer } from "./styles";

interface AuthProps {
  children: any;
  title: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Auth: React.FC<AuthProps> = ({ children, title, onSubmit }) => {
  return (
    <AuthSection>
      <StyledContainer>
        <AuthTitle>{title}</AuthTitle>
        <AuthCard onSubmit={onSubmit}>{children}</AuthCard>
      </StyledContainer>
    </AuthSection>
  );
};

export default Auth;
