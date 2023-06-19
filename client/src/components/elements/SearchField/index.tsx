import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import { PRIMARY_COLOUR, WHITE_COLOUR } from "@styles/base/colours";
import React from "react";
import Icon from "../Icon";
import { StyledInputBase } from "./styles";

interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  alternate?: boolean;
}

const SearchField: React.FC<SearchFieldProps> = ({
  className,
  alternate,
  value,
  onChange,
}) => {
  return (
    <FormControl className={className}>
      <StyledInputBase
        type="text"
        alternate={alternate}
        value={value}
        onChange={onChange}
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <Icon
              name="Search"
              color={alternate ? WHITE_COLOUR : PRIMARY_COLOUR}
            />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default SearchField;
