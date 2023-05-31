import BreakfastImage from "@assets/cookbooks/Breakfast.png";
import React from "react";
import {
  CookbookCardContainer,
  CookbookCardRecipeText,
  CookbookCardTitle,
} from "./styles";

interface CookbookCardProps {
  cookbookName: string;
  recipeText: string;
}

const CookbookCard: React.FC<CookbookCardProps> = ({
  cookbookName,
  recipeText,
}) => {
  return (
    <CookbookCardContainer imageUrl={BreakfastImage.src}>
      <CookbookCardTitle>{cookbookName}</CookbookCardTitle>
      <CookbookCardRecipeText>{recipeText}</CookbookCardRecipeText>
    </CookbookCardContainer>
  );
};

export default CookbookCard;
