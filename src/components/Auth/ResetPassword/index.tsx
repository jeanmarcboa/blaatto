"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import PreLoader from "@/components/Common/BtnPreLoader";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import React, { useState, useEffect } from "react";

//import accounts restAPI
import Account from "../../../app/api/accountServices";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signin = () => {
  const router = useRouter();
  const { uuid } = useParams();
  const { setLoginData } = useUser();
  const [formData, setFormData] = useState({
    otp: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successFull, setSuccessfull] = useState(false);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [strength, setStrength] = useState(false);
  const [criteria, setCriteria] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

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

  const submissionValidation = () => {
    let isNotValid = false;
    const { otp, password } = formData;

    if (!otp || !password || !strength) {
      isNotValid = true;
    } else {
      isNotValid = false;
    }

    return isNotValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccessfull(false);

    if (!formData.otp || !formData.password) {
      // alert("Veuillez remplir tous les champs");
      setLoading(false);
      setError(true);
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    if (loading) {
      return;
    }

    Account.resetPassword(uuid, formData)
      .then((response) => {
        console.log(response);
        setLoading(false);
        setSuccessfull(true);
        setTimeout(() => {
          router.push("/signin");
        }, 1000);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setError(true);
        setErrorMessage(err.response.data.message);
      });
  };

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <>
      <Breadcrumb title={"Se connecter"} pages={["Signin"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex items-center justify-center space-x-3">
            {/* //Display message */}
            {successFull && (
              <div className="p-4 mb-4 text-sm text-green rounded-lg bg-green-light-5 dark:bg-gray-800 dark:text-green-400">
                <span className="font-medium">Bravo !</span> Votre mot de passe
                a été réinitialisé avec succès.
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
                Nouveau mot de passe
              </h2>
              <p>Entrez vos coordonnées ci-dessous</p>
            </div>

            <div>
              <form>
                <div className="mb-5">
                  <label htmlFor="email" className="block mb-2.5">
                    Code
                  </label>

                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    placeholder="Entrez votre code"
                    onChange={handleInputChange}
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2.5">
                    Nouveau mot de passe
                  </label>

                  <div className="relative">
                    <input
                      type={isVisible ? "text" : "password"}
                      name="password"
                      id="password"
                      onChange={handleInputChange}
                      placeholder="Entrez votre mot de passe"
                      autoComplete="on"
                      className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                    <button
                      className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <FiEyeOff size={20} aria-hidden="true" />
                      ) : (
                        <FiEye size={20} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  <div className="mt-2 text-sm">
                    <p
                      className={`font-medium ${
                        strength ? "text-green" : "text-red"
                      }`}
                    >
                      Mot de passe : {strength ? "Fort" : "Faible"}
                    </p>
                    <ul className="mt-2 space-y-1 text-gray-700">
                      <li
                        className={
                          criteria.minLength ? "text-green" : "text-red"
                        }
                      >
                        {criteria.minLength ? "✓" : "✗"} Minimum 8 caractères
                      </li>
                      <li
                        className={
                          criteria.hasUppercase ? "text-green" : "text-red"
                        }
                      >
                        {criteria.hasUppercase ? "✓" : "✗"} Une majuscule (A-Z)
                      </li>
                      <li
                        className={
                          criteria.hasLowercase ? "text-green" : "text-red"
                        }
                      >
                        {criteria.hasLowercase ? "✓" : "✗"} Une minuscule (a-z)
                      </li>
                      <li
                        className={
                          criteria.hasNumber ? "text-green" : "text-red"
                        }
                      >
                        {criteria.hasNumber ? "✓" : "✗"} Un chiffre (0-9)
                      </li>
                      <li
                        className={
                          criteria.hasSpecialChar ? "text-green" : "text-red"
                        }
                      >
                        {criteria.hasSpecialChar ? "✓" : "✗"} Un caractère
                        spécial (@$!%*?&)
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={submissionValidation()}
                  className={`w-full flex justify-center font-medium text-white ${
                    submissionValidation() === false ? "bg-green" : "bg-dark-5"
                  } py-3 px-6 rounded-lg ease-out duration-200   ${
                    submissionValidation() === false && "hover:bg-green-dark"
                  } mt-7.5`}
                >
                  {loading ? <PreLoader /> : "Réinitialiser"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
