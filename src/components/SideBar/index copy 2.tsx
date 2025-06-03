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
      <div className={`fixed top-[70px] ${isSidebarOpen ? "" : "hidden"}`}>
        <div className="flex flex-col w-full">
          {menuItems.map((item, index) => (
            <div className="flex items-center w-full" key={index}>
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
