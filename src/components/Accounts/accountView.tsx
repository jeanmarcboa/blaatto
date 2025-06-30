"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiBriefcase, FiUser, FiEye, FiEyeOff, FiFile } from "react-icons/fi";
import PreLoader from "@/components/Common/BtnPreLoader";
import Image from "next/image";
import useUser from "@/hooks/useUser";

//import accounts restAPI
import accountAPI from "@/app/api/accountServices";

const MyAccount = () => {
  const { code } = useParams();
  const { userInfo, isLoggedIn, setLoginData, deleteLoginData } = useUser();

  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [addressModal, setAddressModal] = useState(false);
  const [item, setItem] = useState<any>([]);
  const [passwordItem, setpasswordItem] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [successFull, setSuccessfull] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [strength, setStrength] = useState(false);
  const [criteria, setCriteria] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const openAddressModal = () => {
    setAddressModal(true);
  };

  const closeAddressModal = () => {
    setAddressModal(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };
  const handlePasswordInputChange = (e: any) => {
    const { name, value } = e.target;
    setpasswordItem({ ...passwordItem, [name]: value });
    if (name === "newPassword") {
      checkPasswordStrength(value);
    }
  };

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const checkPasswordStrength = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (strongPasswordRegex.test(password)) {
      setStrength(true);
    } else {
      setStrength(false);
    }

    setCriteria({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[@$!%*?&]/.test(password),
    });
  };

  const handleInfoSubmit = async (e: any) => {
    e.preventDefault();
    setType("account-info");
    setLoading(true);
    setError(false);
    setSuccessfull(false);
    const { firstname, lastname, email, phoneNumber, password, username } =
      item;

    if (!firstname || !lastname || !email || !phoneNumber || !username) {
      // alert("Veuillez remplir tous les champs");
      setLoading(false);
      setError(true);
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    if (loading) {
      return;
    }

    accountAPI
      .updateUserAccount(item, userInfo?.id, userInfo?.access_token)
      .then((response) => {
        console.log(response);
        setLoading(false);
        let tmpInfo = { ...userInfo };
        tmpInfo["firstname"] = firstname;
        tmpInfo["lastname"] = lastname;
        tmpInfo["email"] = email;
        tmpInfo["phoneNumber"] = phoneNumber;
        tmpInfo["username"] = username;
        setLoginData(tmpInfo);
        setSuccessfull(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrorMessage("Une erreur s'est produite");
      });
  };

  const handlePasswordSubmit = (e: any) => {
    e.preventDefault();
    setType("password");

    console.log(passwordItem);
    console.log(type);
    if (
      passwordItem?.oldPassword === "" ||
      passwordItem?.newPassword === "" ||
      passwordItem?.confirmPassword === ""
    ) {
      setError(true);
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }
    if (passwordItem?.newPassword !== passwordItem?.confirmPassword) {
      setError(true);
      setErrorMessage("Les mots de passe ne correspondent pas");
      return;
    }
    setLoading(true);
    setError(false);
    setSuccessfull(false);
    accountAPI
      .updateUserPassword(
        {
          oldPassword: passwordItem?.oldPassword,
          newPassword: passwordItem?.newPassword,
        },
        userInfo?.id,
        userInfo?.access_token
      )
      .then((response) => {
        console.log(response);
        setSuccessfull(true);
        setErrorMessage("Mot de passe modifié avec succès");
        setpasswordItem({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setErrorMessage("Une erreur s'est produite");
        setLoading(false);
      });
  };

  const accountInfo = () => {
    accountAPI
      .userAccountDetail(code, userInfo?.access_token)
      .then((response) => {
        setItem(response.data);
      });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/signin");
      return;
    } else {
      accountInfo();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    router.push("/signin");
    return;
  }

  return (
    <>
      <section className="overflow-hidden">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row gap-7.5">
            {/* <!-- details tab content start --> */}
            <div className="xl:max-w-[60%] w-full block ">
              <p className="font-medium text-xl sm:text-2xl text-dark mb-7">
                Informations générales
              </p>
              <form>
                <div className="bg-white shadow-1 rounded-xl p-4 sm:p-8.5">
                  <div className="flex items-center justify-center space-x-3">
                    {/* //Display message */}
                    {type === "account-info" && successFull && (
                      <div className="p-4 mb-4 text-sm text-green rounded-lg bg-green-light-5 dark:bg-gray-800 dark:text-green-400 w-full">
                        <span className="font-medium">Bravo !</span> Vos
                        Informations ont été modifié avec succès.
                      </div>
                    )}

                    {type === "account-info" && error && (
                      <div className="p-4 mb-4 text-sm text-red rounded-lg bg-red-light-5 dark:bg-gray-800 dark:text-red-400 w-full">
                        <span className="font-medium">Oops !</span>{" "}
                        {errorMessage}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                    <div className="w-full">
                      <label htmlFor="email" className="block mb-2.5">
                        Status
                      </label>

                      <select
                        name="enabled"
                        defaultValue={item?.enabled ? "1" : "0"}
                        onChange={handleInputChange}
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      >
                        <option>---</option>
                        <option value="1">Actif</option>
                        <option value="0">Désactivé</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                    <div className="w-full">
                      <label htmlFor="firstName" className="block mb-2.5">
                        Nom d&apos;utilisateur{" "}
                        <span className="text-red">*</span>
                      </label>

                      <input
                        type="text"
                        name="username"
                        value={item?.username}
                        onChange={handleInputChange}
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                    <div className="w-full">
                      <label htmlFor="firstName" className="block mb-2.5">
                        Prénom <span className="text-red">*</span>
                      </label>

                      <input
                        type="text"
                        name="firstname"
                        value={item?.firstname}
                        onChange={handleInputChange}
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="lastName" className="block mb-2.5">
                        Nom <span className="text-red">*</span>
                      </label>

                      <input
                        type="text"
                        name="lastname"
                        value={item?.lastname}
                        onChange={handleInputChange}
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="countryName" className="block mb-2.5">
                      Email <span className="text-red">*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={item?.email}
                      onChange={handleInputChange}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="countryName" className="block mb-2.5">
                      Téléphone <span className="text-red">*</span>
                    </label>

                    <input
                      type="text"
                      name="phoneNumber"
                      value={item?.phoneNumber}
                      onChange={handleInputChange}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={handleInfoSubmit}
                    className="inline-flex font-medium text-white bg-green py-3 px-7 rounded-md ease-out duration-200 hover:bg-green-dark"
                  >
                    {type == "account-info" && loading ? (
                      <PreLoader />
                    ) : (
                      "Enregistrer les modifications"
                    )}
                  </button>
                </div>

                <p className="text-custom-sm mt-5 mb-9">
                  Votre nom sera affiché ainsi dans la section Compte et dans
                  les avis.
                </p>
              </form>
            </div>
            <div className="xl:max-w-[40%] w-full block ">
              <p className="font-medium text-xl sm:text-2xl text-dark mb-7">
                Pièces justificatives
              </p>
              <form>
                <div className="bg-white shadow-1 rounded-xl p-4 sm:p-8.5">
                  <div className="flex flex-col gap-4">
                    {/* //Display attachment */}
                    {item?.Document?.length > 0 &&
                      item?.Document.map((item: any, key: number) => (
                        <div
                          className="flex flex-row justify-between bg-gray-2 p-4 rounded-md"
                          key={key}
                        >
                          <div className="flex flex-row space-x-3">
                            <FiFile className="text-3xl" />
                            <p>{item.key}</p>
                          </div>
                          <div>
                            <a
                              href={item.url}
                              className="flex flex-row space-x-2 items-center gap-2 text-sm bg-green-light-6 py-2 px-4 rounded-md text-green cursor-pointer"
                              target="_blank"
                            >
                              <FiEye /> Voir
                            </a>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </form>
            </div>
            {/* <!-- details tab content end -->
          <!--== user dashboard content end ==--> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAccount;
