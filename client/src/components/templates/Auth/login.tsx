import React, { useState } from "react";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import Input from "@components/elements/Input";
import {
  AuthCard,
  AuthSection,
  AuthTitle,
  StyledContainer,
  SubmitButton,
} from "./styles";
import { useLoginMutation } from "@generated/graphql";

const initialForm = {
  email: "",
  password: "",
};

const LoginTemplate: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login(formData);
    if (response.data?.login) {
      router.push("/cookbooks");
    } else {
      console.log("ERROR");
    }
  };

  return (
    <AuthSection>
      <StyledContainer>
        <AuthTitle>Log In</AuthTitle>
        <AuthCard onSubmit={handleSubmit}>
          <Grid container direction="column" rowSpacing={3}>
            <Grid item>
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Password"
                onChange={handleChange}
              />
            </Grid>
            <Grid display="flex" item justifyContent="center">
              <SubmitButton type="submit" pill={true}>
                Log In
              </SubmitButton>
            </Grid>
          </Grid>
        </AuthCard>
      </StyledContainer>
    </AuthSection>
  );
};

export default LoginTemplate;
