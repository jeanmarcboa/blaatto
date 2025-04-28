"use client";

import Home from "@/components/Home";
import React, { useState, useEffect } from "react";
import {
  FiShoppingCart,
  FiBarChart,
  FiHome,
  FiTrendingUp,
} from "react-icons/fi";
import {
  Message,
  useToaster,
  ButtonToolbar,
  SelectPicker,
  Button,
} from "rsuite";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Metadata } from "next";
import PreLoader from "@/components/Common/BtnPreLoader";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import SingleItem from "@/components/Orderstlist/ShortSingleItem";
ChartJS.register(ArcElement, Tooltip, Legend);
import productAPI from "@/app/api/productServices";
import orderAPI from "@/app/api/orderServices";
import shopAPI from "@/app/api/shopServices";

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
  const [tmpOrders, setTmpOrders] = useState([]);
  const [shops, setShops] = useState([]);
  const [productsMostAsked, setProductsMostAsked] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [messageAlert, setMessageAlert] = useState([]);
  const data = {
    boutiques: 5,
    produits: 120,
    commandes: 245,
    dernierCommande: "Client123 - 2025-04-15",
    produitsLesPlusVendus: [
      { nom: "Produit A", ventes: 50 },
      { nom: "Produit B", ventes: 45 },
      { nom: "Produit C", ventes: 40 },
    ],
  };

  const handleChangeShop = (e: any) => {
    const value = e.target.value;
    setLoading(true);
    let results = tmpOrders.filter((item: any) => item.shopId == value);
    setProducts(results);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    if (value == "all") {
      setProducts(tmpOrders);
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

        // Push tmpAlert message to the setMessageAlert
        setMessageAlert((prev) => [...prev, { message: tmpAlert }]);
      }
    });
  };

  const handleProductsMostAsked = (data: any) => {
    setTimeout(() => {
      setFetching(false);
    }, 1000);
    // const recruitMostAsked = data.filter(
    //   (item: any) =>
    //     item.title === "Les compétences les plus demandées au recrutement"
    // );
    // const tmpMetiers = recruitMostAsked[0].classement.map((item: any) => ({
    //   title: item.metier,
    //   value: item.value,
    // }));
    // let tmpMetierName: string[] = [];
    // tmpMetiers.map((item: any) => tmpMetierName.push(item.title));
    // let tmpMetierValue: number[] = [];
    // tmpMetiers.map((item: any) => tmpMetierValue.push(item.value));
    let tmpMetierMostAsked = {
      labels: ["A", "B", "C", "D", "E"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2],
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
      setFetching(false);
    }, 2000);
  };

  const fetchProducts = async () => {
    productAPI
      .productList()
      .then((response) => {
        if (userInfo.role.code === "ADMIN") {
          setProducts(response.data);
        } else {
          let results = response.data.filter(
            (item: any) => item.shop.accountId === userInfo.id
          );
          setProducts(results);
          checkStockForAllProducts(results);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchOrders = async () => {
    let paramsData = "?accountId=" + userInfo?.id;
    orderAPI
      .orderList(paramsData)
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
      .shopListByBusinessId(userInfo?.id)
      .then((response) => {
        setShops(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchShopList();
    handleProductsMostAsked("");
  }, []);

  return (
    <>
      {/* <Home /> */}
      <div className="bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-300 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Tableau de Bord
          </h2>
          <div className="mb-4">
            {messageAlert.map((mgs: any, index: number) => (
              <Message showIcon type="warning" closable key={index}>
                <strong>Alert!</strong> {mgs?.message}
              </Message>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Nombre de Boutiques */}
            <div className="bg-green p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
              <div className="flex items-center">
                <FiHome className="w-12 h-12 text-white" />
                <div className="ml-4 text-white">
                  <h3 className="text-lg font-semibold">Nombre de Boutiques</h3>
                  <p className="text-2xl">{shops.length}</p>
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
          <div className="grid grid-cols-12 gap-6 md:gap-6 mt-10">
            {/* Dernière Commande */}
            <div className="col-span-12 xl:col-span-7 bg-white rounded-[10px] border border-gray-4 dark:border-gray-800 overflow-hidden transition duration-300">
              <div className="flex flex-row justify-between items-center p-6 w-full">
                <h3 className="text-lg font-semibold text-dark">
                  Dernière Commande
                </h3>
                <select
                  name="branche"
                  onChange={handleChangeShop}
                  className="block p-4 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    orders.map((item, key) => (
                      <SingleItem item={item} key={key} />
                    ))}
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
              <div className="mb-4 flex flex-row justify-between items-center w-full">
                <h3 className="text-lg font-semibold text-dark">
                  Produits les Plus Vendus
                </h3>
                <select
                  name="branche"
                  onChange={handleChangeShop}
                  className="block p-4 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="all">Toutes les boutiques</option>
                  {shops.map((shop: any) => (
                    <option key={shop?.id} value={shop?.id}>
                      {shop?.label}
                    </option>
                  ))}
                </select>
              </div>
              {!fetching && <Pie data={productsMostAsked} />}
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}
