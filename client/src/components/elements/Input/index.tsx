import React, { ChangeEvent } from "react";
import { Adornment, Field, InputContainer, Label } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  label?: string;
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
}) => {
  return (
    <InputContainer className={className}>
      <Label>{label}</Label>
      {adornment && <Adornment>{adornment}</Adornment>}
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
