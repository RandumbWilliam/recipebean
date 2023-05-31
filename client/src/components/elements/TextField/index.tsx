import FormControl from "@mui/material/FormControl";
import React from "react";
import { StyledTextField } from "./styles";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  className,
  value,
  onChange,
}) => {
  return (
    <FormControl className={className}>
      <StyledTextField value={value} onChange={onChange} autoComplete="off" />
    </FormControl>
  );
};

export default TextField;
