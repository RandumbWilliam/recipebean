import React, { ChangeEvent } from "react";
import { InputContainer, Field, Label } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder: string;
  label?: string;
  name: string;
  error?: boolean;
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
  onChange,
}) => {
  return (
    <InputContainer className={className}>
      <Label>{label}</Label>
      <Field
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        error={error}
      />
    </InputContainer>
  );
};

export default Input;
