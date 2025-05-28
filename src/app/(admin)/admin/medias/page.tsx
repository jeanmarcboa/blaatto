import React from "react";
import Medias from "@/components/Medias";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Médiathèque | Blaatto",
  description: "Médiathèque",
  // other metadata
};

const Page = () => {
  return (
    <main>
      <Medias />
    </main>
  );
};

export default Page;
