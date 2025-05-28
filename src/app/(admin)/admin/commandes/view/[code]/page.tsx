import React from "react";
import { Metadata } from "next";
import { DetailPage } from "@/components/Orders/OrderPage";

export const metadata: Metadata = {
  title: "Details commandes | Blaatto",
  description: "This is Wishlist Page for NextCommerce Template",
  // other metadata
};

const Page = () => {
  return (
    <main>
      <DetailPage />
    </main>
  );
};

export default Page;
