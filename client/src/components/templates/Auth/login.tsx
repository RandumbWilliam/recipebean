import LoginImage from "@assets/LoginImage.png";
import Checkbox from "@components/elements/Checkbox";
import Icon from "@components/elements/Icon";
import Input from "@components/elements/Input";
import TextButton from "@components/elements/TextButton";
import { FieldError, useLoginMutation } from "@generated/graphql";
import Image from "next/image";
import Link from "next/link";
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
    console.log(formData);
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
              <Link href="/register">
                <a>
                  <TextButton>Sign up here</TextButton>
                </a>
              </Link>
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
                <Link href="/">
                  <a>
                    <TextButton>Forgot Password?</TextButton>
                  </a>
                </Link>
              </LoginActions>
            </LoginPasswordContainer>
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
          </AuthForm>
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
