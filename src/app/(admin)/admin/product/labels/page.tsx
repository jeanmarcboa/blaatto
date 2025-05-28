import React from "react";
import { LabelsList } from "@/components/Label";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liste des catégories | Blaatto",
  description: "Liste des catégories",
  // other metadata
};

const Page = () => {
  return (
    <main>
      <LabelsList />
    </main>
  );
};

export default Page;
