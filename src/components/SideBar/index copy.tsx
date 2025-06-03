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
      title: "Tableau de bord",
      icon: <FiHome />,
      link: "/business",
      path: "/business",
    },
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
        {
          title: "Importer des produits",
          link: "/business/product/import",
        },
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
    <div className="sidebar bottom-0 lg:left-0 p-2 w-[20%] overflow-y-auto text-center bg-white border-r border-gray-4">
      {/* <Home /> */}

      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <div className={`fixed top-[70px] ${isSidebarOpen ? "" : "hidden"}`}>
        <div
          className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
          onClick={toggleSidebar}
        >
          <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
        </div>
        <div className="flex flex-col flex-shrink">
          {/* <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
              <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
              <h1 className="font-bold text-gray-200 text-[15px] ml-3">
                TailwindCSS
              </h1>
              <i
                className="bi bi-x cursor-pointer ml-28 lg:hidden"
                onClick={toggleSidebar}
              ></i>
            </div>
            <div className="my-2 bg-gray-600 h-[1px]"></div>
          </div> */}

          {menuItems.map((item, index) => (
            <div key={index}>
              {item.subMenu ? (
                <>
                  <div
                    className={`p-2.5 mt-3 flex items-center rounded-md cursor-pointer hover:bg-green text-dark ${
                      pathname.includes(item.path)
                        ? "bg-green"
                        : "hover:bg-green"
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
                              ? "rotate(180deg)"
                              : "rotate(0)",
                        }}
                      >
                        <i className="bi bi-chevron-down"></i>
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
                  className={`p-2.5 mt-3 flex items-center rounded-md px-4 cursor-pointer hover:bg-green text-dark ease-out duration-200 hover:text-white pl-2 ${
                    pathname.includes(item.path) ? "bg-green" : "hover:bg-green"
                  }`}
                >
                  {item.icon}
                  <span className="text-[15px] ml-4 text-gray-200">
                    {item.title}
                  </span>
                </Link>
              )}
            </div>
          ))}

          <div className="my-4 bg-dark-2 h-[1px]"></div>
          <Link
            href="/business/account"
            className={`p-2.5 mt-3 flex items-center rounded-md px-4 cursor-pointer hover:bg-green text-dark ease-out duration-200 hover:text-white pl-2 ${
              pathname.includes("/business/account")
                ? "bg-green"
                : "hover:bg-green"
            }`}
          >
            <FiUser />
            <span className="text-[15px] ml-4 text-gray-200">Profil</span>
          </Link>
          <button
            onClick={() => deleteLoginData()}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 cursor-pointer text-dark ease-out duration-200 hover:text-red pl-2"
          >
            <FiLogOut />
            <span className="text-[15px] ml-4 text-gray-200">
              Se déconnecter
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
