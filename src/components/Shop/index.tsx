"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "../Common/Breadcrumb";
import PreLoader from "@/components/Common/BtnPreLoader";
import { useAppSelector } from "@/redux/store";
import useUser from "@/hooks/useUser";
import SingleItem from "./shopList/SingleItem";
import ShopEditModal from "./ShopEditModal";

import productAPI from "@/app/api/product";
import shopAPI from "@/app/api/shop";
import accountAPI from "@/app/api/account";

export const ShopList = () => {
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);
  const [shopList, setShopList] = useState([]);
  const [shopTmpList, setShopTmpList] = useState([]);
  const { setLoginData, userInfo } = useUser();
  const [formData, setFormData] = useState({
    label: "",
    phoneNumber: "",
    description: "",
    address: "",
    accountId: userInfo?.role?.code === "ADMIN" ? "" : userInfo.id,
  });
  const [item, setItem] = useState<any>({});
  const [merchantList, setMerchantList] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [successFull, setSuccessfull] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [addAction, setAddAction] = useState(false);
  console.log(userInfo);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputEditChange = (e: any) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleChangeText = (event: any) => {
    const { value } = event.target;

    if (value.length >= 2) {
      const results = shopTmpList?.filter((item: any) => {
        return (
          item?.label.toLowerCase().includes(value.toLowerCase()) ||
          item?.phoneNumber.toLowerCase().includes(value.toLowerCase())
        );
      });

      setShopList(results);
    }
    if (value.length === 0) {
      setShopList(shopTmpList);
    }
  };

  const handleChangeMerchant = (e: any) => {
    const value = e.target.value;
    setPageLoading(true);
    let results = shopTmpList.filter((item: any) => item.accountId == value);
    setShopList(results);
    setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    if (value == "all") {
      setShopList(shopTmpList);
      setTimeout(() => {
        setPageLoading(false);
      }, 1000);
    }
  };

  const handleChangeStatus = (e: any) => {
    const value = e.target.value == "1" ? true : false;
    const value02 = e.target.value;
    setPageLoading(true);
    let results = shopTmpList.filter((item: any) => item.enabled == value);
    setShopList(results);
    setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    if (value02 == "all") {
      setShopList(shopTmpList);
      setTimeout(() => {
        setPageLoading(false);
      }, 1000);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setAddAction(true);
    setSuccessfull(false);
    setError(false);

    shopAPI
      .createShop(formData)
      .then((response) => {
        console.log(response);
        setLoading(false);
        fetchShopList();
        setAddAction(false);
        setSuccessfull(true);
        setFormData({
          label: "",
          phoneNumber: "",
          description: "",
          address: "",
          accountId: userInfo?.role?.code === "ADMIN" ? "" : userInfo.id,
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setAddAction(false);
        setError(true);
        setErrorMessage(error.response.data.message);
      });
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccessfull(false);
    setError(false);
    item["enabled"] = item.enabled == "1" ? true : false;
    shopAPI
      .shopEdited(item?.id, item)
      .then((response) => {
        console.log(response);
        setLoading(false);
        setEditModal(false);
        fetchShopList();
        setSuccessfull(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
        setErrorMessage(error.response.data.message);
      });
  };

  const openEditModal = (data: any) => {
    setItem(data);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const fetchShopList = () => {
    if (userInfo?.role?.code === "ADMIN") {
      shopAPI
        .shopList()
        .then((response) => {
          setShopList(response.data);
          setShopTmpList(response.data);
          setPageLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setPageLoading(false);
        });
    } else {
      shopAPI
        .shopListByBusinessId(userInfo?.id)
        .then((response) => {
          setShopList(response.data);
          setPageLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setPageLoading(false);
        });
    }
  };

  const fetchMerchantList = () => {
    accountAPI
      .userAccountList("?role=MERCHANT")
      .then((response) => {
        setMerchantList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchShopList();
    userInfo?.role?.code === "ADMIN" && fetchMerchantList();
  }, []);

  return (
    <>
      {/* <Breadcrumb title={"Favoris"} pages={["ShopList"]} /> */}
      <section className="overflow-hidden pb-20 bg-gray-2">
        <div className="w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">Mes boutiques</h2>
          </div>
          {successFull && (
            <div className="p-4 mb-4 text-sm text-green rounded-lg bg-green-light-5 dark:bg-gray-800 dark:text-green-400 w-full">
              <span className="font-medium">Bravo !</span> Action effectue avec
              succès.
            </div>
          )}

          {error && (
            <div className="p-4 mb-4 text-sm text-red rounded-lg bg-red-light-5 dark:bg-gray-800 dark:text-red-400 w-full">
              <span className="font-medium">Oops !</span> {errorMessage}
            </div>
          )}
          <div className="flex flex-row flex-wrap gap-4">
            <div className="w-[30%]">
              <h2 className="font-medium text-dark text-xl mb-4">
                Ajouter une boutique
              </h2>
              <form>
                {userInfo?.role?.code === "ADMIN" && (
                  <div className="mb-5">
                    <label htmlFor="email" className="block mb-2.5">
                      Marchant
                    </label>

                    <select
                      name="accountId"
                      onChange={handleInputChange}
                      className="rounded-lg border border-gray-3 bg-white placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    >
                      <option value="">Sélectionnez un marchant</option>
                      {merchantList?.map((item: any, index: number) => (
                        <option value={item.id} key={index}>
                          {item.firstname + " " + item.lastname}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
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
                <div className="mb-5">
                  <label htmlFor="phoneNumber" className="block mb-2.5">
                    Adresse
                  </label>

                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Entrez le contact de votre boutique"
                    autoComplete="on"
                    onChange={handleInputChange}
                    value={formData?.address}
                    className="rounded-lg border border-gray-3 bg-white placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="description" className="block mb-2.5">
                    Description
                  </label>

                  <textarea
                    rows={4}
                    name="description"
                    id="description"
                    placeholder="Entrez le contact de votre boutique"
                    onChange={handleInputChange}
                    value={formData?.description}
                    className="rounded-lg border border-gray-3 bg-white placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-[30%] flex justify-center font-medium text-white bg-green py-3 px-6 rounded-lg ease-out duration-200 hover:bg-green-dark mt-7.5"
                >
                  {!loading && "Enregistrer"}
                  {addAction && loading && <PreLoader />}
                </button>
              </form>
            </div>
            <div className="w-[68%]">
              <div className="mb-4 flex flex-row">
                {userInfo?.role?.code === "ADMIN" && (
                  <select
                    name="role"
                    onChange={(e) => handleChangeMerchant(e)}
                    className="w-1/4 block p-4 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4"
                  >
                    <option value="all">Toutes les marchants</option>
                    {merchantList?.map((item: any, index: number) => (
                      <option value={item.id} key={index}>
                        {item.firstname + " " + item.lastname}
                      </option>
                    ))}
                  </select>
                )}
                <select
                  name="role"
                  onChange={(e) => handleChangeStatus(e)}
                  className="w-1/4 block p-4 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4"
                >
                  <option value="all">Toutes les status</option>
                  <option value="1">Actif</option>
                  <option value="0">Désactivé</option>
                </select>

                <div className="w-3/4">
                  <div className="relative">
                    <input
                      type="search"
                      // value={searchValue}
                      onChange={handleChangeText}
                      className="block w-full p-4 ps-10 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Rechercher..."
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="w-full overflow-x-auto bg-white rounded-[10px] border border-gray-4 dark:border-gray-800 overflow-hidden">
                <div className="min-w-full">
                  {/* <!-- table header --> */}
                  <div className="flex items-center bg-gray-1 py-5.5 px-10">
                    {/* <div className="min-w-[83px]"></div> */}
                    <div className="min-w-[40%]">
                      <p className="text-dark">Nom</p>
                    </div>

                    <div className="min-w-[30%]">
                      <p className="text-dark">Contact</p>
                    </div>

                    <div className="min-w-[10%]">
                      <p className="text-dark">Status</p>
                    </div>

                    <div className="min-w-[20%]">
                      <p className="text-dark text-right">Action</p>
                    </div>
                  </div>

                  {/* <!-- wish item --> */}
                  {!pageLoading &&
                    shopList.map((item, key) => (
                      <SingleItem
                        item={item}
                        openEditModal={openEditModal}
                        key={key}
                      />
                    ))}
                  {!pageLoading && shopList.length === 0 && (
                    <div className="flex justify-center items-center p-4">
                      <p className="text-dark">Aucune boutique</p>
                    </div>
                  )}
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

      <ShopEditModal
        isOpen={editModal}
        closeModal={closeEditModal}
        item={item}
        handleInputChange={handleInputEditChange}
        loading={loading}
        handleSubmit={handleEditSubmit}
        successFull={successFull}
        error={error}
        errorMessage={errorMessage}
        userInfo={userInfo}
        merchantList={merchantList}
      />
    </>
  );
};
