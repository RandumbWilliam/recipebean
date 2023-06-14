import { ONYX_20 } from "@styles/base/colours";
import React from "react";
import Icon from "../Icon";
import { CloseButton, ModalContainer, ModalTitle, StyledModal } from "./styles";

interface ModalProps {
  className?: string;
  open: boolean;
  onClose: () => void;
  title: string;
  children?: string | JSX.Element | JSX.Element[];
}

const Modal: React.FC<ModalProps> = ({
  className,
  open,
  onClose,
  title,
  children,
}) => {
  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalContainer className={className}>
        <CloseButton onClick={onClose}>
          <Icon name="CloseOutline" size={24} color={ONYX_20} />
        </CloseButton>
        <ModalTitle>{title}</ModalTitle>
        {children}
      </ModalContainer>
    </StyledModal>
  );
};

export default Modal;
