import { Container, Input, Modal } from "@mui/material";
import { ONYX_20 } from "@styles/base/colours";
import styled from "styled-components";
import Button from "../../elements/Button";

export const CookbooksContainer = styled(Container)`
  &&& {
    margin-top: 200px;
  }
`;

export const CookbooksHeaderContainer = styled.div`
  margin-bottom: 24px;
`;

export const CookbooksHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CookbooksTitle = styled.h2``;

export const CookbooksText = styled.p`
  color: ${ONYX_20};
`;

export const CookbooksButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  width: 500px;
  min-height: 230px;
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

export const ModalTitle = styled.h4``;

export const ModalInput = styled(Input)`
  width: 100%;
  font: inherit;
`;

export const ModalButton = styled(Button)`
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
