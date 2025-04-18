import React, { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import SingleOrder from "./SingleOrder";
import ordersData from "./ordersData";

import ordersAPI from "@/app/api/order";

const Orders = () => {
  const { userInfo } = useUser();
  const [orders, setOrders] = useState<any>([]);
  const fetchOrders = () => {
    ordersAPI
      .orderList("?customerId=" + userInfo?.id)
      .then((response) => {
        console.log(response.data.length);
        setOrders(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[770px]">
          {/* <!-- order item --> */}
          {orders.length > 0 && (
            <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex ">
              <div className="min-w-[213px]">
                <p className="text-custom-sm text-dark">Commande</p>
              </div>
              <div className="min-w-[175px]">
                <p className="text-custom-sm text-dark">Date</p>
              </div>

              <div className="min-w-[128px]">
                <p className="text-custom-sm text-dark">Status</p>
              </div>

              <div className="min-w-[113px]">
                <p className="text-custom-sm text-dark">Total</p>
              </div>

              <div className="min-w-[113px]">
                <p className="text-custom-sm text-dark">Action</p>
              </div>
            </div>
          )}
          {orders?.length > 0 ? (
            orders.map((orderItem: any, key: number) => (
              <SingleOrder key={key} orderItem={orderItem} smallView={false} />
            ))
          ) : (
            <p className="py-9.5 px-4 sm:px-7.5 xl:px-10 text-center">
              Vous n&apos;avez aucune commande !
            </p>
          )}
        </div>

        {orders?.length > 0 &&
          orders.map((orderItem: any, key: number) => (
            <SingleOrder key={key} orderItem={orderItem} smallView={true} />
          ))}
      </div>
    </>
  );
};

export default Orders;
