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
import { FieldError } from "@generated/graphql";
import ErrorMessage from "@components/elements/ErrorMessage";

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
  const [errors, setErrors] = useState<FieldError[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(errors.filter((error) => error.field !== e.target.name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await register({ input: formData });
    if (response.data?.register.errors) {
      setErrors(response.data.register.errors);
    } else if (response.data?.register.user) {
      router.push("/cookbooks");
    }
  };

  return (
    <AuthSection>
      <StyledContainer>
        <AuthTitle>Create Account</AuthTitle>
        <AuthCard noValidate onSubmit={handleSubmit}>
          <Grid container direction="column" rowSpacing={3}>
            <Grid item xs>
              <Grid container direction="row" columnSpacing={2}>
                <Grid item md={6}>
                  <Input
                    type="text"
                    name="firstName"
                    label="First Name"
                    placeholder="First Name"
                    error={errors.some((error) => error.field === "firstName")}
                    onChange={handleChange}
                  />
                  {errors.some((error) => error.field === "firstName") && (
                    <ErrorMessage
                      message={
                        errors.find((error) => error.field === "firstName")
                          ?.message
                      }
                    />
                  )}
                </Grid>
                <Grid item md={6}>
                  <Input
                    type="text"
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                    error={errors.some((error) => error.field === "lastName")}
                    onChange={handleChange}
                  />
                  {errors.some((error) => error.field === "lastName") && (
                    <ErrorMessage
                      message={
                        errors.find((error) => error.field === "lastName")
                          ?.message
                      }
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="example@hotmail.com"
                error={errors.some((error) => error.field === "email")}
                onChange={handleChange}
              />
              {errors.some((error) => error.field === "email") && (
                <ErrorMessage
                  message={
                    errors.find((error) => error.field === "email")?.message
                  }
                />
              )}
            </Grid>
            <Grid item>
              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="at least 8 characters"
                error={errors.some((error) => error.field === "password")}
                onChange={handleChange}
              />
              {errors.some((error) => error.field === "password") && (
                <ErrorMessage
                  message={
                    errors.find((error) => error.field === "password")?.message
                  }
                />
              )}
            </Grid>
            <Grid display="flex" item justifyContent="center">
              <SubmitButton type="submit">Sign Up</SubmitButton>
            </Grid>
          </Grid>
        </AuthCard>
      </StyledContainer>
    </AuthSection>
  );
};

export default SignupTemplate;
