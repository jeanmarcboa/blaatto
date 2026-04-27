import React from "react";
import PubComponent from "@/components/Pub";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publicités | Blaatto",
  description: "Publicités",
  // other metadata
};

const Page = () => {
  return (
    <main>
      <PubComponent />
    </main>
  );
};

export default Page;
