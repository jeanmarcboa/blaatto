import React from "react";
import Link from "next/link";
import sepMillier from "@/components/Common/numberSeparator";
import { useParams, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { FiEye, FiEdit2, FiTrash } from "react-icons/fi";

import { removeItemFromWishlist } from "@/redux/features/wishlist-slice";
import { addItemToCart } from "@/redux/features/cart-slice";

import Image from "next/image";

const SingleItem = ({ item }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useUser();

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
      <div className="min-w-[450px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5">
              <Image
                src={
                  item?.Product_Photo?.[0]?.photo?.url ??
                  "/images/products/default-placeholder.png"
                }
                alt="product"
                width={200}
                height={200}
              />
            </div>

            <div>
              <h3 className="text-dark ease-out duration-200 hover:text-green">
                <Link href={"/shop-details/" + item.id}>
                  {item?.designation?.label}
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[205px]">
        <p className="text-dark">
          {sepMillier(item.price)} {item.currency}
        </p>
      </div>

      <div className="min-w-[205px]">
        <div className="flex items-center gap-1.5">
          {item.stock > 0 ? (
            <span className="text-green"> {item.stock} </span>
          ) : (
            <>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99935 14.7917C10.3445 14.7917 10.6243 14.5119 10.6243 14.1667V9.16669C10.6243 8.82151 10.3445 8.54169 9.99935 8.54169C9.65417 8.54169 9.37435 8.82151 9.37435 9.16669V14.1667C9.37435 14.5119 9.65417 14.7917 9.99935 14.7917Z"
                  fill="#F23030"
                />
                <path
                  d="M9.99935 5.83335C10.4596 5.83335 10.8327 6.20645 10.8327 6.66669C10.8327 7.12692 10.4596 7.50002 9.99935 7.50002C9.53911 7.50002 9.16602 7.12692 9.16602 6.66669C9.16602 6.20645 9.53911 5.83335 9.99935 5.83335Z"
                  fill="#F23030"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.04102 10C1.04102 5.05247 5.0518 1.04169 9.99935 1.04169C14.9469 1.04169 18.9577 5.05247 18.9577 10C18.9577 14.9476 14.9469 18.9584 9.99935 18.9584C5.0518 18.9584 1.04102 14.9476 1.04102 10ZM9.99935 2.29169C5.74215 2.29169 2.29102 5.74283 2.29102 10C2.29102 14.2572 5.74215 17.7084 9.99935 17.7084C14.2565 17.7084 17.7077 14.2572 17.7077 10C17.7077 5.74283 14.2565 2.29169 9.99935 2.29169Z"
                  fill="#F23030"
                />
              </svg>{" "}
              <span className="text-red"> En rupture de stock </span>
            </>
          )}
        </div>
      </div>
      <div className="min-w-[110px]">
        <p
          className={`inline-block text-custom-sm  py-0.5 px-2.5 rounded-[30px] capitalize ${
            item?.enabled
              ? "text-green bg-green-light-6"
              : "text-red bg-red-light-6"
          }`}
        >
          {item?.enabled ? "Active" : "Désactivé"}
        </p>
      </div>

      <div className="min-w-[150px] flex justify-end">
        <button
          onClick={() => router.push("/shop-details/" + item.id)}
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 mr-4 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-green-light-6 hover:border-green-light-4 hover:text-green"
        >
          <FiEye />
        </button>
        <button
          onClick={() =>
            router.push(
              `/${
                userInfo?.role?.code === "ADMIN" ? "admin" : "business"
              }/product/edit-product/${item.id}`
            )
          }
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 mr-4 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-blue-light-5 hover:border-blue-light-4 hover:text-green"
        >
          <FiEdit2 />
        </button>
        <button
          // onClick={() => handleRemoveFromWishlist()}
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
        >
          <FiTrash />
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
