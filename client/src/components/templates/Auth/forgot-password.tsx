import LoginImage from "@assets/LoginImage.png";
import Icon from "@components/elements/Icon";
import IconButton from "@components/elements/IconButton";
import Input from "@components/elements/Input";
import TextButton from "@components/elements/TextButton";
import { FieldError, useForgotPasswordMutation } from "@generated/graphql";
import { ERROR_COLOUR } from "@styles/base/colours";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  AuthActions,
  AuthButtons,
  AuthCard,
  AuthContentContainer,
  AuthErrorContainer,
  AuthErrorText,
  AuthForm,
  AuthHeader,
  AuthImageContainer,
  AuthImageText,
  AuthSubmitButton,
  AuthText,
  AuthTitle,
  LoginPasswordContainer,
} from "./styles";

const initialForm = {
  email: "",
};

const ForgotPasswordTemplate: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [{ fetching }, forgotPassword] = useForgotPasswordMutation();
  const [checkEmail, setCheckEmail] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<FieldError[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await forgotPassword(formData);
    if (response.data?.forgotPassword) {
      console.log("EMAIL SENT");
    }
  };

  const handleErrorMessage = () => {
    setErrors([]);
  };

  return (
    <>
      <AuthImageContainer>
        <Image src={LoginImage} alt="Login Image" />
        <AuthImageText>Forgot password?</AuthImageText>
      </AuthImageContainer>
      <AuthContentContainer>
        {checkEmail ? (
          <AuthCard>
            <AuthHeader>
              <AuthTitle>Check Your Email</AuthTitle>
              <AuthText>
                Please check the email address {formData.email} for instructions
                to reset your password
              </AuthText>
            </AuthHeader>
            <AuthForm noValidate onSubmit={() => setCheckEmail(false)}>
              <AuthButtons>
                <AuthSubmitButton type="submit">Resend email</AuthSubmitButton>
              </AuthButtons>
              <AuthActions>
                <TextButton type="button" onClick={() => router.push("/login")}>
                  Back to login
                </TextButton>
              </AuthActions>
            </AuthForm>
          </AuthCard>
        ) : (
          <AuthCard>
            <AuthHeader>
              <AuthTitle>Password Reset</AuthTitle>
              <AuthText>
                Enter your email and we will send you a reset link.
              </AuthText>
            </AuthHeader>
            {errors && (
              <>
                {errors.map((error) => (
                  <AuthErrorContainer key={error.field}>
                    <AuthErrorText>
                      <Icon name="Error" color={ERROR_COLOUR} />{" "}
                      <span>Passwords do not match.</span>
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
            <AuthForm
              noValidate
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                setCheckEmail(true);
                handleSubmit(e);
              }}
            >
              <LoginPasswordContainer>
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  value={formData.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </LoginPasswordContainer>
              <AuthButtons>
                <AuthSubmitButton
                  type="submit"
                  fetching={fetching}
                  disabled={formData.email === ""}
                >
                  Reset Password
                </AuthSubmitButton>
              </AuthButtons>
              <AuthActions>
                <TextButton type="button" onClick={() => router.push("/login")}>
                  Back to login
                </TextButton>
              </AuthActions>
            </AuthForm>
          </AuthCard>
        )}
      </AuthContentContainer>
    </>
  );
};

export default ForgotPasswordTemplate;
