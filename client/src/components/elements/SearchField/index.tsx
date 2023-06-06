import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import { PRIMARY_COLOUR, WHITE_COLOUR } from "@styles/base/colours";
import React from "react";
import Icon from "../Icon";
import { StyledInputBase } from "./styles";

interface SearchFieldProps {
  className?: string;
  alternate?: boolean;
}

const SearchField: React.FC<SearchFieldProps> = ({ className, alternate }) => {
  return (
    <FormControl className={className}>
      <StyledInputBase
        alternate={alternate}
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
