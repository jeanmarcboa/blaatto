import React from "react";
import AccountView from "@/components/Accounts/accountView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon compte | Blaatto",
  description: "Mon compte",
  // other metadata
};

const WishlistPage = () => {
  return (
    <main>
      <AccountView />
    </main>
  );
};

export default WishlistPage;
