import React, { useState } from "react";
import dayjs from "dayjs";
import OrderActions from "./OrderActions";
import OrderModal from "./OrderModal";

const SingleOrder = ({ orderItem, smallView }: any) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  const toggleModal = (status: boolean) => {
    setShowDetails(status);
    setShowEdit(status);
  };

  return (
    <>
      {!smallView && (
        <div className="items-center justify-between border-t border-gray-3 py-5 px-7.5 hidden md:flex">
          <div className="min-w-[111px]">
            <p className="text-custom-sm text-red">#{orderItem.reference}</p>
          </div>
          <div className="min-w-[175px]">
            <p className="text-custom-sm text-dark">
              {dayjs(orderItem?.createdAt).format("DD/MM/YYYY, HH:mm")}
            </p>
          </div>

          <div className="min-w-[128px]">
            <p
              className={`inline-block text-custom-sm  py-0.5 px-2.5 rounded-[30px] capitalize ${
                orderItem.deliver
                  ? "text-green bg-green-light-6"
                  : "text-red bg-red-light-6"
              }`}
            >
              {orderItem.status}
            </p>
          </div>

          <div className="min-w-[113px]">
            <p className="text-custom-sm text-dark">
              {orderItem.totalPrice} {orderItem.currency}
            </p>
          </div>

          <div className="flex gap-5 items-center">
            <OrderActions
              toggleDetails={toggleDetails}
              toggleEdit={toggleEdit}
            />
          </div>
        </div>
      )}

      {smallView && (
        <div className="block md:hidden">
          <div className="py-4.5 px-7.5">
            <div className="">
              <p className="text-custom-sm text-dark">
                <span className="font-bold pr-2"> Reference:</span> #
                {orderItem.reference}
              </p>
            </div>
            <div className="">
              <p className="text-custom-sm text-dark">
                <span className="font-bold pr-2">Date:</span>{" "}
                {dayjs(orderItem?.createdAt).format("DD/MM/YYYY, HH:mm")}
              </p>
            </div>

            <div className="">
              <p className="text-custom-sm text-dark">
                <span className="font-bold pr-2">Status:</span>{" "}
                <span
                  className={`inline-block text-custom-sm  py-0.5 px-2.5 rounded-[30px] capitalize ${
                    orderItem.deliver
                      ? "text-green bg-green-light-6"
                      : "text-red bg-red-light-6"
                  }`}
                >
                  {orderItem.status}
                </span>
              </p>
            </div>

            <div className="">
              <p className="text-custom-sm text-dark">
                <span className="font-bold pr-2">Livraison:</span>{" "}
                {orderItem.deliverAddress ?? "Non indiqué"}
              </p>
            </div>

            <div className="">
              <p className="text-custom-sm text-dark">
                <span className="font-bold pr-2">Total:</span>
                {orderItem.totalPrice} {orderItem.currency}
              </p>
            </div>

            <div className="">
              <p className="text-custom-sm text-dark flex items-center">
                <span className="font-bold pr-2">Actions:</span>{" "}
                <OrderActions
                  toggleDetails={toggleDetails}
                  toggleEdit={toggleEdit}
                />
              </p>
            </div>
          </div>
        </div>
      )}

      <OrderModal
        showDetails={showDetails}
        showEdit={showEdit}
        toggleModal={toggleModal}
        order={orderItem}
      />
    </>
  );
};

export default SingleOrder;
