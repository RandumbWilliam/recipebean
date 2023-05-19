import { Container, Modal } from "@mui/material";
import styled from "styled-components";

interface Props {
  active: boolean;
}

export const CookbookContainer = styled(Container)`
  &&& {
    padding: 0 65px;
    margin-top: 50px;
  }
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

export const CookbookRecipeCountText = styled.span`
  color: #b9bdc3;
`;

export const CookbookRecipeContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const RecipeCardContainer = styled.div``;

export const RecipeCard = styled.div`
  width: 278px;
  height: 198px;
  border-radius: 20px;
  background-color: #eab676;
  cursor: pointer;
  padding: 15px;
  margin-bottom: 10px;
`;

export const RecipeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TimeBanner = styled.div`
  background-color: #292929;
  border-radius: 50vh;
  height: 30px;
  padding: 12px;
  display: flex;
  align-items: center;
`;

export const TimeText = styled.span`
  font-size: 12px;
  color: #fff;
  margin-left: 10px;
`;

export const RecipeName = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
`;

export const FavouriteButton = styled.button`
  width: 47px;
  height: 47px;
  border-radius: 17px;
  background-color: #292929;

  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  display: flex;
  align-items: center;
  justify-content: center;
`;

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
