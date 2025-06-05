import React from "react";
import dayjs from "dayjs";
import sepMillier from "../Common/numberSeparator";
import { sep } from "path";

const OrderDetails = ({ orderItem }: any) => {
  return (
    <>
      <div className="px-7.5 w-full mt-4">
        <p className="font-bold">Détails de la transaction :</p>
      </div>
      <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex w-full">
        <div className="min-w-[113px]">
          <p className="text-custom-sm text-dark">Reference</p>
        </div>
        <div className="min-w-[113px]">
          <p className="text-custom-sm text-dark">Date</p>
        </div>

        <div className="min-w-[113px]">
          <p className="text-custom-sm text-dark">Status</p>
        </div>

        <div className="min-w-[113px]">
          <p className="text-custom-sm text-dark">Total</p>
        </div>
      </div>
      <div className="items-center justify-between border-t border-gray-3 py-5 px-7.5 hidden md:flex">
        <div className="min-w-[111px]">
          <p className="text-custom-sm text-red">#{orderItem.reference}</p>
        </div>
        <div className="min-w-[175px]">
          <p className="text-custom-sm text-dark">
            {dayjs(orderItem.createdAt).format("DD/MM/YYYY, HH:mm")}
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
            {sepMillier(orderItem.totalPrice)} {orderItem.currency}
          </p>
        </div>
      </div>
      <div className="px-7.5 w-full mb-4">
        <p className="font-normal">Adresse de livraison:</p>{" "}
        <p>{orderItem.deliverAddress ?? "Non indiqué"}</p>
      </div>
      {/* add div separator */}
      <div className="w-full h-[1px] bg-gray-3"></div>
      <div className="px-7.5 w-full mt-4">
        <p className="font-bold">Détails de la transaction:</p>
      </div>
      <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex w-full">
        <div className="min-w-[113px]">
          <p className="text-custom-sm text-dark">Reference</p>
        </div>
        <div className="min-w-[113px]">
          <p className="text-custom-sm text-dark">Date</p>
        </div>

        <div className="min-w-[113px]">
          <p className="text-custom-sm text-dark">Status</p>
        </div>

        <div className="min-w-[113px]">
          <p className="text-custom-sm text-dark">Total</p>
        </div>
      </div>
      <div className="items-center justify-between border-t border-gray-3 py-5 px-7.5 hidden md:flex">
        <div className="min-w-[111px]">
          <p className="text-custom-sm text-red">
            #{orderItem?.Transaction[0]?.reference}
          </p>
        </div>
        <div className="min-w-[175px]">
          <p className="text-custom-sm text-dark">
            {dayjs(orderItem?.Transaction[0]?.createdAt).format(
              "DD/MM/YYYY, HH:mm"
            )}
          </p>
        </div>

        <div className="min-w-[128px]">
          <p
            className={`inline-block text-custom-sm  py-0.5 px-2.5 rounded-[30px] capitalize ${
              orderItem?.Transaction[0]?.status == "Approuvé"
                ? "text-green bg-green-light-6"
                : "text-red bg-red-light-6"
            }`}
          >
            {orderItem?.Transaction[0]?.status}
          </p>
        </div>

        <div className="min-w-[113px]">
          <p className="text-custom-sm text-dark">
            {sepMillier(orderItem?.Transaction[0]?.amount)} {orderItem.currency}
          </p>
        </div>
      </div>
      {/* add div separator */}
      <div className="w-full h-[1px] bg-gray-3"></div>
      <div className="bg-gray-3 shadow-1 border-[1px] border-solid border-gray-4 mt-4 w-full">
        <div>
          <div className="w-full overflow-x-auto">
            <div>
              {/* <!-- table header --> */}
              <div className="flex items-center bg-gray-4 py-5.5 px-10">
                {/* <div className="min-w-[83px]"></div> */}
                <div className="min-w-[45%]">
                  <p className="text-dark">Article</p>
                </div>

                <div className="min-w-[25%]">
                  <p className="text-dark">Coût</p>
                </div>

                <div className="min-w-[10%]">
                  <p className="text-dark text-center">Qté</p>
                </div>
                <div className="min-w-[20%]">
                  <p className="text-dark text-right">Total</p>
                </div>
              </div>
              {orderItem?.OrderItem?.map((item: any, key: number) => (
                <div className="flex items-center py-5.5 px-10" key={key}>
                  <div className="min-w-[45%]">
                    <p className="text-dark">
                      {item?.product?.designation?.label ?? "--"}
                    </p>
                  </div>

                  <div className="min-w-[25%]">
                    <p className="text-dark">
                      {sepMillier(item?.product?.price)}{" "}
                      {item?.product?.currency}
                    </p>
                  </div>

                  <div className="min-w-[10%]">
                    <p className="text-dark text-center">{item?.quantity}</p>
                  </div>
                  <div className="min-w-[20%]">
                    <p className="text-dark text-right">
                      {sepMillier(item?.price)} {item?.product?.currency}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
