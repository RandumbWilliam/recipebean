import LoginImage from "@assets/LoginImage.png";
import Icon from "@components/elements/Icon";
import IconButton from "@components/elements/IconButton";
import Input from "@components/elements/Input";
import TextButton from "@components/elements/TextButton";
import { FieldError, useResetPasswordMutation } from "@generated/graphql";
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
  AuthTitle,
  LoginPasswordContainer,
} from "./styles";

const initialForm = {
  newPassword: "",
  confirmPassword: "",
};

const ResetPasswordTemplate: React.FC<{}> = ({}) => {
  const router = useRouter();
  const ticket =
    typeof router.query.ticket === "string" ? router.query.ticket : "";
  const [{ fetching }, resetPassword] = useResetPasswordMutation();
  // const [rememberPassword, setRememberPassword] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<FieldError[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resetPasswordForm = {
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
      ticket: ticket,
    };
    const response = await resetPassword(resetPasswordForm);
    if (response.data?.resetPassword.errors) {
      setErrors(response.data.resetPassword.errors);
      setFormData(initialForm);
    } else if (response.data?.resetPassword.user) {
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
        <AuthImageText>Change your password</AuthImageText>
      </AuthImageContainer>
      <AuthContentContainer>
        <AuthCard>
          <AuthHeader>
            <AuthTitle>Change Your Password</AuthTitle>
          </AuthHeader>
          {errors && (
            <>
              {errors.map((error) => (
                <AuthErrorContainer key={error.field}>
                  <AuthErrorText>
                    <Icon name="Error" color={ERROR_COLOUR} />{" "}
                    <span>{error.message}</span>
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
              type="password"
              name="newPassword"
              label="New password"
              value={formData.newPassword}
              placeholder="New password"
              onChange={handleChange}
            />
            <LoginPasswordContainer>
              <Input
                type="password"
                name="confirmPassword"
                label="Confirm password"
                value={formData.confirmPassword}
                placeholder="Re-enter new password"
                onChange={handleChange}
              />
            </LoginPasswordContainer>
            <AuthButtons>
              <AuthSubmitButton
                type="submit"
                fetching={fetching}
                disabled={
                  formData.newPassword === "" || formData.confirmPassword === ""
                }
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
      </AuthContentContainer>
    </>
  );
};

export default ResetPasswordTemplate;
