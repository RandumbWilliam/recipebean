import Icon from "@components/elements/Icon";
import { Container, Modal } from "@mui/material";
import {
  BRINK_PINK_10,
  ONYX_10,
  ONYX_20,
  PRIMARY_COLOUR,
  SECONDARY_COLOUR,
  WHITE_COLOUR,
} from "@styles/base/colours";
import { FONT_SIZE_16 } from "@styles/base/typography";
import styled from "styled-components";

interface Props {
  imageUrl?: string;
}

interface CheckboxProps {
  checked: boolean;
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

export const RecipeActions = styled.div`
  display: flex;
  gap: 12px;
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

export const IngredientCheckbox = styled.label`
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-left: 8px;
`;

export const IngredientCheckmarkIcon = styled(Icon)<CheckboxProps>`
  display: ${(props) => (props.checked ? "block" : "none")};
`;

export const IngredientInput = styled.input.attrs({ type: "checkbox" })`
  -webkit-appearance: none;
  appearance: none;
`;

export const IngredientIndicator = styled.div<CheckboxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50vh;
  border: 1px solid ${(props) => (props.checked ? PRIMARY_COLOUR : ONYX_20)};
  outline: none;
  cursor: pointer;
  margin-right: 0.5em;
  margin-top: 8px;
  ${(props) => props.checked && `background-color: ${PRIMARY_COLOUR};`}
`;

export const IngredientText = styled.p`
  margin-left: 8px;
`;

export const IngredientComments = styled.p`
  font-size: ${FONT_SIZE_16};
  color: ${ONYX_20};
  margin-left: 8px;
  line-height: 20px;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 12px;
  flex-grow: 1;
  overflow-y: auto;
  gap: 8px;
`;

export const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 12px;
`;

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  width: 600px;
  min-height: 300px;
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
  align-items: baseline;
  grid-template-columns: 30px auto;
  margin-bottom: 25px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
  gap: 12px;
`;
