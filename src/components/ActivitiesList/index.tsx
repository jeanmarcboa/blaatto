"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "../Common/Breadcrumb";
import useUser from "@/hooks/useUser";
import PreLoader from "@/components/Common/BtnPreLoader";
import SingleItem from "./SingleItem";

import product from "@/app/api/productServices";
import orderAPI from "@/app/api/orderServices";
import shopAPI from "@/app/api/shopServices";
import logsAPI from "@/app/api/activityServices";

export const Orderstlist = () => {
  const { userInfo } = useUser();
  const [loading, setLoading] = useState(true);
  const [logData, setLogData] = useState([]);

  const fetchLogsList = () => {
    logsAPI
      .logsList(userInfo.access_token)
      .then((response) => {
        setLogData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLogsList();
  }, []);

  return (
    <>
      {/* <Breadcrumb title={"Favoris"} pages={["Orderstlist"]} /> */}
      <section className="overflow-hidden">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">
              Activités ({logData.length})
            </h2>
          </div>

          <div className="bg-white rounded-[10px] border border-gray-4 dark:border-gray-800 overflow-hidden">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[1170px]">
                {/* <!-- table header --> */}
                <div className="flex items-center bg-gray-1 py-5.5 px-10">
                  {/* <div className="min-w-[83px]"></div> */}
                  <div className="min-w-[250px]">
                    <p className="text-dark">Utilisateur</p>
                  </div>
                  <div className="min-w-[180px]">
                    <p className="text-dark">Role</p>
                  </div>
                  <div className="min-w-[180px]">
                    <p className="text-dark">Action</p>
                  </div>
                  <div className="min-w-[180px]">
                    <p className="text-dark">Path</p>
                  </div>

                  <div className="min-w-[125px]">
                    <p className="text-dark">Methode</p>
                  </div>
                </div>

                {/* <!-- wish item --> */}
                {!loading &&
                  logData.map((item, key) => (
                    <SingleItem item={item} key={key} />
                  ))}
                {!loading && logData.length === 0 && (
                  <div className="flex items-center justify-center py-5.5 px-10">
                    <div className="min-w-[350px]">
                      <p className="text-dark">
                        Vous n&apos;avez aucune donnée !
                      </p>
                    </div>
                  </div>
                )}
                {loading && (
                  <div className="flex justify-center items-center m-4">
                    <PreLoader color="green" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
