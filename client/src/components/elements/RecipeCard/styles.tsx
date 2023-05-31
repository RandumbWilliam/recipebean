import { BRINK_PINK_10, ONYX_20 } from "@styles/base/colours";
import styled from "styled-components";

interface Props {
  imageUrl?: string;
}

export const RecipeCardContainer = styled.div``;

export const RecipeCardBanner = styled.div<Props>`
  height: 230px;
  border-radius: 22px;
  margin-bottom: 12px;
  background-color: ${BRINK_PINK_10};
  ${(props) =>
    props.imageUrl &&
    `
      background-size: cover;
      background-repeat: no-repeat;
      background-image: url(${props.imageUrl});
  `}
`;

export const RecipeCardTitle = styled.h5`
  margin-bottom: 8px;
`;

export const RecipeCardTimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RecipeCardTimeText = styled.p`
  color: ${ONYX_20};
`;
