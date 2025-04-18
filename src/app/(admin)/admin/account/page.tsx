import React from "react";
import MyAccount from "@/components/MyAccount/business";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon compte | Blaatto",
  description: "Mon compte",
  // other metadata
};

const WishlistPage = () => {
  return (
    <main>
      <MyAccount />
    </main>
  );
};

export default WishlistPage;
