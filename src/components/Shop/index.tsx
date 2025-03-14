"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "../Common/Breadcrumb";
import PreLoader from "@/components/Common/BtnPreLoader";
import { useAppSelector } from "@/redux/store";
import useUser from "@/hooks/useUser";
import SingleItem from "./shopList/SingleItem";

import productAPI from "@/app/api/product";
import shopAPI from "@/app/api/shop";

export const ShopList = () => {
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);
  const [shopList, setShopList] = useState([]);
  const { setLoginData, userInfo } = useUser();
  console.log(userInfo);
  const [formData, setFormData] = useState({
    label: "",
    phoneNumber: "",
    accountId: userInfo.id,
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    shopAPI
      .createShop(formData)
      .then((response) => {
        console.log(response);
        setLoading(false);
        setLoginData(response.data);
        fetchShopList();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const fetchShopList = () => {
    shopAPI
      .shopListByBusinessId(userInfo.accountId)
      .then((response) => {
        setShopList(response.data);
        setPageLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPageLoading(false);
      });
  };

  useEffect(() => {
    fetchShopList();
  }, []);

  return (
    <>
      {/* <Breadcrumb title={"Favoris"} pages={["ShopList"]} /> */}
      <section className="overflow-hidden pb-20 bg-gray-2 h-screen">
        <div className="w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">Mes boutiques</h2>
          </div>
          <div className="flex flex-row flex-wrap gap-4">
            <div className="w-[30%]">
              <h2 className="font-medium text-dark text-xl mb-4">
                Ajouter une boutique
              </h2>
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
                    value={formData?.label}
                    className="rounded-lg border border-gray-3 bg-white placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
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
                    value={formData?.phoneNumber}
                    className="rounded-lg border border-gray-3 bg-white placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-[30%] flex justify-center font-medium text-white bg-green py-3 px-6 rounded-lg ease-out duration-200 hover:bg-green-dark mt-7.5"
                >
                  {!loading && "Enregistrer"}
                  {loading && <PreLoader />}
                </button>
              </form>
            </div>
            <div className="w-[68%] bg-white rounded-[10px] shadow-1">
              <div className="w-full overflow-x-auto">
                <div className="min-w-full">
                  {/* <!-- table header --> */}
                  <div className="flex items-center py-5.5 px-10">
                    {/* <div className="min-w-[83px]"></div> */}
                    <div className="min-w-[40%]">
                      <p className="text-dark">Nom</p>
                    </div>

                    <div className="min-w-[30%]">
                      <p className="text-dark">Contact</p>
                    </div>

                    <div className="min-w-[10%]">
                      <p className="text-dark">Produit</p>
                    </div>

                    <div className="min-w-[20%]">
                      <p className="text-dark text-right">Action</p>
                    </div>
                  </div>

                  {/* <!-- wish item --> */}
                  {shopList.map((item, key) => (
                    <SingleItem item={item} key={key} />
                  ))}
                  {pageLoading && (
                    <div className="flex justify-center items-center">
                      <PreLoader color="green" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
