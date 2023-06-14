import { CookbookCoverId } from "@utils/cookbooks/cookbookImage";
import React from "react";
import {
  CookbookCardContainer,
  CookbookCardRecipeText,
  CookbookCardTitle,
} from "./styles";

interface CookbookCardProps {
  cookbookName: string;
  cookbookCoverId: string;
  recipeText: string;
}

const CookbookCard: React.FC<CookbookCardProps> = ({
  cookbookName,
  cookbookCoverId,
  recipeText,
}) => {
  return (
    <CookbookCardContainer imageUrl={CookbookCoverId[cookbookCoverId]}>
      <CookbookCardTitle>{cookbookName}</CookbookCardTitle>
      <CookbookCardRecipeText>{recipeText}</CookbookCardRecipeText>
    </CookbookCardContainer>
  );
};

export default CookbookCard;
