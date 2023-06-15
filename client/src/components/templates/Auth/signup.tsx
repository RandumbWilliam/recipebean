import SignUpImage from "@assets/SignUpImage.png";
import ErrorMessage from "@components/elements/ErrorMessage";
import Icon from "@components/elements/Icon";
import Input from "@components/elements/Input";
import TextButton from "@components/elements/TextButton";
import { FieldError, useRegisterMutation } from "@generated/graphql";
import { Avatars } from "@utils/avatars/avatars";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  AuthButtons,
  AuthCard,
  AuthContentContainer,
  AuthForm,
  AuthGoogleButton,
  AuthGoogleButtonText,
  AuthHeader,
  AuthImageContainer,
  AuthImageText,
  AuthSubmitButton,
  AuthText,
  AuthTitle,
  TextDivider,
} from "./styles";

const initialForm = {
  email: "",
  password: "",
  fullName: "",
  avatarId: "",
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
    const random = Math.floor(Math.random() * Avatars.length);
    let updatedFormData = { ...formData, avatarId: Avatars[random].id };
    const response = await register({ input: updatedFormData });
    if (response.data?.register.errors) {
      setErrors(response.data.register.errors);
    } else if (response.data?.register.user) {
      router.push("/cookbooks");
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google Log In");
  };

  return (
    <>
      <AuthImageContainer>
        <Image src={SignUpImage} alt="Sign Up Image" />
        <AuthImageText>
          Sign up to save your recipes, <br />
          ingredients, and many more!
        </AuthImageText>
      </AuthImageContainer>
      <AuthContentContainer>
        <AuthCard>
          <AuthHeader>
            <AuthTitle>Create Account</AuthTitle>
            <AuthText>
              Already have an account?{" "}
              <Link href="/login">
                <a>
                  <TextButton>Log In</TextButton>
                </a>
              </Link>
            </AuthText>
          </AuthHeader>
          <AuthForm noValidate onSubmit={handleSubmit}>
            <Input
              type="text"
              name="fullName"
              label="Full Name"
              placeholder="Full Name"
              error={errors.some((error) => error.field === "fullName")}
              onChange={handleChange}
            />
            {errors.some((error) => error.field === "fullName") && (
              <ErrorMessage
                message={
                  errors.find((error) => error.field === "fullName")?.message
                }
              />
            )}
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
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="At least 8 characters"
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
            <AuthButtons>
              <AuthSubmitButton type="submit">Create Account</AuthSubmitButton>
              <TextDivider>or</TextDivider>
              <AuthGoogleButton primary={false} onClick={handleGoogleSignup}>
                <AuthGoogleButtonText>
                  <Icon name="Google" size={22} />
                  Sign up with Google
                </AuthGoogleButtonText>
              </AuthGoogleButton>
            </AuthButtons>
          </AuthForm>
        </AuthCard>
      </AuthContentContainer>
    </>
  );
};

export default SignupTemplate;
