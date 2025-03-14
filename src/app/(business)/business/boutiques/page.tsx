import React from "react";
import { ShopList } from "@/components/Shop";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liste des produits | Blaatto",
  description: "This is Wishlist Page for NextCommerce Template",
  // other metadata
};

const WishlistPage = () => {
  return (
    <main>
      <ShopList />
    </main>
  );
};

export default WishlistPage;
