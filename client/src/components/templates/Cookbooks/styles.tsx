import { Container, Input, Modal } from "@mui/material";
import styled from "styled-components";
import Button from "../../elements/Button";

export const CookbooksContainer = styled(Container)`
  &&& {
    padding: 0 65px;
  }
`;

export const CookbooksHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CookbooksTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
`;

export const CookbooksButton = styled(Button)`
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 8px;
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

export const ModalInput = styled(Input)`
  width: 100%;
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

export const CookbookCard = styled.div`
  position: relative;
  min-width: 180px;
  width: 100%;
  min-height: 240px;
  height: 320px;
  border-radius: 16px;
  background-color: #f6e7d8;
  box-shadow: 6px 6px #ebcaa8;
  cursor: pointer;
  display: flex;
  word-wrap: break-word;
  transition: transform 0.1s cubic-bezier(0.5, 0, 0.5, 1);

  &:hover {
    transform: scale(1.01);
  }
`;

export const CookbookSpine = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  background-color: #ff596d;
  width: 20px;
  margin-left: 20px;
`;

export const CookbookCover = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 56px 0;
`;

export const CookbookTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #000;
  hyphens: auto;
  display: flex;
  margin: 0;
  text-align: center;
`;

export const CookbookRecipeCount = styled.span`
  color: #684018;
`;
