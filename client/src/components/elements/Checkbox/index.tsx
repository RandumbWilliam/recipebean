import React from "react";
import { StyledCheckbox, StyledInput, StyledLabel } from "./styles";

interface CheckboxProps {
  isChecked: boolean;
  label: string;
  onChange?: any;
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked, label, onChange }) => {
  return (
    <StyledCheckbox>
      <StyledLabel>
        <StyledInput type="checkbox" onChange={onChange} checked={isChecked} />
        <span>{label}</span>
      </StyledLabel>
    </StyledCheckbox>
  );
};

export default Checkbox;
