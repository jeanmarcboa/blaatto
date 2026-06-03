import React, { useRef, useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useUser from "@/hooks/useUser";
import PreLoader from "@/components/Common/BtnPreLoader";

import pubAPI from "@/app/api/publicationsServices";
import { FiUpload, FiX } from "react-icons/fi";

const Modal = ({
  isOpen,
  closeModal,
  successFull,
  errorMessage,
  error,
  refreshData,
}: any) => {
  const { userInfo } = useUser();
  const [item, setItem] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [uploadedfiles, setUploadedfiles] = useState<any>([]);
  const [showUpload, setShowUpload] = useState(false);

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    setUploadedfiles(acceptedFiles);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      multiple: true,
      accept: {},
    });

  const submitPhoto = (file, itemId) => {
    let element = file;
    const imgsformData = new FormData();
    imgsformData.append("image", element);
    pubAPI
      .importPicture(imgsformData, userInfo?.access_token)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    let image = uploadedfiles[0];
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", item.title);
    formData.append("position", item.position);
    formData.append("type", "IMAGE");
    formData.append("status", item.status ?? "ACTIVE");

    pubAPI
      .createPublication(formData, userInfo?.access_token)
      .then((response) => {
        // if (uploadedfiles.length !== 0) {
        //   submitPhoto(uploadedfiles[0], response.data.id);
        // }
        setTimeout(() => {
          setLoading(false);
          refreshData();
          closeModal();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        closeModal();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5 ${
          isOpen ? "block z-99999" : "hidden"
        }`}
      >
        {successFull && (
          <div className="p-4 mb-4 text-sm text-green rounded-lg bg-green-light-5 dark:bg-gray-800 dark:text-green-400 w-full">
            <span className="font-medium">Bravo !</span> Information modifié
            avec succès.
          </div>
        )}

        {error && (
          <div className="p-4 mb-4 text-sm text-red rounded-lg bg-red-light-5 dark:bg-gray-800 dark:text-red-400 w-full">
            <span className="font-medium">Oops !</span> {errorMessage}
          </div>
        )}
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
              {/* Content */}
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
              <div>
                <p>Titre</p>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  className="rounded-lg border border-gray-3 bg-white placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                />
              </div>
              <div>
                <p>Position</p>
                <select
                  name="position"
                  onChange={handleChange}
                  className="rounded-lg border border-gray-3 bg-white placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                >
                  <option>---Selectionnez---</option>
                  <option value="MODAL">Pop-Up</option>
                </select>
              </div>
              <div>
                <p>Statut</p>
                <select
                  name="status"
                  onChange={(e) => handleChange(e)}
                  className="w-1/4 block p-4 text-md text-gray-900 border border-gray-4 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4"
                >
                  <option>---Selectionnez---</option>
                  <option value="ACTIVE">Actif</option>
                  <option value="DRAFT">Brouillon</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-[30%] flex justify-center font-medium text-white bg-green py-3 px-6 rounded-lg ease-out duration-200 hover:bg-green-dark mt-7.5"
                  disabled={loading}
                >
                  {loading ? "Enregistrement en cours..." : "Enregistrer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
