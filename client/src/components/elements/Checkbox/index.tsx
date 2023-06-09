import { WHITE_COLOUR } from "@styles/base/colours";
import React from "react";
import {
  CheckmarkIcon,
  Indicator,
  StyledCheckbox,
  StyledInput,
} from "./styles";

interface CheckboxProps {
  className?: string;
  isChecked: boolean;
  label: string;
  onChange?: any;
}

const Checkbox: React.FC<CheckboxProps> = ({
  className,
  isChecked,
  label,
  onChange,
}) => {
  return (
    <StyledCheckbox className={className}>
      <StyledInput type="checkbox" onChange={onChange} />
      <Indicator checked={isChecked}>
        <CheckmarkIcon
          name="CheckAlt"
          size={10}
          color={WHITE_COLOUR}
          checked={isChecked}
        />
      </Indicator>
      <span>{label}</span>
    </StyledCheckbox>
  );
};

export default Checkbox;
