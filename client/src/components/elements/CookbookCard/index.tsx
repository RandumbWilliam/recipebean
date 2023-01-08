import React from "react";
import { Card, RecipeText, Spine, Title, Cover } from "./styles";

interface CookbookCardProps {
  cookbookName: string;
  recipeCount: number;
}

const CookbookCard: React.FC<CookbookCardProps> = ({
  cookbookName,
  recipeCount,
}) => {
  let recipeText = () => {
    if (recipeCount > 1) {
      return recipeCount + " recipes";
    } else if (recipeCount == 1) {
      return recipeCount + " recipe";
    } else {
      return "no recipes";
    }
  };

  return (
    <Card>
      <Spine />
      <Cover>
        <Title>{cookbookName}</Title>
        <RecipeText>{recipeText()}</RecipeText>
      </Cover>
    </Card>
  );
};

export default CookbookCard;
