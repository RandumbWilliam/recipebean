import TextFieldElement from "@components/elements/TextField";
import styled from "styled-components";
import Button from "../../elements/Button";
import Input from "../../elements/Input";

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 25px;
`;

export const RowGap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export const SubHeader = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 8px;
`;

export const IngredientContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const AddHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  margin-top: 8px;
`;

export const StyledButton = styled(Button)`
  font-size: 40px;
  line-height: 10px;
  margin-left: 10px;
`;

export const TimeInput = styled(TextFieldElement)`
  &&& {
    width: 180px;
  }
`;

export const IngredientList = styled.ul``;

export const InstructionList = styled.ol``;

export const IngredientListItem = styled.li``;

export const NuritionText = styled.span`
  display: flex;
  column-gap: 14px;
  line-height: 25px;
  font-size: 18px;
  font-weight: 500;
  color: #b9bdc3;
  align-items: center;
`;

export const Filler = styled.div`
  height: -9.13px;
`;

export const Box = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 50px;
  border-radius: 20px;
  min-height: 1000px;
  overflow-y: auto;
`;

export const MiniHeader = styled.h3`
  font-weight: 500;
  margin: 0;
`;
