"use client";

import Home from "@/components/Home";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import {
  FiHome,
  FiBriefcase,
  FiArchive,
  FiFileText,
  FiUsers,
  FiUser,
  FiLayers,
  FiCreditCard,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";
import { Metadata } from "next";

export default function SideBar() {
  const router = useRouter();
  const { userInfo, isLoggedIn, setLoginData, deleteLoginData } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const pathname = usePathname(); // Récupère l'URL active
  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  // const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);

  const menuItems = [
    {
      title: "Boutiques",
      icon: <FiBriefcase />,
      link: "/business/boutiques",
      path: "/business/boutiques",
    },
    {
      title: "Produits",
      icon: <FiArchive />,
      subMenu: [
        { title: "Tous les produits", link: "/business/product/product-list" },
        {
          title: "Ajouter un nouveau produit",
          link: "/business/product/add-product",
        },
        // {
        //   title: "Importer des produits",
        //   link: "/business/product/import",
        // },
      ],
      path: "/business/product",
    },
    {
      title: "Commandes",
      icon: <FiFileText />,
      link: "/business/commandes/list",
      path: "/business/commandes",
    },
    // { title: "Clients", icon: <FiUsers />, link: "/signup" },
    {
      title: "Transactions",
      icon: <FiLayers />,
      link: "/business/transactions/list",
      path: "/business/transactions",
    },
    // { title: "Paiement", icon: <FiCreditCard />, link: "/signup" },
  ];

  if (!isLoggedIn) {
    router.push("/signin");
    return;
  }

  return (
    <div
      id="hs-sidebar-content-push"
      className="w-[20%] hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
hs-overlay-open:translate-x-0
-translate-x-full transition-all duration-300 transform
h-full
hidden
fixed top-0 start-0 bottom-0 z-60
bg-white border-e border-gray-4 pt-[100px]"
      role="dialog"
      aria-label="Sidebar"
    >
      <div className="relative flex flex-col h-full max-h-full ">
        {/* Header */}
        <header className="p-4 flex justify-between items-center gap-x-2">
          <a
            className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80"
            href="#"
            aria-label="Brand"
          >
            Menu
          </a>

          <div className="lg:hidden -me-2">
            {/* Close Button */}
            <button
              type="button"
              className="flex justify-center items-center gap-x-3 size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100"
              data-hs-overlay="#hs-sidebar-content-push"
            >
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
            {/* End Close Button */}
          </div>
        </header>
        {/* End Header */}

        {/* Body */}
        <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
          <div className="hs-accordion-group pb-0 px-2 w-full flex flex-col justify-between align-center h-full">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/business"
                  className={`p-2.5 mt-3 flex items-center rounded-md px-4 cursor-pointer hover:bg-gray-3 ease-out duration-200 hover:text-dark pl-2 ${
                    pathname === "/business"
                      ? "bg-green text-white"
                      : "hover:bg-gray-3"
                  }`}
                >
                  <FiHome />
                  <span className="text-[15px] ml-4">Tableau de bord</span>
                </Link>
              </li>
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.subMenu ? (
                    <>
                      <div
                        className={`p-2.5 mt-3 flex items-center rounded-md cursor-pointer hover:bg-gray-3 hover:text-dark ${
                          pathname.includes(item.path)
                            ? "bg-green text-white"
                            : "hover:bg-gray-3"
                        }`}
                        onClick={() => toggleSubMenu(index)}
                      >
                        {item.icon}
                        <div className="flex justify-between w-full items-center">
                          <span className="text-[15px] ml-4 text-gray-200">
                            {item.title}
                          </span>
                          <span
                            className="text-sm transform duration-300"
                            style={{
                              transform:
                                openSubMenu === index
                                  ? "rotate(90deg)"
                                  : "rotate(0)",
                            }}
                          >
                            <FiChevronRight />
                          </span>
                        </div>
                      </div>
                      {openSubMenu === index && (
                        <div
                          className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200"
                          id="submenu"
                        >
                          {item.subMenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.link}
                              className={`block cursor-pointer p-2 hover:text-green rounded-md mt-1 ease-out duration-200 ${
                                pathname === subItem.link
                                  ? "text-green"
                                  : "hover:text-green"
                              }`}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.link}
                      className={`p-2.5 mt-3 flex items-center rounded-md px-4 cursor-pointer hover:bg-gray-3 ease-out duration-200 hover:text-dark pl-2 ${
                        pathname.includes(item.path)
                          ? "bg-green text-white"
                          : "hover:bg-gray-3"
                      }`}
                    >
                      {item.icon}
                      <span className="text-[15px] ml-4">{item.title}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/business/account"
                  className={`p-2.5 mt-3 flex items-center rounded-md px-4 cursor-pointer hover:bg-green ease-out duration-200 hover:text-white pl-2 ${
                    pathname.includes("/business/account")
                      ? "bg-green text-white"
                      : "hover:bg-green"
                  }`}
                >
                  <FiUser />
                  <span className="text-[15px] ml-4 text-gray-200">Profil</span>
                </Link>
              </li>

              <li>
                <button
                  onClick={() => deleteLoginData()}
                  className="p-2.5 mt-3 flex items-center rounded-md px-4 cursor-pointer ease-out duration-200 hover:text-red pl-2"
                >
                  <FiLogOut />
                  <span className="text-[15px] ml-4 text-gray-200">
                    Se déconnecter
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
        {/* End Body */}
      </div>
    </div>
  );
}
