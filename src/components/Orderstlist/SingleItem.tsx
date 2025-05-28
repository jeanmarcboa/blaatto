import React from "react";
import { useParams, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import dayjs from "dayjs";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { FiEye, FiEdit2, FiTrash } from "react-icons/fi";

import { removeItemFromWishlist } from "@/redux/features/wishlist-slice";
import { addItemToCart } from "@/redux/features/cart-slice";

import Image from "next/image";

const SingleItem = ({ item }) => {
  const router = useRouter();
  const { userInfo } = useUser();
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
      {/* <div className="min-w-[83px]">
        <button
          onClick={() => handleRemoveFromWishlist()}
          aria-label="button for remove product from wishlist"
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
        >
          <FiEye />
        </button>
      </div> */}

      <div className="min-w-[350px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div>
              <h3 className="text-red ease-out duration-200 hover:text-green">
                <a href="#"> {item.reference} </a>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[205px]">
        <p className="text-dark">
          {dayjs(item?.createdAt).format("DD/MM/YYYY, HH:mm")}
        </p>
      </div>

      <div
        className={
          userInfo.role.code === "ADMIN" ? "min-w-[355px]" : "min-w-[150px]"
        }
      >
        <div className="flex items-center gap-1.5">
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
            {item.status}
          </p>
        </div>
      </div>

      {userInfo.role.code !== "ADMIN" && (
        <div className="min-w-[205px]">
          <p className="text-dark">
            {item.totalPrice} {item.currency}
          </p>
        </div>
      )}

      <div className="min-w-[150px] flex justify-end">
        <button
          onClick={() =>
            router.push(
              `${
                userInfo?.role?.code === "ADMIN" ? "/admin" : "/business"
              }/commandes/view/${item?.id}`
            )
          }
          aria-label="button for remove product from wishlist"
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 mr-4 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-green-light-6 hover:border-green-light-4 hover:text-green"
        >
          <FiEye />
        </button>
        <button
          disabled
          // onClick={() => handleRemoveFromWishlist()}
          aria-label="button for remove product from wishlist"
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
        >
          <FiTrash />
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
