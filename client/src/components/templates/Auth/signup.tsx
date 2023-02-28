import React, { useState } from "react";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import Button from "@components/elements/Button";
import Input from "@components/elements/Input";
import {
  AuthCard,
  AuthSection,
  AuthTitle,
  StyledContainer,
  SubmitButton,
} from "./styles";
import { useRegisterMutation } from "@generated/graphql";

const initialForm = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

const SignupTemplate: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await register({ input: formData });
    if (response.data?.register) {
      router.push("/cookbooks");
    } else {
      console.log("ERROR");
    }
  };

  return (
    <AuthSection>
      <StyledContainer>
        <AuthTitle>Sign Up</AuthTitle>
        <AuthCard onSubmit={handleSubmit}>
          <Grid container direction="column" rowSpacing={2}>
            <Grid item xs>
              <Grid container direction="row" columnSpacing={2}>
                <Grid item md={6}>
                  <Input
                    type="text"
                    name="firstName"
                    label="First Name"
                    placeholder="First Name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <Input
                    type="text"
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="example@hotmail.com"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="at least 8 characters"
                onChange={handleChange}
              />
            </Grid>
            <Grid display="flex" item justifyContent="center">
              <SubmitButton type="submit" pill={true}>
                Sign Up
              </SubmitButton>
            </Grid>
          </Grid>
        </AuthCard>
      </StyledContainer>
    </AuthSection>
  );
};

export default SignupTemplate;
