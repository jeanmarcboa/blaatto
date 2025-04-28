// pages/admin/add-product.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import useUser from "@/hooks/useUser";
import PreLoader from "@/components/Common/BtnPreLoader";
import product from "@/app/api/productServices";
import categ from "@/app/api/categoriesServices";
import shop from "@/app/api/shopServices";

export default function AddProduct() {
  const { userInfo } = useUser();
  const [shopList, setShopList] = useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [currency, setCurrency] = useState("XOF");
  const [shopId, setShopId] = useState("");
  const [uploadedfiles, setUploadedfiles] = useState<any>([]);
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [successFull, setSuccessfull] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setUploadedfiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      multiple: true,
      accept: {
        "application/vnd.ms-excel": [".xls"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ],
        "text/csv": [".csv"],
      },
    });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const fetchShopList = () => {
    shop
      .shopListByBusinessId(userInfo.id)
      .then((response) => {
        console.log("Liste des boutiques:", response.data);
        setShopList(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de récupération des boutiques:", error);
      });
  };

  const fetchCategories = () => {
    categ
      .categorieList()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log("Erreur lors de récupération des catégories:");
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccessfull(false);
    const formData = new FormData();
    formData.append("worksheet", uploadedfiles[0]);
    formData.append("shopId", shopId);
    formData.append("categoryId", category);

    // Envoi des données au backend
    product
      .importProduct(formData)
      .then((response) => {
        console.log("Produit ajouté avec succès:", response);
        setTimeout(() => {
          setLoading(false);
          setSuccessfull(true);
          setUploadedfiles([]);
          setShopId("");
        }, 2000);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du produit:", error);
        setTimeout(() => {
          setError(true);
          setErrorMessage("Une erreur s'est produite");
          setLoading(false);
        }, 2000);
      });
  };

  useEffect(() => {
    fetchShopList();
    fetchCategories();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Importation de produits
      </h1>
      <div className="flex items-center justify-center space-x-3">
        {/* //Display message */}
        {successFull && (
          <div className="p-4 mb-4 text-sm text-green rounded-lg bg-green-light-5 dark:bg-gray-800 dark:text-green-400 w-full">
            <span className="font-medium">Bravo !</span> Importation effectuée
            avec succès.
          </div>
        )}

        {error && (
          <div className="p-4 mb-4 text-sm text-red rounded-lg bg-red-light-5 dark:bg-gray-800 dark:text-red-400 w-full">
            <span className="font-medium">Oops !</span> {errorMessage}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-row flex-wrap gap-5">
          <div className="xl:max-w-[70%] w-full">
            {/* Informations Générales */}
            <div className="rounded-xl bg-white shadow-1 border-[1px] border-solid border-gray-4">
              <div className="border-b-[1px] border-solid border-gray-4 pl-6 pr-6 pt-2 pb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Téléverser la sauvegarde
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  Téléchargez un modéle de fichier d&apos;importation{" "}
                  <a
                    href="/template/model.xlsx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Cliquez ici
                  </a>
                </div>
                <div>
                  <div
                    {...getRootProps()}
                    className={`min-h-[200px] flex items-center justify-center border-2 border-dashed bg-gray-1 border-gray-4 rounded-2xl p-6 cursor-pointer transition duration-300 ${
                      isDragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-gray-1"
                    }`}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <div className="flex flex-col justify-center items-center gap-2">
                        <FiUpload className="text-3xl text-gray-500" />
                        <p className="text-gray-500 text-center">
                          Déposez les fichiers ici...
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center gap-2">
                        <FiUpload className="text-3xl text-gray-500" />
                        <p className="text-gray-500 text-center">
                          Glissez-déposez des fichiers ici, ou cliquez pour
                          sélectionner des fichiers
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  {uploadedfiles.length > 0 && (
                    <div className="border border-gray-4 rounded-lg p-4 bg-gray-50">
                      <h2 className="text-sm font-medium mb-2 text-gray-700">
                        Fichiers sélectionnés :
                      </h2>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {uploadedfiles.map((file: any, index: number) => (
                          <li key={index}>
                            📄 {file.name} ({(file.size / 1024).toFixed(2)} Ko)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="xl:max-w-[25%] w-full">
            {/* Bouton de soumission */}
            <div className="rounded-xl bg-white shadow-1 border-[1px] border-solid border-gray-4">
              <div className="border-b-[1px] border-solid border-gray-4 pl-6 pr-6 pt-2 pb-2">
                <h2 className="text-xl font-semibold text-gray-800">Publier</h2>
              </div>

              <div className="p-6">
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Ajouter une boutique
                  </label>
                  <select
                    onChange={(e) => setShopId(e.target.value)}
                    value={shopId}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Choisir une boutique</option>
                    {shopList.map((shop) => (
                      <option key={shop?.id} value={shop?.id}>
                        {shop?.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={
                    uploadedfiles.length === 0 ||
                    shopId === "" ||
                    category === ""
                  }
                  className="flex flex-row justify-center w-full text-center font-medium text-custom-sm text-white bg-green py-[11px] px-9.5 rounded-md ease-out duration-200 hover:bg-green-dark mt-7.5"
                >
                  {!loading ? "Importer les produits" : <PreLoader />}
                </button>
              </div>
            </div>

            {/* Ajout de Catégorie */}
            <div className="rounded-xl bg-white shadow-1 border-[1px] border-solid border-gray-4 mt-4">
              <div className="border-b-[1px] border-solid border-gray-4 pl-6 pr-6 pt-2 pb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Catégories
                </h2>
              </div>
              <div className="p-6">
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Ajouter une Catégorie
                  </label>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Choisir une catégorie</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category?.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
