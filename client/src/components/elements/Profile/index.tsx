import { UserResponseFragment, useLogoutMutation } from "@generated/graphql";
import { AvatarsId } from "@utils/avatars/avatars";
import Link from "next/link";
import React, { useState } from "react";
import {
  PDP,
  PDPSkeleton,
  ProfileContainer,
  StyledMenu,
  StyledMenuItem,
} from "./styles";

interface ProfileProps {
  user: UserResponseFragment | undefined | null;
  fetching: boolean;
}

const Profile: React.FC<ProfileProps> = ({ user, fetching }) => {
  const [, logout] = useLogoutMutation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await logout();
  };

  const renderPDP = () => {
    if (fetching || !user) {
      return <PDPSkeleton />;
    }

    return <PDP imageUrl={AvatarsId[user.avatarId]} />;
  };

  return (
    <>
      <ProfileContainer onClick={handleClick}>{renderPDP()}</ProfileContainer>
      <StyledMenu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <StyledMenuItem onClick={handleClose}>
          <Link href="/account">
            <a>My Account</a>
          </Link>
        </StyledMenuItem>
        <StyledMenuItem onClick={handleLogout}>Logout</StyledMenuItem>
      </StyledMenu>
    </>
  );
};

export default Profile;
