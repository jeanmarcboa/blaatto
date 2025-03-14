import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blaatto | Accueil",
  description: "This is Home for NextCommerce Template",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
