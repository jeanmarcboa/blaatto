import React from "react";
import { Productlist } from "@/components/Productlist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liste des produits | Blaatto",
  description: "This is Wishlist Page for NextCommerce Template",
  // other metadata
};

const WishlistPage = () => {
  return (
    <main>
      <Productlist />
    </main>
  );
};

export default WishlistPage;
