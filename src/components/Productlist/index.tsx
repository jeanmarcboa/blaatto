"use client";
import React, { useState, useEffect } from "react";
import {
  Message,
  useToaster,
  ButtonToolbar,
  SelectPicker,
  Button,
} from "rsuite";
import Link from "next/link";
import Breadcrumb from "../Common/Breadcrumb";
import PreLoader from "@/components/Common/BtnPreLoader";
import { useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";
import useUser from "@/hooks/useUser";

import product from "@/app/api/product";
import shopAPI from "@/app/api/shop";

export const Productlist = () => {
  const { userInfo } = useUser();
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);
  const [products, setProducts] = useState([]);
  const [tmpProducts, setTmpProducts] = useState([]);
  const [shopList, setShopList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [messageAlert, setMessageAlert] = useState([]);

  const ProductsStatus = [
    { label: "Publié", value: "1" },
    { label: "Désactivé", value: "0" },
  ];

  const handleChangeText = async (event: any) => {
    const { value } = event.target;

    if (value.length >= 2) {
      const results = tmpProducts?.filter((item: any) => {
        return item.label.toLowerCase().includes(value.toLowerCase());
      });

      setProducts(results);
    }
    if (value.length === 0) {
      setProducts(tmpProducts);
    }
  };

  const handleChangeShop = (e: any) => {
    const value = e.target.value;
    setLoading(true);
    let results = tmpProducts.filter((item: any) => item.shopId == value);
    setProducts(results);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    if (value == "all") {
      setProducts(tmpProducts);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleChangeStatus = (e: any) => {
    const value = e.target.value == "1" ? true : false;
    const value02 = e.target.value;
    console.log(e.target.value, e.target.value ? true : false);

    setLoading(true);
    let results = tmpProducts.filter((item: any) => item?.enabled == value);
    setProducts(results);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    if (value02 == "all") {
      setProducts(tmpProducts);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const checkStockForAllProducts = (products) => {
    products.forEach((product) => {
      if (product.stock <= 700) {
        // Make sure that only one alert is triggered for each condition
        let tmpAlert = `Il ne reste plus que ${product.stock} article(s) en stock pour ${product.label}.`;
        //check is tmpAlert message is already in the messageAlert array before pushing
        const results = messageAlert.filter(
          (item) => item?.message == tmpAlert
        );
        if (results.length === 0) {
          // Push tmpAlert message to the setMessageAlert
          setMessageAlert((prev) => [...prev, { message: tmpAlert }]);
        }
      }
    });
  };

  const fetchProducts = () => {
    product
      .productList()
      .then((response) => {
        if (userInfo.role.code === "ADMIN") {
          setProducts(response.data);
          setTmpProducts(response.data);
        } else {
          let results = response.data.filter(
            (item: any) => item.shop.accountId === userInfo.id
          );
          console.log("userInfo.id", userInfo.id);
          console.log("userInfo.id", userInfo.accountId);
          setProducts(results);
          setTmpProducts(results);
          checkStockForAllProducts(results);
        }

        setPageLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPageLoading(false);
      });
  };

  const fetchShopList = () => {
    shopAPI
      .shopListByBusinessId(userInfo?.id)
      .then((response) => {
        setShopList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchShopList();
    console.log("id", userInfo.id);
    console.log("accountId", userInfo.accountId);
  }, []);

  return (
    <>
      {/* <Breadcrumb title={"Favoris"} pages={["Productlist"]} /> */}
      <section className="overflow-hidden py-20 bg-gray-2 min-h-screen">
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
          <div className="mb-4">
            {!pageLoading &&
              messageAlert.map((mgs: any, index: number) => (
                <Message showIcon type="warning" closable key={index}>
                  <strong>Alert!</strong> {mgs?.message}
                </Message>
              ))}
          </div>
          <div className="mb-4 flex flex-row">
            <select
              name="branche"
              onChange={handleChangeShop}
              className="w-1/4 block p-4 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4"
            >
              <option value="all">Toutes les boutiques</option>
              {shopList.map((shop: any) => (
                <option key={shop?.id} value={shop?.id}>
                  {shop?.label}
                </option>
              ))}
            </select>
            <select
              name="status"
              onChange={handleChangeStatus}
              className="w-1/4 block p-4 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4"
            >
              <option value="all">Toutes les status</option>
              {ProductsStatus.map((item: any) => (
                <option key={item?.value} value={item?.value}>
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
                  className="block w-full p-4 ps-10 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Rechercher une commande..."
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
                  <div className="min-w-[450px]">
                    <p className="text-dark">Produit</p>
                  </div>

                  <div className="min-w-[205px]">
                    <p className="text-dark">Prix unitaire</p>
                  </div>

                  <div className="min-w-[205px]">
                    <p className="text-dark">État des stocks</p>
                  </div>

                  <div className="min-w-[110px]">
                    <p className="text-dark">Status</p>
                  </div>
                  <div className="min-w-[150px]">
                    <p className="text-dark text-right">Action</p>
                  </div>
                </div>

                {/* <!-- wish item --> */}
                {!pageLoading &&
                  products.map((item, key) => (
                    <SingleItem item={item} key={key} />
                  ))}
                {pageLoading && (
                  <div className="flex justify-center items-center m-4">
                    <PreLoader color="green" />
                  </div>
                )}
                {!pageLoading && products.length === 0 && (
                  <div className="flex justify-center items-center m-4">
                    Aucun produit trouvé.
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
