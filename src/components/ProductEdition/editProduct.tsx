// pages/admin/add-product.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import PageLoader from "@/components/Common/PreLoader";
import useUser from "@/hooks/useUser";
import { useDropzone } from "react-dropzone";
import { AutoComplete, Checkbox, CheckboxGroup } from "rsuite";
import { FiPlus, FiX, FiUpload, FiEdit2, FiTrash, FiEye } from "react-icons/fi";
import Image from "next/image";
import PreLoader from "@/components/Common/BtnPreLoader";
import product from "@/app/api/productServices";
import categ from "@/app/api/categoriesServices";
import shop from "@/app/api/shopServices";
import labelsAPI from "@/app/api/labelsServices";
import galleriesAPI from "@/app/api/galleriesServices";

export const EditProduct = () => {
  const { userInfo } = useUser();
  const router = useRouter();
  const { uuid } = useParams();
  const [shopList, setShopList] = useState([]);
  const [id, setId] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [unite, setUnite] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [labelsList, setLabelsList] = useState([]);
  const [shopId, setShopId] = useState("");
  const [currency, setCurrency] = useState("FCFA");
  const [limit, setLimit] = useState("");
  const [status, setStatus] = useState(false);
  const [images, setImages] = useState<any>([]);
  const [imagesList, setImagesList] = useState<any>([]);
  const [imagesSelected, setImagesSelected] = useState<any>([]);
  const [uploadedfiles, setUploadedfiles] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [successFull, setSuccessfull] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uniteList, setUniteList] = useState([]);
  const [galleryModal, setGalleryModal] = useState(false);
  const [view, setView] = useState("gallery");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setUploadedfiles(acceptedFiles);
    closeModal();
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      multiple: true,
      accept: {},
    });

  const fetchShopList = () => {
    if (userInfo.role.code === "ADMIN") {
      shop
        .shopList()
        .then((response) => {
          setShopList(response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de récupération des boutiques:", error);
        });
    } else {
      shop
        .shopListByBusinessId(userInfo.id, userInfo?.access_token)
        .then((response) => {
          setShopList(response.data);
          setShopId(response.data[0].id);
        })
        .catch((error) => {
          console.error("Erreur lors de récupération des boutiques:", error);
        });
    }
  };

  const fetchLabels = () => {
    labelsAPI
      .labelsList(userInfo?.access_token)
      .then((response) => {
        console.log("Liste des labels:", response.data);
        setLabelsList(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de récupération des labels:", error);
      });
  };

  const fetchProductDetail = (uuid: any) => {
    product
      .productDetail(uuid)
      .then((response) => {
        setId(response.data?.id);
        setProductName(response.data?.designation?.label);
        setDescription(response.data?.description);
        setPrice(response.data?.price);
        setStock(response.data?.stock);
        setCurrency(response.data?.currency);
        setShopId(response.data?.shopId);
        setCategory(response.data?.categoryId);
        setUnite(response.data?.unitOfMesure);
        setLimit(response.data?.limit);
        setStatus(response.data?.enabled);
        setTimeout(() => {
          setPageLoading(false);
        }, 1000);
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

  const fectchGalleryImages = () => {
    galleriesAPI
      .galleryPhotoList(userInfo?.access_token)
      .then((response) => {
        setImagesList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGalleryImageChange = async (data: any) => {
    setImagesSelected(data);
    console.log("images selected : ", data);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccessfull(false);
    let tmpData = {
      label: productName,
      description: description,
      currency: currency,
      price: Number(price),
      stock: Number(stock),
      categoryId: category,
      shopId: shopId,
      unitOfMesure: unite,
      limit: Number(limit),
      enabled: status,
    };
    if (imagesSelected.length > 0) {
      tmpData["photoIds"] = imagesSelected;
    }
    // Envoi des données au backend
    product
      .updateProduct(id, tmpData, userInfo?.access_token)
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
              .addProductImages(imgsformData, uuid, userInfo?.access_token)
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

  const fetchUniteList = () => {
    const tmpUniteList = [
      { label: "kg", id: "Kg" },
      { label: "litre (l)", id: "L" },
      { label: "gramme (g)", id: "g" },
      { label: "cl", id: "cl" },
      { label: "ml", id: "ml" },
    ];

    setUniteList(tmpUniteList);
  };

  const closeModal = () => {
    setGalleryModal(false);
  };

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        closeModal();
      }
    }

    if (galleryModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [galleryModal, closeModal]);

  useEffect(() => {
    fetchShopList();
    fetchProductDetail(uuid);
    fetchCategories();
    fetchLabels();
    fetchUniteList();
    fectchGalleryImages();
  }, []);

  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Modifier le produit
        </h1>
        <div className="flex items-center justify-center space-x-3">
          {/* //Display message */}
          {successFull && (
            <div className="p-4 mb-4 text-sm text-green rounded-lg bg-green-light-5 dark:bg-gray-800 dark:text-green-400 w-full">
              <span className="font-medium">Bravo !</span> Produit mis à jour
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
                    Informations Générales
                  </h2>
                </div>
                <div className="p-6 description">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nom du Produit
                    </label>
                    <AutoComplete
                      value={productName}
                      data={labelsList.map((label) => label.label)}
                      style={{ padding: 0 }}
                      onChange={(e) => setProductName(e)}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                <div className="p-6 flex flex-row flex-wrap gap-4">
                  <div className="md:w-[50%]">
                    <label className="block text-sm font-medium text-gray-700">
                      Prix
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      // className="mt-1 block w-full p-3 border border-gray-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      required
                    />
                  </div>
                  <div className="md:w-[48%]">
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
                  <div className="md:w-[22%]">
                    <label className="block text-sm font-medium text-gray-700">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      // className="mt-1 block w-full p-3 border border-gray-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      className="mt-1 rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      required
                    />
                  </div>
                  <div className="md:w-[25%]">
                    <label className="block text-sm font-medium text-gray-700">
                      Stock de sécurité
                    </label>
                    <input
                      type="number"
                      value={limit}
                      onChange={(e) => setLimit(e.target.value)}
                      // className="mt-1 block w-full p-3 border border-gray-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      className="mt-1 rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      required
                    />
                  </div>
                  <div className="md:w-[49%]">
                    <label className="block text-sm font-medium text-gray-700">
                      Unité de mesure d&apos;un produit
                    </label>
                    <select
                      onChange={(e) => setUnite(e.target.value)}
                      value={unite}
                      className="mt-1 block w-full p-3 border border-gray-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">----</option>
                      {uniteList.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category?.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:max-w-[25%] w-full">
              {/* Bouton de soumission */}
              <div className="rounded-xl bg-white shadow-1 border-[1px] border-solid border-gray-4">
                <div className="border-b-[1px] border-solid border-gray-4 pl-6 pr-6 pt-2 pb-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Publier
                  </h2>
                </div>

                <div className="p-6">
                  {userInfo?.role?.code === "ADMIN" && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        value={status ? "1" : "0"}
                        onChange={(e) =>
                          setStatus(e.target.value == "1" ? true : false)
                        }
                        className="mt-1 block w-full p-3 border border-gray-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="all">Choisir un status</option>
                        <option value="1">Publié</option>
                        <option value="0">Désactivé</option>
                      </select>
                    </div>
                  )}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Ajouter une boutique
                    </label>
                    <select
                      defaultValue={shopId}
                      disabled={userInfo.role.code === "ADMIN" ? false : true}
                      onChange={(e) => setShopId(e.target.value)}
                      className="mt-1 block w-full p-3 border border-gray-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {userInfo.role.code === "ADMIN" && (
                        <option value="">Choisir une boutique</option>
                      )}
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
                    {!loading ? "Mettre à jour" : <PreLoader />}
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
                      defaultValue={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mt-1 block w-full p-3 border border-gray-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                    <a href="#" onClick={() => setGalleryModal(true)}>
                      <div>
                        <div
                          className={`flex items-center justify-center border-2 border-dashed bg-gray-1 border-gray-4 rounded-2xl p-6 cursor-pointer transition duration-300 border-gray-300`}
                        >
                          <div className="flex flex-col justify-center items-center gap-2">
                            <p className="text-gray-500 text-center">
                              Definir l{"'"}image de mise en avant
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div className="mt-4">
                      {uploadedfiles.length > 0 && (
                        <div className="border border-gray-4 rounded-lg p-4 bg-gray-50">
                          <h2 className="text-sm font-medium mb-2 text-gray-700">
                            Fichiers sélectionnés :
                          </h2>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {uploadedfiles.map((file: any, index: number) => (
                              <li key={index}>
                                📄 {file.name} ({(file.size / 1024).toFixed(2)}{" "}
                                Ko)
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
      <div
        className={`fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5 ${
          galleryModal ? "block z-99999" : "hidden"
        }`}
      >
        <div className="flex items-center justify-center ">
          <div
            x-show="addressModal"
            className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content"
          >
            <button
              onClick={closeModal}
              aria-label="button for close modal"
              className="absolute top-0 right-0 sm:top-3 sm:right-3 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 bg-meta text-body hover:text-dark"
            >
              <svg
                className="fill-current"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.3108 13L19.2291 8.08167C19.5866 7.72417 19.5866 7.12833 19.2291 6.77083C19.0543 6.59895 18.8189 6.50262 18.5737 6.50262C18.3285 6.50262 18.0932 6.59895 17.9183 6.77083L13 11.6892L8.08164 6.77083C7.90679 6.59895 7.67142 6.50262 7.42623 6.50262C7.18104 6.50262 6.94566 6.59895 6.77081 6.77083C6.41331 7.12833 6.41331 7.72417 6.77081 8.08167L11.6891 13L6.77081 17.9183C6.41331 18.2758 6.41331 18.8717 6.77081 19.2292C7.12831 19.5867 7.72414 19.5867 8.08164 19.2292L13 14.3108L17.9183 19.2292C18.2758 19.5867 18.8716 19.5867 19.2291 19.2292C19.5866 18.8717 19.5866 18.2758 19.2291 17.9183L14.3108 13Z"
                  fill=""
                />
              </svg>
            </button>

            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-semibold text-dark">
                  Insérez un média
                </h3>
              </div>
              <div>
                <button
                  className={`p-4 rounded-lg mr-2 ${
                    view === "list" && "bg-gray-2"
                  }`}
                  onClick={() => setView("list")}
                >
                  Téléverser des fichiers
                </button>
                <button
                  className={`p-4 rounded-lg ${
                    view === "gallery" && "bg-gray-2"
                  }`}
                  onClick={() => setView("gallery")}
                >
                  Médiathèque
                </button>
              </div>
              <div className="mt-5 p-5">
                {view === "gallery" && (
                  <CheckboxGroup
                    name="checkbox-group"
                    color="green"
                    onChange={(value) => {
                      handleGalleryImageChange(value);
                    }}
                  >
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
                      {imagesList.length > 0 &&
                        imagesList.map((image: any, index: number) => (
                          <div
                            className="cursor-pointer hover:scale-105 ease-out duration-200 relative"
                            key={index}
                          >
                            <Checkbox value={image?.id}>
                              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-100 ease-out duration-200">
                                <div className="absolute top-5 left-5 flex justify-center items-center w-full transform -translate-x-1/2 -translate-y-1/2 z-9999"></div>
                              </div>
                              <Image
                                src={image.url}
                                alt="Product"
                                width={150}
                                height={150}
                                className="w-[150px] h-[100px] object-cover"
                              />
                            </Checkbox>
                          </div>
                        ))}
                      {imagesList.length === 0 && (
                        <div className="col-span-4">
                          <p className="text-center">Aucune image</p>
                        </div>
                      )}
                    </div>
                  </CheckboxGroup>
                )}
                {view === "list" && (
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
                )}
              </div>
              <div className="mt-5 p-5">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    onClick={closeModal}
                    className="ml-4 bg-green hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {pageLoading && <PageLoader />}
    </>
  );
};
