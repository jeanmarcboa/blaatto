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
  const [merchants, setMerchants] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [productsMostAsked, setProductsMostAsked] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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

  const fetchMerchants = async () => {
    accountAPI
      .userAccountList("?role=MERCHANT")
      .then((response) => {
        setMerchants(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchCustomers = async () => {
    accountAPI
      .userAccountList("?role=CUSTOMER")
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
      .orderList()
      .then((response) => {
        setOrders(response.data);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchShopList();
    fetchMerchants();
    fetchCustomers();
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <h3 className="text-lg font-semibold">Nombre de marchants</h3>
                  <p className="text-2xl">{merchants.length}</p>
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
              <h3 className="text-lg font-semibold text-dark p-6">
                Dernière Commande
              </h3>

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
              <h3 className="text-lg font-semibold text-dark">
                Produits les Plus Vendus
              </h3>
              {!fetching && <Pie data={productsMostAsked} />}
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
