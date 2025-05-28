import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import fr from "react-phone-number-input/locale/fr";
import useUser from "@/hooks/useUser";
import PreLoader from "../Common/BtnPreLoader";

//import accounts restAPI
import accountAPI from "@/app/api/accountServices";

const Login = () => {
  const router = useRouter();
  const { setLoginData } = useUser();
  const [dropdown, setDropdown] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [successFull, setSuccessfull] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [view, setView] = useState("login");
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccessfull(false);

    if (!formData?.username || !formData?.password) {
      // alert("Veuillez remplir tous les champs");
      setLoading(false);
      setError(true);
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    if (loading) {
      return;
    }

    if (view === "login") {
      accountAPI
        .signIn(formData)
        .then((response) => {
          setLoading(false);
          setSuccessfull(true);
          setTimeout(() => {
            setLoginData(response.data);
          }, 1000);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
          setError(true);
          setErrorMessage(err.response.data.message);
        });
    } else {
      accountAPI
        .signUpCustomer(formData)
        .then((response) => {
          setLoading(false);
          setSuccessfull(true);
          setTimeout(() => {
            setLoginData(response.data);
          }, 1000);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
          setError(true);
          setErrorMessage(err.response.data.message);
        });
    }
  };

  return (
    <div className="bg-white shadow-1 rounded-[10px]">
      <div
        onClick={() => setDropdown(!dropdown)}
        className={`cursor-pointer flex items-center gap-0.5 py-5 px-5.5 ${
          dropdown && "border-b border-gray-3"
        }`}
      >
        Client fidèle ?
        <span className="flex items-center gap-2.5 pl-1 font-medium text-dark">
          Cliquez ici pour vous connecter
          <svg
            className={`${
              dropdown && "rotate-180"
            } fill-current ease-out duration-200`}
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.06103 7.80259C4.30813 7.51431 4.74215 7.48092 5.03044 7.72802L10.9997 12.8445L16.9689 7.72802C17.2572 7.48092 17.6912 7.51431 17.9383 7.80259C18.1854 8.09088 18.1521 8.5249 17.8638 8.772L11.4471 14.272C11.1896 14.4927 10.8097 14.4927 10.5523 14.272L4.1356 8.772C3.84731 8.5249 3.81393 8.09088 4.06103 7.80259Z"
              fill=""
            />
          </svg>
        </span>
      </div>

      {/* <!-- dropdown menu --> */}
      <div
        className={`${
          dropdown ? "block" : "hidden"
        } pt-7.5 pb-8.5 px-4 sm:px-8.5`}
      >
        <div className="flex items-center justify-center space-x-3">
          {successFull && (
            <div className="p-4 mb-4 text-sm text-green rounded-lg bg-green-light-5 dark:bg-gray-800 dark:text-green-400 w-full">
              <span className="font-medium">Bravo !</span> Vous avez été
              connecté avec succès.
            </div>
          )}
          {error && (
            <div className="p-4 mb-4 text-sm text-red rounded-lg bg-red-light-5 dark:bg-gray-800 dark:text-red-400 w-full">
              <span className="font-medium">Oops !</span> {errorMessage}
            </div>
          )}
        </div>
        <div className="mb-5">
          <button
            className={`p-4 rounded-lg mr-2 ${view === "login" && "bg-gray-2"}`}
            onClick={() => setView("login")}
          >
            Se connecter
          </button>
          <button
            className={`p-4 rounded-lg ${view === "signup" && "bg-gray-2"}`}
            onClick={() => setView("signup")}
          >
            Créer un compte
          </button>
        </div>
        {view === "login" && (
          <div>
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2.5">
                Nom d&apos;utilisateur
              </label>

              <input
                type="text"
                name="username"
                id="username"
                onChange={handleInputChange}
                className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="block mb-2.5">
                Mot de passe
              </label>

              <input
                type="password"
                name="password"
                id="password"
                autoComplete="on"
                onChange={handleInputChange}
                className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
              />
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="inline-flex font-medium text-white bg-green py-3 px-10.5 rounded-md ease-out duration-200 hover:bg-green-dark"
            >
              {loading ? <PreLoader /> : "Connectez-vous au compte"}
            </button>
          </div>
        )}
        {view === "signup" && (
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

              <button
                type="submit"
                onClick={handleSubmit}
                className="inline-flex font-medium text-white bg-green py-3 px-10.5 rounded-md ease-out duration-200 hover:bg-green-dark"
              >
                {loading ? <PreLoader /> : "Créer un compte"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
