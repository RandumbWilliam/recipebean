import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import { PRIMARY_COLOUR } from "@styles/base/colours";
import React from "react";
import Icon from "../Icon";
import { StyledInputBase } from "./styles";

interface SearchFieldProps {
  className?: string;
}

const SearchField: React.FC<SearchFieldProps> = ({ className }) => {
  return (
    <FormControl className={className}>
      <StyledInputBase
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <Icon name="Search" color={PRIMARY_COLOUR} />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default SearchField;
