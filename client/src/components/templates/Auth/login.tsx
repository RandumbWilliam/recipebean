import Icon from "@components/elements/Icon";
import Input from "@components/elements/Input";
import { FieldError, useLoginMutation } from "@generated/graphql";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  AuthCard,
  AuthSection,
  AuthTitle,
  ErrorText,
  StyledContainer,
  SubmitButton,
} from "./styles";

const initialForm = {
  email: "",
  password: "",
};

const LoginTemplate: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<FieldError[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login(formData);
    if (response.data?.login.errors) {
      setErrors(response.data.login.errors);
    } else if (response.data?.login.user) {
      router.push("/cookbooks");
    }
    // if (response.data?.login) {
    //   router.push("/cookbooks");
    // } else {
    //   console.log("ERROR");
    // }
  };

  return (
    <AuthSection>
      <StyledContainer>
        <AuthTitle>Log In</AuthTitle>
        <AuthCard noValidate onSubmit={handleSubmit}>
          <Grid container direction="column" rowSpacing={3}>
            <Grid item>
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                onChange={handleChange}
                error={errors.some((error) => error.field === "email")}
              />
            </Grid>
            <Grid item>
              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Password"
                onChange={handleChange}
                error={errors.some((error) => error.field === "password")}
              />
            </Grid>
            <Grid display="flex" item justifyContent="center">
              <SubmitButton type="submit" pill={true}>
                Log In
              </SubmitButton>
            </Grid>
            {errors && (
              <Grid display="flex" item justifyContent="center">
                {errors.map((error) => (
                  <ErrorText key={error.field}>
                    <Icon name="Error" color="#ff0033" />{" "}
                    <span>{error?.message}</span>
                  </ErrorText>
                ))}
              </Grid>
            )}
          </Grid>
        </AuthCard>
      </StyledContainer>
    </AuthSection>
  );
};

export default LoginTemplate;
