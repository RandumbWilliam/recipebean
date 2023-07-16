import LoginImage from "@assets/LoginImage.png";
import Checkbox from "@components/elements/Checkbox";
import Icon from "@components/elements/Icon";
import IconButton from "@components/elements/IconButton";
import Input from "@components/elements/Input";
import TextButton from "@components/elements/TextButton";
import { FieldError, useLoginMutation } from "@generated/graphql";
import { ERROR_COLOUR } from "@styles/base/colours";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  AuthButtons,
  AuthCard,
  AuthContentContainer,
  AuthErrorContainer,
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
  const [{ fetching }, login] = useLoginMutation();
  const [rememberPassword, setRememberPassword] = useState(false);
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
      setFormData({ ...formData, password: "" });
    } else if (response.data?.login.user) {
      router.push("/cookbooks");
    }
  };

  const handleErrorMessage = () => {
    setErrors([]);
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
          {errors && (
            <>
              {errors.map((error) => (
                <AuthErrorContainer key={error.field}>
                  <AuthErrorText>
                    <Icon name="Error" color={ERROR_COLOUR} />{" "}
                    <span>Invalid email or password.</span>
                  </AuthErrorText>
                  <IconButton
                    name="Cross"
                    color={ERROR_COLOUR}
                    size={12}
                    onClick={handleErrorMessage}
                  />
                </AuthErrorContainer>
              ))}
            </>
          )}
          <AuthForm noValidate onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
            <LoginPasswordContainer>
              <Input
                type="password"
                name="password"
                label="Password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
              />
              <LoginActions>
                <Checkbox
                  isChecked={rememberPassword}
                  onChange={() => setRememberPassword(!rememberPassword)}
                  label="Remember Me"
                />
                <TextButton type="button">Forgot Password?</TextButton>
              </LoginActions>
            </LoginPasswordContainer>
            <AuthButtons>
              <AuthSubmitButton
                type="submit"
                fetching={fetching}
                disabled={formData.email === "" || formData.password === ""}
              >
                Log In
              </AuthSubmitButton>
              <TextDivider>or</TextDivider>
              <AuthGoogleButton primary={false}>
                <AuthGoogleButtonText>
                  <Icon name="Google" size={22} />
                  Continue with Google
                </AuthGoogleButtonText>
              </AuthGoogleButton>
            </AuthButtons>
          </AuthForm>
        </AuthCard>
      </AuthContentContainer>
    </>
  );
};

export default LoginTemplate;
