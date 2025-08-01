import React, { useRef, useEffect } from "react";
import PreLoader from "@/components/Common/BtnPreLoader";

const ShopEditModal = ({
  isOpen,
  closeModal,
  item,
  handleInputChange,
  loading,
  handleSubmit,
  successFull,
  errorMessage,
  error,
  userInfo,
  merchantList,
}: any) => {
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
              <form>
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

                {userInfo?.role?.code === "ADMIN" && (
                  <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                    <div className="w-full">
                      <label htmlFor="email" className="block mb-2.5">
                        Commerçant
                      </label>

                      <select
                        name="accountId"
                        value={item?.accountId || ""}
                        onChange={handleInputChange}
                        className="rounded-lg border border-gray-3 bg-white placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      >
                        <option value="">Sélectionnez un commerçant</option>
                        {merchantList?.map((item: any, index: number) => (
                          <option value={item.id} key={index}>
                            {item.firstname + " " + item.lastname}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                  <div className="w-full">
                    <label htmlFor="label" className="block mb-2.5">
                      Nom de la boutique
                    </label>

                    <input
                      type="text"
                      name="label"
                      value={item?.label}
                      onChange={handleInputChange}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                  <div className="w-full">
                    <label htmlFor="email" className="block mb-2.5">
                      Numéro de registre de commerce
                    </label>

                    <input
                      type="text"
                      name="commercialRegister"
                      id="commercialRegister"
                      placeholder="Entrez le numéro de registre de commerce"
                      value={item?.commercialRegister}
                      onChange={handleInputChange}
                      className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                  <div className="w-full">
                    <label htmlFor="phoneNumber" className="block mb-2.5">
                      Contact
                    </label>

                    <input
                      type="text"
                      name="phoneNumber"
                      value={item?.phoneNumber}
                      onChange={handleInputChange}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="address" className="block mb-2.5">
                      Adresse
                    </label>

                    <input
                      type="text"
                      name="address"
                      value={item?.address}
                      onChange={handleInputChange}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                  <div className="w-full">
                    <label htmlFor="label" className="block mb-2.5">
                      Description
                    </label>

                    <textarea
                      rows={4}
                      name="description"
                      value={item?.description}
                      onChange={handleInputChange}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="inline-flex font-medium text-white bg-green py-3 px-7 rounded-md ease-out duration-200 hover:bg-green-dark"
                >
                  {loading ? <PreLoader /> : "Enregistrer les modifications"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopEditModal;
