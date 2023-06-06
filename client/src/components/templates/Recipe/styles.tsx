import { Container } from "@mui/material";
import {
  BRINK_PINK_10,
  ONYX_10,
  ONYX_20,
  PRIMARY_COLOUR,
  WHITE_COLOUR,
} from "@styles/base/colours";
import styled from "styled-components";

interface Props {
  imageUrl?: string;
}

export const RecipeContainer = styled(Container)`
  margin-bottom: 128px;
`;

export const RecipeHeaderContainer = styled.div`
  margin-bottom: 24px;
`;

export const RecipeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RecipeTitle = styled.h2`
  color: ${WHITE_COLOUR};
`;

export const CoverPhoto = styled.div<Props>`
  height: 352px;
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

export const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

export const TimeTextContainer = styled.div`
  display: flex;
  gap: 24px;
`;

export const TimeText = styled.p``;

export const TimeTitle = styled.span`
  color: ${ONYX_20};
`;

export const Header = styled.h5`
  margin-bottom: 24px;
`;

export const IngredientText = styled.p`
  margin-left: 12px;
`;

export const InstructionContainer = styled.div``;

export const StepContainer = styled.div`
  margin: 0 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InstructionItem = styled.div`
  margin-left: 12px;
`;

export const InstructionStep = styled.p`
  color: ${PRIMARY_COLOUR};
  font-weight: 600;
`;

export const InstructionText = styled.p``;

export const SubHeader = styled.p`
  font-weight: 600;
`;

export const IngredientCard = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 466px;
  height: 733px;
  background: ${WHITE_COLOUR};
  border-radius: 16px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 42px;

  & ::-webkit-scrollbar {
    width: 6px;
    background-color: ${ONYX_10};
    border-radius: 50vh;
  }
  & ::-webkit-scrollbar-thumb {
    background-color: ${ONYX_20};
    border-radius: 50vh;
  }
`;

export const IngredientContainer = styled.div`
  margin: 0 12px;
  flex-grow: 1;
  overflow-y: auto;
`;
