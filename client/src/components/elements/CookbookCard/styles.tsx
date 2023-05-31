import { ONYX_20 } from "@styles/base/colours";
import styled from "styled-components";

interface Props {
  imageUrl: string;
}

export const CookbookCardContainer = styled.div<Props>`
  height: 230px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.imageUrl});
  padding: 18px 22px;
  border-radius: 22px;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

export const CookbookCardTitle = styled.h4``;

export const CookbookCardRecipeText = styled.p`
  color: ${ONYX_20};
`;
