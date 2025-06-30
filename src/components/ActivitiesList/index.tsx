"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "../Common/Breadcrumb";
import useUser from "@/hooks/useUser";
import PreLoader from "@/components/Common/BtnPreLoader";
import SingleItem from "./SingleItem";

import product from "@/app/api/productServices";
import orderAPI from "@/app/api/orderServices";
import shopAPI from "@/app/api/shopServices";
import logsAPI from "@/app/api/activityServices";

export const Orderstlist = () => {
  const { userInfo } = useUser();

  const [orders, setOrders] = useState([]);
  const [tmpOrders, setTmpOrders] = useState([]);
  const [shopList, setShopList] = useState([]);
  const [loading, setLoading] = useState(true);

  const OrderStatus = [
    { label: "En Attente" },
    { label: "Approuvé" },
    { label: "Annulé" },
  ];

  const handleChangeText = async (event: any) => {
    const { value } = event.target;

    if (value.length >= 2) {
      const results = tmpOrders?.filter((item: any) => {
        return item?.Transaction[0]?.reference
          .toLowerCase()
          .includes(value.toLowerCase());
      });

      setOrders(results);
    }
    if (value.length === 0) {
      setOrders(tmpOrders);
    }
  };

  const handleChangeShop = (e: any) => {
    const value = e.target.value;
    setLoading(true);
    let results = tmpOrders.filter((item: any) => item.shopId == value);
    setOrders(results);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    if (value == "all") {
      setOrders(tmpOrders);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleChangeStatus = (e: any) => {
    const value = e.target.value;
    setLoading(true);
    let results = tmpOrders.filter(
      (item: any) => item?.Transaction[0]?.status == value
    );
    setOrders(results);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    if (value == "all") {
      setOrders(tmpOrders);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const fetchShopList = () => {
    if (userInfo.role.code === "ADMIN") {
      shopAPI
        .shopList()
        .then((response) => {
          setShopList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      shopAPI
        .shopListByBusinessId(userInfo?.id, userInfo?.access_token)
        .then((response) => {
          setShopList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const fetchOrders = () => {
    let paramsData = "?accountId=" + userInfo?.id;
    orderAPI
      .orderList(
        userInfo.role.code === "ADMIN" ? "" : paramsData,
        userInfo?.access_token
      )
      .then((response) => {
        setOrders(response.data);
        setTmpOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const fetchLogsList = () => {
    logsAPI
      .logsList(userInfo.access_token)
      .then((response) => {
        // setOrders(response.data);
        // setTmpOrders(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
    fetchShopList();
    fetchLogsList();
  }, []);

  return (
    <>
      {/* <Breadcrumb title={"Favoris"} pages={["Orderstlist"]} /> */}
      <section className="overflow-hidden">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">
              Activités ({orders.length})
            </h2>
          </div>

          <div className="mb-4 flex flex-row">
            <select
              name="branche"
              onChange={handleChangeShop}
              className="w-1/4 block p-4 text-md text-gray-900 border border-gray-4 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4"
            >
              <option value="all">Toutes les boutiques</option>
              {shopList.map((shop: any) => (
                <option key={shop?.id} value={shop?.id}>
                  {shop?.label}
                </option>
              ))}
            </select>
            <select
              name="branche"
              onChange={handleChangeStatus}
              className="w-1/4 block p-4 text-md text-gray-900 border border-gray-4 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4"
            >
              <option value="all">Toutes les status</option>
              {OrderStatus.map((item: any) => (
                <option key={item?.label} value={item?.label}>
                  {item?.label}
                </option>
              ))}
            </select>

            <div className="w-3/4">
              <div className="relative">
                <input
                  type="search"
                  // value={searchValue}
                  onChange={handleChangeText}
                  className="block w-full p-4 ps-10 text-md text-gray-900 border border-gray-4 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Rechercher une transaction..."
                  required
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[10px] border border-gray-4 dark:border-gray-800 overflow-hidden">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[1170px]">
                {/* <!-- table header --> */}
                <div className="flex items-center bg-gray-1 py-5.5 px-10">
                  {/* <div className="min-w-[83px]"></div> */}
                  <div className="min-w-[250px]">
                    <p className="text-dark">Reférence</p>
                  </div>

                  <div className="min-w-[180px]">
                    <p className="text-dark">Date</p>
                  </div>

                  <div className="min-w-[125px]">
                    <p className="text-dark">État</p>
                  </div>
                  {userInfo.role.code !== "ADMIN" && (
                    <div className="min-w-[180px]">
                      <p className="text-dark">Total</p>
                    </div>
                  )}
                  <div
                    className={
                      userInfo.role.code === "ADMIN"
                        ? "min-w-[375px]"
                        : "min-w-[250px]"
                    }
                  >
                    <p className="text-dark">Commande</p>
                  </div>

                  <div className="min-w-[100px]">
                    <p className="text-dark text-right">Action</p>
                  </div>
                </div>

                {/* <!-- wish item --> */}
                {orders.map((item, key) => (
                  <SingleItem item={item} key={key} />
                ))}
                {!loading && orders.length === 0 && (
                  <div className="flex items-center justify-center py-5.5 px-10">
                    <div className="min-w-[350px]">
                      <p className="text-dark">
                        Vous n&apos;avez aucune transaction !
                      </p>
                    </div>
                  </div>
                )}
                {loading && (
                  <div className="flex justify-center items-center m-4">
                    <PreLoader color="green" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
