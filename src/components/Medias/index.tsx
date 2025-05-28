"use client";
import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import Breadcrumb from "../Common/Breadcrumb";
import PreLoader from "@/components/Common/BtnPreLoader";
import { useDropzone } from "react-dropzone";
import { FiPlus, FiX, FiUpload, FiEdit2, FiTrash, FiEye } from "react-icons/fi";
import Image from "next/image";
import Orders from "../Orders";
import useUser from "@/hooks/useUser";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
//import accounts restAPI
import accountAPI from "@/app/api/accountServices";
import galleryAPI from "@/app/api/galleriesServices";

const Medias = () => {
  const { userInfo, isLoggedIn, setLoginData, deleteLoginData } = useUser();

  const router = useRouter();
  const [uploadedfiles, setUploadedfiles] = useState<any>([]);
  const [item, setItem] = useState(userInfo);
  const [type, setType] = useState("");
  const [images, setImages] = useState<any>([]);
  const [tmpImages, setTmpImages] = useState<any>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successFull, setSuccessfull] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [productStyle, setProductStyle] = useState("grid");

  const handleChangeText = (event: any) => {
    const { value } = event.target;

    if (value.length >= 2) {
      const results = tmpImages?.filter((item: any) => {
        return item?.name.toLowerCase().includes(value.toLowerCase());
      });

      setImages(results);
    }
    if (value.length === 0) {
      setImages(tmpImages);
    }
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    setUploadedfiles(acceptedFiles);
    submitPhoto(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      multiple: true,
      accept: {},
    });

  const fetchGalleryPhoto = async () => {
    galleryAPI
      .galleryPhotoList(userInfo?.access_token)
      .then((response) => {
        setImages(response.data);
        setTmpImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchGalleryPhoto();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/signin");
      return;
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    router.push("/signin");
    return;
  }

  const submitPhoto = (files) => {
    setLoading(true);
    if (files.length !== 0) {
      for (let i = 0; i < files.length; i++) {
        let element = files[i];
        const imgsformData = new FormData();
        imgsformData.append("files", element);
        galleryAPI
          .createGalleryPhoto(imgsformData, userInfo?.access_token)
          .then(() => {
            setLoading(false);
            setShowUpload(false);

            fetchGalleryPhoto();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const deletePhoto = (id: string) => {
    galleryAPI
      .deletedGalleryPhoto(id, userInfo?.access_token)
      .then(() => {
        fetchGalleryPhoto();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DisplayImagesInTable = () => {
    return (
      <div className="bg-white rounded-[10px] border border-gray-4 dark:border-gray-800 overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-5.5 px-10 bg-gray-1 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Fichier
              </th>
              <th className="py-5.5 px-10 bg-gray-1 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-5.5 px-10 bg-gray-1 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Date de téléchargement
              </th>
              <th className="py-5.5 px-10 bg-gray-1 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray">
            {images.map((image, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-40 w-40">
                      <img className="h-40 w-40" src={image.url} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {image.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green text-white">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {dayjs(new Date()).format("DD/MM/YYYY, HH:mm:ss")}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="min-w-[20%] flex justify-end">
                    <button
                      onClick={() => {}}
                      aria-label="button for remove product from wishlist"
                      className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 mr-4 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-blue-light-5 hover:border-blue-light-4 hover:text-green"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => deletePhoto(image.id)}
                      aria-label="button for remove product from wishlist"
                      className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
                    >
                      <FiTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <section className="overflow-hidden py-20 bg-gray-2 min-h-screen">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">Mediathèques</h2>
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 bg-green py-2 px-4 rounded text-white text-sm"
            >
              <FiPlus /> Ajouter une image
            </button>
          </div>

          {/* Ajout d'images */}
          {showUpload && (
            <div className="rounded-xl bg-white shadow-1 border-[1px] border-solid border-gray-4 mt-4 mb-4">
              <div className="flex justify-between align-middle border-b-[1px] border-solid border-gray-4 pl-6 pr-6 pt-2 pb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Déposez vos fichiers pour les téléverser
                </h2>
                <button
                  onClick={() => setShowUpload(false)}
                  className="flex items-center gap-2 py-2 px-4 rounded text-dark text-sm"
                >
                  <FiX className="text-2xl" />
                </button>
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
          )}

          <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
            <div className="flex items-center justify-between">
              {/* <!-- top bar left --> */}
              <div className="flex flex-wrap items-center gap-4">
                <p>Affichage</p>
              </div>

              {/* <!-- top bar right --> */}
              <div className="flex items-center gap-2.5">
                <div className="w-3/4">
                  <div className="relative">
                    <input
                      type="search"
                      onChange={handleChangeText}
                      className="block w-full p-4 ps-10 text-md text-gray-900 border border-gray-4 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Rechercher..."
                      required
                    />
                  </div>
                </div>
                <button
                  onClick={() => setProductStyle("grid")}
                  aria-label="button for product grid tab"
                  className={`${
                    productStyle === "grid"
                      ? "bg-green border-green text-white"
                      : "text-dark bg-gray-1 border-gray-3"
                  } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-green hover:border-green hover:text-white`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.836 1.3125C4.16215 1.31248 3.60022 1.31246 3.15414 1.37244C2.6833 1.43574 2.2582 1.57499 1.91659 1.91659C1.57499 2.2582 1.43574 2.6833 1.37244 3.15414C1.31246 3.60022 1.31248 4.16213 1.3125 4.83598V4.914C1.31248 5.58785 1.31246 6.14978 1.37244 6.59586C1.43574 7.06671 1.57499 7.49181 1.91659 7.83341C2.2582 8.17501 2.6833 8.31427 3.15414 8.37757C3.60022 8.43754 4.16213 8.43752 4.83598 8.4375H4.914C5.58785 8.43752 6.14978 8.43754 6.59586 8.37757C7.06671 8.31427 7.49181 8.17501 7.83341 7.83341C8.17501 7.49181 8.31427 7.06671 8.37757 6.59586C8.43754 6.14978 8.43752 5.58787 8.4375 4.91402V4.83601C8.43752 4.16216 8.43754 3.60022 8.37757 3.15414C8.31427 2.6833 8.17501 2.2582 7.83341 1.91659C7.49181 1.57499 7.06671 1.43574 6.59586 1.37244C6.14978 1.31246 5.58787 1.31248 4.91402 1.3125H4.836ZM2.71209 2.71209C2.80983 2.61435 2.95795 2.53394 3.30405 2.4874C3.66632 2.4387 4.15199 2.4375 4.875 2.4375C5.59801 2.4375 6.08368 2.4387 6.44596 2.4874C6.79205 2.53394 6.94018 2.61435 7.03791 2.71209C7.13565 2.80983 7.21607 2.95795 7.2626 3.30405C7.31131 3.66632 7.3125 4.15199 7.3125 4.875C7.3125 5.59801 7.31131 6.08368 7.2626 6.44596C7.21607 6.79205 7.13565 6.94018 7.03791 7.03791C6.94018 7.13565 6.79205 7.21607 6.44596 7.2626C6.08368 7.31131 5.59801 7.3125 4.875 7.3125C4.15199 7.3125 3.66632 7.31131 3.30405 7.2626C2.95795 7.21607 2.80983 7.13565 2.71209 7.03791C2.61435 6.94018 2.53394 6.79205 2.4874 6.44596C2.4387 6.08368 2.4375 5.59801 2.4375 4.875C2.4375 4.15199 2.4387 3.66632 2.4874 3.30405C2.53394 2.95795 2.61435 2.80983 2.71209 2.71209Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.086 9.5625C12.4121 9.56248 11.8502 9.56246 11.4041 9.62244C10.9333 9.68574 10.5082 9.82499 10.1666 10.1666C9.82499 10.5082 9.68574 10.9333 9.62244 11.4041C9.56246 11.8502 9.56248 12.4121 9.5625 13.086V13.164C9.56248 13.8379 9.56246 14.3998 9.62244 14.8459C9.68574 15.3167 9.82499 15.7418 10.1666 16.0834C10.5082 16.425 10.9333 16.5643 11.4041 16.6276C11.8502 16.6875 12.4121 16.6875 13.0859 16.6875H13.164C13.8378 16.6875 14.3998 16.6875 14.8459 16.6276C15.3167 16.5643 15.7418 16.425 16.0834 16.0834C16.425 15.7418 16.5643 15.3167 16.6276 14.8459C16.6875 14.3998 16.6875 13.8379 16.6875 13.1641V13.086C16.6875 12.4122 16.6875 11.8502 16.6276 11.4041C16.5643 10.9333 16.425 10.5082 16.0834 10.1666C15.7418 9.82499 15.3167 9.68574 14.8459 9.62244C14.3998 9.56246 13.8379 9.56248 13.164 9.5625H13.086ZM10.9621 10.9621C11.0598 10.8644 11.208 10.7839 11.554 10.7374C11.9163 10.6887 12.402 10.6875 13.125 10.6875C13.848 10.6875 14.3337 10.6887 14.696 10.7374C15.0421 10.7839 15.1902 10.8644 15.2879 10.9621C15.3857 11.0598 15.4661 11.208 15.5126 11.554C15.5613 11.9163 15.5625 12.402 15.5625 13.125C15.5625 13.848 15.5613 14.3337 15.5126 14.696C15.4661 15.0421 15.3857 15.1902 15.2879 15.2879C15.1902 15.3857 15.0421 15.4661 14.696 15.5126C14.3337 15.5613 13.848 15.5625 13.125 15.5625C12.402 15.5625 11.9163 15.5613 11.554 15.5126C11.208 15.4661 11.0598 15.3857 10.9621 15.2879C10.8644 15.1902 10.7839 15.0421 10.7374 14.696C10.6887 14.3337 10.6875 13.848 10.6875 13.125C10.6875 12.402 10.6887 11.9163 10.7374 11.554C10.7839 11.208 10.8644 11.0598 10.9621 10.9621Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.836 9.5625H4.914C5.58786 9.56248 6.14978 9.56246 6.59586 9.62244C7.06671 9.68574 7.49181 9.82499 7.83341 10.1666C8.17501 10.5082 8.31427 10.9333 8.37757 11.4041C8.43754 11.8502 8.43752 12.4121 8.4375 13.086V13.164C8.43752 13.8378 8.43754 14.3998 8.37757 14.8459C8.31427 15.3167 8.17501 15.7418 7.83341 16.0834C7.49181 16.425 7.06671 16.5643 6.59586 16.6276C6.14979 16.6875 5.58789 16.6875 4.91405 16.6875H4.83601C4.16217 16.6875 3.60022 16.6875 3.15414 16.6276C2.6833 16.5643 2.2582 16.425 1.91659 16.0834C1.57499 15.7418 1.43574 15.3167 1.37244 14.8459C1.31246 14.3998 1.31248 13.8379 1.3125 13.164V13.086C1.31248 12.4122 1.31246 11.8502 1.37244 11.4041C1.43574 10.9333 1.57499 10.5082 1.91659 10.1666C2.2582 9.82499 2.6833 9.68574 3.15414 9.62244C3.60023 9.56246 4.16214 9.56248 4.836 9.5625ZM3.30405 10.7374C2.95795 10.7839 2.80983 10.8644 2.71209 10.9621C2.61435 11.0598 2.53394 11.208 2.4874 11.554C2.4387 11.9163 2.4375 12.402 2.4375 13.125C2.4375 13.848 2.4387 14.3337 2.4874 14.696C2.53394 15.0421 2.61435 15.1902 2.71209 15.2879C2.80983 15.3857 2.95795 15.4661 3.30405 15.5126C3.66632 15.5613 4.15199 15.5625 4.875 15.5625C5.59801 15.5625 6.08368 15.5613 6.44596 15.5126C6.79205 15.4661 6.94018 15.3857 7.03791 15.2879C7.13565 15.1902 7.21607 15.0421 7.2626 14.696C7.31131 14.3337 7.3125 13.848 7.3125 13.125C7.3125 12.402 7.31131 11.9163 7.2626 11.554C7.21607 11.208 7.13565 11.0598 7.03791 10.9621C6.94018 10.8644 6.79205 10.7839 6.44596 10.7374C6.08368 10.6887 5.59801 10.6875 4.875 10.6875C4.15199 10.6875 3.66632 10.6887 3.30405 10.7374Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.086 1.3125C12.4122 1.31248 11.8502 1.31246 11.4041 1.37244C10.9333 1.43574 10.5082 1.57499 10.1666 1.91659C9.82499 2.2582 9.68574 2.6833 9.62244 3.15414C9.56246 3.60023 9.56248 4.16214 9.5625 4.836V4.914C9.56248 5.58786 9.56246 6.14978 9.62244 6.59586C9.68574 7.06671 9.82499 7.49181 10.1666 7.83341C10.5082 8.17501 10.9333 8.31427 11.4041 8.37757C11.8502 8.43754 12.4121 8.43752 13.086 8.4375H13.164C13.8378 8.43752 14.3998 8.43754 14.8459 8.37757C15.3167 8.31427 15.7418 8.17501 16.0834 7.83341C16.425 7.49181 16.5643 7.06671 16.6276 6.59586C16.6875 6.14978 16.6875 5.58787 16.6875 4.91402V4.83601C16.6875 4.16216 16.6875 3.60022 16.6276 3.15414C16.5643 2.6833 16.425 2.2582 16.0834 1.91659C15.7418 1.57499 15.3167 1.43574 14.8459 1.37244C14.3998 1.31246 13.8379 1.31248 13.164 1.3125H13.086ZM10.9621 2.71209C11.0598 2.61435 11.208 2.53394 11.554 2.4874C11.9163 2.4387 12.402 2.4375 13.125 2.4375C13.848 2.4375 14.3337 2.4387 14.696 2.4874C15.0421 2.53394 15.1902 2.61435 15.2879 2.71209C15.3857 2.80983 15.4661 2.95795 15.5126 3.30405C15.5613 3.66632 15.5625 4.15199 15.5625 4.875C15.5625 5.59801 15.5613 6.08368 15.5126 6.44596C15.4661 6.79205 15.3857 6.94018 15.2879 7.03791C15.1902 7.13565 15.0421 7.21607 14.696 7.2626C14.3337 7.31131 13.848 7.3125 13.125 7.3125C12.402 7.3125 11.9163 7.31131 11.554 7.2626C11.208 7.21607 11.0598 7.13565 10.9621 7.03791C10.8644 6.94018 10.7839 6.79205 10.7374 6.44596C10.6887 6.08368 10.6875 5.59801 10.6875 4.875C10.6875 4.15199 10.6887 3.66632 10.7374 3.30405C10.7839 2.95795 10.8644 2.80983 10.9621 2.71209Z"
                      fill=""
                    />
                  </svg>
                </button>

                <button
                  onClick={() => setProductStyle("list")}
                  aria-label="button for product list tab"
                  className={`${
                    productStyle === "list"
                      ? "bg-green border-green text-white"
                      : "text-dark bg-gray-1 border-gray-3"
                  } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-green hover:border-green hover:text-white`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.4234 0.899903C3.74955 0.899882 3.18763 0.899864 2.74155 0.959838C2.2707 1.02314 1.8456 1.16239 1.504 1.504C1.16239 1.8456 1.02314 2.2707 0.959838 2.74155C0.899864 3.18763 0.899882 3.74953 0.899903 4.42338V4.5014C0.899882 5.17525 0.899864 5.73718 0.959838 6.18326C1.02314 6.65411 1.16239 7.07921 1.504 7.42081C1.8456 7.76241 2.2707 7.90167 2.74155 7.96497C3.18763 8.02495 3.74953 8.02493 4.42339 8.02491H4.5014C5.17525 8.02493 14.7372 8.02495 15.1833 7.96497C15.6541 7.90167 16.0792 7.76241 16.4208 7.42081C16.7624 7.07921 16.9017 6.65411 16.965 6.18326C17.0249 5.73718 17.0249 5.17527 17.0249 4.50142V4.42341C17.0249 3.74956 17.0249 3.18763 16.965 2.74155C16.9017 2.2707 16.7624 1.8456 16.4208 1.504C16.0792 1.16239 15.6541 1.02314 15.1833 0.959838C14.7372 0.899864 5.17528 0.899882 4.50142 0.899903H4.4234ZM2.29949 2.29949C2.39723 2.20175 2.54535 2.12134 2.89145 2.07481C3.25373 2.0261 3.7394 2.0249 4.4624 2.0249C5.18541 2.0249 14.6711 2.0261 15.0334 2.07481C15.3795 2.12134 15.5276 2.20175 15.6253 2.29949C15.7231 2.39723 15.8035 2.54535 15.85 2.89145C15.8987 3.25373 15.8999 3.7394 15.8999 4.4624C15.8999 5.18541 15.8987 5.67108 15.85 6.03336C15.8035 6.37946 15.7231 6.52758 15.6253 6.62532C15.5276 6.72305 15.3795 6.80347 15.0334 6.85C14.6711 6.89871 5.18541 6.8999 4.4624 6.8999C3.7394 6.8999 3.25373 6.89871 2.89145 6.85C2.54535 6.80347 2.39723 6.72305 2.29949 6.62532C2.20175 6.52758 2.12134 6.37946 2.07481 6.03336C2.0261 5.67108 2.0249 5.18541 2.0249 4.4624C2.0249 3.7394 2.0261 3.25373 2.07481 2.89145C2.12134 2.54535 2.20175 2.39723 2.29949 2.29949Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.4234 9.1499H4.5014C5.17526 9.14988 14.7372 9.14986 15.1833 9.20984C15.6541 9.27314 16.0792 9.41239 16.4208 9.754C16.7624 10.0956 16.9017 10.5207 16.965 10.9915C17.0249 11.4376 17.0249 11.9995 17.0249 12.6734V12.7514C17.0249 13.4253 17.0249 13.9872 16.965 14.4333C16.9017 14.9041 16.7624 15.3292 16.4208 15.6708C16.0792 16.0124 15.6541 16.1517 15.1833 16.215C14.7372 16.2749 5.17529 16.2749 4.50145 16.2749H4.42341C3.74957 16.2749 3.18762 16.2749 2.74155 16.215C2.2707 16.1517 1.8456 16.0124 1.504 15.6708C1.16239 15.3292 1.02314 14.9041 0.959838 14.4333C0.899864 13.9872 0.899882 13.4253 0.899903 12.7514V12.6734C0.899882 11.9996 0.899864 11.4376 0.959838 10.9915C1.02314 10.5207 1.16239 10.0956 1.504 9.754C1.8456 9.41239 2.2707 9.27314 2.74155 9.20984C3.18763 9.14986 3.74955 9.14988 4.4234 9.1499ZM2.89145 10.3248C2.54535 10.3713 2.39723 10.4518 2.29949 10.5495C2.20175 10.6472 2.12134 10.7954 2.07481 11.1414C2.0261 11.5037 2.0249 11.9894 2.0249 12.7124C2.0249 13.4354 2.0261 13.9211 2.07481 14.2834C2.12134 14.6295 2.20175 14.7776 2.29949 14.8753C2.39723 14.9731 2.54535 15.0535 2.89145 15.1C3.25373 15.1487 3.7394 15.1499 4.4624 15.1499C5.18541 15.1499 14.6711 15.1487 15.0334 15.1C15.3795 15.0535 15.5276 14.9731 15.6253 14.8753C15.7231 14.7776 15.8035 14.6295 15.85 14.2834C15.8987 13.9211 15.8999 13.4354 15.8999 12.7124C15.8999 11.9894 15.8987 11.5037 15.85 11.1414C15.8035 10.7954 15.7231 10.6472 15.6253 10.5495C15.5276 10.4518 15.3795 10.3713 15.0334 10.3248C14.6711 10.2761 5.18541 10.2749 4.4624 10.2749C3.7394 10.2749 3.25373 10.2761 2.89145 10.3248Z"
                      fill=""
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {/* //Create images skeleton */}
            {loading && (
              <div className="cursor-pointer flex justify-center items-center w-[85px] h-[85px]">
                <PreLoader />
              </div>
            )}

            {productStyle === "grid" && (
              <PhotoProvider>
                {images.length > 0 &&
                  images.map((image: any, index: number) => (
                    <PhotoView key={index} src={image.url}>
                      <div className="cursor-pointer hover:scale-105 ease-out duration-200 relative">
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-100 ease-out duration-200">
                          <div className="absolute top-1/2 left-1/2 flex justify-center items-center w-full transform -translate-x-1/2 -translate-y-1/2 z-9999">
                            <FiEye className="text-white text-2xl" />
                          </div>
                        </div>
                        <Image
                          src={image.url}
                          alt="Product"
                          width={150}
                          height={150}
                          className="w-[150px] h-[100px] object-cover"
                        />
                      </div>
                    </PhotoView>
                  ))}
              </PhotoProvider>
            )}
          </div>
          {productStyle === "list" && <DisplayImagesInTable />}
          {images.length === 0 && (
            <div className="w-full p-5">
              <p className="text-center">Aucune image</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Medias;
