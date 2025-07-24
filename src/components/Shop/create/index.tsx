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
    address: "",
    commercialRegister: "",
    accountId: userInfo.id,
  });
  const [document, setDocument] = useState({
    cni: null,
    cert: null,
  });
  const [docType, setDocType] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: any) => {
    const { name, files } = e.target;
    setDocument({ ...document, [name]: files[0] });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    Shop.createShop(formData, userInfo?.access_token)
      .then((response) => {
        const CNI_ID = docType.find((item) => item.code === "CNI");
        const CERT_ID = docType.find((item) => item.code === "CERT");

        if (document.cni) {
          const formData = new FormData();
          formData.append("file", document?.cni);
          formData.append("documentTypeId", CNI_ID.id);

          Account.uploadDocument(formData, userInfo.access_token)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }

        if (document.cert) {
          const formData = new FormData();
          formData.append("file", document?.cert);
          formData.append("documentTypeId", CERT_ID.id);

          Account.uploadDocument(formData, userInfo.access_token)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        console.log(response);
        setLoading(false);
        router.push("/business/product/product-list");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    Account.documentsTypes()
      .then((response) => {
        console.log(response);
        setDocType(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <section className="overflow-hidden py-10 px-20">
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
                  <label htmlFor="email" className="block mb-2.5">
                    Numéro de registre de commerce
                  </label>

                  <input
                    type="text"
                    name="commercialRegister"
                    id="commercialRegister"
                    placeholder="Entrez le numéro de registre de commerce"
                    onChange={handleInputChange}
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="address" className="block mb-2.5">
                    Adresse
                  </label>

                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Entrez l'adresse de votre boutique"
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

                <div className="mb-5">
                  <p className="block mb-2.5">
                    Documents justcificatifs d&#39;identité et d&#39;activité
                  </p>
                </div>

                <div className="mb-5">
                  <label htmlFor="cni" className="block mb-2.5">
                    Carte d&#39;identité
                  </label>

                  <input
                    type="file"
                    name="cni"
                    id="cni"
                    onChange={handleFileChange}
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="cert" className="block mb-2.5">
                    Justificatif d&#39;activité
                  </label>
                  <input
                    type="file"
                    name="cert"
                    id="cert"
                    onChange={handleFileChange}
                    required
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
