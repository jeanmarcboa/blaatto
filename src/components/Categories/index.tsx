"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "../Common/Breadcrumb";
import PreLoader from "@/components/Common/BtnPreLoader";
import { useAppSelector } from "@/redux/store";
import useUser from "@/hooks/useUser";
import SingleItem from "./list/SingleItem";
import CategoryEditModal from "./EditModal";

import categoriesAPI from "@/app/api/categoriesServices";

export const CategoriesList = () => {
  const { setLoginData, userInfo } = useUser();

  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryTmpList, setCategoryTmpList] = useState([]);
  const [formData, setFormData] = useState({
    label: "",
    description: "",
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
      const results = categoryTmpList?.filter((item: any) => {
        return item?.label.toLowerCase().includes(value.toLowerCase());
      });

      setCategoryList(results);
    }
    if (value.length === 0) {
      setCategoryList(categoryTmpList);
    }
  };

  const handleChangeMerchant = (e: any) => {
    const value = e.target.value;
    setPageLoading(true);
    let results = categoryTmpList.filter(
      (item: any) => item.accountId == value
    );
    setCategoryList(results);
    setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    if (value == "all") {
      setCategoryList(categoryTmpList);
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

    categoriesAPI
      .createCategorie(formData, userInfo?.access_token)
      .then((response) => {
        console.log(response);
        setLoading(false);
        fetchCategoryList();
        setAddAction(false);
        setSuccessfull(true);
        setFormData({
          label: "",
          description: "",
        });
        setTimeout(() => {
          setSuccessfull(false);
        }, 2000);
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
    categoriesAPI
      .updateCategorie(item, item?.id, userInfo?.access_token)
      .then((response) => {
        console.log(response);
        setLoading(false);
        setEditModal(false);
        fetchCategoryList();
        setSuccessfull(true);
        setTimeout(() => {
          setSuccessfull(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
        setErrorMessage(error.response.data.message);
      });
  };

  const handleDeleteSubmit = (id) => {
    setSuccessfull(false);
    setError(false);
    categoriesAPI
      .deleteCategorie(id, userInfo?.access_token)
      .then((response) => {
        console.log(response);
        setEditModal(false);
        fetchCategoryList();
        setSuccessfull(true);
      })
      .catch((error) => {
        console.log(error);
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

  const fetchCategoryList = () => {
    categoriesAPI
      .categorieList()
      .then((response) => {
        setCategoryList(response.data);
        setCategoryTmpList(response.data);
        setPageLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPageLoading(false);
      });
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <>
      {/* <Breadcrumb title={"Favoris"} pages={["CategoriesList"]} /> */}
      <section className="overflow-hidden pb-20 min-h-screen">
        <div className="w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">Catégories</h2>
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
                Ajouter une catégorie
              </h2>
              <form>
                <div className="mb-5">
                  <label htmlFor="email" className="block mb-2.5">
                    Libellé de la catégorie
                  </label>

                  <input
                    type="text"
                    name="label"
                    id="label"
                    placeholder="Entrez le nom de la catégorie"
                    onChange={handleInputChange}
                    value={formData?.label}
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
                <div className="w-full">
                  <div className="relative">
                    <input
                      type="search"
                      // value={searchValue}
                      onChange={handleChangeText}
                      className="block w-full p-4 ps-10 text-md text-gray-900 border border-gray-4 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Recherche..."
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
                      <p className="text-dark">Libellé</p>
                    </div>

                    <div className="min-w-[40%]">
                      <p className="text-dark">Description</p>
                    </div>

                    <div className="min-w-[20%]">
                      <p className="text-dark text-right">Action</p>
                    </div>
                  </div>

                  {/* <!-- wish item --> */}
                  {!pageLoading &&
                    categoryList.map((item, key) => (
                      <SingleItem
                        item={item}
                        openEditModal={openEditModal}
                        handleDeleteSubmit={handleDeleteSubmit}
                        key={key}
                      />
                    ))}
                  {!pageLoading && categoryList.length === 0 && (
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

      <CategoryEditModal
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
