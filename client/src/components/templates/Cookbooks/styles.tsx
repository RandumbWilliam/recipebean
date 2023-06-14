import Modal from "@components/elements/Modal";
import { Container } from "@mui/material";
import { ONYX_20, PRIMARY_COLOUR, TERTIARY_COLOR } from "@styles/base/colours";
import styled from "styled-components";

interface Props {
  imageUrl: string;
  selected: boolean;
}

export const CookbooksContainer = styled(Container)``;

export const CookbooksHeaderContainer = styled.div`
  margin-bottom: 32px;
`;

export const CookbooksHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
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
  width: 760px;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ModalGallery = styled.div``;

export const ModalCard = styled.div<Props>`
  height: 147px;
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
