import { Container, Modal, Input } from "@mui/material";
import styled from "styled-components";
import Button from "../../elements/Button";

export const StyledContainer = styled(Container)`
  &&& {
    padding: 0 65px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: flex;
`;

export const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 8px;
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SectionTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
`;

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  width: 500px;
  min-height: 200px;
  height: auto;
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

export const StyledInput = styled(Input)`
  width: 100%;
`;

export const StyledButton = styled(Button)`
  &&& {
    align-self: flex-end;
  }
`;

export const CloseButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;
