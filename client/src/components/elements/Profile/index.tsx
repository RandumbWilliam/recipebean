import CornProfilePicture from "@assets/avatars/Corn.jpg";
import React, { useState } from "react";
import {
  ProfileContainer,
  StyledImage,
  StyledMenu,
  StyledMenuItem,
} from "./styles";

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    console.log("Logout!");
  };

  return (
    <>
      <ProfileContainer onClick={handleClick}>
        <StyledImage src={CornProfilePicture} alt="profile picture" />
      </ProfileContainer>
      <StyledMenu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <StyledMenuItem onClick={handleClose}>My Account</StyledMenuItem>
        <StyledMenuItem onClick={handleLogout}>Logout</StyledMenuItem>
      </StyledMenu>
    </>
  );
};

export default Profile;
