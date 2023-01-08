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
  column-gap: 40px;
  flex-direction: row;
  margin-bottom: 40px;
`;

export const SubHeader = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 8px;
`;

export const MiniHeader = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 12px;
`;

export const IngredientContainer = styled.div`
  display: flex;
`;

export const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TimerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 52px;
`;

export const Timer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const StyledInput = styled(Input)`
  & > input {
    border-radius: 10px;
  }
`;

export const IngredientList = styled.ul``;

export const IngredientListItem = styled.li``;

export const NuritionText = styled.span`
  display: flex;
  column-gap: 14px;
  align-items: flex-end;
  line-height: 25px;
  font-size: 18px;
  font-weight: 500;
  color: #b9bdc3;
`;
