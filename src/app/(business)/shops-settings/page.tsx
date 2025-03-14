import ShopCreation from "@/components/Shop/create";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Création de boutique | Blaatto",
  description: "This is Signin Page for NextCommerce Template",
  // other metadata
};

const ShopSettingPage = () => {
  return (
    <main>
      <ShopCreation />
    </main>
  );
};

export default ShopSettingPage;
