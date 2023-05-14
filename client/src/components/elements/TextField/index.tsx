import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import React from "react";
import { StyledTextField, TextFieldContainer } from "./styles";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  label?: string;
  name: string;
  error?: boolean;
  adornment?: JSX.Element | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextFieldElement: React.FC<TextFieldProps> = ({
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
    <TextFieldContainer className={className}>
      <InputLabel>{label}</InputLabel>
      <StyledTextField
        value={value}
        type={type}
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">{adornment}</InputAdornment>
        }
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          "aria-label": "weight",
        }}
        onChange={onChange}
        name={name}
        error={error}
        autoComplete="off"
      />
    </TextFieldContainer>
  );
};

export default TextFieldElement;
