import { InputAdornment } from "@mui/material";
import React from "react";
import {
  Description,
  Field,
  InputContainer,
  Label,
  StyledInputAdornment,
} from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  label?: string;
  description?: string;
  name: string;
  error?: boolean;
  adornment?: JSX.Element | null;
  multiline?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: any;
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
  multiline,
  onChange,
  onKeyDown,
  description,
}) => {
  return (
    <InputContainer className={className}>
      <Label>{label}</Label>
      {description && <Description>{description}</Description>}
      <Field
        autoComplete="off"
        multiline={multiline}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        error={error}
        endAdornment={
          <StyledInputAdornment position="end">
            {adornment}
          </StyledInputAdornment>
        }
        onKeyDown={onKeyDown}
      />
    </InputContainer>
  );
};

export default Input;
