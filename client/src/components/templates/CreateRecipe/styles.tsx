import Button from "@components/elements/Button";
import Input from "@components/elements/Input";
import {
  Container,
  FormControl,
  InputBase,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { ONYX_10, ONYX_20, PRIMARY_COLOUR } from "@styles/base/colours";
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

export const IngredientText = styled.p`
  margin-left: 12px;
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  width: 564px;
  min-height: 200px;
  height: auto;
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  gap: 24px;
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
