"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import React, { useState, useEffect } from "react";

//import accounts restAPI
import Account from "../../../app/api/accountServices";
import Shop from "../../../app/api/shopServices";

const ShopCreation = () => {
  const router = useRouter();
  const { setLoginData, userInfo } = useUser();
  console.log(userInfo);
  const [formData, setFormData] = useState({
    label: "",
    phoneNumber: "",
    accountId: userInfo.id,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    Shop.createShop(formData, userInfo?.access_token)
      .then((response) => {
        console.log(response);
        setLoading(false);
        router.push("/business/product/product-list");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <section className="overflow-hidden py-40 px-20">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Bienvenue {userInfo?.firstname} {userInfo?.lastname}
              </h2>
              <p>
                Entrez les informations ci-dessous pour la création de votre
                boutique
              </p>
            </div>

            <div>
              <form>
                <div className="mb-5">
                  <label htmlFor="email" className="block mb-2.5">
                    Nom de la boutique
                  </label>

                  <input
                    type="text"
                    name="label"
                    id="label"
                    placeholder="Entrez le nom de votre boutique"
                    onChange={handleInputChange}
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="phoneNumber" className="block mb-2.5">
                    Contact
                  </label>

                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Entrez le contact de votre boutique"
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
                  Créer ma boutique
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopCreation;
