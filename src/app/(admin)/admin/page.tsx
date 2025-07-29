"use client";

import Home from "@/components/Home";
import React, { useState, useEffect } from "react";
import {
  FiShoppingCart,
  FiBarChart,
  FiHome,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Metadata } from "next";
import PreLoader from "@/components/Common/BtnPreLoader";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import SingleItem from "@/components/Orderstlist/ShortSingleItem";
ChartJS.register(ArcElement, Tooltip, Legend);

import accountAPI from "@/app/api/accountServices";
import productAPI from "@/app/api/productServices";
import orderAPI from "@/app/api/orderServices";
import shopAPI from "@/app/api/shopServices";
import { sortBy } from "lodash";

// export const metadata: Metadata = {
//   title: "Blaatto | Accueil",
//   description: "This is Home for NextCommerce Template",
//   // other metadata
// };

export default function HomePage() {
  const router = useRouter();
  const { userInfo, isLoggedIn } = useUser();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [shops, setShops] = useState([]);
  const [pendingShops, setPendingShops] = useState([]);
  const [tmpOrders, setTmpOrders] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [productsMostAsked, setProductsMostAsked] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [fetchingStat, setFetchingStat] = useState(true);
  const [sortBy, setSortBy] = useState("price");
  const [selectedShop, setSelectedShop] = useState("");

  const handleProductsMostAsked = (uuid: string, sortBy: string) => {
    setTimeout(() => {
      setFetchingStat(true);
    }, 1000);
    setSortBy(sortBy);
    setSelectedShop(uuid);
    let query = "limit=5&sortBy=" + { sortBy } + "&enabledOnly=true";
    productAPI.productListTopSelling(uuid, query).then((response) => {
      const data = [];
      const labels = [];
      for (let i = 0; i < response.data.length; i++) {
        sortBy === "price" && data.push(response.data[i].total_revenue);
        sortBy === "quantity" && data.push(response.data[i].quantity_sold);
        labels.push(
          response.data[i].product_details?.designation?.label ?? "produit-" + i
        );
      }
      let tmpMetierMostAsked = {
        labels: labels,
        datasets: [
          {
            label: "# of Votes",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
      setProductsMostAsked(tmpMetierMostAsked);
      setTimeout(() => {
        setFetchingStat(false);
      }, 2000);
    });
  };

  const handleChangeShop = (e: any) => {
    const value = e.target.value;
    setLoading(true);

    if (value == "all") {
      setOrders(tmpOrders);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      let results = tmpOrders.filter(
        (item: any) => item.OrderItem[0].product.shopId == value
      );
      setTimeout(() => {
        setOrders(results);
        setLoading(false);
      }, 1000);
    }
  };

  const fetchMerchants = async () => {
    accountAPI
      .userAccountList("?role=MERCHANT", userInfo?.access_token)
      .then((response) => {
        setMerchants(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchCustomers = async () => {
    accountAPI
      .userAccountList("?role=CUSTOMER", userInfo?.access_token)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchProducts = async () => {
    productAPI
      .productList()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchOrders = async () => {
    orderAPI
      .orderList("", userInfo?.access_token)
      .then((response) => {
        setOrders(response.data);
        setTmpOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchShopList = () => {
    shopAPI
      .shopList()
      .then((response) => {
        setShops(response.data);
        if (response.data.length > 0) {
          setTimeout(() => {
            handleProductsMostAsked(response.data?.[0]?.id, "price");
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    shopAPI
      .shopList("?enabled=false")
      .then((response) => {
        setPendingShops(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/signin");
      return;
    } else {
      fetchProducts();
      fetchOrders();
      fetchShopList();
      fetchMerchants();
      fetchCustomers();
    }
  }, []);

  return (
    <>
      {/* <Home /> */}
      <div className="bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-300 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Nombre de Boutiques */}
            <div className="bg-[#800080] p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
              <div className="flex items-center">
                <FiHome className="w-12 h-12 text-white" />
                <div className="ml-4 text-white">
                  <h3 className="text-lg font-semibold">
                    Boutiques en attente de validation
                  </h3>
                  <p className="text-2xl">{pendingShops.length}</p>
                </div>
              </div>
            </div>

            {/* Nombre de Boutiques */}
            <div className="bg-red p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
              <div className="flex items-center">
                <FiHome className="w-12 h-12 text-white" />
                <div className="ml-4 text-white">
                  <h3 className="text-lg font-semibold">Nombre de Boutiques</h3>
                  <p className="text-2xl">{shops.length}</p>
                </div>
              </div>
            </div>
            {/* Nombre de clients */}
            <div className="bg-teal p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
              <div className="flex items-center">
                <FiUsers className="w-12 h-12 text-white" />
                <div className="ml-4 text-white">
                  <h3 className="text-lg font-semibold">Nombre de clients</h3>
                  <p className="text-2xl">{customers.length}</p>
                </div>
              </div>
            </div>
            {/* Nombre de marchants */}
            <div className="bg-green p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
              <div className="flex items-center">
                <FiUsers className="w-12 h-12 text-white" />
                <div className="ml-4 text-white">
                  <h3 className="text-lg font-semibold">
                    Nombre de commerçants
                  </h3>
                  <p className="text-2xl">{merchants.length}</p>
                </div>
              </div>
            </div>

            {/* Nombre de Produits */}
            <div className="bg-blue p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
              <div className="flex items-center">
                <FiBarChart className="w-12 h-12 text-white" />
                <div className="ml-4 text-white">
                  <h3 className="text-lg font-semibold">Nombre de Produits</h3>
                  <p className="text-2xl">
                    {products.length < 10
                      ? "0" + products.length
                      : products.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Nombre de Commandes */}
            <div className="bg-yellow p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
              <div className="flex items-center">
                <FiShoppingCart className="w-12 h-12 text-white" />
                <div className="ml-4 text-white">
                  <h3 className="text-lg font-semibold">Nombre de Commandes</h3>
                  <p className="text-2xl">
                    {orders.length < 10 ? "0" + orders.length : orders.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6 md:gap-6 mt-10 mb-10">
            {/* Dernière Commande */}
            <div className="col-span-12 xl:col-span-7 bg-white rounded-[10px] border border-gray-4 dark:border-gray-800 overflow-hidden transition duration-300">
              <div className="flex flex-row justify-between items-center p-6 w-full">
                <h3 className="text-lg font-semibold text-dark">
                  Dernière Commande
                </h3>
                <select
                  name="branche"
                  onChange={handleChangeShop}
                  className="block p-4 text-md text-gray-900 border border-gray-4 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="all">Toutes les boutiques</option>
                  {shops.map((shop: any) => (
                    <option key={shop?.id} value={shop?.id}>
                      {shop?.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full overflow-x-auto">
                <div className="w-full">
                  {/* <!-- table header --> */}
                  <div className="flex items-center py-5.5 px-5 bg-gray-1">
                    {/* <div className="min-w-[83px]"></div> */}
                    <div className="min-w-[40%]">
                      <p className="text-dark">Commande</p>
                    </div>

                    <div className="min-w-[25%]">
                      <p className="text-dark">Date</p>
                    </div>

                    <div className="min-w-[25%]">
                      <p className="text-dark">État</p>
                    </div>

                    <div className="min-w-[10%]">
                      <p className="text-dark text-right"></p>
                    </div>
                  </div>

                  {/* <!-- wish item --> */}
                  {!loading &&
                    orders
                      .slice(0, 6)
                      .map((item, key) => <SingleItem item={item} key={key} />)}
                  {!loading && orders.length === 0 && (
                    <div className="flex items-center justify-center py-5.5 px-5">
                      <div className="min-w-[350px]">
                        <p className="text-dark">
                          Vous n&apos;avez aucune commande !
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

            {/* Produits les Plus Vendus */}
            <div className="col-span-12 xl:col-span-5 p-6 bg-white rounded-[10px] border border-gray-4 dark:border-gray-800 overflow-hidden transition duration-300">
              <h3 className="text-lg font-semibold text-dark mb-4">
                Produits les Plus Vendus
              </h3>
              <div className="mb-4 flex flex-row justify-start gap-4 items-center w-full">
                <select
                  name="branche"
                  value={selectedShop}
                  onChange={(e) =>
                    handleProductsMostAsked(e.target.value, sortBy)
                  }
                  className="block p-4 text-md text-gray-900 border border-gray-4 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="all">Toutes les boutiques</option>
                  {shops?.map((shop: any) => (
                    <option key={shop?.id} value={shop?.id}>
                      {shop?.label}
                    </option>
                  ))}
                </select>
                <select
                  name="branche"
                  onChange={(e) =>
                    handleProductsMostAsked(selectedShop, e.target.value)
                  }
                  className="block p-4 text-md text-gray-900 border border-gray-4 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="price">Par prix</option>
                  <option value="quantity">Par quantité</option>
                </select>
              </div>
              {!fetchingStat && <Pie data={productsMostAsked} />}
              {fetchingStat && (
                <div className="flex justify-center items-center m-4">
                  <PreLoader color="green" />
                </div>
              )}
              {/* <ul className="space-y-3 text-white">
                {data.produitsLesPlusVendus.map((produit, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{produit.nom}</span>
                    <span className="font-semibold">
                      {produit.ventes} ventes
                    </span>
                  </li>
                ))}
              </ul> */}
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}
