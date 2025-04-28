// pages/admin/add-product.js
"use client";

import { useState, useEffect, useCallback } from "react";
import useUser from "@/hooks/useUser";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
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
  const [images, setImages] = useState<any>([]);
  const [uploadedfiles, setUploadedfiles] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [successFull, setSuccessfull] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setUploadedfiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      multiple: true,
      accept: {
        
      },
    });

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
    // const formData = new FormData();
    // formData.append("label", productName);
    // formData.append("description", description);
    // formData.append("currency", "XOF");
    // formData.append("price", price);
    // formData.append("stock", stock);
    // formData.append("categoryId", category);
    // formData.append("shopId", shopId);
    // images.forEach((image, index) => formData.append("images", image));
    let tmpData = {
      label: productName,
      description: description,
      currency: currency,
      price: Number(price),
      stock: Number(stock),
      categoryId: category,
      shopId: shopId,
    };
    // Envoi des données au backend
    product
      .createProduct(tmpData)
      .then((response) => {
        console.log("Produit ajouté avec succès:", response);
        setLoading(false);
        setSuccessfull(true);
        if (uploadedfiles.length !== 0) {
          for (let i = 0; i < uploadedfiles.length; i++) {
            let element = uploadedfiles[i];
            const imgsformData = new FormData();
            imgsformData.append("files", element);
            product
              .addProductImages(imgsformData, response.data.id)
              .then(() => {
                console.log(
                  "Images ajoutées avec succès pour le produit:",
                  response.data.id
                );
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du produit:", error);
        setError(true);
        setErrorMessage("Une erreur s'est produite");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchShopList();
    fetchCategories();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Ajouter un Nouveau Produit
      </h1>
      <div className="flex items-center justify-center space-x-3">
        {/* //Display message */}
        {successFull && (
          <div className="p-4 mb-4 text-sm text-green rounded-lg bg-green-light-5 dark:bg-gray-800 dark:text-green-400 w-full">
            <span className="font-medium">Bravo !</span> Produit ajouté avec
            succès.
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
                  Informations Générales
                </h2>
              </div>
              <div className="p-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom du Produit
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    // className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    // className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    rows={4}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Détails du Produit */}
            <div className="rounded-xl bg-white shadow-1 border-[1px] border-solid border-gray-4 mt-4">
              <div className="border-b-[1px] border-solid border-gray-4 pl-6 pr-6 pt-2 pb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Détails du Produit
                </h2>
              </div>
              <div className="p-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prix
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    // className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Devise
                  </label>
                  <input
                    type="text"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    // className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    required
                  />
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
                  className="flex flex-row justify-center w-full text-center font-medium text-custom-sm text-white bg-green py-[11px] px-9.5 rounded-md ease-out duration-200 hover:bg-green-dark mt-7.5"
                >
                  {!loading ? "Ajouter le Produit" : <PreLoader />}
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
            {/* Ajout d'images */}
            <div className="rounded-xl bg-white shadow-1 border-[1px] border-solid border-gray-4 mt-4">
              <div className="border-b-[1px] border-solid border-gray-4 pl-6 pr-6 pt-2 pb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Images du Produit
                </h2>
              </div>
              <div className="p-6">
                <div className="mt-4">
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
          </div>
        </div>
      </form>
    </div>
  );
}
