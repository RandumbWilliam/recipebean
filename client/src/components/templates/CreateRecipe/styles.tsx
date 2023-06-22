import Button from "@components/elements/Button";
import Input from "@components/elements/Input";
import Modal from "@components/elements/Modal";
import {
  Container,
  FormControl,
  InputBase,
  MenuItem,
  Select,
} from "@mui/material";
import { BREAKPOINT_TABLET } from "@styles/base/breakpoints";
import { ONYX_20, PRIMARY_COLOUR, WHITE_COLOUR } from "@styles/base/colours";
import { FONT_SIZE_16 } from "@styles/base/typography";
import styled from "styled-components";

export const CreateRecipeContainer = styled(Container)`
  margin-bottom: 128px;
`;

export const CreateRecipeHeaderContainer = styled.div`
  margin-bottom: 32px;
`;

export const CreateRecipeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const CreateRecipeTitle = styled.h2``;

export const CreateRecipeActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 564px;
  margin-left: auto;
  margin-right: auto;
`;

export const InputContainer = styled.div``;

export const InputHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InputHeaderDescriptionContainer = styled.div``;

export const InputHeader = styled.h6`
  margin-bottom: 8px;
`;

export const InputDescription = styled.p`
  color: ${ONYX_20};
`;

export const InputForm = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

export const SubHeader = styled.p`
  font-weight: 600;
`;

export const ItemList = styled.div`
  margin-bottom: 8px;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 12px;
`;

export const SubItem = styled.div`
  display: flex;
  gap: 12px;
`;

export const IngredientItem = styled.div`
  margin-left: 12px;
  padding-bottom: 8px;
`;

export const IngredientText = styled.p``;

export const IngredientComments = styled.p`
  font-size: ${FONT_SIZE_16};
  color: ${ONYX_20};
  margin-left: 12px;
  line-height: 20px;
`;

export const InstructionItem = styled.div`
  margin-left: 12px;
`;

export const InstructionStep = styled.p`
  color: ${PRIMARY_COLOUR};
  font-weight: 600;
`;

export const InstructionText = styled.p``;

interface DragHandlerProps {
  dragging: boolean;
}

export const DragHandler = styled.div<DragHandlerProps>`
  cursor: ${(props) => (props.dragging ? "grabbing" : "grab")};
  margin-right: 12px;
`;

export const StyledInput = styled(Input)``;

export const StyledButton = styled(Button)`
  padding: 0;
  min-width: 48px;
  min-height: 48px;
`;

export const StyledModal = styled(Modal)`
  width: 100%;

  @media (min-width: ${BREAKPOINT_TABLET}) {
    max-width: 564px;
  }
`;

export const ModalContainer = styled.div`
  height: 500px;
  background-color: #fff;
  border-radius: 12px;
  display: flex;
  gap: 24px;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: ${BREAKPOINT_TABLET}) {
    height: auto;
  }
`;

export const ConfirmButton = styled(Button)`
  &&& {
    align-self: flex-end;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  font: inherit;
  display: flex;
  justify-content: space-between;

  &:hover {
    background: none;
  }
`;

export const SelectItem = styled.div`
  padding: 8px;
`;

export const SelectInput = styled(InputBase)`
  font: inherit;
  border-radius: 8px;
  width: 100%;
  border: 0;
  background-color: transparent;
  border: 1px solid ${ONYX_20};
  position: "relative";

  & .MuiInputBase-input {
    height: auto;
    padding: 7px 16px;
  }
`;

export const StyledSelect = styled(({ className, ...props }) => (
  <Select {...props} MenuProps={{ classes: { paper: className } }} />
))`
  &&& {
    margin-top: 8px;
    padding: 0 8px;
    max-height: 280px;
  }
`;

export const StyledFormControl = styled(FormControl)`
  & .MuiPaper-root {
    border-radius: 12px;
    margin-top: 8px;
    width: 150px;
  }
`;

export const AddCookbookButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${PRIMARY_COLOUR};
`;

interface PreviewImageProps {
  imageUrl: string;
}

export const PreviewImage = styled.div<PreviewImageProps>`
  width: 100%;
  height: 352px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.imageUrl});
  border-radius: 16px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const PreviewImageDeleteButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background-color: ${WHITE_COLOUR};
`;

export const PreviewImageChangeButton = styled.button`
  width: 160px;
  height: 38px;
  border-radius: 8px;
  background-color: ${WHITE_COLOUR};
`;

export const SkeletonContainer = styled.div`
  height: 40px;
  margin-bottom: 12px;
`;
