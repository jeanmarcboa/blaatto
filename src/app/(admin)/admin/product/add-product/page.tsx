import React from "react";
import { AddProduct } from "@/components/ProductEdition/addProduct";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajouter un produit | Blaatto",
  description: "",
  // other metadata
};

const AddProductPage = () => {
  return (
    <main>
      <AddProduct />
    </main>
  );
};

export default AddProductPage;
