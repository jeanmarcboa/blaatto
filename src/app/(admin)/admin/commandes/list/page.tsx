import React from "react";
import { Orderstlist } from "@/components/Orderstlist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liste des produits | Blaatto",
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
