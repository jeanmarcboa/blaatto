import ResetPassword from "@/components/Auth/ResetPassword";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Réinitialisez votre mot de passe | Blaatto",
  description: "This is forgetten password Page for Blaatto",
  // other metadata
};

const SigninPage = () => {
  return (
    <main>
      <ResetPassword />
    </main>
  );
};

export default SigninPage;
