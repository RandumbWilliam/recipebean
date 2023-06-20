import { Modal } from "@mui/material";
import { BREAKPOINT_TABLET } from "@styles/base/breakpoints";
import { WHITE_COLOUR } from "@styles/base/colours";
import styled, { keyframes } from "styled-components";

const slide = keyframes`
  0% {bottom: -100%;}
  100% {bottom: 0l}
`;

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation-name: ${slide};
  animation-duration: 0.25s;

  @media (min-width: ${BREAKPOINT_TABLET}) {
    align-items: center;
  }
`;

export const ModalContainer = styled.div`
  position: relative;
  background-color: ${WHITE_COLOUR};
  border-radius: 24px 24px 0 0;
  padding: 32px;
  display: flex;
  flex-direction: column;

  @media (min-width: ${BREAKPOINT_TABLET}) {
    border-radius: 24px;
  }
`;

export const ModalTitle = styled.h5`
  margin-bottom: 24px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
`;
