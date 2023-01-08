import { Container } from "@mui/material";
import styled from "styled-components";
import Button from "../../elements/Button";

export const StyledContainer = styled(Container)`
  &&& {
    padding: 0 65px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
`;

export const SectionActions = styled.div`
  display: flex;
`;

export const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 8px;
`;
