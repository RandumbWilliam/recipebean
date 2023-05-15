import { Container, Input, Modal } from "@mui/material";
import styled from "styled-components";
import Button from "../../elements/Button";

interface Props {
  active: boolean;
}

export const StyledContainer = styled(Container)`
  &&& {
    padding: 0 65px;
    margin-top: 50px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 230px auto;
  gap: 60px;
`;

export const CookbookContainer = styled.div``;

export const Cookbook = styled.div`
  width: 230px;
  height: 300px;
  border-radius: 8px;
  background-color: #202a44;
  padding: 24px 0;
  box-shadow: 6px 6px #b9bdc3;
  margin-bottom: 12px;
`;

export const CookbookHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CookbookActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const CookbookEditHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

export const CookbookEditActions = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  margin-top: 8px;
  * {
    padding-left: 12px;
  }
`;

export const CookbookEditIcon = styled.div`
  margin-top: 6px;
  cursor: pointer;
`;

export const CookbookTitle = styled.h3`
  max-width: 200px;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  overflow: hidden;
`;

export const CookbookRecipes = styled.span`
  color: #b9bdc3;
`;

export const RecipeContainer = styled.div``;

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

export const WarningText = styled.div`
  display: grid;
  grid-template-columns: 30px auto;
  margin-bottom: 25px;
`;
