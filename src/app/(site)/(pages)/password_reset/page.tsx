import PasswordReset from "@/components/Auth/PasswordReset";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Mot de passe oublé ? | Blaatto",
  description: "This is forgetten password Page for Blaatto",
  // other metadata
};

const SigninPage = () => {
  return (
    <main>
      <PasswordReset />
    </main>
  );
};

export default SigninPage;
