import React from "react";
import { PageComponent } from "@/components/ProductsImport";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Importez des produits | Blaatto",
  // description: "This is Wishlist Page for NextCommerce Template",
  // other metadata
};

const ProductImportPage = () => {
  return (
    <main>
      <PageComponent />
    </main>
  );
};

export default ProductImportPage;
