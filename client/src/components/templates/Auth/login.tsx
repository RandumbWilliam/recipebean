import LoginImage from "@assets/LoginImage.png";
import ButtonLink from "@components/elements/ButtonLink";
import Checkbox from "@components/elements/Checkbox";
import Icon from "@components/elements/Icon";
import Input from "@components/elements/Input";
import { FieldError, useLoginMutation } from "@generated/graphql";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  AuthButtons,
  AuthCard,
  AuthContentContainer,
  AuthErrorText,
  AuthForm,
  AuthGoogleButton,
  AuthGoogleButtonText,
  AuthHeader,
  AuthImageContainer,
  AuthImageText,
  AuthSubmitButton,
  AuthText,
  AuthTitle,
  LoginActions,
  LoginPasswordContainer,
  TextDivider,
} from "./styles";

const initialForm = {
  email: "",
  password: "",
};

const LoginTemplate: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [rememberPassword, setRememberPassword] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<FieldError[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(errors.filter((error) => error.field !== e.target.name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login(formData);
    if (response.data?.login.errors) {
      setErrors(response.data.login.errors);
    } else if (response.data?.login.user) {
      router.push("/cookbooks");
    }
  };

  return (
    <>
      <AuthImageContainer>
        <Image src={LoginImage} alt="Login Image" />
        <AuthImageText>Welcome Back!</AuthImageText>
      </AuthImageContainer>
      <AuthContentContainer>
        <AuthCard>
          <AuthHeader>
            <AuthTitle>Welcome back!</AuthTitle>
            <AuthText>
              {`Don't have an account? `}
              <ButtonLink link="/register">Sign up here</ButtonLink>
            </AuthText>
          </AuthHeader>
          <AuthForm noValidate onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email"
              onChange={handleChange}
              error={errors.some((error) => error.field === "email")}
            />
            <LoginPasswordContainer>
              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Password"
                onChange={handleChange}
                error={errors.some((error) => error.field === "password")}
              />
              <LoginActions>
                <Checkbox
                  isChecked={rememberPassword}
                  onChange={() => setRememberPassword(!rememberPassword)}
                  label="Remember Me"
                />
                <ButtonLink link="/">Forgot Password?</ButtonLink>
              </LoginActions>
            </LoginPasswordContainer>
          </AuthForm>
          <AuthButtons>
            <AuthSubmitButton type="submit">Log In</AuthSubmitButton>
            <TextDivider>or</TextDivider>
            <AuthGoogleButton primary={false}>
              <AuthGoogleButtonText>
                <Icon name="Google" size={22} />
                Continue with Google
              </AuthGoogleButtonText>
            </AuthGoogleButton>
          </AuthButtons>
          {errors && (
            <div>
              {errors.map((error) => (
                <AuthErrorText key={error.field}>
                  <Icon name="Error" color="#ff0033" />{" "}
                  <span>{error?.message}</span>
                </AuthErrorText>
              ))}
            </div>
          )}
        </AuthCard>
      </AuthContentContainer>
    </>
  );
};

export default LoginTemplate;
