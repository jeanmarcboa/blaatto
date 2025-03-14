import React from "react";
import OrderSuccess from "@/components/OrderSuccess";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Commande confirmée | Blaatto",
  description: "This is Order Success ",
  // other metadata
};

const MailSuccessPage = () => {
  return (
    <main>
      <OrderSuccess />
    </main>
  );
};

export default MailSuccessPage;
