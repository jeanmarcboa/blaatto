import React from "react";
import { EditProduct } from "@/components/ProductEdition/editProduct";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modifier un produit | Blaatto",
  description: "",
  // other metadata
};

const EditProductPage = () => {
  return (
    <main>
      <EditProduct />
    </main>
  );
};

export default EditProductPage;
