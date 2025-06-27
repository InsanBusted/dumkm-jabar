import { SignedIn, SignedOut } from "@clerk/nextjs";
import React from "react";
import Header from "./Header/page";
import HeaderGuest from "./HeaderGuest/page";

const HeaderUtama = () => {
  return (
    <>
      <SignedIn>
        <Header />
      </SignedIn>
      <SignedOut>
        <HeaderGuest />
      </SignedOut>
    </>
  );
};

export default HeaderUtama;
