import React from "react";
import { Orderstlist } from "@/components/ActivitiesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liste des transactions | Blaatto",
  description: "This is Wishlist Page for NextCommerce Template",
  // other metadata
};

const WishlistPage = () => {
  return (
    <main>
      <Orderstlist />
    </main>
  );
};

export default WishlistPage;
