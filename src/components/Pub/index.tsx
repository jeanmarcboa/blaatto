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
import Modal from "@/components/Pub/Modal-pub";
//import accounts restAPI
import accountAPI from "@/app/api/accountServices";
import galleryAPI from "@/app/api/galleriesServices";
import pubAPI from "@/app/api/publicationsServices";

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
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const fetchPubList = () => {
    pubAPI
      .publicationsList()
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPubList();
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

  const deletePhoto = (id: string) => {
    pubAPI
      .deletePublications(id, userInfo?.access_token)
      .then(() => {
        fetchPubList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section className="overflow-hidden min-h-screen">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">Publicités</h2>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 bg-green py-2 px-4 rounded text-white text-sm"
            >
              <FiPlus /> Ajouter une publicité
            </button>
          </div>

          <div className="bg-white rounded-[10px] border border-gray-4 dark:border-gray-800 overflow-hidden">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[1170px]">
                {/* <!-- table header --> */}
                <div className="flex items-center bg-gray-1 py-5.5 px-10">
                  {/* <div className="min-w-[83px]"></div> */}
                  <div className="min-w-[450px]">
                    <p className="text-dark">Titre</p>
                  </div>

                  <div className="min-w-[205px]">
                    <p className="text-dark">Status</p>
                  </div>

                  <div className="min-w-[205px]">
                    <p className="text-dark">Date de création</p>
                  </div>

                  <div className="min-w-[150px]">
                    <p className="text-dark text-right">Action</p>
                  </div>
                </div>
                {loading && (
                  <div className="flex justify-center items-center m-4">
                    <PreLoader color="green" />
                  </div>
                )}
                {!loading && images.length === 0 && (
                  <div className="flex justify-center items-center m-4">
                    Aucun élément trouvé.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        successFull={successFull}
        error={error}
        errorMessage={errorMessage}
        refreshData={fetchPubList}
      />
    </>
  );
};

export default Medias;
