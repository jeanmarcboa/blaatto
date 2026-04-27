"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import PreLoader from "@/components/Common/BtnPreLoader";

import pubAPI from "@/app/api/publicationsServices";

const fakeData = [
  {
    id: 1,
    image:
      "https://fastly.picsum.photos/id/529/800/900.jpg?hmac=ox-LZ0luXtLfOMmiuntu1zNMx_SKU1407bzT8Zt7MjU",
  },
];

const ShopEditModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAds, setCurrentAds] = useState<any>({});
  const closeModal = () => {
    setIsOpen(false);
  };

  const fetchAds = () => {
    pubAPI.publicationsList().then((response) => {
      const published = response.data.filter(
        (item: any) => item.position === "MODAL"
      );
      if (published.length !== 0) {
        setCurrentAds(published[0]);
        setIsOpen(true);
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      fetchAds();
    }, 5000);
  }, []);

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
        <div className="flex items-center justify-center ">
          <div
            x-show="addressModal"
            className="w-full max-w-[500px] rounded-xl shadow-3 bg-transparent p-7.5 relative modal-content"
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

            <div className="flex items-center justify-center">
              <Image
                src={currentAds?.image}
                alt="ads"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopEditModal;
