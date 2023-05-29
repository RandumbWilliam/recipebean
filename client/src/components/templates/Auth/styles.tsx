import Button from "@components/elements/Button";
import { BRINK_PINK_20, ONYX_20, WHITE_COLOUR } from "@styles/base/colours";
import styled from "styled-components";

export const AuthImageContainer = styled.div`
  background-color: ${BRINK_PINK_20};
  height: 100%;
  max-width: 720px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthContentContainer = styled.div`
  width: 100%;
  min-width: 600px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthImageText = styled.h3`
  color: ${WHITE_COLOUR};
`;

export const AuthCard = styled.div`
  width: 368px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const AuthHeader = styled.div``;

export const AuthTitle = styled.h4``;

export const AuthText = styled.p`
  color: ${ONYX_20};
`;

export const AuthForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 30px;
  margin-bottom: 24px;
  gap: 24px;
`;

export const AuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AuthSubmitButton = styled(Button)`
  width: 100%;
`;

export const AuthGoogleButton = styled(Button)`
  width: 100%;
  color: ${ONYX_20};
  border-color: ${ONYX_20};

  &:hover {
    background-color: transparent;
    color: ${ONYX_20};
  }
`;

export const AuthGoogleButtonText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
`;

export const AuthErrorText = styled.span`
  color: #ff0033;
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const TextDivider = styled.div`
  --text-divider-gap: 1rem;
  display: flex;
  align-items: center;
  letter-spacing: 0.1em;
  color: ${ONYX_20};

  &::before,
  ::after {
    content: "";
    height: 1px;
    background-color: ${ONYX_20};
    flex-grow: 1;
  }

  &::before {
    margin-right: var(--text-divider-gap);
  }

  &::after {
    margin-left: var(--text-divider-gap);
  }
`;

export const LoginActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

export const LoginPasswordContainer = styled.div`
  width: 100%;
`;
