"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import PreLoader from "@/components/Common/BtnPreLoader";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import React, { useState, useEffect } from "react";

//import accounts restAPI
import Account from "../../../app/api/account";

const Signin = () => {
  const router = useRouter();
  const { uuid } = useParams();
  const { setLoginData } = useUser();
  const [formData, setFormData] = useState({
    otp: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successFull, setSuccessfull] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccessfull(false);

    if (!formData.otp || !formData.password) {
      // alert("Veuillez remplir tous les champs");
      setLoading(false);
      setError(true);
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    if (loading) {
      return;
    }

    Account.resetPassword(uuid, formData)
      .then((response) => {
        console.log(response);
        setLoading(false);
        setSuccessfull(true);
        setTimeout(() => {
          router.push("/signin");
        }, 1000);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setError(true);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <>
      <Breadcrumb title={"Se connecter"} pages={["Signin"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex items-center justify-center space-x-3">
            {/* //Display message */}
            {successFull && (
              <div className="p-4 mb-4 text-sm text-green rounded-lg bg-green-light-5 dark:bg-gray-800 dark:text-green-400">
                <span className="font-medium">Bravo !</span> Votre mot de passe
                a été réinitialisé avec succès.
              </div>
            )}
            {error && (
              <div className="p-4 mb-4 text-sm text-red rounded-lg bg-red-light-5 dark:bg-gray-800 dark:text-red-400">
                <span className="font-medium">Oops !</span> {errorMessage}
              </div>
            )}
          </div>

          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Nouveau mot de passe
              </h2>
              <p>Entrez vos coordonnées ci-dessous</p>
            </div>

            <div>
              <form>
                <div className="mb-5">
                  <label htmlFor="email" className="block mb-2.5">
                    Code
                  </label>

                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    placeholder="Entrez votre code"
                    onChange={handleInputChange}
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2.5">
                    Nouveau mot de passe
                  </label>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Entrez votre mot de passe"
                    autoComplete="on"
                    onChange={handleInputChange}
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full flex justify-center font-medium text-white bg-green py-3 px-6 rounded-lg ease-out duration-200 hover:bg-green-dark mt-7.5"
                >
                  {loading ? <PreLoader /> : "Réinitialiser"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
