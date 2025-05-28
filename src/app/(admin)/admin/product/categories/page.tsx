import React from "react";
import { CategoriesList } from "@/components/Categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liste des catégories | Blaatto",
  description: "Liste des catégories",
  // other metadata
};

const Page = () => {
  return (
    <main>
      <CategoriesList />
    </main>
  );
};

export default Page;
