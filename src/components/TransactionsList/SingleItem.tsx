import React from "react";
import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { FiEye, FiLink, FiTrash } from "react-icons/fi";

import { removeItemFromWishlist } from "@/redux/features/wishlist-slice";
import { addItemToCart } from "@/redux/features/cart-slice";

import Image from "next/image";

const SingleItem = ({ item }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromWishlist = () => {
    dispatch(removeItemFromWishlist(item.id));
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        ...item,
        quantity: 1,
      })
    );
  };

  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-10">
      <div className="min-w-[250px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div>
              <h3 className="text-red ease-out duration-200 hover:text-green">
                <a href="#"> {item?.Transaction[0]?.reference} </a>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[180px]">
        <p className="text-dark">
          {dayjs(item?.Transaction[0]?.createdAt).format("DD/MM/YYYY, HH:mm")}
        </p>
      </div>

      <div className="min-w-[125px]">
        <div className="flex gap-1.5">
          <p
            className={`inline-block text-custom-sm  py-0.5 px-2.5 rounded-[30px] capitalize ${
              item.deliver
                ? "text-green bg-green-light-6"
                : !item.deliver
                ? "text-red bg-red-light-6"
                : item.status === "processing"
                ? "text-yellow bg-yellow-light-4"
                : "Unknown Status"
            }`}
          >
            {item?.Transaction[0]?.status}
          </p>
        </div>
      </div>

      <div className="min-w-[180px]">
        <p className="text-dark">
          {item?.Transaction[0]?.amount} {item.currency}
        </p>
      </div>

      <div className="min-w-[250px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div>
              <h3 className="text-red ease-out duration-200 hover:text-green">
                <a href="#"> {item?.reference} </a>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[120px] flex justify-end">
        <button
          onClick={() => router.push("/business/commandes/view/" + item?.id)}
          aria-label="button for remove product from wishlist"
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 mr-4 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-green-light-6 hover:border-green-light-4 hover:text-green"
        >
          <FiLink />
        </button>
        {/* <button
          disabled
          aria-label="button for remove product from wishlist"
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
        >
          <FiTrash />
        </button> */}
      </div>
    </div>
  );
};

export default SingleItem;
