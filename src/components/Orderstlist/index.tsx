"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "../Common/Breadcrumb";
import { useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";

import product from "@/app/api/product";
import orderAPI from "@/app/api/order";

export const Orderstlist = () => {
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);
  const [orders, setOrders] = useState([]);

  const fetchProducts = () => {
    orderAPI
      .orderList()
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {/* <Breadcrumb title={"Favoris"} pages={["Orderstlist"]} /> */}
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">
              Mes commandes ({orders.length})
            </h2>
          </div>

          <div className="bg-white rounded-[10px] shadow-1">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[1170px]">
                {/* <!-- table header --> */}
                <div className="flex items-center py-5.5 px-10">
                  {/* <div className="min-w-[83px]"></div> */}
                  <div className="min-w-[350px]">
                    <p className="text-dark">Commande</p>
                  </div>

                  <div className="min-w-[205px]">
                    <p className="text-dark">Date</p>
                  </div>

                  <div className="min-w-[100px]">
                    <p className="text-dark">État</p>
                  </div>
                  <div className="min-w-[205px]">
                    <p className="text-dark text-center">Total</p>
                  </div>

                  <div className="min-w-[150px]">
                    <p className="text-dark text-right">Action</p>
                  </div>
                </div>

                {/* <!-- wish item --> */}
                {orders.map((item, key) => (
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
