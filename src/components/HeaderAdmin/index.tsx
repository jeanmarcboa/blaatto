"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CustomSelect from "./CustomSelect";
import useUser from "@/hooks/useUser";
import { menuData } from "./menuData";
import Dropdown from "./Dropdown";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import Image from "next/image";

const Header = () => {
  const { isLoggedIn, userInfo, deleteLoginData } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const { openCartModal } = useCartModalContext();

  const product = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

  const handleOpenCartModal = () => {
    openCartModal();
  };

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  return (
    <header
      className={`fixed left-0 top-0 w-full z-9999 bg-white transition-all ease-in-out duration-300 ${
        stickyMenu && "shadow"
      }`}
    >
      <div className="max-w-[100%] mx-auto px-4 sm:px-7.5 xl:px-4">
        {/* <!-- header top start --> */}
        <div
          className={`flex flex-col lg:flex-row gap-5 items-end lg:items-center xl:justify-between ease-out duration-200`}
        >
          {/* <!-- header top left --> */}
          <div className="xl:w-auto flex-col sm:flex-row w-full flex sm:justify-between sm:items-center gap-5 sm:gap-10">
            <Link className="flex-shrink-0" href="/">
              <Image
                src="/images/logo/logo-Buy-For-Women.png"
                alt="Logo"
                width={219}
                height={36}
              />
            </Link>
          </div>

          {/* <!-- header top right --> */}
          <div className="flex w-full lg:w-auto items-center gap-3">
            <div className="flex w-full lg:w-auto justify-between items-center gap-5">
              <div className="flex items-center gap-5">
                <Link href="/" className="flex items-center gap-2.5">
                  <div>
                    <p className="font-medium text-custom-sm text-dark">
                      Aller sur le site
                    </p>
                  </div>
                </Link>
                {/* <!-- divider --> */}
                <span className="hidden xl:block w-px h-7.5 bg-gray-4"></span>
                <ul className="flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-6">
                  <li className="group relative before:w-0 before:h-[3px] before:bg-green before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full false">
                    <a
                      className="hover:text-green text-custom-sm font-medium text-dark flex items-center gap-1.5 capitalize xl:py-4 false"
                      href="#"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 1.25C9.37666 1.25 7.25001 3.37665 7.25001 6C7.25001 8.62335 9.37666 10.75 12 10.75C14.6234 10.75 16.75 8.62335 16.75 6C16.75 3.37665 14.6234 1.25 12 1.25ZM8.75001 6C8.75001 4.20507 10.2051 2.75 12 2.75C13.7949 2.75 15.25 4.20507 15.25 6C15.25 7.79493 13.7949 9.25 12 9.25C10.2051 9.25 8.75001 7.79493 8.75001 6Z"
                          fill="#22AD5C"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 12.25C9.68646 12.25 7.55494 12.7759 5.97546 13.6643C4.4195 14.5396 3.25001 15.8661 3.25001 17.5L3.24995 17.602C3.24882 18.7638 3.2474 20.222 4.52642 21.2635C5.15589 21.7761 6.03649 22.1406 7.22622 22.3815C8.41927 22.6229 9.97424 22.75 12 22.75C14.0258 22.75 15.5808 22.6229 16.7738 22.3815C17.9635 22.1406 18.8441 21.7761 19.4736 21.2635C20.7526 20.222 20.7512 18.7638 20.7501 17.602L20.75 17.5C20.75 15.8661 19.5805 14.5396 18.0246 13.6643C16.4451 12.7759 14.3136 12.25 12 12.25ZM4.75001 17.5C4.75001 16.6487 5.37139 15.7251 6.71085 14.9717C8.02681 14.2315 9.89529 13.75 12 13.75C14.1047 13.75 15.9732 14.2315 17.2892 14.9717C18.6286 15.7251 19.25 16.6487 19.25 17.5C19.25 18.8078 19.2097 19.544 18.5264 20.1004C18.1559 20.4022 17.5365 20.6967 16.4762 20.9113C15.4193 21.1252 13.9742 21.25 12 21.25C10.0258 21.25 8.58075 21.1252 7.5238 20.9113C6.46354 20.6967 5.84413 20.4022 5.4736 20.1004C4.79033 19.544 4.75001 18.8078 4.75001 17.5Z"
                          fill="#22AD5C"
                        />
                      </svg>

                      <div>
                        <span className="block text-2xs text-dark-4 uppercase">
                          Compte
                        </span>
                        <p className="font-medium text-custom-sm text-dark">
                          {isLoggedIn && userInfo?.firstname}
                        </p>
                      </div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="cursor-pointer group-hover:rotate-180"
                      >
                        <path
                          d="M3.83331 5.91669L7.99998 10.0834L12.1666 5.91669"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </a>
                    <ul className="dropdown false w-[260px] xl:group-hover:translate-y-0 xl:group-hover:translate-x-[-150px]">
                      <li>
                        <div className="flex flex-col text-custom-sm py-[7px] px-4.5 false ">
                          <p className="font-medium text-custom-sm text-dark">
                            {isLoggedIn &&
                              userInfo?.firstname +
                                " " +
                                userInfo?.lastname}{" "}
                            ({userInfo?.username})
                          </p>
                          <p className="font-normal text-custom-xs text-dark-3">
                            {isLoggedIn && userInfo?.email}
                          </p>
                        </div>
                      </li>
                      <li>
                        <Link
                          className="flex text-custom-sm hover:text-green hover:bg-gray-1 py-[7px] px-4.5 false "
                          href={
                            userInfo?.role?.code.toLowerCase() === "admin"
                              ? "/admin"
                              : "/business"
                          }
                        >
                          Tableau de bord
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="flex text-custom-sm hover:text-green hover:bg-gray-1 py-[7px] px-4.5 false "
                          href={
                            userInfo?.role?.code.toLowerCase() === "admin"
                              ? "/admin/account"
                              : "/business/account"
                          }
                        >
                          Mon compte
                        </Link>
                      </li>
                      {/* add divider */}
                      <li>
                        <span className="hidden xl:block w-full h-[1px] bg-gray-4"></span>
                      </li>
                      <li>
                        <button
                          className="flex text-custom-sm hover:text-red hover:bg-gray-1 py-[7px] px-4.5 false w-full"
                          onClick={() => {
                            deleteLoginData();
                          }}
                        >
                          Se déconnecter
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- header top end --> */}
      </div>
    </header>
  );
};

export default Header;
