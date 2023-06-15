import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ONYX_20 } from "@styles/base/colours";
import styled from "styled-components";

interface Props {
  imageUrl: string;
}

export const ProfileContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  cursor: pointer;
`;

export const PDP = styled.div<Props>`
  width: 60px;
  height: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.imageUrl});
  border-radius: 12px;
`;

export const PDPSkeleton = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: ${ONYX_20};
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
