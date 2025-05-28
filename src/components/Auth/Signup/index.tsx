"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiBriefcase, FiUser } from "react-icons/fi";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import fr from "react-phone-number-input/locale/fr";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useParams, useRouter } from "next/navigation";
import PreLoader from "@/components/Common/BtnPreLoader";
import useUser from "@/hooks/useUser";

//import accounts restAPI
import Account from "../../../app/api/accountServices";

const Signup = () => {
  const { setLoginData } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
    username: "",
  });
  const [document, setDocument] = useState({
    cni: null,
    cert: null,
  });
  const [docType, setDocType] = useState([]);
  const [profilType, setProfilTypes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successFull, setSuccessfull] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { firstname, lastname, email, phoneNumber, password, username } =
    formData;
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    const { name, files } = e.target;
    setDocument({ ...document, [name]: files[0] });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccessfull(false);
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

    if (
      !firstname ||
      !lastname ||
      !email ||
      !phoneNumber ||
      !password ||
      !username
    ) {
      // alert("Veuillez remplir tous les champs");
      setLoading(false);
      setError(true);
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    if (loading) {
      return;
    }

    if (profilType === 1) {
      Account.signUpCustomer(tmpformdata)
        .then((response) => {
          console.log(response);
          setLoading(false);
          setLoginData(response.data);
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setError(true);
          setErrorMessage("Une erreur s'est produite");
        });
    } else {
      Account.signUpMerchant(tmpformdata)
        .then((response) => {
          console.log(response);

          // connect user after sign up
          let data = {
            username: username,
            password: password,
          };

          Account.signIn(data)
            .then((res) => {
              const CNI_ID = docType.find((item) => item.code === "CNI");
              const CERT_ID = docType.find((item) => item.code === "CERT");

              if (document.cni) {
                const formData = new FormData();
                formData.append("file", document?.cni);
                formData.append("documentTypeId", CNI_ID.id);

                Account.uploadDocument(formData)
                  .then((response) => {
                    console.log(response);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }

              if (document.cert) {
                const formData = new FormData();
                formData.append("file", document?.cert);
                formData.append("documentTypeId", CERT_ID.id);

                Account.uploadDocument(formData)
                  .then((response) => {
                    console.log(response);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }

              setTimeout(() => {
                setLoading(false);
                setLoginData(res.data);
                router.push("/shops-settings");
              }, 1000);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
              setError(true);
              setErrorMessage("Une erreur s'est produite");
            });
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setError(true);
          setErrorMessage("Une erreur s'est produite");
        });
    }
  };

  const handleProfilTypeChange = (value: number) => {
    console.log(value);
    setProfilTypes(value);
  };

  useEffect(() => {
    Account.documentsTypes()
      .then((response) => {
        console.log(response);
        setDocType(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Breadcrumb title={"S'inscrire"} pages={["Signup"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex items-center justify-center space-x-3">
            {/* //Display message */}
            {successFull && (
              <div className="p-4 mb-4 text-sm text-green rounded-lg bg-green-light-5 dark:bg-gray-800 dark:text-green-400">
                <span className="font-medium">Bravo !</span> Vous avez été
                connecté avec succès.
              </div>
            )}
            {error && (
              <div className="p-4 mb-4 text-sm text-red rounded-lg bg-red-light-5 dark:bg-gray-800 dark:text-red-400">
                <span className="font-medium">Oops !</span> {errorMessage}
              </div>
            )}
          </div>
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Créer un compte
              </h2>
              <p>Entrez vos coordonnées ci-dessous</p>
            </div>

            {/* <div className="flex flex-col gap-4.5">
              <button className="flex justify-center items-center gap-3.5 rounded-lg border border-gray-3 bg-gray-1 p-3 ease-out duration-200 hover:bg-gray-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_98_7461)">
                    <mask
                      id="mask0_98_7461"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                    >
                      <path d="M20 0H0V20H20V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_98_7461)">
                      <path
                        d="M19.999 10.2218C20.0111 9.53429 19.9387 8.84791 19.7834 8.17737H10.2031V11.8884H15.8267C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.999 13.2661 19.999 10.2218Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M10.2036 20C12.9586 20 15.2715 19.1111 16.9609 17.5777L13.7409 15.1332C12.8793 15.7223 11.7229 16.1333 10.2036 16.1333C8.91317 16.126 7.65795 15.7206 6.61596 14.9746C5.57397 14.2287 4.79811 13.1802 4.39848 11.9777L4.2789 11.9877L1.12906 14.3766L1.08789 14.4888C1.93622 16.1457 3.23812 17.5386 4.84801 18.512C6.45791 19.4852 8.31194 20.0005 10.2036 20Z"
                        fill="#34A853"
                      />
                      <path
                        d="M4.39899 11.9776C4.1758 11.3411 4.06063 10.673 4.05807 9.9999C4.06218 9.3279 4.1731 8.66067 4.38684 8.02221L4.38115 7.88959L1.1927 5.46234L1.0884 5.51095C0.372762 6.90337 0 8.44075 0 9.99983C0 11.5589 0.372762 13.0962 1.0884 14.4887L4.39899 11.9776Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M10.2039 3.86663C11.6661 3.84438 13.0802 4.37803 14.1495 5.35558L17.0294 2.59997C15.1823 0.90185 12.7364 -0.0298855 10.2039 -3.67839e-05C8.31239 -0.000477835 6.45795 0.514733 4.84805 1.48799C3.23816 2.46123 1.93624 3.85417 1.08789 5.51101L4.38751 8.02225C4.79107 6.82005 5.5695 5.77231 6.61303 5.02675C7.65655 4.28119 8.91254 3.87541 10.2039 3.86663Z"
                        fill="#EB4335"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_98_7461">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Sign Up with Google
              </button>

              <button className="flex justify-center items-center gap-3.5 rounded-lg border border-gray-3 bg-gray-1 p-3 ease-out duration-200 hover:bg-gray-2">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.9997 1.83331C5.93773 1.83331 1.83301 6.04119 1.83301 11.232C1.83301 15.3847 4.45954 18.9077 8.10178 20.1505C8.55988 20.2375 8.72811 19.9466 8.72811 19.6983C8.72811 19.4743 8.71956 18.7338 8.71567 17.9485C6.16541 18.517 5.6273 16.8395 5.6273 16.8395C5.21032 15.7532 4.60951 15.4644 4.60951 15.4644C3.77785 14.8811 4.6722 14.893 4.6722 14.893C5.59272 14.9593 6.07742 15.8615 6.07742 15.8615C6.89499 17.2984 8.22184 16.883 8.74493 16.6429C8.82718 16.0353 9.06478 15.6208 9.32694 15.3861C7.2909 15.1484 5.15051 14.3425 5.15051 10.7412C5.15051 9.71509 5.5086 8.87661 6.09503 8.21844C5.99984 7.98167 5.68611 7.02577 6.18382 5.73115C6.18382 5.73115 6.95358 5.47855 8.70532 6.69458C9.43648 6.48627 10.2207 6.3819 10.9997 6.37836C11.7787 6.3819 12.5635 6.48627 13.2961 6.69458C15.0457 5.47855 15.8145 5.73115 15.8145 5.73115C16.3134 7.02577 15.9995 7.98167 15.9043 8.21844C16.4921 8.87661 16.8477 9.715 16.8477 10.7412C16.8477 14.351 14.7033 15.146 12.662 15.3786C12.9909 15.6702 13.2838 16.2423 13.2838 17.1191C13.2838 18.3766 13.2732 19.3888 13.2732 19.6983C13.2732 19.9485 13.4382 20.2415 13.9028 20.1492C17.5431 18.905 20.1663 15.3833 20.1663 11.232C20.1663 6.04119 16.0621 1.83331 10.9997 1.83331Z"
                    fill="#15171A"
                  />
                </svg>
                Sign Up with Github
              </button>
            </div> */}

            {/* <span className="relative z-1 block font-medium text-center mt-4.5">
              <span className="block absolute -z-1 left-0 top-1/2 h-px w-full bg-gray-3"></span>
              <span className="inline-block px-3 bg-white">Or</span>
            </span> */}

            {/* Choose profile type customer or merchant */}
            <div
              className={`flex ${
                profilType != 0 ? "flex-row" : "flex-col"
              } gap-3.5`}
            >
              <div className="relative">
                <button
                  onClick={() => handleProfilTypeChange(1)}
                  className={` ${
                    profilType === 1
                      ? "border-2 border-green text-green"
                      : "border border-gray-4 text-gray-6"
                  } rounded-md p-4 text-sm  font-medium flex flex-row justify-start items-center gap-4 cursor-pointer w-full`}
                >
                  <FiUser size={24} />
                  Client
                </button>
              </div>
              <div className="relative">
                <button
                  onClick={() => handleProfilTypeChange(2)}
                  className={` ${
                    profilType === 2
                      ? "border-2 border-green text-green"
                      : "border border-gray-4 text-gray-6"
                  } rounded-md p-4 text-sm  font-medium flex flex-row justify-start items-center gap-4 cursor-pointer w-full`}
                >
                  <FiBriefcase size={24} />
                  Commerçant
                </button>
              </div>
            </div>

            {profilType != 0 && (
              <div className="mt-5.5">
                <form>
                  <div className="flex flex-row gap-4">
                    <div className="mb-5 w-[48%]">
                      <label htmlFor="lastname" className="block mb-2.5">
                        Nom <span className="text-red">*</span>
                      </label>

                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        onChange={handleInputChange}
                        placeholder="Entrez votre nom"
                        className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>
                    <div className="mb-5 w-[48%]">
                      <label htmlFor="firstname" className="block mb-2.5">
                        Prénom <span className="text-red">*</span>
                      </label>

                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        onChange={handleInputChange}
                        placeholder="Entrez votre prénom"
                        className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="email" className="block mb-2.5">
                      Adresse email <span className="text-red">*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleInputChange}
                      placeholder="Entrez votre adresse email"
                      className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="phoneNumber" className="block mb-2.5">
                      Téléphone <span className="text-red">*</span>
                    </label>

                    <PhoneInput
                      defaultCountry="CI"
                      labels={fr}
                      placeholder="Entrez votre numéro de téléphone"
                      value={formData.phoneNumber}
                      className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      onChange={(value: any) => {
                        setFormData({ ...formData, ["phoneNumber"]: value });
                      }}
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="password" className="block mb-2.5">
                      Mot de passe <span className="text-red">*</span>
                    </label>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleInputChange}
                      placeholder="Entrez votre mot de passe"
                      autoComplete="on"
                      className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>

                  {profilType === 2 && (
                    <>
                      <div className="mb-5">
                        <p className="block mb-2.5">
                          Documents justcificatifs d&#39;identité et
                          d&#39;activité
                        </p>
                      </div>

                      <div className="mb-5">
                        <label htmlFor="cni" className="block mb-2.5">
                          Carte d&#39;identité
                        </label>

                        <input
                          type="file"
                          name="cni"
                          id="cni"
                          onChange={handleFileChange}
                          required
                        />
                      </div>

                      <div className="mb-5">
                        <label htmlFor="cert" className="block mb-2.5">
                          Justificatif d&#39;activité
                        </label>
                        <input
                          type="file"
                          name="cert"
                          id="cert"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full flex justify-center font-medium text-white bg-green py-3 px-6 rounded-lg ease-out duration-200 hover:bg-green-dark mt-7.5"
                  >
                    {loading ? <PreLoader /> : "Créer un compte"}
                  </button>

                  <p className="text-center mt-6">
                    Vous avez déjà un compte ?
                    <Link
                      href="/signin"
                      className="text-green ease-out duration-200 hover:text-dark pl-2"
                    >
                      Connectez-vous maintenant
                    </Link>
                  </p>
                </form>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center space-x-2 mt-4">
            {/* //Display message */}
            {successFull && (
              <div className="p-4 mb-4 text-sm text-green rounded-lg bg-green-light-5 dark:bg-gray-800 dark:text-green-400">
                <span className="font-medium">Bravo !</span> Vous avez été
                connecté avec succès.
              </div>
            )}
            {error && (
              <div className="p-4 mb-4 text-sm text-red rounded-lg bg-red-light-5 dark:bg-gray-800 dark:text-red-400">
                <span className="font-medium">Oops !</span> {errorMessage}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
