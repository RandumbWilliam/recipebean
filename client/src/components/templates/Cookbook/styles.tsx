import { Container, Modal } from "@mui/material";
import { ONYX_20 } from "@styles/base/colours";
import styled from "styled-components";

export const CookbookContainer = styled(Container)``;

export const CookbookHeaderContainer = styled.div`
  margin-bottom: 32px;
`;

export const CookbookHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const CookbookSubheader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CookbookText = styled.p`
  color: ${ONYX_20};
`;

export const CookbookEditHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CookbookEditActions = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
  gap: 12px;
`;

export const CookbookTitle = styled.h2``;

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f7f9;
  height: 500px;
  width: 100%;
  display: flex;
  border-radius: 12px;
`;

export const EmptyText = styled.span`
  font-size: 18px;
  margin: 12px 0;
`;

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  width: 550px;
  min-height: 300px;
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

export const CloseButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

export const WarningText = styled.div`
  display: grid;
  grid-template-columns: 30px auto;
  margin-bottom: 25px;
`;
