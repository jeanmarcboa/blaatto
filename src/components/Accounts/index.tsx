"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "../Common/Breadcrumb";
import PreLoader from "@/components/Common/BtnPreLoader";
import { useAppSelector } from "@/redux/store";
import useUser from "@/hooks/useUser";
import SingleItem from "./accountList/SingleItem";
import AccountEditModal from "./AccountEditModal";

import productAPI from "@/app/api/productServices";
import shopAPI from "@/app/api/shopServices";
import accountAPI from "@/app/api/accountServices";

export const AccountList = () => {
  // const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);
  const [userList, setUserList] = useState([]);
  const [userTmpList, setUserTmpList] = useState([]);
  const { setLoginData, userInfo } = useUser();

  // console.log(userInfo);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
    username: "",
  });
  const [item, setItem] = useState<any>({});
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reqParams, setReqParams] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [successFull, setSuccessfull] = useState(false);
  const [role, setRole] = useState("admin");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [addAction, setAddAction] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputEditChange = (e: any) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setAddAction(true);
    setSuccessfull(false);
    setError(false);
    //gerenate username by first name and random number of characters
    const randomNumber = Math.floor(Math.random() * 10000);
    const username = `${formData.firstname.slice(0, 3)}${randomNumber}`;

    //Create a new customer or merchant
    const tmpformdata = {
      lastname: formData.lastname,
      firstname: formData.firstname,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      username: username.toLocaleLowerCase(),
      password: formData.password,
    };

    if (role === "client") {
      accountAPI
        .signUpCustomer(tmpformdata)
        .then((response) => {
          console.log(response);
          setLoading(false);
          fetchUserList(reqParams);
          setAddAction(false);
          setSuccessfull(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setAddAction(false);
          setError(true);
          setErrorMessage(error.response.data.message);
        });
    }
    if (role === "merchant") {
      accountAPI
        .signUpMerchant(tmpformdata)
        .then((response) => {
          console.log(response);
          setLoading(false);
          fetchUserList(reqParams);
          setAddAction(false);
          setSuccessfull(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setAddAction(false);
          setError(true);
          setErrorMessage(error.response.data.message);
        });
    }
    if (role === "admin") {
      accountAPI
        .signUpAdmin(tmpformdata)
        .then((response) => {
          console.log(response);
          setLoading(false);
          fetchUserList(reqParams);
          setAddAction(false);
          setSuccessfull(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setAddAction(false);
          setError(true);
          setErrorMessage(error.response.data.message);
        });
    }
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccessfull(false);
    setError(false);
    item["enabled"] = item.enabled == "1" ? true : false;
    // console.log(item);
    accountAPI
      .updateUserAccount(item, item?.id)
      .then((response) => {
        console.log(response);
        setLoading(false);
        setEditModal(false);
        setSuccessfull(true);
        fetchUserList(reqParams);
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phoneNumber: "",
          password: "",
          username: "",
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
        setErrorMessage(error.response.data.message);
      });

    // if (item.NewPassword) {
    //   accountAPI
    //     .updateUserPassword(item?.id, item)
    //     .then((response) => {
    //       console.log(response);
    //       setLoading(false);
    //       setEditModal(false);
    //       fetchUserList(reqParams);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       setLoading(false);
    //     });
    // }
  };

  const openEditModal = (data: any) => {
    setItem(data);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const handleChangeText = (event: any) => {
    const { value } = event.target;

    if (value.length >= 2) {
      const results = userTmpList?.filter((item: any) => {
        return (
          item?.firstname.toLowerCase().includes(value.toLowerCase()) ||
          item?.lastname.toLowerCase().includes(value.toLowerCase()) ||
          item?.phoneNumber.toLowerCase().includes(value.toLowerCase())
        );
      });

      setUserList(results);
    }
    if (value.length === 0) {
      setUserList(userTmpList);
    }
  };

  const fetchUserList = (param: string) => {
    accountAPI
      .userAccountList(param, userInfo?.access_token)
      .then((response) => {
        setUserList(response.data);
        setUserTmpList(response.data);
        setPageLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPageLoading(false);
      });
  };

  useEffect(() => {
    fetchUserList(reqParams);
  }, []);

  return (
    <>
      {/* <Breadcrumb title={"Favoris"} pages={["AccountList"]} /> */}
      <section className="overflow-hidden pb-20">
        <div className="w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">Utilisateurs</h2>
          </div>
          {successFull && (
            <div className="p-4 mb-4 text-sm text-green rounded-lg bg-green-light-5 dark:bg-gray-800 dark:text-green-400 w-full">
              <span className="font-medium">Bravo !</span> Action effectuée avec
              succès.
            </div>
          )}

          {error && (
            <div className="p-4 mb-4 text-sm text-red rounded-lg bg-red-light-5 dark:bg-gray-800 dark:text-red-400 w-full">
              <span className="font-medium">Oops !</span> {errorMessage}
            </div>
          )}
          <div className="flex flex-row flex-wrap gap-4">
            <div className="w-[100%] lg:w-[30%]">
              <h2 className="font-medium text-dark text-xl mb-4">
                Ajouter un administrateur
              </h2>

              <form>
                {/* <div className="mb-5">
                  <label htmlFor="lastname" className="block mb-2.5">
                    Role
                  </label>

                  <select
                    name="role"
                    id="role"
                    onChange={(e) => setRole(e.target.value)}
                    defaultValue={role}
                    className="rounded-lg border border-gray-3 bg-white placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  >
                    <option value="client">Client</option>
                    <option value="merchant">Marchand</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div> */}
                <div className="mb-5">
                  <label htmlFor="lastname" className="block mb-2.5">
                    Nom
                  </label>

                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Entrez le nom"
                    onChange={handleInputChange}
                    value={formData?.lastname}
                    className="rounded-lg border border-gray-3 bg-white placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="firstname" className="block mb-2.5">
                    Prénom
                  </label>

                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="Entrez le prénom"
                    onChange={handleInputChange}
                    value={formData?.firstname}
                    className="rounded-lg border border-gray-3 bg-white placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="email" className="block mb-2.5">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Entrez l'adresse email"
                    autoComplete="on"
                    onChange={handleInputChange}
                    value={formData?.email}
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
                  <label htmlFor="password" className="block mb-2.5">
                    mot de passe
                  </label>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Entrez le mot de passe"
                    onChange={handleInputChange}
                    value={formData?.password}
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
            <div className="w-[100%] lg:w-[68%]">
              <div className="w-full overflow-x-auto">
                <div className="mb-4 flex flex-row">
                  <select
                    name="role"
                    onChange={(e) =>
                      fetchUserList(
                        e.target.value != "all" ? "?role=" + e.target.value : ""
                      )
                    }
                    className="w-1/4 block p-4 text-md text-gray-900 border border-gray-4 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4"
                  >
                    <option value="all">Toutes les roles</option>
                    <option value="CUSTOMER">Client</option>
                    <option value="MERCHANT">Commerçant</option>
                    <option value="ADMIN">Administrateur</option>
                  </select>

                  <div className="w-3/4">
                    <div className="relative">
                      <input
                        type="search"
                        // value={searchValue}
                        onChange={handleChangeText}
                        className="block w-full p-4 ps-10 text-md text-gray-900 border border-gray-4 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Rechercher..."
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="min-w-full bg-white rounded-[10px] border border-gray-4 dark:border-gray-800 overflow-hidden">
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
                  {userList.map((item, key) => (
                    <SingleItem
                      item={item}
                      openEditModal={openEditModal}
                      key={key}
                    />
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

      <AccountEditModal
        isOpen={editModal}
        closeModal={closeEditModal}
        item={item}
        handleInputChange={handleInputEditChange}
        loading={loading}
        handleSubmit={handleEditSubmit}
        successFull={successFull}
        error={error}
        errorMessage={errorMessage}
      />
    </>
  );
};
