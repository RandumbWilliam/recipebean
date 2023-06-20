import { useMyUserQuery } from "@generated/graphql";
import React, { useEffect, useState } from "react";
import AuthNav from "./AuthNav";
import BaseNav from "./BaseNav";

interface NavbarProps {
  alternate?: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ alternate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [{ data, fetching }] = useMyUserQuery();
  const authenticated = data?.myUser;

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY >= 65) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <>
      {authenticated ? (
        <AuthNav scrolled={scrolled} alternate={alternate} />
      ) : (
        <BaseNav />
      )}
    </>
  );
};

export default Navbar;
