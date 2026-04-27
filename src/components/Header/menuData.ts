import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Accueil",
    newTab: false,
    isExternal:false,
    path: "/",
  },
  {
    id: 2,
    title: "Boutique",
    newTab: false,
    isExternal:false,
    path: "/shop",
  },
  {
    id: 2,
    title: "CI Export",
    newTab: false,
    isExternal:true,
    path: "https://cotedivoirexport.ci/",
  },
  // {
  //   id: 3,
  //   title: "Blog",
  //   newTab: false,
  //   path: "/blogs/blog-details-with-sidebar",
  // },
  // {
  //   id: 3,
  //   title: "Contact",
  //   newTab: false,
  //   path: "/contact",
  // },
];
