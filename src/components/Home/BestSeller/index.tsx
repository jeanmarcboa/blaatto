"use client";

import React, { useState, useEffect } from "react";
import PreLoader from "@/components/Common/BtnPreLoader";
// import SingleItem from "./SingleItem";
import SingleItem from "@/components/Common/ProductItem";
import Image from "next/image";
import Link from "next/link";
import shopData from "@/components/Shop/shopData";
import productAPI from "@/app/api/productServices";
const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchedProducts = () => {
      let params = "enabled=true";
      productAPI
        .productList(params)
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchedProducts();
  }, []);
  return (
    <section className="overflow-hidden">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- section title --> */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <Image
                src="/images/icons/icon-07.svg"
                alt="icon"
                width={17}
                height={17}
              />
              Ce mois
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              Produits les plus vendus
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7.5">
          {/* <!-- Best Sellers item --> */}
          {products.slice(0, 7).map((item, key) => (
            <SingleItem item={item} key={key} />
          ))}
        </div>
        {loading && (
          <div className="text-center flex flex-row justify-center w-full">
            <PreLoader color="green" />
          </div>
        )}

        <div className="text-center mt-12.5">
          <Link
            href="/shop-without-sidebar"
            className="inline-flex font-medium text-custom-sm py-3 px-7 sm:px-12.5 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-green hover:text-white hover:border-transparent"
          >
            Voir tous
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
