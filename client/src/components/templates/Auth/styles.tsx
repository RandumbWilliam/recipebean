import Button from "@components/elements/Button";
import { BREAKPOINT_LAPTOP } from "@styles/base/breakpoints";
import {
  BRINK_PINK_20,
  ERROR_COLOUR,
  ERROR_MUTED_COLOR,
  ONYX_20,
  WHITE_COLOUR,
} from "@styles/base/colours";
import { FONT_SIZE_16 } from "@styles/base/typography";
import styled from "styled-components";

export const AuthImageContainer = styled.div`
  background-color: ${BRINK_PINK_20};
  height: 100%;
  max-width: 720px;
  padding: 24px;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${BREAKPOINT_LAPTOP}) {
    display: flex;
  }
`;

export const AuthContentContainer = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${BREAKPOINT_LAPTOP}) {
    min-width: 600px;
  }
`;

export const AuthImageText = styled.h3`
  color: ${WHITE_COLOUR};
  text-align: center;
  max-width: 600px;
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 368px;
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
  gap: 24px;
`;

export const AuthActions = styled.div``;

export const AuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-top: 12px;
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

export const AuthErrorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${ERROR_MUTED_COLOR};
`;

export const AuthErrorText = styled.span`
  color: ${ERROR_COLOUR};
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
  text-transform: uppercase;
  font-size: ${FONT_SIZE_16};

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
  margin-top: 16px;
`;

export const LoginPasswordContainer = styled.div`
  width: 100%;
`;
