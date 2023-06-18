import { ONYX_20 } from "@styles/base/colours";
import React from "react";
import Icon from "../Icon";
import {
  RecipeCardBanner,
  RecipeCardContainer,
  RecipeCardTimeContainer,
  RecipeCardTimeText,
  RecipeCardTitle,
} from "./styles";

interface RecipeCardProps {
  reicpeName: string;
  time: string;
  imageUrl: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  reicpeName,
  time,
  imageUrl,
}) => {
  return (
    <RecipeCardContainer>
      <RecipeCardBanner imageUrl={imageUrl} />
      <RecipeCardTitle>{reicpeName}</RecipeCardTitle>
      <RecipeCardTimeContainer>
        <Icon name="Stopwatch" size={22} color={ONYX_20} />
        <RecipeCardTimeText>{time}</RecipeCardTimeText>
      </RecipeCardTimeContainer>
    </RecipeCardContainer>
  );
};

export default RecipeCard;
