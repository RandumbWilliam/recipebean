import Modal from "@components/elements/Modal";
import { Container } from "@mui/material";
import { BREAKPOINT_TABLET } from "@styles/base/breakpoints";
import { ONYX_20, PRIMARY_COLOUR, TERTIARY_COLOR } from "@styles/base/colours";
import styled from "styled-components";

interface Props {
  imageUrl: string;
  selected?: boolean;
}

interface CarouselProps {
  selected: boolean;
}

export const CookbooksContainer = styled(Container)``;

export const CookbooksHeaderContainer = styled.div`
  margin-bottom: 32px;
`;

export const CookbooksHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  justify-content: space-between;
  margin-bottom: 12px;

  @media (min-width: ${BREAKPOINT_TABLET}) {
    align-items: center;
    flex-direction: row;
  }
`;

export const CookbooksTitle = styled.h2``;

export const CookbooksText = styled.p`
  color: ${ONYX_20};
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${TERTIARY_COLOR};
  height: 500px;
  width: 100%;
  display: flex;
  border-radius: 16px;
  gap: 8px;
`;

export const StyledModal = styled(Modal)`
  width: 100%;
  max-width: 760px;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ModalGallery = styled.div``;

export const ModalCard = styled.div<Props>`
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.imageUrl});
  padding: 12px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.selected &&
    `
    outline: 3px solid ${PRIMARY_COLOUR};
    outline-offset: -3px;
  `}

  flex: 0 0 100%;
  min-width: 0;

  @media (min-width: ${BREAKPOINT_TABLET}) {
    height: 147px;
  }
`;

export const ModalCheckmark = styled.div`
  background-color: ${PRIMARY_COLOUR};
  width: 24px;
  height: 24px;
  border-radius: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const CarouselContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
`;

export const CarouselDot = styled.div<CarouselProps>`
  width: 1rem;
  height: 1rem;
  border-radius: 50vh;
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
  margin-left: 0.75rem;
  background-color: ${(props) => (props.selected ? PRIMARY_COLOUR : ONYX_20)};
`;

export const Embla = styled.div`
  overflow: hidden;
  flex-grow: 1;
`;

export const EmblaContainer = styled.div`
  display: flex;
`;
