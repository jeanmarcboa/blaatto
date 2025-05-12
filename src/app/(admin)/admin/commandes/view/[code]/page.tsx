// pages/admin/add-product.js
"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import sepMillier from "@/components/Common/numberSeparator";
import { useParams, useRouter } from "next/navigation";
import PageLoader from "@/components/Common/PreLoader";
import PreLoader from "@/components/Common/BtnPreLoader";
import product from "@/app/api/productServices";
import orderAPI from "@/app/api/orderServices";

export default function AddProduct() {
  const { code } = useParams();
  const [details, setDetails] = useState<any>([]);
  const [status, setStatus] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successFull, setSuccessfull] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const OrderStatus = [
    { label: "En Cours" },
    { label: "Payé" },
    { label: "En traitement" },
    { label: "Expédié" },
    { label: "Livré" },
    { label: "Annulé" },
  ];

  const fetchOrderDetails = () => {
    orderAPI
      .orderDetail(code)
      .then((response) => {
        setDetails(response.data);
        setPageLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccessfull(false);
    let data = {
      status: status,
    };

    // Envoi des données au backend
    orderAPI
      .updateOrder(details.id, data)
      .then((data) => {
        console.log("Produit ajouté avec succès:", data);
        setTimeout(() => {
          setSuccessfull(true);
          fetchOrderDetails();
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du produit:", error);
        setTimeout(() => {
          setLoading(false);
          setError(true);
          setErrorMessage(error.response.data.message);
        }, 2000);
      });
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <>
      <div className="p-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Détails Commande
        </h1>
        {successFull && (
          <div className="p-4 mb-4 text-sm text-green rounded-lg bg-green-light-5 dark:bg-gray-800 dark:text-green-400 w-full">
            <span className="font-medium">Bravo !</span> Commande modifié avec
            succès.
          </div>
        )}

        {error && (
          <div className="p-4 mb-4 text-sm text-red rounded-lg bg-red-light-5 dark:bg-gray-800 dark:text-red-400 w-full">
            <span className="font-medium">Oops !</span> {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-row flex-wrap gap-5">
            <div className="xl:max-w-[70%] w-full">
              {/* Informations Générales */}
              <div className="rounded-xl bg-white shadow-1 border-[1px] border-solid border-gray-4">
                <div className="border-b-[1px] border-solid border-gray-4 pl-6 pr-6 pt-2 pb-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Informations Générales
                  </h2>
                </div>
                <div className="p-6 flex flex-row flex-wrap gap-4">
                  <div className="md:w-[36%]">
                    <h3 className="font-bold">Général</h3>
                    <div>
                      <p>Status actuel :</p>
                      <span>{details?.status}</span>
                    </div>
                    <div>
                      <p>Date de création :</p>
                      <span>
                        {dayjs(details?.createdAt).format("DD-MM-YYYY, HH:mm")}
                      </span>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Etat
                      </label>
                      <select
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Choisir un état</option>
                        {OrderStatus.map((item) => (
                          <option key={item?.label} value={item?.label}>
                            {item?.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="md:w-[30%]">
                    <h3 className="font-bold">Facturation</h3>
                    <div className="flex flex-col">
                      <span>
                        {details?.customFields?.firstname ??
                          details?.account?.firstname}{" "}
                        {details?.customFields?.lastname ??
                          details?.account?.lastname}
                      </span>
                      <span>
                        {details?.customFields?.address ??
                          details?.account?.address}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold mt-4">Email</h3>
                      <div>
                        <span>
                          {details?.customFields?.email ??
                            details?.account?.email ??
                            "--"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold mt-4">Téléphone</h3>
                      <div>
                        <span>
                          {details?.customFields?.phoneNumber ??
                            details?.account?.phoneNumber ??
                            "--"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-[30%]">
                    <h3 className="font-bold">Expédition</h3>
                    <div className="flex flex-col">
                      <span>
                        {details?.customFields?.firstname ??
                          details?.account?.firstname ??
                          "--"}{" "}
                        {details?.customFields?.lastname ??
                          details?.account?.lastname ??
                          "--"}
                      </span>
                      <span>
                        {details?.customFields?.address ??
                          details?.account?.address ??
                          "--"}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold mt-4">Email</h3>
                      <div>
                        <span>
                          {details?.customFields?.email ??
                            details?.account?.email ??
                            "--"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold mt-4">Téléphone</h3>
                      <div>
                        <span>
                          {details?.customFields?.phoneNumber ??
                            details?.account?.phoneNumber ??
                            "--"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Détails du Produit */}
              <div className="rounded-xl bg-white shadow-1 border-[1px] border-solid border-gray-4 mt-4">
                <div className="border-b-[1px] border-solid border-gray-4 pl-6 pr-6 pt-2 pb-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Articles
                  </h2>
                </div>
                <div className="p-6">
                  <div className="w-full overflow-x-auto">
                    <div>
                      {/* <!-- table header --> */}
                      <div className="flex items-center py-5.5 px-10">
                        {/* <div className="min-w-[83px]"></div> */}
                        <div className="min-w-[45%]">
                          <p className="text-dark">Article</p>
                        </div>

                        <div className="min-w-[25%]">
                          <p className="text-dark text-right">Coût</p>
                        </div>

                        <div className="min-w-[10%]">
                          <p className="text-dark text-right">Qté</p>
                        </div>
                        <div className="min-w-[20%]">
                          <p className="text-dark text-right">Total</p>
                        </div>
                      </div>
                      {details?.OrderItem?.map((item: any, key: number) => (
                        <div
                          className="flex items-center py-5.5 px-10"
                          key={key}
                        >
                          <div className="min-w-[45%]">
                            <p className="text-dark">{item?.product?.label}</p>
                          </div>

                          <div className="min-w-[25%]">
                            <p className="text-dark text-right">
                              {sepMillier(item?.product?.price)}{" "}
                              {item?.product?.currency}
                            </p>
                          </div>

                          <div className="min-w-[10%]">
                            <p className="text-dark text-right">
                              {item?.quantity}
                            </p>
                          </div>
                          <div className="min-w-[20%]">
                            <p className="text-dark text-right">
                              {sepMillier(item?.price)}{" "}
                              {item?.product?.currency}
                            </p>
                          </div>
                        </div>
                      ))}
                      {/* <!-- wish item --> */}
                      {/* {orders.map((item, key) => (
                  <SingleItem item={item} key={key} />
                ))} */}
                      {/* <SingleOrderItem/> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:max-w-[25%] w-full">
              {/* Bouton de soumission */}
              <div className="rounded-xl bg-white shadow-1 border-[1px] border-solid border-gray-4">
                <div className="border-b-[1px] border-solid border-gray-4 pl-6 pr-6 pt-2 pb-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Actions de commande
                  </h2>
                </div>
                <div className="p-6">
                  <button
                    type="submit"
                    className="flex flex-row justify-center w-full text-center font-medium text-custom-sm text-white bg-green py-[11px] px-9.5 rounded-md ease-out duration-200 hover:bg-green-dark mt-7.5"
                  >
                    {!loading ? "Mettre à jour" : <PreLoader />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {pageLoading && <PageLoader />}
    </>
  );
}
