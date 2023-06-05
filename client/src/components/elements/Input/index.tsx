import { InputAdornment } from "@mui/material";
import React, { ChangeEvent } from "react";
import { Adornment, Description, Field, InputContainer, Label } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  label?: string;
  description?: string;
  name: string;
  error?: boolean;
  adornment?: JSX.Element | null;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  className,
  value,
  type,
  placeholder,
  label,
  name,
  error,
  adornment,
  onChange,
  description,
}) => {
  return (
    <InputContainer className={className}>
      <Label>{label}</Label>
      {description && <Description>{description}</Description>}
      <Field
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        error={error}
        endAdornment={
          <InputAdornment position="end">{adornment}</InputAdornment>
        }
      />
    </InputContainer>
  );
};

export default Input;
