import React from "react";
import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import sepMillier from "../Common/numberSeparator";
import useUser from "@/hooks/useUser";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { FiEye, FiLink, FiTrash } from "react-icons/fi";

import { removeItemFromWishlist } from "@/redux/features/wishlist-slice";
import { addItemToCart } from "@/redux/features/cart-slice";

import Image from "next/image";

const SingleItem = ({ item }) => {
  const { userInfo } = useUser();
  const router = useRouter();

  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-10">
      <div className="min-w-[250px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div>
              <h3 className="text-red ease-out duration-200 hover:text-green">
                <a href="#"> {item?.accountId ?? "--"} </a>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[180px]">
        <p className="text-dark">{item?.role}</p>
      </div>

      <div className="min-w-[180px]">
        <p className="text-dark">{item?.action}</p>
      </div>

      <div className="min-w-[125px]">
        <p className="text-dark">{item?.path}</p>
      </div>

      <div className="min-w-[120px]">
        <p className="text-dark">{item?.method}</p>
      </div>
    </div>
  );
};

export default SingleItem;
