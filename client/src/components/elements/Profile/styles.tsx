import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import styled from "styled-components";

export const ProfileContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  cursor: pointer;
`;

export const StyledImage = styled(Image)`
  border-radius: 12px;
`;

export const StyledMenu = styled(Menu)`
  font: inherit;
  & .MuiPaper-root {
    border-radius: 12px;
    margin-top: 8px;
    width: 150px;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  font: inherit;
`;
