import { Container, Modal } from "@mui/material";
import { ONYX_20 } from "@styles/base/colours";
import styled from "styled-components";

export const SearchContainer = styled(Container)`
  margin-bottom: 128px;
`;

export const SearchHeader = styled.div`
  margin-bottom: 36px;
`;

export const SearchTitle = styled.h2`
  margin-bottom: 32px;
`;

export const SearchForm = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
`;

export const SearchRecipeText = styled.p`
  color: ${ONYX_20};
`;
