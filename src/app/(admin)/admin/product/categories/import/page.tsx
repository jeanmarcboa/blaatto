import React from "react";
import { PageComponent } from "@/components/CategoriesImport";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Importez des categories | Blaatto",
  // description: "This is Wishlist Page for NextCommerce Template",
  // other metadata
};

const CategoryImportPage = () => {
  return (
    <main>
      <PageComponent />
    </main>
  );
};

export default CategoryImportPage;
