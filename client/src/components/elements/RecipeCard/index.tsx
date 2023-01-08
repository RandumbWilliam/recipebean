import React from "react";
import Icon from "../Icon";
import {
  Card,
  FavouriteButton,
  RecipeHeader,
  RecipeName,
  TimeBanner,
  TimeText,
} from "./styles";

interface CookbookCardProps {
  recipeName: string;
  cookTime: number;
  prepTime: number;
}

const RecipeCard: React.FC<CookbookCardProps> = ({
  recipeName,
  cookTime,
  prepTime,
}) => {
  const totalTime = cookTime + prepTime;
  const hours = Math.floor(totalTime / 60);
  const minutes = totalTime % 60;

  return (
    <>
      <Card>
        <RecipeHeader>
          <TimeBanner>
            <Icon name="Stopwatch" size={18} color="#fff" />
            <TimeText>
              {hours} h {minutes !== 0 && `${minutes} m`}
            </TimeText>
          </TimeBanner>
          <FavouriteButton>
            <Icon name="HeartOutline" size={22} color="#fff" />
          </FavouriteButton>
        </RecipeHeader>
      </Card>
      <RecipeName>{recipeName}</RecipeName>
    </>
  );
};

export default RecipeCard;
