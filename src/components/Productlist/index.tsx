"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "../Common/Breadcrumb";
import { useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";
import useUser from "@/hooks/useUser";

import product from "@/app/api/product";

export const Productlist = () => {
  const { userInfo } = useUser();
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    product
      .productList()
      .then((response) => {
        let results = response.data.filter(
          (item: any) => item.shop.accountId === userInfo.accountId
        );
        console.log("userInfo.id", userInfo.id);
        console.log("userInfo.id", userInfo.accountId);
        setProducts(results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProducts();
    console.log("id", userInfo.id);
    console.log("accountId", userInfo.accountId);
  }, []);

  return (
    <>
      {/* <Breadcrumb title={"Favoris"} pages={["Productlist"]} /> */}
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">Mes produits</h2>
            <Link
              href="/business/product/add-product"
              className="flex justify-center font-medium text-white bg-green py-3 px-6 rounded-lg ease-out duration-200 hover:bg-green-dark"
            >
              Ajouter un produit
            </Link>
          </div>

          <div className="bg-white rounded-[10px] shadow-1">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[1170px]">
                {/* <!-- table header --> */}
                <div className="flex items-center py-5.5 px-10">
                  {/* <div className="min-w-[83px]"></div> */}
                  <div className="min-w-[450px]">
                    <p className="text-dark">Produit</p>
                  </div>

                  <div className="min-w-[205px]">
                    <p className="text-dark">Prix unitaire</p>
                  </div>

                  <div className="min-w-[265px]">
                    <p className="text-dark">État des stocks</p>
                  </div>

                  <div className="min-w-[150px]">
                    <p className="text-dark text-right">Action</p>
                  </div>
                </div>

                {/* <!-- wish item --> */}
                {products.map((item, key) => (
                  <SingleItem item={item} key={key} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
