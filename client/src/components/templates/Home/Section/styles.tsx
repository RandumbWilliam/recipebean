import { Container } from "@mui/material";
import styled from "styled-components";

interface Props {
  backgroundColor: "white" | "grey";
}

export const SectionSection = styled.section<Props>`
  height: 768px;
  ${({ backgroundColor }) => {
    switch (backgroundColor) {
      case "white":
        return "background-color: #ffffff";
      case "grey":
        return "background-color: #f5f7f9";
    }
  }};
`;

export const SectionContainer = styled(Container)`
  &&& {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

export const SectionTitle = styled.h2`
  font-weight: 600;
  font-size: 48px;
`;

export const SectionParagraph = styled.p`
  font-size: 24px;
`;
