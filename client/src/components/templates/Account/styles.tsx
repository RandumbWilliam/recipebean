import Modal from "@components/elements/Modal";
import { Container } from "@mui/material";
import { ERROR_COLOUR } from "@styles/base/colours";
import styled from "styled-components";

interface Props {
  imageUrl: string;
}

interface AvatarProps {
  imageUrl: string;
  selected: boolean;
}

export const AccountContainer = styled(Container)`
  margin-bottom: 128px;
`;

export const AccountHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const AccountTitle = styled.h2``;

export const ProfileContainer = styled.div`
  display: flex;
  gap: 24px;
`;

export const ProfileOverlay = styled.div`
  width: 180px;
  height: 180px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 24px;
  visibility: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfilePic = styled.div<Props>`
  width: 180px;
  height: 180px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.imageUrl});
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: end;

  &:hover {
    ${ProfileOverlay} {
      visibility: visible;
    }
  }
`;

export const UserName = styled.h3``;

export const AccountContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

export const AccountSubheader = styled.h5`
  margin-bottom: 12px;
`;

export const AccountDeleteHeader = styled.h5`
  margin-bottom: 12px;
  color: ${ERROR_COLOUR};
`;

export const AccountSection = styled.div``;

export const AccountForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const StyledModal = styled(Modal)`
  width: 596px;
`;

export const ModalGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

export const ModalPDP = styled.div<AvatarProps>`
  height: 100px;
  width: 100px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.imageUrl});
  border-radius: 12px;
  cursor: pointer;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const WarningText = styled.div`
  display: grid;
  grid-template-columns: 30px auto;
  margin-bottom: 25px;
  align-items: baseline;
`;
