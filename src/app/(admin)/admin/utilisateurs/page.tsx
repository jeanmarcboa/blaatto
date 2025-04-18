import React from "react";
import { AccountList } from "@/components/Accounts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liste des utilisateurs | Blaatto",
  description: "This is users list page",
  // other metadata
};

const WishlistPage = () => {
  return (
    <main>
      <AccountList />
    </main>
  );
};

export default WishlistPage;
