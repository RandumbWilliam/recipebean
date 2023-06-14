import { Modal } from "@mui/material";
import { WHITE_COLOUR } from "@styles/base/colours";
import styled from "styled-components";

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  position: relative;
  background-color: ${WHITE_COLOUR};
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
`;

export const ModalTitle = styled.h5`
  margin-bottom: 24px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
`;
