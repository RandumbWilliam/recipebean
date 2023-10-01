import SignUpImage from "@assets/SignUpImage.png";
import ErrorMessage from "@components/elements/ErrorMessage";
import Icon from "@components/elements/Icon";
import IconButton from "@components/elements/IconButton";
import Input from "@components/elements/Input";
import TextButton from "@components/elements/TextButton";
import {
  FieldError,
  useGoogleOAuthRequestMutation,
  useRegisterMutation,
} from "@generated/graphql";
import { ERROR_COLOUR } from "@styles/base/colours";
import { Avatars } from "@utils/avatars/avatars";
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
  const [{ fetching }, register] = useRegisterMutation();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [{}, googleAuth] = useGoogleOAuthRequestMutation();

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

  const handleErrorMessage = () => {
    setErrors([]);
  };

  const handleGoogleAuth = async () => {
    const { data } = await googleAuth();
    const url = data!.googleOAuthRequest;
    window.location.href = url;
  };

  return (
    <>
      <AuthImageContainer>
        <Image src={SignUpImage} alt="Sign Up Image" />
        <AuthImageText>
          Sign up to save your recipes, ingredients, and many more!
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
          {errors.length > 0 && (
            <AuthErrorContainer key={errors[0].field}>
              <AuthErrorText>
                <Icon name="Error" color={ERROR_COLOUR} />{" "}
                <span>{errors[0].message}</span>
              </AuthErrorText>
              <IconButton
                name="Cross"
                color={ERROR_COLOUR}
                size={12}
                onClick={handleErrorMessage}
              />
            </AuthErrorContainer>
          )}
          <AuthForm noValidate onSubmit={handleSubmit}>
            <Input
              type="text"
              name="fullName"
              label="Full Name"
              placeholder="Full Name"
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="example@hotmail.com"
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="At least 8 characters"
              onChange={handleChange}
            />
            <AuthButtons>
              <AuthSubmitButton
                type="submit"
                fetching={fetching}
                disabled={
                  formData.fullName === "" ||
                  formData.email === "" ||
                  formData.password === ""
                }
              >
                Create Account
              </AuthSubmitButton>
              <TextDivider>or</TextDivider>
              <AuthGoogleButton primary={false} onClick={handleGoogleAuth}>
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

export default SignupTemplate;
