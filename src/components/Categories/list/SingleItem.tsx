import React from "react";
import { useParams, useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { FiEye, FiEdit2, FiTrash } from "react-icons/fi";

import { removeItemFromWishlist } from "@/redux/features/wishlist-slice";
import { addItemToCart } from "@/redux/features/cart-slice";

import Image from "next/image";

const SingleItem = ({ item, openEditModal, handleDeleteSubmit }) => {
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
      {/* <div className="min-w-[83px]">
        <button
          onClick={() => handleRemoveFromWishlist()}
          aria-label="button for remove product from wishlist"
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
        >
          <FiEye />
        </button>
      </div> */}

      <div className="min-w-[40%]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div>
              <h3 className="text-dark ease-out duration-200 hover:text-green">
                <a href="#"> {item.label} </a>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[40%]">
        <p className="text-dark">{item.description ?? "--"}</p>
      </div>

      <div className="min-w-[20%] flex justify-end">
        <button
          onClick={() => openEditModal(item)}
          aria-label="button for remove product from wishlist"
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 mr-4 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-blue-light-5 hover:border-blue-light-4 hover:text-green"
        >
          <FiEdit2 />
        </button>
        <button
          onClick={() => handleDeleteSubmit(item.id)}
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
