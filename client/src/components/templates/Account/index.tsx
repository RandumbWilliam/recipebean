import Button from "@components/elements/Button";
import Icon from "@components/elements/Icon";
import Input from "@components/elements/Input";
import {
  UserResponseFragment,
  useDeleteUserMutation,
  useUpdatePasswordMutation,
  useUpdatePdpMutation,
  useUpdateUserMutation,
} from "@generated/graphql";
import { WHITE_COLOUR } from "@styles/base/colours";
import { Avatars, AvatarsId } from "@utils/avatars/avatars";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  AccountContainer,
  AccountContent,
  AccountDeleteHeader,
  AccountForm,
  AccountHeader,
  AccountSection,
  AccountSubheader,
  AccountTitle,
  ModalButtons,
  ModalGallery,
  ModalPDP,
  ProfileContainer,
  ProfileOverlay,
  ProfilePic,
  StyledModal,
  UserName,
  WarningText,
} from "./styles";

interface AccountProps {
  user: UserResponseFragment;
}

const initialChangePassword = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const AccountTemplate: React.FC<AccountProps> = ({ user }) => {
  const router = useRouter();
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [changePassword, setChangePassword] = useState(initialChangePassword);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [avatarId, setAvatarId] = useState(user.avatarId);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [, updatePDP] = useUpdatePdpMutation();
  const [, updateUser] = useUpdateUserMutation();
  const [, updatePassword] = useUpdatePasswordMutation();
  const [, deleteUser] = useDeleteUserMutation();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangePassword((oldChangePassword) => ({
      ...oldChangePassword,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDeletePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteConfirm(e.target.value);
  };

  const handleSavePDP = async () => {
    const response = await updatePDP({
      avatarId,
    });
    if (response.data?.updatePDP) {
      setModalOpen(false);
    } else {
      console.log("ERROR");
    }
  };

  const disableSave = () => {
    if (fullName !== user.fullName) return false;

    if (email !== user.email) return false;

    if (
      changePassword.oldPassword !== "" &&
      changePassword.newPassword !== "" &&
      changePassword.confirmPassword !== ""
    )
      return false;

    return true;
  };

  const saveChange = async () => {
    if (fullName !== user.fullName || email !== user.email) {
      const response = await updateUser({ fullName, email });
      if (response.data?.updateUser) {
        console.log("SUCCESS");
      } else {
        console.log("ERROR");
      }
    }

    if (
      changePassword.oldPassword !== "" ||
      changePassword.newPassword !== "" ||
      changePassword.confirmPassword !== ""
    ) {
      const response = await updatePassword({
        oldPassword: changePassword.oldPassword,
        newPassword: changePassword.newPassword,
        confirmPassword: changePassword.confirmPassword,
      });
      if (response.data?.updatePassword) {
        console.log("SUCCESS");
      } else {
        console.log("ERROR");
      }
    }
  };

  const handleDeleteUser = async () => {
    const response = await deleteUser({ password: deleteConfirm });
    if (response.data?.deleteUser.errors) {
      console.log(response.data.deleteUser.errors);
    } else if (response.data?.deleteUser.boolean) {
      console.log("SUCCESS");
    } else {
      console.log("ERROR");
    }
  };

  return (
    <>
      <AccountContainer>
        <AccountHeader>
          <AccountTitle>My Account</AccountTitle>
          <Button disabled={disableSave()} onClick={saveChange}>
            Save
          </Button>
        </AccountHeader>
        <AccountContent>
          <ProfileContainer>
            <ProfilePic imageUrl={AvatarsId[avatarId]}>
              <ProfileOverlay onClick={() => setModalOpen(true)}>
                <Icon name="PenOutline" size={80} color={WHITE_COLOUR} />
              </ProfileOverlay>
            </ProfilePic>
            <UserName>{fullName}</UserName>
          </ProfileContainer>
          <AccountSection>
            <AccountSubheader>Personal Information</AccountSubheader>
            <AccountForm autoComplete="off">
              <Input
                type="text"
                name="fullName"
                label="Full Name"
                value={fullName}
                placeholder="Your name"
                onChange={handleName}
                autoComplete="off"
              />
              <Input
                type="text"
                name="email"
                label="Email"
                value={email}
                placeholder="Email"
                onChange={handleEmail}
              />
            </AccountForm>
          </AccountSection>
          <AccountSection>
            <AccountSubheader>Change Password</AccountSubheader>
            <AccountForm autoComplete="off">
              <Input
                type="password"
                name="oldPassword"
                label="Old password"
                value={changePassword.oldPassword}
                placeholder="Old password"
                onChange={handleChangePassword}
              />
              <Input
                type="password"
                name="newPassword"
                label="New password"
                value={changePassword.newPassword}
                placeholder="New password"
                onChange={handleChangePassword}
              />
              <Input
                type="password"
                name="confirmPassword"
                label="Confirm password"
                value={changePassword.confirmPassword}
                placeholder="Confirm password"
                onChange={handleChangePassword}
              />
            </AccountForm>
          </AccountSection>
          <AccountSection>
            <AccountDeleteHeader>Delete Account</AccountDeleteHeader>
            <AccountForm>
              <p>
                By deleting your account you will lose all your data and access
                to your recipes that you are associated with.
              </p>
              <div>
                <Button
                  primary={false}
                  onClick={() => setDeleteModalOpen(true)}
                >
                  Delete your account
                </Button>
              </div>
            </AccountForm>
          </AccountSection>
        </AccountContent>
      </AccountContainer>
      <StyledModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Choose Profile Picture"
      >
        <ModalGallery>
          {Avatars.map((avatar) => (
            <ModalPDP
              key={avatar.id}
              imageUrl={avatar.src}
              selected={avatar.id === avatarId}
              onClick={() => setAvatarId(avatar.id)}
            ></ModalPDP>
          ))}
        </ModalGallery>
        <ModalButtons>
          <Button
            primary={false}
            onClick={() => {
              setAvatarId(user.avatarId);
              setModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSavePDP}>Save</Button>
        </ModalButtons>
      </StyledModal>
      <StyledModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Account"
      >
        <p>Are you sure you want to delete your account?</p>
        <WarningText>
          <Icon name="Warning" size={18} />{" "}
          <span>
            Deleting your account will remove all your recipes and it is a
            permanent action and cannot be undone.
          </span>
        </WarningText>
        <AccountForm autoComplete="off">
          <Input
            type="password"
            name="confirmDelete"
            label="Enter your password to confirm"
            value={deleteConfirm}
            onChange={handleDeletePassword}
          />
          <ModalButtons>
            <Button primary={false} onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button disabled={deleteConfirm === ""} onClick={handleDeleteUser}>
              Delete
            </Button>
          </ModalButtons>
        </AccountForm>
      </StyledModal>
    </>
  );
};

export default AccountTemplate;
